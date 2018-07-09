import React, { Component } from 'react'
import { View, Image, Text, Button, StyleSheet  } from 'react-native';

class Plant extends Component {

  render () {

    return (
      <View style={styles.plantContainer}>
        <Image style={styles.imageStyle} source={{uri: "https:" + this.props.image}} />
        <View style={styles.summaryContainer}>
          <Text>{this.props.name}</Text>

          <Text>{this.props.description}</Text>

        </View>
      </View>
    );
  }
}

export default Plant;

const styles = StyleSheet.create({

  imageStyle: {
  width: 50 + "%",
  height: 150,
  marginLeft: 10,
  marginRight: 10,
  marginBottom: 10,

},
plantContainer: {
  width: 100 + "%",
  flexDirection: 'row'
},
summaryContainer: {
  flexDirection: "column",

}
});
