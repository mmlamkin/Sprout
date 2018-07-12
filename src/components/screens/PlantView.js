import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import PLANTDATA from '../../../test-data/plants'
import config from "../../config"
import { Header } from 'react-native-elements';
import { Col, Row, Grid } from "react-native-easy-grid";


class PlantView extends Component {
  constructor() {
  super()
  this.state = {
    query: '',
    plant: PLANTDATA[0]
  }
}

  render(){

    return(

      <ScrollView >
      <View style={styles.outerContainer}>
        <Text style={{fontSize: 15}}>Everything you need to know about...</Text>
        <Text style={{marginBottom: 15, fontSize: 20, marginTop: 15, fontWeight: 'bold'}}>{this.state.plant.name}</Text>
        <Image style={styles.imageStyle} source={{uri: "https:" + this.state.plant.image}} />

        <View style={styles.middleContainer}>

          <Text><Image style={{height: 35,
            width: 35}}
            source = {config.images.sun}/> {this.state.plant.optimal_sun}</Text>
          <Text><Image style={{height: 35,
            width: 35}}
            source = {config.images.plant}/> {this.state.plant.optimal_soil} soil</Text>
        </View>
        <Text>{this.state.plant.description}</Text>
    
        <Text>{this.state.plant.when_to_plant} {this.state.plant.growing_from_seed} {this.state.plant.spacing}</Text>
        <Text>**{this.state.plant.planting_considerations}**</Text>
        <Text style={{fontWeight: 'bold'}}>Watering:</Text><Text> {this.state.plant.watering}</Text>
        <Text style={{fontWeight: 'bold'}}>Harvesting:</Text><Text> {this.state.plant.harvesting}</Text>
        <Text style={{fontWeight: 'bold'}}>Other Fun Stuff:</Text><Text> {this.state.plant.other_care}</Text>
        </View>
      </ScrollView>

    )
  }
}

export default PlantView
const styles = StyleSheet.create({

  imageStyle: {
  width: 50 + "%",
  height: 250,
  paddingLeft: 10,
  paddingRight: 10,
  marginBottom: 15,
  paddingTop: 10,
},
outerContainer: {
  flex: 1,
  width: 100 + "%",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 15,
  paddingRight:40,
  paddingBottom: 80,
  backgroundColor: 'white',
  borderRadius: 4,
  borderWidth: 5,
  borderColor: '#ef7d73',


},
summaryContainer: {
  flexDirection: "column",
  width: 45 + "%"
},
middleContainer: {
  justifyContent: "center",

}
});
