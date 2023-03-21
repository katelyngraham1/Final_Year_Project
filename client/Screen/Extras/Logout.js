import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"


export default function Logout() {
  return (
    <View style={StyleSheet.container}>
        <Text>Logout</Text>
        <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})