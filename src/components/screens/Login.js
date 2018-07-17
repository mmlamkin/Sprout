import React, {Component} from 'react'
import { View, Text, Button, Image, TextInput, StyleSheet } from 'react-native';
import config from "../../config";
import Config from '../../../env';
import Expo from 'expo';


class Login extends Component {
  constructor() {
  super()
  this.state = {
    text: '',
    disabled: true
  }
}

signInWithGoogleAsync() {
    try {
      const result =  Expo.Google.logInAsync({
        androidClientId: Config.ANDROID_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;

      } else {
        return {cancelled: true};
      }
    } catch(e) {
      return {error: true};
    }
  }



  render(){

    return(
      <View style={styles.container}>
      <View style={styles.border}>
      <View style={styles.border}>

      <Image style={{height: 200,
        width: 175}}
        source = {config.images.sproutBig}/>
      <Text style={{fontSize: 25, marginVertical: 10}}>Sprout</Text>

      <Button
      title="Sign In with Google"
      onPress={() =>
       this.signInWithGoogleAsync()
      }
      buttonStyle={{

        width: 400,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10
      }}
      />

      </View>
      </View>
      </View>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {

    flex: 1, height: 100 + "%",
    width: 100 + "%",
    justifyContent:"center",
    alignItems: "center"

  },
  border: {
    borderRadius: 4,
    borderWidth: 5,
    borderColor: '#ef7d73',
    height: 80 + "%",
    width: 80 + "%",
    justifyContent:"center",
    alignItems: "center"
  }
});
