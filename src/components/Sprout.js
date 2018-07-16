import React, { Component } from 'react';
import { Garden, Login, Browse} from './screens';
import { createBottomTabNavigator, createSwitchNavigator} from  'react-navigation';
import config from "../config";
import { Image } from 'react-native';


const Tabs = createBottomTabNavigator({
  Browse: {
    screen: Browse,
    navigationOptions: {
      title: 'Browse',
      tabBarLabel: 'Browse',
      tabBarIcon:  <Image style={{height: 32,
          width: 32}}
          source = {config.images.browse}

          />
    }},
  Garden: {
   screen: Garden,
  navigationOptions: {
    title: 'Garden',
    tabBarLabel: 'My Garden',
    tabBarIcon:  <Image style={{height: 32,
        width: 32}}
        source = {config.images.garden}

        />
  }},

})


const MainStack = createSwitchNavigator({
  login: Login,
  main: Tabs,

})

class Sprout extends Component {

  render(){

    return(
      <MainStack />
    )
  }
}

export default Sprout
