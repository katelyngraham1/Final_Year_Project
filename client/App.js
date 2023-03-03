import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Image } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

import Home from './screens/Home';
import Invoices from './screens/Invoice';
import Companies from './screens/Company';
import Folders from './screens/Folder';
import Settings from './screens/Settings';
import Logout from './screens/Logout';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" screenOptions={{ 
         headerShown: true,
         headerTitle: 'File A While',
         headerTitleStyle: { color: '#FF5733', fontSize: 30 },
         headerRight: () => (
          <Image
            source={require('./assets/FileLogo.png')} 
            style={{ width: 30, height: 30, marginRight: 15, borderRadius: 5 }} 
          />
        ),
        headerTintColor: "#8626BC",
        drawerStyle: { backgroundColor: "#C2C0C4" },
        drawerActiveTintColor: "#8626BC",
        drawerInactiveTintColor: "#FF5733",
        
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Invoices" component={Invoices} />
      <Drawer.Screen name="Companies" component={Companies} />
      <Drawer.Screen name="Folders" component={Folders} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="Log Out" component={Logout} />
    </Drawer.Navigator>
  </NavigationContainer>
  );
}