import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from '../screens/ProfileScreen';



export const AppTabNavigator = createBottomTabNavigator({
  Profile : {
    screen: ProfileScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/profile.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Profile",
    }
  },
 
});
