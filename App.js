import React from 'react';
import Plant from './components/Plant'
import Garden from './components/Garden'
import HomeScreen from './components/HomeScreen'
import List from './components/List'
import { StyleSheet, Text, View, Button } from 'react-native';
import { Route, Link } from 'react-router-native';
import { createStackNavigator, createMaterialTopNavigator } from 'react-navigation';

const App = createStackNavigator({

  Home: { screen: HomeScreen},
  Garden: { screen: Garden },
  Browse: { screen: List },
  Plant: { screen: Plant}
},
{ headerMode: 'screen' });

export default App;
