import React, {Component} from 'react'
import { View, Text, Button, Image, TextInput, StyleSheet } from 'react-native';
import config from "../../config";
import axios from 'axios';
import Config from '../../../env';



class Login extends Component {
  constructor() {
  super()
  this.state = {
    text: '',
    disabled: true
  }
}

  login() {
    // axios.get(`http://${Config.PLANTS_API}/auth/google_oauth2`)
    //  .then((response) => {
       this.props.navigation.navigate('main')
     // })
     // .catch((error) => {
     //   alert(error.errors)
     //   console.log(error);
     // });


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
      <TextInput onChangeText={(text) =>   this.setState({text: text,
      disabled: false})
      }
        value={this.state.text}
        />
      <Button
      title="Login"
      // disabled={this.state.disabled}
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
