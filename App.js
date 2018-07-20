
import React from 'react';
import { View } from 'react-native';
import Sprout from './src/components/Sprout';
import {Font} from 'expo'

export default class App extends React.Component {
  componentDidMount() {
   Font.loadAsync({
     'Acme': require('./assets/fonts/Acme-Regular.ttf'),
   });
 }

  render() {

    return (

        <Sprout />
    );
  }
}
