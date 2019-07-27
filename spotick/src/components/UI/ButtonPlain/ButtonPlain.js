import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Text, View, StyleSheet, Platform } from 'react-native'

const ButtonPlain = (props) => {
  const content = (
    <View style={styles.button}>
      <Text style={[{ textTransform: "uppercase", fontWeight: "bold" }, props.disabled ? styles.disabledText : { color: props.color }]}>{props.children}</Text>
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
    margin: 5,
    borderWidth: 0,
    backgroundColor: "#fff",
  },
  disabledText: {
    color: "#999"
  }
})

export default ButtonPlain
