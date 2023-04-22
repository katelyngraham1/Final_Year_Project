import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_ROOT, getHeaders } from "../../constants";

/****************************************************/
// Created: Katelyn Graham
//
// This file contains the logic for managing a users
// settings within the application.
/****************************************************/

export default function Settings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async () => {
    if (newPassword == "") {
      setMessage("No new password entered!");
      return;
    }
    if (currentPassword == "") {
      setMessage("You did not enter the old password!");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters long!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match!");
      return;
    }
    let dataToSend = {newpassword: confirmPassword, currentpassword: currentPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    const headers = await getHeaders();
    fetch(API_ROOT + "/api/user/changePassword", {
      method: "POST",
      body: formBody,
      headers: headers
    })
      .then(response => response.json())
      .then(data => {
        console.log("Change password returned with", data);
        if (!data.error) {
          setMessage("Password change successful");
          
        } else {
          setMessage(data.message);
        }
      })
      .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Current Password"
        value={currentPassword}
        onChangeText={text => setCurrentPassword(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="New Password"
        value={newPassword}
        onChangeText={text => setNewPassword(text)}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <Button title="Save" style={styles.buttonStyle}
        color="#ff4613"
        onPress={() => {
          Alert.alert(
            "Change Password",
            "Are you sure you want to change password?",
            [
              {
                text: "No",
                onPress: () => {
                  return null;
                }
              },
              {
                text: "Yes",
                onPress: () => {
                  handleChangePassword();
                }
              }
            ],
            { cancelable: false }
          );
        }}
      />
      <Text style={[styles.message, message === "Password change successful" ? styles.successMessage : null]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: "80%"
  },
  message: {
    marginTop: 20,
    fontWeight: "bold",
    color: "red"
  },
  successMessage: {
    color: "green"
  },
  buttonStyle: {
    backgroundColor: "#ff4613",
    borderWidth: 0,
    color: "#ff4613",
    borderColor: "#ff4613",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25
  }
});