import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TabsSwitchItem from '../TabSwitchItem/TabsSwitchItem';

const TabsSwitch = (props) => {
  const renderItems = (items) => (
    items.map((item, key) => {
      return <TabsSwitchItem key={key} id={key} active={props.active === key ? true : false} onPress={props.handleTabClick}>{item}</TabsSwitchItem>
    })
  )
  return (
    <View style={styles.switch}>
      {renderItems(props.items)}
    </View>
  )
}

const styles = StyleSheet.create({
  switch: {
    marginTop: 0,
    marginBottom: 0,
    borderWidth: 0,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50
  }
})

export default TabsSwitch
