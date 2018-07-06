import React, { Component } from 'react'
import { View, Image, Text, Button  } from 'react-native';


class Plant extends Component {


  render () {

    return (
      <View>
        <Image style={{width: 50, height: 50}} source={{uri: this.props.image}} />
        <Text>{this.props.name}</Text>
        <Text>{this.props.maintenance}</Text>

      </View>
    );
  }
}

export default Plant;
