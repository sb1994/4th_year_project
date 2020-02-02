import React, { Component } from "react";
import { Text, View, TextInput, Button, Alert } from "react-native";
import axios from "axios";
import styles from "../styles";
export class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      email: ""
    };
  }
  static navigationOptions = {
    header: null
  };
  // componentDidMount() {
  //   axios
  //     .get("http://192.168.0.129:5000/api/users/test")
  //     .then(result => {
  //       Alert.alert(result.data.msg);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  checkSignup() {
    const { name, password, email } = this.state;

    if (name !== "" && password !== "" && email !== "") {
      axios
        .post("http://192.168.0.129:5000/api/users/register", {
          name,
          email,
          password
        })

        .then(result => {
          // console.log(result.data);
          const { user } = result.data;
          if (user) {
            this.props.navigation.navigate("Dashboard");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  render() {
    const { parent, input, heading } = styles;
    return (
      <View style={parent}>
        <Text> Register Screen </Text>
        <TextInput
          style={input}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ name: text })}
          placeholder="Name"
        />
        <TextInput
          style={input}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ email: text })}
          placeholder="Email"
        />
        <TextInput
          style={input}
          secureTextEntry={true}
          underlineColorAndroid="transparent"
          onChangeText={text => this.setState({ password: text })}
          placeholder="Password"
        />

        <Button title="Register" onPress={() => this.checkSignup()} />
      </View>
    );
  }
}

export default RegisterScreen;
