import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"


export default function Invoice() {
  return (
    <View style={StyleSheet.container}>
        <Text>Invoice Page</Text>
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