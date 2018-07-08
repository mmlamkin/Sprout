
import React, { Component } from 'react'
import PLANTDATA from '../../../test-data/plants'
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { Header, Button, SearchBar, ListItem } from 'react-native-elements';
import Plant from '../presentation'


class List extends Component {


  renderPlants = () => {

    const plants = PLANTDATA.map((plant, i) => {

      return (
        <Plant
        key={i}
        name={plant.name}
        image={plant.image}
        description={plant.maintenance}
        />

      );
    });

    return plants
  }


  render () {
    return (
    <ScrollView >
    <View contentContainerStyle={styles.containerStyle}>
      {this.renderPlants()}
      </View>
    </ScrollView>
    );
  }
}


export default List;

const styles = StyleSheet.create({

  containerStyle: {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,
  alignItems: 'center'
},

});
