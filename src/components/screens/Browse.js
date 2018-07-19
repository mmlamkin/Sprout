import React, {Component} from 'react'
import { View, StyleSheet, Image, Text} from 'react-native'
import { List } from "../containers"
import axios from 'axios';
import { createStackNavigator} from  'react-navigation';
import PlantView from './PlantView';
import Config from '../../../env';
import config from "../../config";
import SearchBar from 'react-native-searchbar';
import globalState from '../../GlobalState';
import { Expo, Constants, Calendar, Permissions} from 'expo';


class BrowseView extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    results: [],
    events: []
  }
   this._handleResults = this._handleResults.bind(this);
   this.accessCalendars = this.accessCalendars.bind(this);
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
    this.accessCalendars()
    axios.get(`http://${Config.PLANTS_API}/plants`)

     .then((response) => {
       this.setState({plants: response.data})
     })
     .catch((error) => {
       alert("Could not load plants!")
       console.log(error);
     });
   }

   async accessCalendars() {

     const { status } = await Permissions.askAsync(Permissions.CALENDAR);
     if (status === 'granted') {
       this.allCalendars();}
      else {
        console.log();('permission not granted');
      }
    }

   allCalendars = () => {

     Calendar.getCalendarsAsync()
       .then( event => {
         console.log(event);
         let my_id = 0
         event.forEach(function(calendar) {
           console.log(calendar);
          if(calendar.accessLevel == "owner") {
            my_id = calendar.id
          }
        })
        globalState.calendar_id = my_id
       })
       .catch( error => {
         console.log((error));
       });
   }

   addToCalendar = (name, early_dates, late_dates) => {
     alert("ADD TO CALENDAR BROWSE");
     let plantingDetails = {
       title: `Plant your ${name}!`,
       startDate: new Date('July 19, 2018, 12:00:00'),
       endDate: new Date('July 19, 2018, 13:00:00'),
       timeZone: 'PST',
       notes: `Time to think about planting the ${name} in your garden!`
     }

     Calendar.createEventAsync(globalState.calendar_id, plantingDetails)
       .then( event => {
        alert('added to calendar')
       })
       .catch( error => {
         console.log((error));
       });
   }

    _handleResults(results) {
      this.setState({ results });
    }
    _handleClear() {
      this.setState({
      results: [] });
    }

    showPlant = (single_plant_id) =>          this.props.navigation.navigate('PlantView', {single_plant_id: single_plant_id})

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
          addToCalendar={this.addToCalendar}
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
