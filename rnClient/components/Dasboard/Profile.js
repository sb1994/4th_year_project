import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // console.log(this.props.user);
    let { user } = this.props;

    return (
      <View>
        <Text>{this.props.user.name}</Text>
        <Image
          source={{ uri: user.profile_pic }}
          style={{ width: 100, height: 100 }}
        />
      </View>
    );
  }
}
export default Profile;
const styles = StyleSheet.create({});
