import React, { Component } from 'react';
import { Modal, TouchableOpacity, Text, View, Dimensions, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class MenuModal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible() {
    this.setState(prevState => {
      return { modalVisible: !prevState.modalVisible }
    });
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Modal
            transparent={true}
            animationType="fade"
            visible={this.state.modalVisible}
            onRequestClose={() => this.setModalVisible()}
          >
            <View style={[styles.container, styles.modalBackgroundStyle]}>
              <View style={styles.innerContainerTransparentStyle}>
                <TouchableOpacity
                  onPress={this.props.deleteHandler}>
                  <Text style={styles.menuItem}>Usuń</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setModalVisible()} >
                  <Text style={styles.menuItem}>Anuluj</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View >
        <TouchableOpacity onPress={() => this.setModalVisible()}>
          <View style={styles.deleteButton}>
            <Icon
              size={30}
              name={Platform.OS === "android" ? "md-more" : "ios-more"}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalBackgroundStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)'
  },
  innerContainerTransparentStyle: {
    backgroundColor: '#fff',
    padding: 20,
    width: Dimensions.get('window').width * 0.8
  },
  menuItem: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16
  },
  deleteButton: {
    marginRight: 15
  }
});

export default MenuModal
