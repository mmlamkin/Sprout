
import React, { Component } from 'react'
import PLANTDATA from '../test-data/plants'
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { Header, Button, SearchBar, ListItem } from 'react-native-elements';
import Organizer from './Organizer'
import Plant from './Plant'
import { createStackNavigator,} from 'react-navigation';

class List extends Component {
  static navigationOptions = {
    header: null
  };

  renderPlants = () => {
    const plantLibrary = PLANTDATA.map((plant, i) => {

      return (

          <ListItem
          key={i}
          left_avatar={{ source: { uri: plant.image } }}
          title={plant.name}
          subtitle={plant.care}
          onPress={() =>
          navigate('Plant', { name: 'Jane' })
          }
          />

      );
    });

    return plantLibrary
  }

  render () {
    const { navigate } = this.props.navigation;

    return (
    <View>
    <Header style={styles.header_style}
    leftComponent={{ icon: 'home', color: '#fff' }}
    centerComponent={{ text: 'Sprout', style: { color: '#fff' } }}  />
    <View>{this.renderPlants()}</View>
    </View>
    );
  }
}


export default Organizer(List);

const styles = StyleSheet.create({

  header_style: {
  width: '100%',
  height: 45,
  backgroundColor: '#00BCD4',
  alignItems: 'center',
  position: "absolute",
},

});
