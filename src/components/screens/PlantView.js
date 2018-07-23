import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native'
import config from "../../config"
import axios from 'axios';
import Config from '../../../env';


class PlantView extends Component {
  constructor(props) {
    super(props)
    this.state =  {
      plant: null,
      loading: true
    };
    this.getPlant()
  }

  static navigationOptions = {
    headerTitle: (
      <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 20 + '%'}}>
      <Image style={{height: 30,
        width: 30}}
        source = {config.images.sproutLittle}/><Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8, color: '#fff'}}>Sprout</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#8b81f1",
        maxHeight: 90
      },
      headerTintColor: '#fff',

      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: "center"
      },
}

  optimalSoil = () => {
    if (this.state.plant.optimal_soil) {
      return (<Text><Image style={{height: 35,
        width: 35}}
        source = {config.images.plant}/> {this.state.plant.optimal_soil} soil</Text>)
    }
    else {
    return (<Text><Image style={{height: 35,
      width: 35}}
      source = {config.images.plant}/> No special soil needs</Text>)
    }
  }

  getPlant = () => {

   axios.get(`http://${Config.PLANTS_API}/plants/` + this.props.navigation.getParam('single_plant_id'))

   .then((response) => {
     this.setState({plant: response.data, loading: false})
   })
   .catch((error) => {
     alert(error.errors + "get plant errors")
   });
 }

  render(){
    const loading = this.state.loading

    return loading ? <Text>Loading...</Text> : this.renderPage()

  }

  renderPage(){

    return(
      <ImageBackground source={{uri: 'https://images.pexels.com/photos/41324/background-close-up-flora-fresh-41324.jpeg?auto=compress&cs=tinysrgb&h=350'}} style={{width: '100%', height: '100%'}}>
      <ScrollView >
        <View style={styles.outerContainer}>
          <Text style={{fontSize: 15}}>Everything you need to know about...</Text>
          <Text style={{marginBottom: 15, fontSize: 20, marginTop: 15, fontWeight: 'bold'}}>{this.state.plant.name}</Text>
          <Image style={styles.imageStyle} source={{uri: "https:" + this.state.plant.image}} />

          <View style={styles.middleContainer}>

            <Text><Image style={{height: 35,
              width: 35}}
              source = {config.images.sun}/> {this.state.plant.optimal_sun}</Text>
              {this.optimalSoil()}
          </View>

          <View style={{backgroundColor: 'white'}}>
          <Text style={{marginHorizontal: 5}}>{this.state.plant.description}</Text>

          <Text style={{marginHorizontal: 5}}>{this.state.plant.when_to_plant} {this.state.plant.growing_from_seed} {this.state.plant.spacing}</Text>
          <Text style={{marginHorizontal: 5}}>**{this.state.plant.planting_considerations}**  </Text>
          </View>

          <View style={{backgroundColor: 'white'}}>
          <Text style={{fontWeight:   'bold', alignSelf: 'center'}}>Watering:</Text><Text style={{marginHorizontal: 5}}> {this.state.plant.watering}</Text>
          </View>

          <View style={{backgroundColor: 'white'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Harvesting:</Text><Text style={{marginHorizontal: 5}}> {this.state.plant.harvesting}</Text>
          </View>

          <View style={{backgroundColor: 'white'}}>
          <Text style={{fontWeight: 'bold', alignSelf: 'center'}}>Other Fun  Stuff:</Text><Text style={{marginHorizontal: 5}}> {this.state.plant.other_care}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>

    )
  }
}

export default PlantView
const styles = StyleSheet.create({

  imageStyle: {
  width: 60 + "%",
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
  paddingRight:20,
  paddingBottom: 80,

},

middleContainer: {
  justifyContent: "center",
  backgroundColor: "white"
}
});
