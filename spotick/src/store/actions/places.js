import { SET_PLACES, SET_LIKES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes'
import { uiStartLoading, uiStopLoading, authGetToken } from './index'
import { sortPosts } from '../../utility/sortPosts';
const uuid = require('uuid/v4');

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE
  }
}

export const likePlace = (postId, likes) => {
  return (dispatch, getState) => {
    const userId = getState().auth.id
    let countUpd = likes.count;
    let usersUpd = likes.users ? [...likes.users] : [];
    const likeIndex = usersUpd.indexOf(userId);
    if (likeIndex < 0) {
      countUpd++;
      usersUpd.push(userId);
    } else {
      countUpd--;
      usersUpd.splice(likeIndex, 1)
    }

    const placeData = {
      likes: {
        count: countUpd,
        users: usersUpd
      }
    }

    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert("No valid token found!")
      })
      .then(token => {
        authToken = token;
      })
      .catch(err => {
        console.log(err)
        alert('something went wrong!')
        dispatch(uiStopLoading())
      })
      .then(parsedRes => {
        return fetch("https://awesome-places-247312.firebaseio.com/places/" + postId + ".json?auth=" + authToken, {
          method: 'PATCH',
          body: JSON.stringify(placeData)
        })
      })
      .then(parsedRes => {
        dispatch(setLikes(postId, placeData.likes))
        dispatch(uiStopLoading())
      })
      .catch(err => {
        console.log(err)
        alert('something went wrong!')
        dispatch(uiStopLoading())
      })
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
          user: user,
          likes: {
            count: 0,
            users: []
          }
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

export const setLikes = (placeId, likes) => {
  return {
    type: SET_LIKES,
    placeId: placeId,
    likes: likes
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
        let itemsSorted = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            img: {
              uri: parsedRes[key].img
            },
            key: key
          })
        }
        let placesSorted = places.sort(sortPosts)
        itemsSorted.push(placesSorted)
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
