import React, {Component} from 'react'
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Garden from './Garden';
import Browse from './Browse';
import Config from '../../../env';
import config from "../../config";
import { showMessage } from "react-native-flash-message";

class Welcome extends Component {

static navigationOptions = {
  header: null
  };


  componentDidMount() {
    console.log(this.props.navigation)

   }


  render(){

    return (
      <View style={styles.container}>
        <Text>Welcome to Sprout!</Text>
        <Button title='Browse Plants'
          containerStyle={{marginTop: 20, justifyContent: "center", alignItems: "center"}}
         buttonStyle={styles.button}
         textStyle={{fontSize: 13}}
        onPress={() =>
         this.props.navigation.navigate('browse')
        }/>
        <Button title='Your Garden'
          containerStyle={{marginTop: 20, justifyContent: "center", alignItems: "center"}}
         buttonStyle={styles.button}
         textStyle={{fontSize: 13}}
        onPress={() =>
         this.props.navigation.navigate('garden')
        }/>
      </View>
    )

  }


}

export default Welcome;

const styles = StyleSheet.create({

  imageStyle: {
  width: 100 + "%",
  height: 130,

},
container: {
  flex: 1,
  flexDirection: "column",
  width: 100 + "%",
  height: 100 + "%",
  justifyContent: "center",
  alignItems: "center"
},
button: {backgroundColor: '#FF6C73',
width: 60,
height: 20,
borderColor: "transparent",
borderWidth: 0,
borderRadius: 25,
justifyContent: "center",
alignItems: "center"}
});
