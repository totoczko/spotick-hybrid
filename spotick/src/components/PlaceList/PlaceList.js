import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import ListItem from '../ListItem/ListItem';

const PlaceList = (props) => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.places}
      renderItem={(info) => (
        <ListItem
          placeText={info.item.shortText}
          placeDate={info.item.data}
          placeLocation={info.item.geo}
          placeImage={info.item.img}
          placeUser={info.item.user}
          placeLikes={info.item.likes}
          userId={props.userId}
          onItemPressed={() => props.onItemSelected(info.item.key, props.onLikePressed, props.userId)}
          onLikePressed={() => props.onLikePressed(info.item.key)}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
})

export default PlaceList