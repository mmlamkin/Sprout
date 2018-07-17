import React, {Component} from 'react'
import { View, StyleSheet, Image, Text} from 'react-native'
import { List } from "../containers"
import axios from 'axios';
import { createStackNavigator} from  'react-navigation';
import PlantView from './PlantView';
import Config from '../../../env';
import config from "../../config";
import SearchBar from 'react-native-searchbar';

class BrowseView extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    results: []
  }
   this._handleResults = this._handleResults.bind(this);
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
       alert("Could not load plants!")
     });

   }

    _handleResults(results) {
  this.setState({ results });
  }
  _handleClear() {
    this.setState({
      results: [] });
    }

  showPlant = (single_plant_id) =>   this.props.navigation.navigate('PlantView', {single_plant_id: single_plant_id})

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

export default createStackNavigator(
  {
    Browse: BrowseView,
    PlantView: PlantView,
  },
  {
    initialRouteName: 'Browse',
  }
);
