import React, { Component } from 'react'
import { View, StyleSheet, Text  } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { List } from "../containers";
import PlantView from './PlantView';
import axios from 'axios';
import Config from '../../../env';
import config from "../../config";
import SearchBar from 'react-native-searchbar';


class Garden extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    user_id: 0,
    results: [],
    garden_id: 0
  }
  this._handleResults = this._handleResults.bind(this);
}

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/users/1/gardens`)
     .then((response) => {
       this.setState({plants: response.data.plants, garden_id: response.data.garden_id})
     })
     .catch((error) => {
       alert(error.errors)
     });

   }

   showPlant = (single_plant_id) => this.props.navigation.navigate('PlantView', {single_plant_id: single_plant_id})

   _handleResults(results) {
     this.setState({ results });
   }

  _handleClear() {
    this.setState({
      results: [] });
    }

    clearGarden() {
      const url = `http://${Config.PLANTS_API}/users/` + 1 + '/gardens/' + this.state.garden_id
      axios.delete(url)
      .then(function (response) {
        alert('Garden Cleared')
        this.setState({plants: response.data.plants})
      })
      .catch(function (error) {
        alert(error.errors)
      });
    }

    render(){
      const gardenPlants = this.state.plants

      return gardenPlants.length > 0 ? this.renderPlants() : this.renderNone()

    }

    renderPlants(){
      const results = this.state.results

      return results.length > 0 ? this.renderResults() : this.renderFullList()

    }


   renderResults(){
     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%", backgroundColor: 'white'}}>
         <SearchBar
           ref={(ref) => this.searchBar = ref}
           data={this.state.plants}
           handleResults={this._handleResults}
           onClear={this._handleClear}

         />

         <List
           showPlant={this.showPlant} plants={this.state.results}
           garden={true}
         />

         <Button title='Clear Garden'
       containerStyle={{fontSize: 2, marginTop: 20}}
       buttonStyle={styles.button}
       onPress={() =>
        this.clearGarden()
      }/>
         </View>

     )
   }
   renderFullList(){
     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%", backgroundColor: 'white'}}>
         <SearchBar
           ref={(ref) => this.searchBar = ref}
           data={this.state.plants}
           handleResults={this._handleResults}
           showOnLoad
         />

         <List
           showPlant={this.showPlant} plants={this.state.plants}
           garden={true}
         />

         <Button title='Clear Garden'
       containerStyle={{fontSize: 2, marginTop: 20}}
       buttonStyle={styles.button}
       onPress={() =>
        this.clearGarden()
      }/>
         </View>

     )
   }

   renderNone(){
     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%", backgroundColor: 'white', justifyContent: "center", alignItems: "center"}}>
          <Text>No Plants in your Garden Yet!</Text>
          <List
            garden={true}
          />
        </View>

     )
   }
 }

  export default Garden;

  const styles = StyleSheet.create({
  button: {backgroundColor: '#C71585',
  width: 60,
  height: 20,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 25,
  justifyContent: "center", alignItems: "center"}
  });
