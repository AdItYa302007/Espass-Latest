import React from 'react';import { createAppContainer, createSwitchNavigator,} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { AppTabNavigator } from './components/AppTabNavigator';
import HomeScreen from './screens/HomeScreen';


export default function App() {
  return (
    <AppContainer/>
  );
}

const Navigator =createSwitchNavigator({
    Login:{screen:LoginScreen},
    SignUp:{screen:SignUpScreen},
    //Drawer:{screen: AppDrawerNavigator},
    HomeScreen:{screen:HomeScreen},
    AppTabNavigator:{screen:AppTabNavigator}
})

const AppContainer=createAppContainer(Navigator)