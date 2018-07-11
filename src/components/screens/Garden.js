import React, { Component } from 'react'
import { View, Image, Text, ScrollView, StyleSheet  } from 'react-native';
import { Header, Button, SearchBar } from 'react-native-elements';
import { List } from "../containers";
import PlantView from './PlantView';
import axios from 'axios';
import Config from '../../../env'


class Garden extends Component {
  constructor() {
  super()
  this.state = {
    plants: []
  }
}

static navigationOptions = {
    title: 'Sprout',
    headerStyle: {
      backgroundColor: "#12e539",
    },
    headerTintColor: '#fff',

    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: "center"
    },
  };

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/users/1/gardens`)
     .then((response) => {
       this.setState({plants: response.data.plants})
     })
     .catch((error) => {
       alert(error)
       console.error(error);
     });

   }
   showPlant = () => this.props.navigation.navigate('PlantView')

   render(){

     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>

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
         />
         </View>

     )
   }
 }

  export default Garden;

  const styles = StyleSheet.create({

  containerStyle: {
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,
  alignItems: 'center'
  },

  });
