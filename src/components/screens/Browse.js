import React, {Component, axios} from 'react'
import { View, Text, StyleSheet, Image, TextInput, ListView } from 'react-native'
import { Button, Header, SearchBar } from 'react-native-elements'
import { List } from "../containers"
import PLANTDATA from '../../../test-data/plants'

class Browse extends Component {
  constructor() {
  super()
  this.state = {
    query: '',
    plants: PLANTDATA
  }
}

  // componentDidMount() {
  //   return fetch('http://localhost3000/plants')
  //    .then((response) => response.json())
  //    .then((responseJson) => {
  //      return responseJson;
  //    })
  //    .catch((error) => {
  //      console.error(error);
  //    });
  //  }



    handleQueryChange = query =>
        this.setState(state => ({ ...state, query: query || "" }));

    handleSearchCancel = () =>   this.handleQueryChange("");

    handleSearchClear = () => this.handleQueryChange("");

  render(){

    return(
      <View style={{flex: 1, width: 100 + "%", height: 100 + "%"}}>
        <Header style={styles.header_style}
        leftComponent={{ icon: 'home', color: '#fff' }}
        centerComponent={{ text: 'Sprout', style: { color: '#fff' } }}  />

        <SearchBar
          lightTheme
          onChangeText={this.handleQueryChange}
          onClear={this.handleSearchClear}
          onCancel={this.handleSearchCancel}
          value={this.state.query}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search Plants...'
          />


        <List plants={this.state.plants}/>
      </View>
    )
  }
}

export default Browse

const styles = StyleSheet.create({

  searchContainer: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10
  },
  searchText: {
    flex: 1
  },
  searchButton: {
    height: 30,
  }
})
