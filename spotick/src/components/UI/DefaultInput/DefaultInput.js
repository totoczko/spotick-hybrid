import React from 'react'
import { TextInput, StyleSheet } from 'react-native'


const BLUE = "#428AF8";
const LIGHT_GRAY = "#D3D3D3";

class DefaultInput extends React.Component {
  state = {
    isFocused: false
  };

  handleFocus = event => {
    this.setState({ isFocused: true });
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  handleBlur = event => {
    this.setState({ isFocused: false });
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  render() {
    const { isFocused } = this.state;
    const { onFocus, onBlur, style, valid, touched, ...otherProps } = this.props;
    return (
      <TextInput
        selectionColor={BLUE}
        underlineColorAndroid={
          isFocused ? BLUE : LIGHT_GRAY
        }
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        style={[styles.input, style, !valid && touched ? styles.invalid : null]}
        {...otherProps}
      />
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    paddingLeft: 6
  },
  invalid: {
    backgroundColor: "#f9c0c0",
    borderColor: "red"
  }
})

export default DefaultInput
