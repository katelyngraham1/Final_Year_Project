import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [fileData, setFileData] = useState([]);
  

  useEffect(async () => {
    const userid =  await AsyncStorage.getItem('user_id');
    console.log("Home Screen Loading", userid)
    fetch('http://DESKTOP-M09QP2T:8080/api/file?userid='+userid)
      .then(response => response.json())
      .then(data => setFileData(data))
      .catch(error => console.error(error));
  }, []);

  const handleFilePress = (id) => {
    navigation.navigate('FileDetail', { id });
  };

  const renderFileItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handleFilePress(item.id)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
          <Text>{item.name}</Text>
          <Text>{item.amount}</Text>
          <Text>View</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 20, marginBottom: 10, textAlign: 'center' }}>Due Invoices</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <Text>Company Name</Text>
        <Text>Price</Text>
        <Text></Text>
      </View>
      <FlatList
        data={fileData}
        renderItem={renderFileItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HomeScreen;