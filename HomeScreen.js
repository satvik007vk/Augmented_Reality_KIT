// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to About"
        onPress={() => navigation.navigate('About')}
      />
      <Button
        title="Go to Contact"
        onPress={() => navigation.navigate('Contact')}
      />
      <Button
        title="Open Drawer"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;