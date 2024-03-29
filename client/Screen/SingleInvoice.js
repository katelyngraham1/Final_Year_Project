import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Switch } from "react-native";
import Loader from './Components/Loader';
import { API_ROOT, getHeaders } from '../constants';
import Moment from 'moment';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native';

/****************************************************/
// Created: Katelyn Graham
//
// This functional component contains the logic for
// displaying the details of a specific file/ invoice.
/****************************************************/

export default function SingleInvoice({route, navigation}) {
  const [file, setFile] = useState();
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    console.log("Single Invoice Screen Loading", route.params);
    fetch(API_ROOT + `/api/file/`+route.params.id, { headers: await getHeaders()})
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setFile(data);
        setIsEnabled(data.paid);
      })
      .catch(error => console.error(error));
  }, [route.params.id]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Invoice',
      'Are you sure you want to delete this invoice?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setLoading(true);
            fetch(API_ROOT + `/api/file/${route.params.id}`, {
              method: 'DELETE',
              headers: await getHeaders(),
            })
              .then(response => {
                setLoading(false);
                navigation.navigate('HomeScreen', { reload: true })
              })
              .catch(error => console.error(error));
          },
        },
      ],
    );
  }
  

  const handleToggle = () => {
    Alert.alert(
      'Confirm',
      'Are you sure this is Paid?',
      [
        {
          text: 'No',
          onPress: () => setIsEnabled(!isEnabled),
          style: 'cancel'
        },
        {
          text: 'Yes, it is Paid',
          onPress: () => {markInvoice();}
        }
      ]
    )
  }
  
  const markInvoice = () => {
    fetch(API_ROOT + '/api/file/'+route.params.id+'/paid', {
      method: 'POST',
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
       
        console.log(responseJson);
        setIsEnabled(true);
       
      })
      .catch((error) => {
        //Hide Loader
        console.error(error);
      });
  }


  if(!file) {
    return (
      <Loader loading={true} />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={{
        fontSize: 30, fontWeight: 'bold', marginTop: 30,
        marginBottom: 40, textAlign: 'center'
      }}>
        Invoice {'\n'} Summary
      </Text>
      <View style={styles.nameContainer}>
        <Text style={{ color: 'grey' }}>Name: </Text>
        <Text style={{ fontSize: 20, marginBottom: 10 }}>{file.name}</Text>
      </View>
      <View style={styles.rowContainer}>
        <View style={styles.amountContainer}>
          <Text style={{ color: 'grey' }}>Amount:</Text>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>€ {file.amount.toFixed(2)}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={{ color: 'grey' }}>Due Date: </Text>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {Moment(file.duedate).format('Do MMM YY')}
          </Text>
        </View>

      </View>
      {isEnabled === false &&
        <View style={styles.toggleContainer}>
          <Text>Unpaid</Text>
          <Switch
            trackColor={{ false: '#ff0000', true: '#68C151' }}
            thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#ff0000"
            onValueChange={handleToggle}
            value={isEnabled}
          />
        </View>
      }
      {isEnabled === true &&
        <Text style={styles.paidText}>Paid</Text>
      }
      <Button style={styles.newButton} mode="contained"
        onPress={() => {
          handleDelete();
        }}
      >Delete </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bfbfbf',
    alignItems: 'center',
    justifyContent: 'top',
    margin: 45
  },
  scrollViewContent: {
    maxHeight: 450,
    marginBottom: 50
  },
  nameContainer: {
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
  newButton: {
    backgroundColor: "#ff0000",
    borderRadius: 20,
    marginTop: 100,
    padding: 5,
    alignItems: "center",
    margin: 5
  },
  dateContainer: {
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
  toggleContainer: {
    borderRadius: 10,
    padding: 10,
  },
  toggleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})