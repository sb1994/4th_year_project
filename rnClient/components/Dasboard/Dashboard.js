import React, { Component } from "react";
import { Text, View, Alert, Image } from "react-native";
import axios from "axios";
import Profile from "./Profile";
import PostForm from "../posts/PostForm";
import styles from "../styles";
import * as SecureStore from "expo-secure-store";

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      isLoading: true
    };
  }

  componentDidMount() {
    SecureStore.getItemAsync("token").then(token => {
      if (token) {
        // console.log(token);
        // SecureStore.deleteItemAsync("token");
        axios
          .get("/api/users/current")
          .then(result => {
            // console.log(result.data);
            this.setState({
              user: result.data.user,
              isLoading: false
            });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.props.navigation.navigate("Login");
      }
    });
  }
  render() {
    const { heading, input, parent } = styles;
    const { user, isLoading } = this.state;
    // console.log(user);
    // console.log()
    if (isLoading) {
      return (
        <View style={parent}>
          <Text style={heading}> Loading ....</Text>
        </View>
      );
    } else {
      return (
        <View style={parent}>
          <Text style={heading}> DashBorad </Text>
          {/* <Text style={heading}> {user.name} </Text>
          <Image
            source={{ uri: user.profile_pic }}
            style={{ width: 100, height: 100 }}
          /> */}
          {/* <Text style={heading}> {user.} </Text> */}
          {/* <Text style={heading}> {user.email} </Text> */}
          {/* <Text style={heading}> {user.id} </Text> */}
          <Profile user={user} />
          <PostForm id={user.id} />
        </View>
      );
    }
  }
}
export default Dashboard;
