import React, { Component } from 'react'
import { StyleSheet, ScrollView, Text } from 'react-native'

class UserScreen extends Component {

  render() {
    return (
      <ScrollView>
        <Text>dziala</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    margin: 8,
    width: "100%"
  }
})

export default UserScreen