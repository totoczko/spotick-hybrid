import { SET_PLACES, REMOVE_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading } from './index'

export const addPlace = (placeName, location, image) => {
  // return {
  //   type: ADD_PLACE,
  //   placeName: placeName,
  //   location: location,
  //   image: image
  // };

  //idea with thunk = we can run any code asyns, dispatch after dispatch
  return dispatch => {
    dispatch(uiStartLoading())
    fetch("https://us-central1-awesome-places-247312.cloudfunctions.net/storeImage", {
      method: "POST",
      body: JSON.stringify({
        image: image.base64
      })
    })
      .catch(err => {
        console.log(err)
        dispatch(uiStopLoading())
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location: location,
          image: parsedRes.imageUrl
        }
        return fetch("https://awesome-places-247312.firebaseio.com/places.json", {
          method: 'POST',
          body: JSON.stringify(placeData)
        })
          .catch(err => {
            console.log(err)
            alert('something went wrong!')
            dispatch(uiStopLoading())
          })
          .then(res => res.json())
          .then(parsedRes => {
            console.log(parsedRes)
            dispatch(uiStopLoading())
          })
      })
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
    return fetch("https://awesome-places-247312.firebaseio.com/places.json")
      .catch(err => {
        alert('something went wrong!')
        console.log(err)
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = []
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image
            },
            key: key
          })
        }
        dispatch(setPlaces(places))
      })
  }
}

export const deletePlace = (key) => {
  return dispatch => {
    dispatch(removePlace(key))
    fetch("https://awesome-places-247312.firebaseio.com/places/" + key + ".json", {
      method: "DELETE"
    })
      .catch(err => {
        alert('something went wrong!')
        console.log(err)
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log("done!")
      })
  }
}

export const removePlace = (key) => {
  return {
    type: REMOVE_PLACE,
    key: key
  }
}