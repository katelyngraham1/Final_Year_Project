import React, {useState, useEffect} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Loader from './Components/Loader';
import { API_ROOT, getHeaders } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';
import Moment from 'moment';

export default function SingleInvoice({route, navigation}) {
  const [file, setFile] = useState();

  useEffect(async () => {
    // const userid =  await AsyncStorage.getItem('user_id');
    console.log("Single Invoice Screen Loading", route.params);
    // fetch(API_ROOT + `/api/file?userid=${userid}`, { headers: getHeaders()})
    fetch(API_ROOT + `/api/file/`+route.params.id, { headers: await getHeaders()})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFile(data);
      })
      .catch(error => console.error(error));
  }, [route.params.id]);

  if(!file) {
    return (
      <Loader loading={true} />
    )
  }



  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, fontWeight: 'bold', marginTop: 30, 
                     marginBottom: 40, textAlign: 'center'}}>
        Invoice {'\n'} Summary
      </Text>    
      <View style={styles.nameContainer}> 
        <Text style={{color: 'grey'}}>Name: </Text>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{file.name}</Text>
      </View>
      <View style={styles.rowContainer}>
      <View style={styles.amountContainer}>
        <Text style={{color: 'grey'}}>Amount:</Text>
        <Text style={{ fontSize: 20, marginBottom: 10}}>€ {file.amount.toFixed(2)}</Text>
      </View> 
      <View style={styles.dateContainer}>
        <Text style={{color: 'grey'}}>Due Date: </Text>
        <Text style={{ fontSize: 20, marginBottom: 10}}>
          {Moment(file.duedate).format('Do MMM YY')}
        </Text>
      </View></View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebd5f6',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40
    },
    scrollViewContent: {
      maxHeight: 450,
      marginBottom: 50
    },
    nameContainer: {
      // backgroundColor: '#fff',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000000',
      alignItems: 'center',
      marginBottom: 50,
      shadowOffset: {
        width: 0,
        height: 3
      }
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
    },
    amountContainer: {
      // backgroundColor: '#ebd5f6',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000000',
      alignItems: 'center',
      marginBottom: 50,
      width: 150,
      shadowOffset: {
        width: 0,
        height: 3
      }
    },
    dateContainer: {
      // backgroundColor: '#ebd5f6',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000000',
      alignItems: 'center',
      marginBottom: 50,
      width: 150,
      shadowOffset: {
        width: 0,
        height: 3
      }
    }
})