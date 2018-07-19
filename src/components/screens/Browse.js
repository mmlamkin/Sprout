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
         // console.log(event);
         let my_id = 0
         event.forEach(function(calendar) {
           // console.log(calendar);
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

     let today = new Date()
     let year = today.getFullYear().toString()
     let nextYear = (parseInt(year) + 1).toString()

     let startdate = Date.parse(`april 1 ${nextYear} 12:00`)
     let enddate = Date.parse(`april 1 ${nextYear} 1:00`)
     let startNotes = `Time to think about planting the ${name} in your garden!`
     // console.log(Date.prototype.toDateString(startdate));
     if (early_dates) {
       let early_date1 = Date.parse(`${early_dates.split('-')[0]} ${year} 12:00`)
       let early_date2 = Date.parse(`${early_dates.split('-')[1]} ${year} 12:00`)
       // late_date1 = late_dates.split('-')[0]
       // late_date2 = late_dates.split('-')[1]

       if (early_date1 > today) {
         startdate = early_date1
         enddate = early_date1
         startNotes = `Time to think about planting the ${name} in your garden!`
       }
       else {
         startdate = early_date2
         enddate = early_date2
         startNotes = `The time has come to plant the ${name} in your garden!`
       }
     }
     // else {
     //   if (today < new Date(`${year} april 1 12:00`)) {
     //     let nextYear = (year.parseInt() + 1).toString()
     //     let startdate = new Date(`${nextYear} april 1 12:00`)
     //     let enddate = new Date(`${nextYear} april 1 12:00`).addHours(1)
     //     let startNotes = `Time to think about planting the ${name} in your garden!`
     //   }


     let plantingDetails = {
       title: `Plant your ${name}!`,
       startDate: startdate,
       endDate: enddate,
       timeZone: 'PST',
       notes: startNotes
     }
     console.log(plantingDetails);
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
