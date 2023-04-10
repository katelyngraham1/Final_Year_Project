import AsyncStorage from '@react-native-async-storage/async-storage';

/*
    export const API_ROOT = 'http://DESKTOP-M09QP2T:8080';
    // hostname = DESKTOP-M09QP2T
*/

/*
    // otherwise do this on cmd = ipconfig /all
    // look for this in the list = IPv4 Address
    // use the number an paste in above
*/
export const API_ROOT = 'http://192.168.1.16:8080';

export const getHeaders = async () => {
    const userid =  await AsyncStorage.getItem('user_id');

    return {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
            'userid': userid
    }
}