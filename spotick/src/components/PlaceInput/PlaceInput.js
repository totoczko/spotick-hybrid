import React, { Component } from 'react'
import { View, TextInput, Button, StyleSheet } from 'react-native'

class PlaceInput extends Component {
  state = {
    placeName: ''
  }

  placeNameChangedHandler = val => {
    this.setState({
      placeName: val,
    })
  }

  placeSubmitHandler = () => {
    if (this.state.placeName.trim() === "") {
      return;
    } else {
      this.props.onPlaceAdded(this.state.placeName)
    }
  }

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={this.state.placeName}
          onChangeText={this.placeNameChangedHandler}
          placeholder="An awesome place"
          style={styles.placeInput}
        />
        <Button title="Add" style={styles.placeButton} onPress={this.placeSubmitHandler} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: 'center',
  },
  placeInput: {
    width: "70%"
  },
  placeButton: {
    width: "30%"
  },
})

export default PlaceInput
