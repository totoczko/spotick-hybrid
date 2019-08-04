import { AsyncStorage } from "react-native";

import { TRY_AUTH, AUTH_SET_TOKEN, APP_REMOVE_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from '../../../App'

const API_KEY = "AIzaSyD_oOy6uUjeieDfpQKICsTsYnz7tpcZDPw";

const getUserColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let loginRes = null

export const tryAuth = (authData, authMode) => {
  return dispatch => {
    dispatch(uiStartLoading());
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      API_KEY;
    if (authMode === "signup") {
      url =
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
        API_KEY;
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        displayName: authData.username,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Authentication failed, please try again!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        loginRes = parsedRes;
        if (!parsedRes.idToken) {
          alert("Authentication failed, please try again!");
        } else {

          if (authMode === "signup") {
            const userData = {
              color: getUserColor(),
              email: parsedRes.email,
              id: parsedRes.localId,
              username: parsedRes.displayName
            }
            fetch("https://awesome-places-247312.firebaseio.com/users/" + parsedRes.localId + ".json?auth=" + parsedRes.idToken, {
              method: 'PUT',
              body: JSON.stringify(userData)
            })
              .then(res => {
                if (res.ok) {
                  return res.json()
                } else {
                  throw new Error()
                }
              })
              .then(parsedRes => {
                console.log(parsedRes)
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.color, parsedRes.username, parsedRes.email, parsedRes.id, parsedRes.expiresIn, parsedRes.refreshToken));
                startMainTabs()
              })
              .catch(err => {
                console.log(err)
                alert('something went wrong!')
                dispatch(uiStopLoading())
              })
          } else {
            let userData = {
              color: '',
              email: '',
              id: '',
              username: ''
            }
            fetch("https://awesome-places-247312.firebaseio.com/users/" + parsedRes.localId + ".json?auth=" + parsedRes.idToken)
              .then(res => {
                if (res.ok) {
                  return res.json()
                } else {
                  throw new Error()
                }
              })
              .then(parsedRes => {
                console.log(parsedRes)
                dispatch(authStoreToken(loginRes.idToken, parsedRes.color, parsedRes.username, parsedRes.email, parsedRes.id, loginRes.expiresIn, loginRes.refreshToken));
                startMainTabs()
              })
              .catch(err => {
                console.log(err)
                alert('something went wrong!')
                dispatch(uiStopLoading())
              })
          }
        }
      });
  };
};

export const authStoreToken = (token, color, username, email, id, expiresIn, refreshToken) => {
  return dispatch => {
    const now = new Date();
    const expiryDate = now.getTime() + expiresIn * 1000;
    dispatch(authSetToken(token, color, username, email, id, expiryDate));
    AsyncStorage.setItem("ap:auth:token", token);
    AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
    AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
  };
};

export const authSetToken = (token, color, username, email, id, expiryDate) => {
  return {
    type: AUTH_SET_TOKEN,
    token: token,
    expiryDate: expiryDate,
    color: color,
    username: username,
    email: email,
    id: id
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      const expiryDate = getState().auth.expiryDate;

      if (!token || new Date(expiryDate) <= new Date()) {
        let fetchedToken;
        AsyncStorage.getItem("ap:auth:token")
          .catch(err => reject())
          .then(tokenFromStorage => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem("ap:auth:expiryDate");
          })
          .then(expiryDate => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken, color, username, email, id));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch(err => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch(err => {
        return AsyncStorage.getItem("ap:auth:refreshToken")
          .then(refreshToken => {
            return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              body: "grant_type=refresh_token&refresh_token=" + refreshToken
            })
          })
          .then(res => res.json())
          .then(parsedRes => {
            if (parsedRes.id_token) {
              console.log("refresh token worked")
              dispatch(authStoreToken(parsedRes.id_token, parsedRes.color, parsedRes.username, parsedRes.email, parsedRes.id, parsedRes.expires_in, parsedRes.refresh_token))
              return parsedRes.id_token
            } else {
              dispatch(authClearStorage());
            }
          })
      })
      .then(token => {
        if (!token) {
          throw new Error()
        } else {
          return token
        }
      })
  };
};

export const authAutoSignIn = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        startMainTabs();
      })
      .catch(err => console.log("Failed to fetch token!"));
  };
};

export const authClearStorage = () => {
  return dispatch => {
    AsyncStorage.removeItem("ap:auth:token");
    AsyncStorage.removeItem("ap:auth:expiryDate");
    return AsyncStorage.removeItem("ap:auth:refreshToken");
  }
}

export const authLogout = () => {
  return dispatch => {
    dispatch(authClearStorage())
      .then(() => {
        App()
      })
    dispatch(authRemoveToken())
  }
}

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN
  }
}