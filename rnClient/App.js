import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RegisterScreen from "./components/auth/RegisterScreen";
import LoginScreen from "./components/auth/LoginScreen";
import Dashboard from "./components/Dasboard/Dashboard";
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Hello</Text>
//     </View>
//   );
// }

const Router = createStackNavigator({
  Register: {
    screen: RegisterScreen
  },
  Login: {
    screen: LoginScreen
  },
  Dashboard: {
    screen: Dashboard
  }
});

const App = createAppContainer(Router);

export default App;
