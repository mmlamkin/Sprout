import React, {Component} from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import config from "../../config";
import Config from '../../../env';
import Expo from 'expo';
import axios from 'axios';
import globalState from '../../GlobalState';
import {Font} from 'expo'



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
      return response.data.user_id}
    catch (error) {
      alert(error.response.data.errors);
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

        globalState.current_user_id = this.state.user_id

        this.props.navigation.navigate('main');

        return result.accessToken;

      } else {
        alert("There was a problem with your Google Login");
        return {cancelled: true};
      }
    } catch(e) {
      alert(e.response.data.errors);
      return {error: true};
    }
  }

  render(){

    return(

      <View style={styles.container}>
        <View>
          <Image style={{height: 200,
            width: 175, marginTop: 125}}
            source = {config.images.sproutBig}/>
            <Text style={{ marginVertical: 10, fontSize: 38, fontWeight: 'bold', alignSelf: 'center', color: '#ef7d73'}}>Sprout</Text>

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
              borderRadius: 10,
              marginTop: 20
            }}
            />
          </View>
        <Image style={styles.container} source={{uri: 'https://images.pexels.com/photos/41324/background-close-up-flora-fresh-41324.jpeg?auto=compress&cs=tinysrgb&h=350'}} />
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
    alignItems: "center",


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
