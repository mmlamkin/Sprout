import React, { Component } from 'react'
import { Garden, Login, Browse} from './screens'
import { createBottomTabNavigator, createSwitchNavigator} from  'react-navigation'


const Tabs = createBottomTabNavigator({
  Browse: Browse,
  Garden: Garden

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
