import React, { Component } from 'react'
import Plant from './presentation'
import { Garden, Login, Browse, PlantView} from './screens'
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator} from 'react-navigation'

const Tabs = createBottomTabNavigator({
  Browse: Browse,
  Garden: Garden,
  Plant: PlantView
})

const MainStack = createSwitchNavigator({
  login: Login,
  main: Tabs
})

class Sprout extends Component {

  render(){

    return(
      <MainStack />
    )
  }
}

export default Sprout
