import PLANTDATA from '../test-data/plants'
import React, { Component } from 'react'


export default function (WrappedComponent) {
  return class Organizer extends Component {
    render() {
      return <WrappedComponent plantData={PLANTDATA} />
    }
  }
}
