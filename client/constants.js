import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_ROOT = 'http://DESKTOP-M09QP2T:8080';


export const getHeaders = async () => {
    const userid =  await AsyncStorage.getItem('user_id');

    return {
            //Header Defination
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
            'userid': userid
    }
}