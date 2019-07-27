import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native'

const ButtonWithBackground = (props) => {
  const content = (
    <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null]}>
      <Text style={[{ color: props.textColor }, styles.text, props.disabled ? styles.disabledText : null]}>{props.children}</Text>
    </View >
  )

  if (props.disabled) {
    return content;
  }

  if (Platform.OS = 'android') {
    return <TouchableNativeFeedback onPress={props.onPress}>
      {content}
    </TouchableNativeFeedback>
  }
  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#fff",
    width: "90%",
    textAlign: "center"
  },
  disabled: {
    backgroundColor: "#eee",
    borderColor: "#aaa"
  },
  disabledText: {
    color: "#aaa"
  },
  text: {
    textTransform: "uppercase",
    textAlign: "center"
  }
})

export default ButtonWithBackground
