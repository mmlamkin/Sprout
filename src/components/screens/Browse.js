import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, TextInput, ListView } from 'react-native'
import { Button, Header, SearchBar } from 'react-native-elements'
import { List } from "../containers"
import PLANTDATA from '../../../test-data/plants'
import axios from 'axios';
import { createStackNavigator} from  'react-navigation';
import PlantView from './PlantView';
import Config from '../../../env'



class BrowseView extends Component {
  constructor() {
  super()
  this.state = {
    query: '',
    plants: []
  }
}

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/plants`)
     .then((response) => {
       this.setState({plants: response.data})
     })
     .catch((error) => {
       console.error(error);
     });
     //console.log(this.state.plants);
   }



    handleQueryChange = query =>
        this.setState(state => ({ ...state, query: query || "" }));

    handleSearchCancel = () =>   this.handleQueryChange("");

    handleSearchClear = () => this.handleQueryChange("");

  showPlant = () => this.props.navigation.navigate('PlantView')

  render(){

    return(
      <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>
      <Header style={styles.header_style}
        leftComponent={{ icon: 'home', color: '#fff' }}
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
        />
      </View>
    )
  }
}

export default createStackNavigator(
  {
    Browse: BrowseView,
    PlantView: PlantView,
  },
  {
    initialRouteName: 'Browse',
  }
);



const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10
  },
  searchText: {
    flex: 1
  },
  searchButton: {
    height: 30,
  },
  header_style: {
    backgroundColor: '#8FD65C'
  }
})
