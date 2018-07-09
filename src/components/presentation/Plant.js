import React, { Component } from 'react'
import { View, Image, Text, StyleSheet  } from 'react-native';
import { Button } from 'react-native-elements'


class Plant extends Component {

  showPlant() {
    this.props.navigation.navigate('plantView')
  }

  render () {

    return (
      <View style={styles.plantContainer}>
        <Image style={styles.imageStyle} source={{uri: "https:" + this.props.image}} />
        <View style={styles.summaryContainer}>
          <Text style={{alignSelf: "center"}}>{this.props.name}</Text>
          <Text numberOfLines={4} style={{fontSize: 12}}>{this.props.description}</Text>
          <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 4}}>
          <Button title='More...'
            containerStyle={{fontSize: 4, marginTop: 20}}
           buttonStyle={{
            backgroundColor: "#C71585",
            width: 60,
            height: 20,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 25,
            justifyContent: "center", alignItems: "center"

          }}
          onPress={() =>
           this.showPlant()
          }/>
          <Button title='Add to Garden'
          containerStyle={{fontSize: 2, marginTop: 20}}
          buttonStyle={{
            backgroundColor: '#C71585',
            width: 60,
            height: 20,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 25,
            justifyContent: "center", alignItems: "center"

          }}/>
          </View>
          </View>

      </View>
    );
  }
}

export default Plant;

const styles = StyleSheet.create({

  imageStyle: {
  width: 40 + "%",
  height: 130,
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,
  marginTop: 10,
},
plantContainer: {
  width: 100 + "%",
  flexDirection: 'row',
  borderBottomWidth: StyleSheet.hairlineWidth
},
summaryContainer: {
  flexDirection: "column",
  width: 45 + "%"
}
});
