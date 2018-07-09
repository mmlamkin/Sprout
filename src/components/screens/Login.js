import React, {Component} from 'react'
import { View, Text, Button, Image } from 'react-native'
import config from "../../config"


class Login extends Component {

  login() {
    this.props.navigation.navigate('main')
  }

  render(){

    return(
      <View style={{flex: 1, height: 100 + "%", width: 100 + "%", justifyContent:"center", alignItems: "center"}}>
      <Image style={{height: 200,
        width: 100, tintColor: '#8FD65C'}}
        source = {config.images.sproutBig}/>
      <Text style={{fontSize: 25, marginVertical: 10}}>Sprout</Text>
      <Button
      title="Login"
      onPress={() =>
       this.login()
      }
      buttonStyle={{

        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 10
      }}
      />

      </View>
    )
  }
}

export default Login
