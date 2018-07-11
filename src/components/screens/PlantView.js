import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import PLANTDATA from '../../../test-data/plants'
import config from "../../config"
import { Header } from 'react-native-elements';


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
        <Text style={{marginBottom: 15, fontSize: 20, marginTop: 15}}>{this.state.plant.name}</Text>
        <Image style={styles.imageStyle} source={{uri: "https:" + this.state.plant.image}} />
        <Text>{this.state.plant.description}</Text>
        <View>
          <Text><Image style={{height: 35,
            width: 35}}
            source = {config.images.sun}/> {this.state.plant.optimal_sun}</Text>
          <Text><Image style={{height: 35,
            width: 35}}
            source = {config.images.plant}/> {this.state.plant.optimal_soil} soil</Text>
        </View>
        <Text>{this.state.plant.planting_considerations}</Text>
        <Text>{this.state.plant.when_to_plant} {this.state.plant.growing_from_seed} {this.state.plant.spacing}</Text>
        <Text>Watering: {this.state.plant.watering}</Text>
        <Text>Harvesting: {this.state.plant.harvesting}</Text>
        <Text>TMI: {this.state.plant.other_care}</Text>
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
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 15,
  marginTop: 10,
},
outerContainer: {
  flex: 1,
  width: 100 + "%",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 15,
  marginRight:40,
  marginBottom: 100,
  borderColor: 'black'
},
summaryContainer: {
  flexDirection: "column",
  width: 45 + "%"
}
});
