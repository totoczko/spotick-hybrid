import { AsyncStorage } from "react-native";

import { AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "./index";
import startMainTabs from "../../screens/MainTabs/startMainTabs";
import App from '../../../App'

const API_KEY = "";

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
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        loginRes = parsedRes;
        if (!parsedRes.idToken) {
          alert("Logowanie nie powiodło się!");
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
              .then(res => res.json())
              .then(parsedRes => {
                console.log(parsedRes)
                dispatch(authStoreToken(loginRes.idToken, parsedRes.color, parsedRes.username, parsedRes.email, parsedRes.id, loginRes.expiresIn, loginRes.refreshToken));
                startMainTabs()
              })
              .catch(err => {
                console.log(err)
                dispatch(uiStopLoading())
              })
          } else {
            fetch("https://awesome-places-247312.firebaseio.com/users/" + parsedRes.localId + ".json?auth=" + parsedRes.idToken)
              .then(res => res.json())
              .then(parsedRes => {
                dispatch(authStoreToken(loginRes.idToken, parsedRes.color, parsedRes.username, parsedRes.email, parsedRes.id, loginRes.expiresIn, loginRes.refreshToken));
                startMainTabs()
              })
              .catch(err => {
                console.log(err)
                dispatch(uiStopLoading())
              })
          }
        }
      });
  };
};

export const changeUserData = (key, value) => {
  return (dispatch, getState) => {
    dispatch(uiStartLoading());
    // dispatch(updateToken());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
      API_KEY;
    let body = {}
    if (key === "email") {
      body = {
        idToken: getState().auth.token,
        email: value,
        returnSecureToken: true
      }
    } else if (key === "username") {
      body = {
        idToken: getState().auth.token,
        displayName: value,
      }
    } else {
      body = {
        idToken: getState().auth.token,
        password: value,
        returnSecureToken: true
      }
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .catch(err => {
        console.log(err);
        alert("Logowanie nie powiodło się!");
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        console.log(parsedRes);
        if (!parsedRes.idToken) {
          fetch("https://awesome-places-247312.firebaseio.com/users/" + parsedRes.localId + ".json?auth=" + getState().auth.token, {
            method: 'PATCH',
            body: JSON.stringify({
              displayName: parsedRes.displayName
            })
          })
            .then(res => res.json())
            .then(parsedRes => {
              console.log(parsedRes)
              dispatch(authStoreToken(getState().auth.token, getState().auth.color, parsedRes.displayName, getState().auth.email, getState().auth.id, getState().auth.expiresIn));
              alert('Dane zostały zapisane!')
            })
            .catch(err => {
              console.log(err)
              dispatch(uiStopLoading())
            })
        } else {
          loginRes = parsedRes;
          let upd_body = {}
          if (key == "email") {
            upd_body = {
              email: parsedRes.email
            }
          } else {
            upd_body = {
              password: parsedRes.password
            }
          }
          fetch("https://awesome-places-247312.firebaseio.com/users/" + parsedRes.localId + ".json?auth=" + parsedRes.idToken, {
            method: 'PATCH',
            body: JSON.stringify(upd_body)
          })
            .then(res => res.json())
            .then(parsedRes => {
              console.log(parsedRes)
              dispatch(authStoreToken(loginRes.idToken, getState().auth.color, getState().auth.username, parsedRes.email, getState().auth.id, loginRes.expiresIn, loginRes.refreshToken))
              alert('Dane zostały zapisane!')
            })
            .catch(err => {
              console.log(err)
              dispatch(uiStopLoading())
            })
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
    AsyncStorage.setItem("ap:auth:color", color);
    AsyncStorage.setItem("ap:auth:username", username);
    AsyncStorage.setItem("ap:auth:email", email);
    AsyncStorage.setItem("ap:auth:id", id);
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
      let expiryDate = getState().auth.expiryDate;
      let color = getState().auth.color;
      let email = getState().auth.email;
      let username = getState().auth.username;
      let id = getState().auth.id;

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
            return AsyncStorage.multiGet(["ap:auth:expiryDate", "ap:auth:color", "ap:auth:email", "ap:auth:username", "ap:auth:id"])
          })
          .then(response => {
            expiryDate = response[0][1]
            color = response[1][1]
            email = response[2][1]
            username = response[3][1]
            id = response[4][1]
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

// export const updateToken = () => {
//   return (dispatch, getState) => {
//     AsyncStorage.getItem("ap:auth:refreshToken")
//       .then(refreshToken => {
//         console.log(refreshToken)
//         return fetch("https://securetoken.googleapis.com/v1/token?key=" + API_KEY, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//           },
//           body: "grant_type=refresh_token&refresh_token=" + refreshToken
//         })
//       })
//       .then(res => res.json())
//       .then(parsedRes => {
//         if (parsedRes.id_token) {
//           console.log("refresh token worked")
//           dispatch(authStoreToken(parsedRes.id_token, getState().auth.color, getState().auth.username, getState().auth.email, getState().auth.id, parsedRes.expires_in, parsedRes.refresh_token))
//           return parsedRes.id_token
//         } else {
//           console.log("refresh token didnt worked")
//         }
//       })
//   };
// };

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
    AsyncStorage.removeItem("ap:auth:color");
    AsyncStorage.removeItem("ap:auth:email");
    AsyncStorage.removeItem("ap:auth:id");
    AsyncStorage.removeItem("ap:auth:username");
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
