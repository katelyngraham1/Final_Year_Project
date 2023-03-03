import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

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
      <Drawer.Navigator initialRouteName="Home">
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