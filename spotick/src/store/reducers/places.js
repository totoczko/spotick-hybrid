// import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from '../actions/actionTypes'
import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes'

const initialState = {
  places: []
  // selectedPlace: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE:
      return {
        ...state,
        places: state.places.concat({
          key: Math.random().toString(),
          name: action.placeName,
          image: {
            uri: "https://139992-434456-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2018/03/Fiji-Travel-Network-Blue-Lagoon-Beachfront2.jpg"
          }
        })
      }
    case DELETE_PLACE:
      return {
        ...state,
        places: state.places.filter(place => {
          return place.key !== action.placeKey;
        })
        // selectedPlace: null
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