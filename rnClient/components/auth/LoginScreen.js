import React, { Component } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import styles from "../styles";
export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }
  //gets rid of the stack native header
  static navigationOptions = {
    header: null
  };
  checkLogin() {
    const { username, password } = this.state;
    if (username === "Admin " && password === "Admin") {
      // console.warn(username, password);
      //push to the dashboard using the router
      this.props.navigation.navigate("Dashboard");
    } else {
      Alert.alert("Wrong username || password");
    }
  }
  render() {
    const { heading, input, parent } = styles;

    return (
      <View style={parent}>
        <Text style={heading}>Login</Text>
        <TextInput
          style={input}
          underlineColorAndroid="transparent"
          placeholder="username"
          onChangeText={text => this.setState({ username: text })}
        />
        <TextInput
          placeholder="Password"
          style={input}
          // secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ password: text })}
        />
        <Button title="Login" onPress={() => this.checkLogin()} />
      </View>
    );
  }
}

export default LoginScreen;
