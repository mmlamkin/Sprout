import React, { Component } from 'react'
import { View, Image, Text, ScrollView, StyleSheet  } from 'react-native';
import { Header, Button, SearchBar } from 'react-native-elements';


class Garden extends Component {
  static navigationOptions = {
    header: null
  };

  render () {

    return (
      <View>
      <Header style={styles.header_style}
        leftComponent={{ icon: 'home', color: '#fff' }}
        centerComponent={{ text: 'Sprout', style: { color: '#fff' } }}
        rightComponent={{icon: 'home', color: '#fff'}} />
        <Text>Your Plants</Text>
      </View>
    );
  }
}

export default Garden;
const styles = StyleSheet.create({

  header_style: {
    width: '100%',
  height: 45,
  backgroundColor: '#00BCD4',
  alignItems: 'center',
  position: "absolute",
}

});
