import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import { connect } from "react-redux";

import Icon from "react-native-vector-icons/Ionicons";
import { deletePlace } from "../../store/actions/index";
import ListItem from "../../components/ListItem/ListItem";

class PlaceDetail extends Component {
  state = {
  };

  placeDeletedHandler = () => {
    this.props.onDeletePlace(this.props.selectedPlace.key);
    this.props.navigator.pop();
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          styles.portraitContainer
        ]}
      >
        <ListItem
          placeText={this.props.selectedPlace.shortText}
          placeDate={this.props.selectedPlace.data}
          placeLocation={this.props.selectedPlace.geo}
          placeImage={this.props.selectedPlace.img}
          placeUser={this.props.selectedPlace.user}
          placeLikes={this.props.selectedPlace.likes}
          userId={this.props.userId}
          onLikePressed={() => this.props.onLikePressed(this.props.selectedPlace.key)}
        />
        <View style={styles.placeDetailContainer}>
          <View style={styles.subContainer}>
            <Image
              source={this.props.selectedPlace.img}
              style={styles.placeImage}
            />
          </View>
        </View>
        <View style={styles.subContainer}>
          <View>
            <Text style={styles.placeText}>
              {this.props.selectedPlace.shortText}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={this.placeDeletedHandler}>
              <View style={styles.deleteButton}>
                <Icon
                  size={30}
                  name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
                  color="red"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1
  },
  portraitContainer: {
    flexDirection: "column"
  },
  placeDetailContainer: {
    flex: 2
  },
  placeImage: {
    width: "100%",
    height: "100%"
  },
  placeText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
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