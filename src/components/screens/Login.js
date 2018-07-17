import React, {Component} from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import config from "../../config";
import Config from '../../../env';
import Expo from 'expo';
import axios from 'axios';


class Login extends Component {
  constructor() {
  super()
    this.state = {
      user_email: '',
      user_id: ''
    }
    this.getUser = this.getUser.bind(this)
  }

  async getUser(email) {
    const url = `http://${Config.PLANTS_API}/users?email=` + email
     const response = await axios.post(url)
      return response.data.user_id

    // .catch(function (error) {
    //   console.log(error);
    // });
  }

  async signInWithGoogleAsync() {
    try {
      const result =  await Expo.Google.logInAsync({
        androidClientId: Config.ANDROID_ID,
        webClientID: Config.WEBCLIENTID,
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {
        const user_id = await this.getUser(result.user.email)

        this.setState({user_id: user_id})

        alert("success");
        this.props.navigation.navigate('main', {current_user_id: this.state.user_id});

        return result.accessToken;

      } else {
        alert("Could not complete Login--result isnt success");
        return {cancelled: true};
      }
    } catch(e) {
      alert("Could not complete Login");
      return {error: true};
      console.log(err);
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
