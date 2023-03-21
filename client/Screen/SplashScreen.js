import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          value === null ? 'Auth' : 'DrawerNavigationRoutes'
        ),
      );
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.textTitle}>FILE A WHILE</Text>
      <Image
        source={require('../Image/FileLogo.png')}
        style={{width: '90%', resizeMode: 'contain', margin: 30,}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
      <Text style={{marginTop: 20}}>Created by Katelyn Graham</Text>
      <Text style={{marginTop: 10}}>version 1.1</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ebd5f6',
  },
  textTitle: {
    alignContent: 'center',
    color: '#ff4613',
    fontSize: '50px',
    fontWeight: 'bold',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});