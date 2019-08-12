import React, { Component } from "react";
import {
  View,
  StyleSheet,
} from "react-native";
import { connect } from "react-redux";
import { deletePlace } from "../../store/actions/index";
import ListItem from "../../components/ListItem/ListItem";

class PlaceDetail extends Component {

  placeDeletedHandler = () => {
    console.log(this.props.selectedPlace.key)
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <ListItem
          placeText={this.props.selectedPlace.shortText}
          placeDate={this.props.selectedPlace.data}
          placeLocation={this.props.selectedPlace.geo}
          placeImage={this.props.selectedPlace.img}
          placeUser={this.props.selectedPlace.user}
          placeLikes={this.props.selectedPlace.likes}
          userId={this.props.userId}
          onLikePressed={() => this.props.onLikePressed(this.props.selectedPlace.key)}
          deleting={this.props.deletingEnabled}
          deleteHandler={this.placeDeletedHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  deleteButton: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onDeletePlace: key => dispatch(deletePlace(key))
  };
};

export default connect(null, mapDispatchToProps)(PlaceDetail);