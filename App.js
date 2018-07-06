import React from 'react';
import Plant from './components/Plant'
import Garden from './components/Garden'
import HomeScreen from './components/HomeScreen'
import List from './components/List'
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeRouter, Route, Link } from 'react-router-native';
import { createStackNavigator,} from 'react-navigation';

const App = createStackNavigator({

  Home: { screen: HomeScreen},
  Garden: { screen: Garden },
  Browse: { screen: List },
},
{ headerMode: 'screen' });

export default App;
