import React, {Component} from 'react'
import { View, Text, Button } from 'react-native'


class Login extends Component {

  login() {
    this.props.navigation.navigate('main')
  }

  render(){

    return(
      <View style={{flex: 1, height: 100 + "%", width: 100 + "%", justifyContent:"center", alignItems: "center"}}>

      <Button
      title="Login"
      onPress={() =>
       this.login()
      }
      buttonStyle={{
        backgroundColor: "green",
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
