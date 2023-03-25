import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ROOT, getHeaders } from "../../constants";

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }
    let dataToSend = {newpassword: confirmPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const headers = await getHeaders();
    fetch(API_ROOT + '/api/user/changePassword', {
      method: 'POST',
      body: formBody,
      headers: headers
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage("Password change successful");
        } else {
          setMessage(data.error);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={(text) => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="New Password"
        value={newPassword}
        onChangeText={(text) => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <Button title="Save" onPress={handleChangePassword} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%",
  },
  message: {
    marginTop: 20,
    color: "green",
    fontWeight: "bold",
  },
});