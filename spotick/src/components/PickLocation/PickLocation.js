import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'

export default class PickLocation extends Component {
  state = {
    location: null
  }

  render() {
    const { location } = this.state;
    return (
      <View style={styles.container}>
        <Text>{location}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30
  }
})
