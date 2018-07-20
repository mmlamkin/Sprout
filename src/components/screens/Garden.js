import React, { Component } from 'react'
import { View, StyleSheet, Text  } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { List } from "../containers";
import axios from 'axios';
import Config from '../../../env';
import SearchBar from 'react-native-searchbar';
import globalState from '../../GlobalState';
import HeaderImage from '../presentation';
import { Expo, Constants, Calendar, Permissions} from 'expo';


class Garden extends Component {
  constructor() {
  super()
  this.state = {
    plants: [],
    results: []
  }
  this._handleResults = this._handleResults.bind(this);
}

  componentDidMount() {
    axios.get(`http://${Config.PLANTS_API}/users/${globalState.current_user_id}/gardens`)
     .then((response) => {
       this.setState({plants: response.data.plants, garden_id: response.data.garden_id})
     })
     .catch((error) => {
       alert("Could not load your Garden!")
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

    addPlant = (plant) => {
      const newPlants = this.state.plants.push(plant)
      this.setState({plants: newPlants})
    }


    clearGarden = () => {
      const url = `http://${Config.PLANTS_API}/users/${globalState.current_user_id}/gardens/` + this.state.garden_id
      axios.delete(url)
      .then((response) => {
        alert('Garden Cleared')
        this.setState({plants: response.data.plants})
      })
      .catch((error) => {
        alert(error.errors + "clear garden error")
      });
    }

  makeWateringSchedule = () => {
    let today = new Date()
    let year = today.getFullYear().toString()
    let nextYear = (parseInt(year) + 1).toString()
    let start_of_season = Date.parse(`april 1 ${year} 9:00`)
    let end_of_season = `${year}0930T070000Z`
    let startDate = today
    let endDate = end_of_season



    if (today > start_of_season && today < end_of_season) {
      startDate = today
      endDate = end_of_season
    }
    else if (today > end_of_season) {
      startDate = Date.parse(`april 1 ${nextYear} 9:00`)
      endDate = `${nextYear}0930T070000Z`
    }
    else if (today < start_of_season) {
      startDate = start_of_season
      endDate = end_of_season
    }

    let waterDetails = {
      title: 'Water Your Garden!',
      startDate: startDate,
      endDate: startDate,
      timeZone: 'PST',
      recurrenceRule: {
        frequency: 'weekly',
        interval: 1,
        byDay: 'sunday',
        until: endDate
      },
      notes: 'Remember to water this week! 2-3 days of DEEP watering--AKA water until the soil is wet about an inch deep'
    }


    Calendar.createEventAsync(globalState.calendar_id, waterDetails)
      .then( event => {
        console.log("get watering!");

      })
      .catch( error => {
        console.log((error));
      });
  }



    render(){
      const gardenPlants = this.state.plants
      if (gardenPlants) {
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
       <Header
       // centerComponent={<HeaderImage />}
       outerContainerStyles={{backgroundColor: '#8b81f1', top: 50, height: 70, position: 'absolute', width: 100 + "%"}}
       />
         <SearchBar
           ref={(ref) => this.searchBar = ref}
           data={this.state.plants}
           handleResults={this._handleResults}
           onClear={this._handleClear}
         />

         <List
           showPlant={this.showPlant} plants={this.state.results}
           garden={true}
           removePlant={this.removePlant}
           addPlant={this.addPlant}
           addToCalendar={this.props.addToCalendar}
         />

         <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button title='Make Watering Schedule'
            containerStyle={{fontSize: 1, marginTop: 20}}
            buttonStyle={styles.button}
            onPress={() =>
              this.makeWateringSchedule()
            }/>

            <Button title='Clear Garden'
            containerStyle={{fontSize: 2, marginTop: 20}}
            buttonStyle={styles.button}
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
        <Header
          // centerComponent={<HeaderImage />}
          outerContainerStyles={{backgroundColor: '#8b81f1', marginTop: 70}}
          innerContainerStyles={{backgroundColor: '#8b81f1'}}
        />
         <SearchBar
           ref={(ref) => this.searchBar = ref}
           data={this.state.plants}
           handleResults={this._handleResults}
           showOnLoad
         />

         <List
           showPlant={this.showPlant} plants={this.state.plants}
           garden={true}
           removePlant={this.removePlant}
           addPlant={this.addPlant}
           addToCalendar={this.props.addToCalendar}
         />

         <Button title='Make Watering Schedule'
       containerStyle={{fontSize: 2, marginTop: 20}}
       buttonStyle={styles.button}
       onPress={() =>
        this.makeWateringSchedule()
      }/>

         <Button title='Clear Garden'
       containerStyle={{fontSize: 2, marginTop: 20}}
       buttonStyle={styles.button}
       textStyle={{fontSize: 10}}
       onPress={() =>
        this.clearGarden()
      }/>
         </View>

     )
   }

   renderNone(){
     return(
       <View style={{flex: 1, width: 100 + "%", height: 100 + "%", backgroundColor: 'white', justifyContent: "center", alignItems: "center"}}>
       <Header
       // centerComponent={<HeaderImage />}
       outerContainerStyles={{backgroundColor: '#8b81f1', width: 100 + "%"}}
       innerContainerStyles={{backgroundColor: '#8b81f1'}}
       />
          <Text>No Plants in your Garden Yet!</Text>
          <List
            garden={true}
          />
        </View>

     )
   }
 }

  export default Garden;

  const styles = StyleSheet.create({
  button: {backgroundColor: '#C71585',
  width: 60,
  height: 20,
  borderColor: "transparent",
  borderWidth: 0,
  borderRadius: 25,
  justifyContent: "center", alignItems: "center"}
  });
