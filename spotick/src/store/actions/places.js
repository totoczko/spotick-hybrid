// import { ADD_PLACE, DELETE_PLACE, SELECT_PLACE, DESELECT_PLACE } from './actionTypes'
import { ADD_PLACE, DELETE_PLACE } from './actionTypes'

export const addPlace = (placeName, location, image) => {
  return {
    type: ADD_PLACE,
    placeName: placeName,
    location: location,
    image: image
  };
}


export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key
  };
}

// export const selectPlace = (key) => {
//   return {
//     type: SELECT_PLACE,
//     placeKey: key
//   };
// }

// export const deselectPlace = () => {
//   return {
//     type: DESELECT_PLACE
//   };
// }