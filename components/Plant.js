import React, { Component } from 'react'
import { View, Image, Text, Button  } from 'react-native';


class Plant extends Component {


  render () {

    return (
      <View>
        <Image source={{uri: this.props.image}} />
        <Text>{this.props.name}</Text>
      </View>
    );
  }
}

export default Plant;
