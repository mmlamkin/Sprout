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

async signInWithGoogleAsync() {
    try {
      const result =  await Expo.Google.logInAsync({
        androidClientId: Config.ANDROID_ID,
        webClientID: "1043949308092-9j6l6jel104sn5efesna11ruqgfq3pvq.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        alert("success");
        this.props.navigation.navigate('main');
        return result.accessToken;

      } else {
        alert("fails");

        this.props.navigation.navigate('main');
        return {cancelled: true};
      }
    } catch(e) {
      this.props.navigation.navigate('main');
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
