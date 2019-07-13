import React, { Component } from 'react'
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import background from "../../assets/background.jpg"
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';

export default class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
  }

  constructor(props) {
    super(props);
    Dimensions.addEventListener("change", this.updateStyles)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.updateStyles)
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape'
    })
  }

  loginHandler = () => {
    startMainTabs()
  }

  render() {
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please log in</HeadingText>
        </MainText>
      )
    }

    return (
      <ImageBackground source={background} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4">Switch to login</ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput style={styles.input} placeholder="Your email address" />
            <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordContainer : styles.landscapePasswordContainer}>
              <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput style={styles.input} placeholder="Password" />
              </View>
              <View style={this.state.viewMode === 'portrait' ? styles.portraitPasswordWrapper : styles.landscapePasswordWrapper}>
                <DefaultInput style={styles.input} placeholder="Confirm password" />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler} >Submit</ButtonWithBackground>
        </View>
      </ImageBackground >
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: "#eee",
    borderColor: "#bbb"
  },
  backgroundImage: {
    width: "100%",
    flex: 1
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  landscapePasswordWrapper: {
    width: '45%'
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: "flex-start"
  },
  portraitPasswordWrapper: {
    width: '100%'
  }
})