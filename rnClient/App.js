import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RegisterScreen from "./components/auth/RegisterScreen";
import LoginScreen from "./components/auth/LoginScreen";
import Dashboard from "./components/Dasboard/Dashboard";

import * as SecureStore from "expo-secure-store";
import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.129:5000";
axios.interceptors.request.use(
  async config => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const Router = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  },
  Dashboard: {
    screen: Dashboard
  }
});

const App = createAppContainer(Router);

export default App;
