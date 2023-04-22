import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Switch,
  Button
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import Moment from "moment";
import { API_ROOT, getHeaders } from "../constants";
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from "@react-native-community/datetimepicker";
// import Loader from "./Components/Loader";
import { Alert } from "react-native";
// import { response } from "express";

const AddInvoiceScreen = (props) => {
  const [amount, setAmount] = useState("");
  // const [paidStatus, setPaidStatus] = useState(false);
  const [company, setCompany] = useState("");
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [isAddSuccess, setIsAddSuccess] = useState(false);

  // console.log("Add new Invoice");
  const handleAmountInput = text => {
    // Regex pattern to only allow numbers and two decimal places
    const regex = /^(\d+(\.\d{0,2})?)?$/;
    if (regex.test(text)) {
      setAmount(text);
    }
  };

  const handleToggle = () => {
    Alert.alert("Confirm", "Are you sure this is Paid?", [
      {
        text: "No",
        onPress: () => setIsEnabled(false),
        style: "cancel"
      },
      {
        text: "Yes, it is Paid",
        onPress: () => setIsEnabled(true),
        style: "paid"
      }
    ]);
  };

  const handleUnpaidToggle = () => {
    Alert.alert("Confirm", "Item will now be unpaid?", [
      {
        text: "No",
        onPress: () => setIsEnabled(true),
        style: "cancel"
      },
      {
        text: "Yes",
        onPress: () => setIsEnabled(false),
        style: "unpaid"
      }
    ]);
  };

  // console.log("Handle add before")
  const handleAdd = async () => {
    setErrortext("");
    if (!amount) {
      alert("Please fill in Amount");
      return;
    }
    if (!company) {
      alert("Please fill in the Company Name");
      return;
    }
    setLoading(true);
    var dataToSend = {
      amount: amount,
      name: company,
      paid: isEnabled,
      duedate: date
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(API_ROOT + "/api/file", {
      method: "POST",
      body: formBody,
      headers: await getHeaders()
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        if (!responseJson.error) {
          setIsAddSuccess(true);
          console.log("Adding Invoice Successful.");
        } else {
          setErrortext(responseJson.message);
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
    }

    if (isAddSuccess) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "#ebd5f6",
            justifyContent: "center"
          }}
        >
          <Image
            source={require("../Image/FileLogo.png")}
            style={{
              height: 150,
              resizeMode: "contain",
              alignSelf: "center"
            }}
          />
          <Text style={styles.successTextStyle}>Adding Invoice Successful</Text>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={() => props.navigation.navigate("HomeScreen")}
          >
            <Text style={styles.buttonTextStyle}>Home Screen</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // const setDueDate = (event, d1) => {
    //   const { type, nativeEvent: { timestamp } } = event;
    //   set;
    // };

    // console.log("Returning render")
    return (
      <View style={styles.container}>
        
        <Text
          style={{
            fontSize: 50,
            fontWeight: "bold",
            marginTop: 25,
            marginBottom: 25,
            textAlign: "center",
            color: "#ff4613"
          }}
        >
          File A While
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 50,
            textAlign: "center"
          }}
        >
          Add New Invoice
        </Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Amount"
          value={amount}
          onChangeText={text => handleAmountInput(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={company}
          onChangeText={setCompany}
        />
        <View style={{ margin: 50 }}>
          <Text style={styles.text}>
            {" "}{`Tap To Select Due date:`}
          </Text>

          <DateTimePicker
            themeVariant="light"
            mode="date"
            value={date}
            onChange={(e, d) => setDate(d)}
          />
        </View>
        <View style={{ marginBottom: 50 }}>
        
            <View style={styles.toggleContainer}>
              <Text>Unpaid</Text>
              <Switch
                trackColor={{ false: "#ff0000", true: "#68C151" }}
                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                ios_backgroundColor="#ff0000"
                onValueChange={handleToggle}
                value={isEnabled}
              />
            </View>
        </View>
        <Button
          title="Add New Invoice"
          style={styles.buttonStyle}
          color="#ff4613"
          onPress={handleAdd}
        />

        {errortext != ""
          ? <Text style={styles.errorTextStyle}>
              {errortext}
            </Text>
          : null}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FFFFFF"
    },
    textStyle: {
      color: "#FFFFFF"
    },
    buttonContainer: {
      backgroundColor: "#f45225",
      borderRadius: 10,
      padding: 10,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    scrollViewContent: {
      maxHeight: 500,
      marginBottom: 30
    },
    newButton: {
      backgroundColor: "#c381e4",
      borderRadius: 20,
      padding: 5,
      alignItems: "center",
      margin: 5
    },
    input: {
      height: 40,
      width: "60%",
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      borderColor: "#f45225",
      borderWidth: 3
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
    },
    successTextStyle: {
      color: '#99008b',
      textAlign: 'center',
      fontSize: 18,
      padding: 30,
    },
    buttonStyle: {
      backgroundColor: '#ff4613',
      borderWidth: 0,
      color: '#ff4613',
      borderColor: '#ff4613',
      height: 40,
      alignItems: 'center',
      borderRadius: 30,
      marginLeft: 35,
      marginRight: 35,
      marginTop: 20,
      marginBottom: 20,
    },
    buttonTextStyle: {
      color: '#FFFFFF',
      paddingVertical: 10,
      fontSize: 16,
    },
  });

export default AddInvoiceScreen;
