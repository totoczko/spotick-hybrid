import { SET_PLACES, SET_LIKES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from '../actions/actionTypes'

const initialState = {
  places: [],
  placeAdded: false
  // selectedPlace: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ADD_PLACE:
    //   return {
    //     ...state,
    //     places: state.places.concat({
    //       key: Math.random().toString(),
    //       name: action.placeText,
    //       image: {
    //         uri: action.image.uri
    //       },
    //       location: action.location,
    //     })
    //   }
    case SET_PLACES:
      return {
        ...state,
        places: action.places
      }
    case SET_LIKES:
      const index = state.places.findIndex(place => {
        return place.id === action.placeId;
      })
      let placesUpd = [...state.places]
      let placeUpd = { ...placesUpd[index] }
      placeUpd.likes = action.likes
      return {
        ...state,
        places: placesUpd.map((item, i) => {
          return i === index ? placeUpd : item
        })
      }
    case REMOVE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.key;
        })
      }
    case PLACE_ADDED:
      return {
        ...state,
        placeAdded: true
      }
    case START_ADD_PLACE:
      return {
        ...state,
        placeAdded: false
      }
    // case SELECT_PLACE:
    //   return {
    //     ...state,
    //     selectedPlace: state.places.find(place => {
    //       return place.key === action.placeKey;
    //     })
    //   }
    // case DESELECT_PLACE:
    //   return {
    //     ...state,
    //     selectedPlace: null
    //   }
    default:
      return state;
  }
};

export default reducer;