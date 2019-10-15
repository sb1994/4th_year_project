import React, { Component } from "react";
import { Text, View } from "react-native";
import styles from "../styles";
class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { heading, input, parent } = styles;
    return (
      <View style={parent}>
        <Text style={heading}> Welcome to the dashBorad </Text>
      </View>
    );
  }
}
export default Dashboard;
