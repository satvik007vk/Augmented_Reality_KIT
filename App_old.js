// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import CameraScreen from './CameraScreen'; // Import CameraScreen component

// import React from "react";
// import { View, Text, Button } from "react-native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { NavigationContainer } from "@react-navigation/native";

// const Drawer = createDrawerNavigator();

// // Home Screen
// const HomeScreen = ({ navigation }) => (
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <Text>Home Screen</Text>
//     <Button title="Open Menu" onPress={() => navigation.openDrawer()} />
//   </View>
// );

// // Settings Screen
// const SettingsScreen = () => (
//   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <Text>Settings Screen</Text>
//   </View>
// );

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Settings" component={SettingsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';

// Create Stack and Drawer Navigators
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Stack Navigator for Home
function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

// Drawer Navigator
function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStack} />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;