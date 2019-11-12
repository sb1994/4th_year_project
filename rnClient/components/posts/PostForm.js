import React, { Component } from "react";
import { Text, View, TextInput, Button } from "react-native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import styles from "../styles";
export class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.id,
      text: "",
      latitude: "",
      longitude: ""
    };
  }
  componentDidMount() {
    this._getLocationAsync();
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(location);

    this.setState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  };
  submitChatPost() {
    let { text, longitude, latitude } = this.state;
    // this._getLocationAsync();
    // this.socket.emit("chat message", this.state.chatMessage);
    // this.setState({
    //   chatMessage: ""
    // });
    // console.log(this.state);
    axios
      .post("/api/posts", { text, longitude, latitude })
      .then(result => {
        if (result) {
          this.setState({
            text: "dsad"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    // console.log(this.props.id);

    return (
      <View>
        <Text style={styles.heading}>Post Form</Text>
        <TextInput
          placeholder="Post"
          style={styles.input}
          onSubmitEditing={() => this.submitChatPost()}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ text: text })}
        />
      </View>
    );
  }
}

export default PostForm;
