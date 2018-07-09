
import React, { Component } from 'react'
import PLANTDATA from '../../../test-data/plants'
import { View, Image, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Header, Button, SearchBar, ListItem } from 'react-native-elements';
import {Plant} from '../presentation'


class List extends Component {


  _renderPlants = () => {

    const plants = (this.props.plants).map((plant, i) => {
      console.log(plant);
      return (
        <Plant
        key={i}
        name={plant.name}
        image={plant.image}
        description={plant.description}
        />
      
      );
    });
    return plants
  }

  _returnKey(item){
  return item.toString()
}

  render () {
    return (

    <FlatList
      data={this.props.plants}
      keyExtractor={this._returnKey}
      renderItem={() => this._renderPlants() }
      />
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
