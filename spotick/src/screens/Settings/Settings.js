import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { authLogout } from '../../store/actions/index'
import DefaultInput from '../UI/DefaultInput/DefaultInput';

class Settings extends Component {
  state = {
    controls: {
      email: {
        value: "",
        valid: false,
        validationRules: {
          isEmail: true
        },
        touched: false
      },
      password: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 6
        },
        touched: false
      },
      confirmPassword: {
        value: "",
        valid: false,
        validationRules: {
          equalTo: "password"
        },
        touched: false
      },
      username: {
        value: "",
        valid: false,
        validationRules: {
          minLength: 4
        },
        touched: false
      }
    }
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (key === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: value
      };
    }
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid:
              key === "password"
                ? validate(
                  prevState.controls.confirmPassword.value,
                  prevState.controls.confirmPassword.validationRules,
                  connectedValue
                )
                : prevState.controls.confirmPassword.valid
          },
          [key]: {
            ...prevState.controls[key],
            value: value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
            touched: true
          }
        }
      };
    });
  };

  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get("window").width }]} >
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Text>Login</Text>
            <DefaultInput
              placeholder="Email"
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState("email", val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.drawerItem}>
            <Text>Email</Text>
          </View>
          <View style={styles.drawerItem}>
            <Text>Hasło</Text>
          </View>
          <View style={styles.drawerItem}>
            <Text>Powiadomienia</Text>
          </View>
          <View style={styles.drawerItem}>
            <Text style={{ color: "red", textTransform: "uppercase" }}>Wyloguj się</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "white",
    flex: 1,
    width: "100%"
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
    paddingLeft: 20
  },
  drawerItemIcon: {
    margin: 10
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout())
  }
}

export default connect(null, mapDispatchToProps)(Settings)