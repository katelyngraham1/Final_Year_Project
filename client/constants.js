import AsyncStorage from '@react-native-async-storage/async-storage';

/****************************************************/
// Created: Katelyn Graham
//
// The purpose of this file is to collect together any
// common elements used across the application.
/****************************************************/

// The API_ROOT is the base part of the URL used to call the
// Server API. In a live/ production deployment which should be
// set to the appropriate end point where the server is deployed.
export const API_ROOT = 'http://DESKTOP-M09QP2T:8080';
// export const API_ROOT = 'https://fileawhile.com/api';

// This is a convenient method for getting the standard set of
// header values to use in API calls to the server
export const getHeaders = async () => {
    const userid =  await AsyncStorage.getItem('user_id');

    return {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
            'userid': userid
    }
}