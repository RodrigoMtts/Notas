import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


import Home from './src/pages/Home'
import NewNote from './src/pages/NewNote'
import Edit from './src/pages/Edit'
import Archived from './src/pages/Archived'
import Camera from './src/components/Camera';

const Drawer = createDrawerNavigator();


export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Início" component={Home} />
          <Drawer.Screen name="Nova Nota" component={NewNote} />
          <Drawer.Screen name="Editar" component={Edit} />
          <Drawer.Screen name="Arquivados" component={Archived} />
          <Drawer.Screen name="Camera" component={Camera} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}