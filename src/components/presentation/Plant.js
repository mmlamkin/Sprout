import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-elements';
import Config from '../../../env';
import axios from 'axios';
import globalState from '../../GlobalState';

class Plant extends Component {

buttonTitle= () => {
  if (!this.props.garden) {
    return (<Button title='Add to Garden'
  containerStyle={{fontSize: 2, marginTop: 20}}
  buttonStyle={styles.button}
  textStyle={{fontSize: 10}}
  onPress={() =>
   this.addToGarden()
 }/>)}

  else {
    return (<Button title='Delete'
  containerStyle={{fontSize: 2, marginTop: 20}}
  buttonStyle={styles.button}
  textStyle={{fontSize: 12}}
  onPress={() =>
   this.delFromGarden()
 }/>)
  }
}

  async addToGarden() {
    const url = `http://${Config.PLANTS_API}/users/${globalState.current_user_id}/plants/` + this.props.plant_id

    let response

    try {
      response = await axios.patch(url)
      alert('Plant added to garden')
      this.props.addToCalendar(this.props.name, this.props.early_dates, this.props.late_dates)
    } catch (error) {
      alert(error.response.data.errors)
    }
  }


  delFromGarden() {
    const url = `http://${Config.PLANTS_API}/users/${globalState.current_user_id}/plants/` + this.props.plant_id
    axios.delete(url)
    .then((response) => {
      alert('Plant removed from garden')
      this.props.removePlant(this.props.plant_id)
    })
    .catch((error) => {
      alert(error.response.data.errors)
    });
  }

  render () {

    return (
      <View style={styles.plantContainer}>
        <View style={{width: 40 + "%", height: 130,marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
        marginTop: 10}}>
            <TouchableOpacity onPress={() =>
              this.props.showPlant(this.props.plant_id)
            }><Image style={styles.imageStyle} source={{uri: "https:" + this.props.image}} /></TouchableOpacity>
        </View>
        <View style={styles.summaryContainer}>
          <Text style={{alignSelf: "center", fontWeight: 'bold', fontSize: 14}}>{this.props.name}</Text>
          <Text numberOfLines={4} style={{fontSize: 12}}>{this.props.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 4}}>
          <Button title='More'
            containerStyle={{marginTop: 20, justifyContent: "center", alignItems: "center"}}
           buttonStyle={styles.button}
           textStyle={{fontSize: 13}}
          onPress={() =>
           this.props.showPlant(this.props.plant_id)
          }/>
          {this.buttonTitle()}

          </View>
          </View>

      </View>
    );
  }
}

export default Plant;

const styles = StyleSheet.create({

  imageStyle: {
  width: 100 + "%",
  height: 130,

},
plantContainer: {
  width: 100 + "%",
  flexDirection: 'row',
  borderBottomWidth: StyleSheet.hairlineWidth
},
summaryContainer: {
  flexDirection: "column",
  width: 45 + "%",
  justifyContent: "space-around"
},
button: {backgroundColor: '#C71585',
width: 60,
height: 20,
borderColor: "transparent",
borderWidth: 0,
borderRadius: 25,
justifyContent: "center", alignItems: "center"}
});
