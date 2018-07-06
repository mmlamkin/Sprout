import React, { Component } from 'react'
import { View, Image, Text, Button, ScrollView  } from 'react-native';


class Garden extends Component {
  static navigationOptions = {
    header: null
  };

  render () {

    return (
      <View>
        <Text>Your Plants</Text>
      </View>
    );
  }
}

export default Garden;
