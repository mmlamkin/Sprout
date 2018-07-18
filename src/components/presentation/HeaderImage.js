import React, { Component } from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import config from "../../config";
import axios from 'axios';


class HeaderImage extends Component {


  render () {

    return (
      <View>
        <Image style={{height: 30,
          width: 30}}
          source = {config.images.sproutLittle}/>
          <Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8, color: '#fff'}}>Sprout</Text>
      </View>
    );
  }
}

export default HeaderImage;
