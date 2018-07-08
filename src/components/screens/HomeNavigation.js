import React, { Component } from 'react'
import { View, Image, Text, StyleSheet  } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Header } from 'react-native-elements';
import { Button } from 'react-native-elements';

class HomeNavigation extends Component {
  static navigationOptions = {
    header: null
  };

  render () {


    return (
      <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>

        <Button
        title="Your Garden"
        onPress={() =>
         navigate('Garden')
        }
        buttonStyle={{
          backgroundColor: "green",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 10
        }}
        />

        <Button
        title="Browse Plants"
        onPress={() =>
        navigate('Browse', { name: 'Jane' })
        }
        buttonStyle={{
          backgroundColor: "green",
          width: 300,
          height: 45,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 10
        }}
        />
        </View>
    );
  }
}

export default HomeNavigation;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'stretch',
//     // justifyContent: 'space-around',
//   },
//   header_style: {
//     width: '100%',
//   height: 45,
//   backgroundColor: '#00BCD4',
//   alignItems: 'center',
//   position: "absolute",
//   }
// });
