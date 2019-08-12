import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import ImagePicker from "react-native-image-picker"
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native'

export default class PickImage extends Component {
  state = {
    pickedImage: null
  }

  reset = () => {
    this.setState({
      pickedImage: null
    })
  }

  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Wybierz zdjęcie',
        maxWidth: 800,
        maxHeight: 600
      },
      res => {
        if (res.didCancel) {
          console.log("User cancelled")
        } else if (res.error) {
          console.log("Error", res.error)
        } else {
          this.setState({
            pickedImage: {
              uri: res.uri
            }
          })
          this.props.onImagePicked({ uri: res.uri, base64: res.data })
        }
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Icon
            size={36}
            name={Platform.OS === "android" ? "md-camera" : "ios-camera"}
            color="#3f51b5"
            onPress={this.pickImageHandler}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "#eee",
    width: "100%",
    height: 300
  },
  button: {
    margin: 15
  },
  previewImage: {
    width: '100%',
    height: '100%'
  }
})
