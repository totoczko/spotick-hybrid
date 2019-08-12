import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Switch, AsyncStorage, Alert } from 'react-native'
import { connect } from 'react-redux'
import { authLogout } from '../../store/actions/index'
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import ButtonPlain from '../../components/UI/ButtonPlain/ButtonPlain';
import validate from "../../utility/validation";
import { changeUserData } from "../../store/actions/index";
import firebase from 'react-native-firebase';

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
    },
    notifications: false
  };

  componentDidMount() {
    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          email: {
            ...prevState.controls.email,
            value: this.props.user.email
          },
          username: {
            ...prevState.controls.username,
            value: this.props.user.username
          }
        }
      }
    })
    this.retrieveTokenFromStorage()
  }

  retrieveTokenFromStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('fcmToken');
      if (value !== null) {
        // We have data!!
        this.setState({
          notifications: true
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  componentWillUnmount() {
    this.notificationListener();
    // this.notificationOpenedListener();
  }

  handleUpdateData = (key, value) => {
    let valid = false;
    if (key === 'password') {
      valid = this.state.controls.password.valid && this.state.controls.confirmPassword.valid
    } else if (key === 'email') {
      valid = this.state.controls.email.valid
    } else if (key === 'username') {
      valid = this.state.controls.username.valid
    }

    if (valid) {
      this.props.changeUserData(key, value);
    } else {
      console.log("not valid data")
    }
  }

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

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
    firebase.messaging().subscribeToTopic('newPost')
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevState.notifications !== this.state.notifications) {
      if (this.state.notifications) {
        this.checkPermission();
        this.createNotificationListeners();
      } else {
        firebase.messaging().unsubscribeFromTopic('newPost')
      }
    }
  }

  switchNotifications = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        notifications: !prevState.notifications
      }
    })
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get("window").width }]} >
        <View style={styles.drawerItem}>
          <Text>Login</Text>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Wpisz login"
              value={this.state.controls.username.value}
              onChangeText={val => this.updateInputState("username", val)}
              valid={this.state.controls.username.valid}
              touched={this.state.controls.username.touched}
            />
            <ButtonPlain
              color="#3f51b5"
              onPress={() => this.handleUpdateData('username', this.state.controls.username.value)}
            >Zapisz</ButtonPlain>
          </View>
        </View>
        <View style={styles.drawerItem}>
          <Text>Email</Text>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Wpisz email"
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState("email", val)}
              valid={this.state.controls.email.valid}
              touched={this.state.controls.email.touched}
            />
            <ButtonPlain
              color="#3f51b5"
              onPress={() => this.handleUpdateData('email', this.state.controls.email.value)}
            >Zapisz</ButtonPlain>
          </View>
        </View>
        <View style={[styles.drawerItem, { height: 200 }]}>
          <Text>Hasło</Text>
          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <DefaultInput
                placeholder="Wpisz hasło"
                value={this.state.controls.password.value}
                onChangeText={val => this.updateInputState("password", val)}
                valid={this.state.controls.password.valid}
                touched={this.state.controls.password.touched}
                secureTextEntry
              />
              <DefaultInput
                placeholder="Potwierdź hasło"
                value={this.state.controls.confirmPassword.value}
                onChangeText={val => this.updateInputState("confirmPassword", val)}
                valid={this.state.controls.confirmPassword.valid}
                touched={this.state.controls.confirmPassword.touched}
                secureTextEntry
              />
            </View>
            <ButtonPlain
              color="#3f51b5"
              onPress={() => this.handleUpdateData('password', this.state.controls.password.value)}
            >Zapisz</ButtonPlain>
          </View>
        </View>
        <View style={styles.drawerItem}>
          <View style={styles.switchContainer}>
            <Text>Powiadomienia</Text>
            <Switch trackColor={{ false: "#999", true: "#FF0266" }} thumbColor="#FF0266" value={this.state.notifications} onChange={this.switchNotifications} />
          </View>
        </View>
        <TouchableOpacity onPress={this.props.onLogout}>
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
    flexDirection: "column",
    padding: 20
  },
  drawerItemIcon: {
    margin: 10
  },
  inputContainer: {
    flexDirection: "row",
    flex: 1,
    width: '80%',
    marginBottom: 30,
    justifyContent: 'space-between'
  },
  switchContainer: {
    flexDirection: "row",
    flex: 1,
    width: '100%',
    justifyContent: 'space-between'
  },
  passwordContainer: {
    flexDirection: "column",
    width: '100%',
    marginBottom: 80,
    paddingBottom: 50,
    height: 200
  }
})

const mapStateToProps = state => {
  return {
    user: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authLogout()),
    changeUserData: (key, value) => dispatch(changeUserData(key, value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)