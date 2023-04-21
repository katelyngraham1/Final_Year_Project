import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, FlatList, TouchableOpacity,
         StyleSheet, ScrollView, TextInput, Switch} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import { Button } from 'react-native-paper';
import { API_ROOT, getHeaders } from '../constants';
// import DatePicker from 'react-native-date-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Alert } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [paidStatus, setPaidStatus] = useState('');
  const [company, setCompany] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const handleAmountInput = (text) => {
    // Regex pattern to only allow numbers and two decimal places
    const regex = /^(\d+(\.\d{0,2})?)?$/;
    if (regex.test(text)) {
      setAmount(text);
    }
  };

  const handleToggle = () => {
    Alert.alert(
      'Confirm',
      'Are you sure this is Paid?',
      [
        {
          text: 'No',
          onPress: () => setIsEnabled(false),
          style: 'cancel'
        },
        {
          text: 'Yes, it is Paid',
          onPress: () => setIsEnabled(true),
          style: 'paid'
        }
      ]
    )
  }

  const handleUnpaidToggle = () => {
    Alert.alert(
      'Confirm',
      'Item will now be unpaid?',
      [
        {
          text: 'No',
          onPress: () => setIsEnabled(true),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => setIsEnabled(false),
          style: 'unpaid'
        }
      ]
    )
  }

  const setDueDate = (event, d1) => {
    const {
      type,
      nativeEvent: {timestamp},
    } = event;
    set
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 50, fontWeight: 'bold', marginTop: 25, marginBottom: 25, textAlign: 'center', color: '#ff4613'}}>File A While</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 50, textAlign: 'center' }}>Add New Invoice</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Amount'
        value={amount}
        onChangeText={(text) => handleAmountInput(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={company}
        onChangeText={setCompany}
      />
      <View style={{margin: 50}}>
      <Text style={styles.text}> {`Tap To Select Due date:`}</Text>

      <DateTimePicker themeVariant="light" mode="date" value={date} 
                      onChange={(e,d) => setDate(d)}/>


      
        </View>
        <View style={{marginBottom: 50}}>
        {isEnabled === false &&  
          <View style={styles.toggleContainer}>
            <Text>Unpaid</Text>
          <Switch
            trackColor={{false: '#ff0000', true: '#68C151'}}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#ff0000"
            onValueChange={handleToggle}
            value={isEnabled}
          />
        </View> 
        }
        {isEnabled === true &&
          <View style={styles.toggleContainer}>
            <Text>Paid</Text>
          <Switch
            onValueChange={handleUnpaidToggle}
            value={isEnabled}
          />
        </View> 
        }
        </View>
      <Button style={styles.newButton}  mode="contained" 
              onPress={() => navigation.navigate('NewInvoice')}>
        Add New Invoice
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  textStyle: {
    color: '#FFFFFF'
  },
  buttonContainer: {
    backgroundColor: '#f45225',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
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
    width: '60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#f45225',
    borderWidth: 3,
  },
});

export default HomeScreen;
