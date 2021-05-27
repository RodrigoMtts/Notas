import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/pages/Home'
import NewNote from './src/pages/NewNote'

const Drawer = createDrawerNavigator();


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Início" component={Home} />
          <Drawer.Screen name="Nova Nota" component={NewNote} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}