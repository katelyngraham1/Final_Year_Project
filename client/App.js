import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from "@react-native-material/core";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>HELLO!</Text>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      < Button title="Click Me!" style={{ alignSelf:"center", marginTop: 40}}/>
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
});
