import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'
const uuid = require('uuid/v4');

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  }
}

export const addPlace = (placeText, location, img, date, user) => {
  // return {
  //   type: ADD_PLACE,
  //   placeText: placeText,
  //   location: location,
  //   image: image
  // };

  //idea with thunk = we can run any code asyns, dispatch after dispatch
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!")
      })
      .then(token => {
        authToken = token;
        return fetch("https://us-central1-awesome-places-247312.cloudfunctions.net/storeImage", {
          method: "POST",
          body: JSON.stringify({
            img: img.base64
          }),
          headers: {
            "Authorization": "Bearer " + authToken
          }
        })
      })
      .catch(err => {
        console.log(err)
        alert('something went wrong!')
        dispatch(uiStopLoading())
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(parsedRes => {
        const id = uuid()
        const placeData = {
          shortText: placeText,
          geo: location,
          img: parsedRes.imageUrl,
          imageid: parsedRes.imageid,
          data: date,
          id: id,
          user: user
        }
        return fetch("https://awesome-places-247312.firebaseio.com/places/" + id + ".json?auth=" + authToken, {
          method: 'PUT',
          body: JSON.stringify(placeData)
        })

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
        dispatch(uiStopLoading())
        dispatch(placeAdded())
      })
      .catch(err => {
        console.log(err)
        alert('something went wrong!')
        dispatch(uiStopLoading())
      })
  }
}

export const placeAdded = () => {
  return {
    type: PLACE_ADDED
  }
}

export const setPlaces = places => {
  return {
    type: SET_PLACES,
    places: places
  }
}

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token => {
        return fetch("https://awesome-places-247312.firebaseio.com/places.json?auth=" + token)
      })
      .catch(() => {
        alert("No valid token found!")
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(parsedRes => {
        const places = []
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            img: {
              uri: parsedRes[key].img
            },
            key: key
          })
        }
        dispatch(setPlaces(places))
      })
      .catch(err => {
        alert('something went wrong!')
        console.log(err)
      })
  }
}

export const deletePlace = (key) => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!")
      })
      .then(token => {
        dispatch(removePlace(key))
        return fetch("https://awesome-places-247312.firebaseio.com/places/" + key + ".json?auth=" + token, {
          method: "DELETE"
        })
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error()
        }
      })
      .then(parsedRes => {
        console.log("done!")
      })
      .catch(err => {
        alert('something went wrong!')
        console.log(err)
      })
  }
}

export const removePlace = (key) => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
}