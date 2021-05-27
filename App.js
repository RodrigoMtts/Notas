import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/pages/Home/Index'
import CameraScreen from './src/pages/CameraScreen/index'

const Drawer = createDrawerNavigator();


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="CameraScreen" component={CameraScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}