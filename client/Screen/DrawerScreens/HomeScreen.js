import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Moment from "moment";
import { Button } from "react-native-paper";
import { API_ROOT, getHeaders } from "../../constants";

/****************************************************/
// Created: Katelyn Graham
//
// This file contains the logic for the applications
// home screen.
/****************************************************/

const HomeScreen = ({ navigation, route }) => {
  const [fileData, setFileData] = useState([]);

  const handleFilePress = id => {
    navigation.navigate("SingleInvoice", { id: id });
  };

  useEffect(
    () => {
      async function fetchData() {
        setFileData([]);
        const userid = await AsyncStorage.getItem("user_id");
        console.log("Home Screen Loading", userid);
        // fetch(API_ROOT + `/api/file?userid=${userid}`, { headers: getHeaders()})
        fetch(API_ROOT + `/api/file`, { headers: await getHeaders() })
          .then(response => response.json())
          .then(data => {
            let sortedData = data
              .filter(item => !item.paid || item.paid === "0") // filter out items where paid is true or 1
              .sort((a, b) => {
                const dueDateA = new Date(a.duedate);
                const dueDateB = new Date(b.duedate);

                if (dueDateA < dueDateB) {
                  return -1;
                } else if (dueDateA > dueDateB) {
                  return 1;
                } else {
                  if (a.amount < b.amount) {
                    return -1;
                  } else if (a.amount > b.amount) {
                    return 1;
                  } else {
                    return 0;
                  }
                }
              });
            sortedData = sortedData.map(r => {
              r.duedate = Moment(r.duedate).format("Do MMM");
              return r;
            });
            setFileData(sortedData);
          })
          .catch(error => console.error(error));
      }
      fetchData();
    },
    [route]
  );

  const renderFileItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ padding: 10 }}
        onPress={() => handleFilePress(item.id)}
      >
        <View elevation={5} style={styles.buttonContainer}>
          <Text style={{ color: "white" }}>
            {item.duedate}
          </Text>
          <Text style={{ color: "white" }}>
            {item.name}
          </Text>
          <Text style={{ color: "white" }}>
            € {item.amount.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ margin: 30 }}>
      <Text
        style={{
          fontSize: 50,
          fontWeight: "bold",
          marginTop: 15,
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
          marginBottom: 25,
          textAlign: "center"
        }}
      >
        Invoices Due
      </Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <FlatList
          data={fileData}
          renderItem={renderFileItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      <Button
        style={styles.newButton}
        mode="contained"
        onPress={() => navigation.navigate("AddNewInvoice")}
      >
        Add New Invoice
      </Button>
      <Button
        style={styles.newButton}
        mode="contained"
        onPress={() => navigation.navigate("AllInvoices")}
      >
        View All Invoices
      </Button>
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
    maxHeight: 450,
    marginBottom: 30
  },
  newButton: {
    backgroundColor: "#c381e4",
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    margin: 5
  }
});

export default HomeScreen;
