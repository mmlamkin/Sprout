
import React from 'react';
import { View } from 'react-native';
import Sprout from './src/components/Sprout';
import {Font} from 'expo';
import FlashMessage from "react-native-flash-message";


export default class App extends React.Component {

  render() {

    return (
      <View style={{flex: 1}}>
        <Sprout />
        <FlashMessage position="center" />
      </View>
    );
  }
}
