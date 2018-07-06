import React, { Component } from 'react'
import { View, Image, Text, StyleSheet  } from 'react-native';
import { Header, Button, SearchBar, ListItem } from 'react-native-elements';
import HomeNavigation from './HomeNavigation'

class HomeScreen extends Component {
  static navigationOptions = {
    header: null
  };

  render () {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <Header style={styles.header_style}
          leftComponent={{ icon: 'home', color: '#fff' }}
          centerComponent={{ text: 'Sprout', style: { color: '#fff' } }}
          rightComponent={<SearchBar />} />

          <View style={styles.buttons}>
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

        </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'stretch',
    // justifyContent: 'space-around',
  },
  header_style: {
    width: '100%',
  height: 45,
  backgroundColor: '#00BCD4',
  alignItems: 'center',
  position: "absolute",
},
  buttons: {
    flex: .5,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'space-around',

  },
});
