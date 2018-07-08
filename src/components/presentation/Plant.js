import React, { Component } from 'react'
import { View, Image, Text, Button  } from 'react-native';


class Plant extends Component {


  render () {

    return (
      <View>
        <Image style={{width: 80 + "%", height: 50}} source={{uri: this.props.image}} />
        <Text>{this.props.name}</Text>
        <Text>{this.props.description}</Text>

      </View>
    );
  }
}

export default Plant;
