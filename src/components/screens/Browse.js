import React, {Component} from 'react'
import { View, ImageBackground, Image, Text} from 'react-native'
import { List } from "../containers"
import axios from 'axios';
import { createStackNavigator, Header} from  'react-navigation';
import PlantView from './PlantView';
import Config from '../../../env';
import config from "../../config";
import SearchBar from 'react-native-searchbar';
import globalState from '../../GlobalState';
import { Expo, Constants, Calendar, Permissions} from 'expo';
import { showMessage } from "react-native-flash-message";

class BrowseView extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    results: [],
    events: [],
  }
   this._handleResults = this._handleResults.bind(this);
   this.accessCalendars = this.accessCalendars.bind(this);
}

static navigationOptions = {
    headerTitle: (
      <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 33 + '%'}}>
      <Image style={{height: 30,
        width: 30}}
        source = {config.images.sproutLittle}/><Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8, color: 'white', fontFamily: 'sans-serif'}}>Sprout</Text>
        </View>
      ),
      headerStyle: {
        backgroundColor: "#077187",
        maxHeight: 90
      },

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
       showMessage({
         message: error.response.data.errors,
         type: "danger",
         floating: true
       })
     });
   }

   async accessCalendars() {

     const { status } = await Permissions.askAsync(Permissions.CALENDAR);
     if (status === 'granted') {
       this.allCalendars();}
      else {
        showMessage({
          message: "Could not access calendars",
          type: "danger",
          floating: true
        })
      }
    }

   allCalendars = () => {

     Calendar.getCalendarsAsync()
       .then( event => {

         let my_id = 0
         event.forEach(function(calendar) {

          if(calendar.accessLevel == "owner") {
            my_id = calendar.id
          }
        })
        globalState.calendar_id = my_id
       })
       .catch( error => {
         showMessage({
           message: "Could not find your calendar",
           type: "danger",
           floating: true
         })
       });
   }


   addToCalendar = (name, early_dates, late_dates) => {

     let today = new Date()
     let year = today.getFullYear().toString()
     let nextYear = (parseInt(year) + 1).toString()

     let startdate = Date.parse(`april 1 ${nextYear} 9:00`)
     let enddate = Date.parse(`april 1 ${nextYear} 9:00`)
     let startNotes = `Right around now is the best time to plant your ${name} in your garden! Double check care on your app and check your local weather!`

     if (early_dates) {
       let early_date1 = Date.parse(`${early_dates.split('-')[0]} ${year} 9:00`)
       let early_date2 = Date.parse(`${early_dates.split('-')[1]} ${year} 9:00`)
       // let late_date1 = Date.parse(`${late_dates.split('-')[0]} ${year} 12:00`)
       // let late_date2 = Date.parse(`${late_dates.split('-')[1]} ${year} 12:00`)

       if (early_date1 > today) {
         startdate = early_date1
         enddate = early_date1

       }
       else {
         startdate = early_date2
         enddate = early_date2
       }
     }

     let plantingDetails = {
       title: `Plant your ${name}!`,
       startDate: startdate,
       endDate: enddate,
       timeZone: 'PST',
       notes: startNotes
     }
     if (globalState.calendar_id) {
       Calendar.createEventAsync(globalState.calendar_id, plantingDetails)
         .then( event => {
           showMessage({
             message: `${name} added to your calendar`,
             type: "success",
             floating: true
           });
         })
         .catch( error => {
           showMessage({
             message: `Could not add ${name} to your calendar`,
             type: "danger",
             floating: true
           })
       })}
      else {
        showMessage({
          message: `Could not add ${name} to your calendar without calendar access`,
          type: "danger",
          floating: true
      })
    }
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

    return (
      <ImageBackground source={{uri: 'https://img.clipartxtras.com/f2caff2e59f0a644fb39e936bfa9a98e_drawn-fruit-fruit-vegetable-pencil-and-in-color-drawn-fruit-fruits-and-vegetables-background-drawing_1300-1390.jpeg'}} style={{width: '100%', height: '100%'}}>
        {results.length > 0 ? this.renderResults() : this.renderFullList()}
      </ImageBackground>
    )

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
          focusOnLayout={false}
          heightAdjust={-2}
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
          focusOnLayout={false}
          heightAdjust={-2}
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
