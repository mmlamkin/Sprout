import React, { Component } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { Button } from 'react-native-elements';
import Config from '../../../env';
import axios from 'axios';


class Plant extends Component {

  constructor() {
  super()
  this.state = {
    user_id: 0
  }
}

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
  textStyle={{fontSize: 13}}
  onPress={() =>
   this.delFromGarden()
 }/>)
  }
}

  addToGarden() {
    const url = `http://${Config.PLANTS_API}/users/` + 1 + '/plants/' + this.props.plant_id
    axios.patch(url)
    .then(function (response) {
      alert('Plant added to garden')
      this.props.refreshPage(response.data.plant)
    })
    .catch(function (error) {
      alert(error.errors + "add to garden error")
    });
  }

  delFromGarden() {
    const url = `http://${Config.PLANTS_API}/users/` + 1 + '/plants/' + this.props.plant_id
    axios.delete(url)
    .then(function (response) {
      alert('Plant removed from garden')
      this.props.refreshPage()
    })
    .catch(function (error) {
      alert(error.errors + 'delete from garden error')
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
          <Text style={{alignSelf: "center"}}>{this.props.name}</Text>
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
