import React, {Component} from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import { Header, SearchBar } from 'react-native-elements'
import { List } from "../containers"
import axios from 'axios';
import { createStackNavigator} from  'react-navigation';
import PlantView from './PlantView';
import Config from '../../../env';
import config from "../../config";

class BrowseView extends Component {
  constructor() {
  super()
  this.state = {
    query: '',
    plants: []
  }
}

static navigationOptions = {
    headerTitle: (
      <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 35 + '%'}}>
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
  };

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/plants`)
     .then((response) => {
       this.setState({plants: response.data})
     })
     .catch((error) => {
       alert(error.errors)
       console.error(error);
     });

   }

    handleQueryChange = query =>
      this.setState(state => ({ ...state, query: query || "" }));

    handleSearchCancel = () =>   this.handleQueryChange("");

    handleSearchClear = () => this.handleQueryChange("");

  showPlant = () =>   this.props.navigation.navigate('PlantView')

  render(){
    console.log(this.state.query);
    return(
      <View style={{flex: 1, width: 100 + "%", height: 100 + "%", backgroundColor: 'white'}}>

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
          garden={false}
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
