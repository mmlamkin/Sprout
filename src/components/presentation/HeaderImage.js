import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, Header } from 'react-native';
import config from "../../config";




const ImageHeader = props => (
  <View style={{ backgroundColor: '#eee' }}>
    <Image
      style={StyleSheet.absoluteFill}
      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}
    />
    <Header {...props} style={{ backgroundColor: 'transparent' }}/>
  </View>
);



export default ImageHeader;
