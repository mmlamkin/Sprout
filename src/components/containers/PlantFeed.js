import React, { Component } from 'react'
import { Plant } from '../presentation'
import { FlatList } from 'react-native'
import PLANTDATA from '../../../test-data/plants'

class PlantFeed extends Component {

  _renderPlant(item){
    return <Plant item={item}/>
  }

  renderPlantFeed = () => {
    const plantLibrary = PLANTDATA.map((plant, i) => {

      return (

          <Plant
          key={i}
          image={plant.image}
          name={plant.name}
          maintenance={plant.care}
          />

      );
    });

    return plantLibrary
  }

  _returnKey(item){
    return item.toString()
  }

  render(){
    return(
      <FlatList
      data={plantLibrary}
      keyExtractor={this._returnKey}
      renderItem={() => this._renderPlant() }
      />
    )
  }
}

export default PlantFeed
