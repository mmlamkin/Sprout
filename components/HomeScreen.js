import React, { Component } from 'react'
import { View, Image, Text, Button  } from 'react-native';
import { SearchBar } from 'react-native-elements'
import { Header } from 'react-native-elements'

class HomeScreen extends Component {
  static navigationOptions = {
  };

  render () {

    const { navigate } = this.props.navigation;

    return (
      <View style={{flex: 1}}>
        <Header
          leftComponent={{ icon: 'home', color: '#fff' }}
          centerComponent={{ text: 'Sprout', style: { color: '#fff' } }}
          rightComponent={{icon }}


        <Button
        title="Your Garden"
        onPress={() =>
         navigate('Profile', { name: 'Jane' })
        }
        />

        <Button
        title="Browse Plants"
        onPress={() =>
        navigate('Browse', { name: 'Jane' })
        }
        />
        </View>
    );
  }
}

export default HomeScreen;
