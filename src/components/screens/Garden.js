import React, { Component } from 'react'
import { View, Image, Text, ScrollView, StyleSheet  } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { List } from "../containers";
import PlantView from './PlantView';
import axios from 'axios';
import Config from '../../../env';
import config from "../../config";
import SearchBar from 'react-native-searchbar'


class Garden extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    user_id: 0,
    results: []
  }
  this._handleResults = this._handleResults.bind(this);
}

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/users/1/gardens`)
     .then((response) => {
       this.setState({plants: response.data.plants})
     })
     .catch((error) => {
       alert(error.errors)
       console.log(error);
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

   render(){
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
           showOnLoad
         />

         <List
           showPlant={this.showPlant} plants={this.state.results}
           garden={false}
         />
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
           garden={false}
         />
         </View>

     )
   }
 }

  export default Garden;
