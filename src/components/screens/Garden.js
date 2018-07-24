import React, { Component } from 'react'
import { View, StyleSheet, Text, Image  } from 'react-native';
import { Button } from 'react-native-elements';
import { List } from "../containers";
import axios from 'axios';
import Config from '../../../env';
import config from "../../config";
import SearchBar from 'react-native-searchbar';
import PlantView from './PlantView';
import { createStackNavigator} from  'react-navigation';
import globalState from '../../GlobalState';
import { Expo, Constants, Calendar, Permissions} from 'expo';
import { showMessage } from "react-native-flash-message";

class Garden extends Component {
  constructor() {
    super()
    this.state = {
      plants: [],
      results: [],
      wateringEvent: '',
      canWater: true
    }
    this._handleResults = this._handleResults.bind(this);
  }

  static navigationOptions = {
      headerTitle: (
        <View style={{justifyContent: 'center', flexDirection: 'row', alignItems: 'center', marginLeft: 33 + '%'}}>
        <Image style={{height: 30,
          width: 30}}
          source = {config.images.sproutLittle}/><Text style={{fontSize: 24, fontWeight: 'bold', paddingLeft: 8, color: '#fff'}}>Sprout</Text>
          </View>
        ),
        headerStyle: {
          backgroundColor: "#8b81f1",
          maxHeight: 90
        },

        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: "center"
        },
    };

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (status: true) => {
      axios.get(`http://${Config.PLANTS_API}/users/${globalState.current_user_id}/gardens`)
        .then((response) => {
          this.setState({plants: response.data.plants, garden_id: response.data.garden_id})
        })
        .catch((error) => {
          showMessage({
            message: error.response.data.errors,
            type: "danger",
            floating: true
          })
        });
    });

   }

    showPlant = (single_plant_id) => {
      this.props.navigation.navigate('PlantView', {single_plant_id: single_plant_id})}

    _handleResults(results) {
        this.setState({ results });
    }

    _handleClear() {
      this.setState({
        results: [] });
    }

    removePlant = (plant_id) => {
      const newPlants = this.state.plants.filter(plant => plant.id !== plant_id)
      this.setState({plants: newPlants})
    }


    clearGarden = () => {
      const url = `http://${Config.PLANTS_API}/users/${globalState.current_user_id}/gardens/` + this.state.garden_id
      axios.delete(url)
      .then((response) => {
        showMessage({
          message: "Garden cleared!",
          type: "success",
          floating: true
        });
        this.setState({plants: response.data.plants})
      })
      .catch((error) => {
        showMessage({
          message: error.response.data.errors,
          type: "danger",
          floating: true
        })
      });
    }


  makeWateringSchedule = () => {
    let today = new Date()
    let year = today.getFullYear().toString()
    let nextYear = (parseInt(year) + 1).toString()
    let start_of_season = Date.parse(`april 1 ${year} 9:00`)
    let end_of_season = Date.parse(`Oct 7 ${year} 9:00`)
    let startDate = today
    let endDate = end_of_season


    if (today > start_of_season && today < end_of_season) {
      startDate = today
      endDate = end_of_season
    }
    else if (today > end_of_season) {
      startDate = Date.parse(`april 1 ${nextYear} 9:00`)
      endDate = Date.parse(`Oct 7 ${nextYear} 9:00`)
    }
    else if (today < start_of_season) {
      startDate = start_of_season
      endDate = end_of_season
    }

    let reminderCount = Math.round((endDate - today)/(60*60*7*1000*24))

    let waterDetails = {
      title: 'Water Your Garden!',
      startDate: startDate,
      endDate: startDate,
      timeZone: 'PST',
      recurrenceRule: {
        frequency: 'weekly',
        interval: 1,
        occurrence: reminderCount
      },
      notes: 'Remember to water this week! 2-3 days of DEEP watering--AKA water until the soil is wet about an inch deep'
    }

    if (globalState.calendar_id) {

      Calendar.createEventAsync(globalState.calendar_id, waterDetails)
        .then( event => {
          console.log(startDate);
          showMessage({
            message: "Get watering!",
            type: "success",
            floating: true
          });
          this.setState({
            wateringEvent: event.toString(),
            canWater: false})
        })
        .catch( error => {
          console.log((error));
          showMessage({
            message: error.response.data.errors,
            type: "danger",
            floating: true
          })
        });
    }
    else {
      showMessage({
        message: "Sorry, Sprout needs calendar access to do that!",
        type: "danger",
        floating: true
      })
    }
  }

  deleteWateringSchedule = () => {

    let recurringEventOptions = {
      futureEvents: true
    }

    Calendar.deleteEventAsync(this.state.wateringEvent, recurringEventOptions)
      .then( event => {
        showMessage({
          message: "Watering schedule deleted",
          type: "success",
          floating: true
        });
        this.setState({
          wateringEvent: '',
          canWater: true
        })
      })
      .catch( error => {
        showMessage({
          message: error.response.data.errors,
          type: "danger",
          floating: true
        })
      });
  }

    render(){
      const gardenPlants = this.state.plants
      if (gardenPlants != []) {
        return this.renderPlants()
      }
      else {
        return this.renderNone()
      }

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
           showOnLoad
           focusOnLayout={false}
           heightAdjust={-2}
         />

         <View style={{marginTop: 60, height: 80 + "%"}}>
           <List
             showPlant={this.showPlant} plants={this.state.results}
             garden={true}
             removePlant={this.removePlant}
             addPlant={this.addPlant}
             addToCalendar={this.props.addToCalendar}
           />
          </View>

         <View style={{flexDirection: 'row', marginTop: 5}}>
          <Button title={this.state.canWater ? 'Make Watering Schedule': 'Delete Watering Schedule'}
            containerStyle={{fontSize: 1, marginTop: 20}}
            buttonStyle={styles.button}
            textStyle={{fontSize: 6}}
            onPress={() =>
              this.state.canWater ? this.makeWateringSchedule():this.deleteWateringSchedule()
            }/>

            <Button title='Clear Garden'
            containerStyle={{fontSize: 2, marginTop: 20}}
            buttonStyle={styles.button}
            textStyle={{fontSize: 8}}
            onPress={() =>
              this.clearGarden()
            }/>
          </View>
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

         <View style={{marginTop: 60, height: 80 + "%"}}>
           <List
             showPlant={this.showPlant} plants={this.state.plants}
             garden={true}
             removePlant={this.removePlant}
             addPlant={this.addPlant}
             addToCalendar={this.props.addToCalendar}
           />
          </View>

         <View style={{flexDirection: 'row', marginTop: 5}}>
          <Button title={this.state.canWater ? 'Make Watering Schedule': 'Delete Watering Schedule'}
            containerStyle={{fontSize: 1, marginTop: 20}}
            buttonStyle={styles.button}
            textStyle={{fontSize: 6}}
            onPress={() =>
              this.state.canWater ? this.makeWateringSchedule():this.deleteWateringSchedule()
            }/>

            <Button title='Clear Garden'
            containerStyle={{fontSize: 2, marginTop: 20}}
            buttonStyle={styles.button}
            textStyle={{fontSize: 8}}
            onPress={() =>
              this.clearGarden()
            }/>
          </View>

        </View>

     )
   }

   renderNone(){
     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%", backgroundColor: 'white', justifyContent: "center", alignItems: "center"}}>

          <Text style={{marginTop: 200, fontSize: 50}}>No Plants in your Garden Yet!</Text>
          <List
            garden={true}
          />
        </View>

     )
   }
 }

 export default  createStackNavigator(
   {
     Garden: Garden,
     PlantView: PlantView
   },
   {
     initialRouteName: 'Garden',
   }
 );

  const styles = StyleSheet.create({
  button: {backgroundColor: '#C71585',
  width: 60,
  height: 20,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center"}
  });
