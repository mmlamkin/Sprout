
import React, { Component } from 'react'
import PLANTDATA from '../test-data/plants'
import { View, Image, Text, ScrollView } from 'react-native';
import Organizer from './Organizer'
import Plant from './Plant'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: [PLANTDATA]};
  }

  renderPlants = () => {
    const plantLibrary = this.state.plants.map((plant) => {

      return (
          <Plant
          image={plant.image}
          name={plant.name}
          height={plant.height}
          maintenance={plant.maintenance}
          />

      );
    });

    return plantLibrary
  }

  render () {

    return (
      
      <ScrollView>{this.renderPlants()}</ScrollView>
    );
  }
}


export default Organizer(List);
