import React, { Component } from 'react'
import { View, Image, Text, ScrollView, StyleSheet  } from 'react-native';
import { Header, Button, SearchBar } from 'react-native-elements';
import { List } from "../containers";
import PlantView from './PlantView';
import axios from 'axios';
import Config from '../../../env';
import config from "../../config";


class Garden extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    user_id: 0
  }
}

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/users/1/gardens`)
     .then((response) => {
       this.setState({plants: response.data.plants})
     })
     .catch((error) => {
       alert(error.errors)
       console.error(error);
     });

   }

   showPlant = (single_plant_id) => this.props.navigation.navigate('PlantView', single_plant_id)


   render(){

     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>

        <Header
          backgroundColor="#8b81f1"

          centerComponent={{ text: 'Sprout', style: { color: '#fff' } }}

        />

         <SearchBar
           lightTheme
           onChangeText={this.handleQueryChange}
           onClear={this.handleSearchClear}
           onCancel={this.handleSearchCancel}
           value={this.state.query}
           icon={{ type: 'font-awesome', name: 'search' }}
           placeholder='Search Plants...'
           />
          <List
            showPlant={this.showPlant} plants={this.state.plants}
            garden={true}
          />
         </View>

     )
   }
 }

  export default Garden;
