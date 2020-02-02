import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  AsyncStorage
} from "react-native";
import * as SecureStore from "expo-secure-store";
import styles from "../styles";
import axios from "axios";
export class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // email: "Sean94@gmail.com",
      // password: "Seancal123"
      email: "",
      password: ""
    };
  }
  //gets rid of the stack native header
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    SecureStore.getItemAsync("token").then(token => {
      // console.log(token);
      if (token) {
        // console.log(h);
        this.props.navigation.navigate("Dashboard");
      }
    });
    // SecureStore.deleteItemAsync("token");
  }
  registerForm() {
    this.props.navigation.navigate("Register");
  }
  checkLogin() {
    const { email, password } = this.state;
    ///test ti see iff axois requests were made

    // if (username === "Admin " && password === "Admin") {
    //   // console.warn(username, password);
    //   //push to the dashboard using the router
    //   this.props.navigation.navigate("Dashboard");
    // } else {
    //   Alert.alert("Wrong username || password");
    // }

    if (email !== "" && password !== "") {
      // console.warn(email, password);
      //push to the dashboard using the router
      axios
        .post("api/users/login", { email, password })
        .then(result => {
          // console.log(result.data);
          const { success, token } = result.data;
          console.log(success);

          if (success) {
            SecureStore.setItemAsync("token", token);
            this.props.navigation.navigate("Dashboard");
          }
        })
        .catch(err => {
          console.log(err);
        });

      // this.props.navigation.navigate("Dashboard");
    } else {
      Alert.alert("Enter email || password");
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
          placeholder="email"
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          placeholder="Password"
          style={input}
          // secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ password: text })}
        />
        <Button title="Login" onPress={() => this.checkLogin()} />
        <Button title="Register" onPress={() => this.registerForm()} />

        <Button title="Get token" onPress={() => this.getToken()} />
      </View>
    );
  }
}

export default LoginScreen;
