import React, { Component } from 'react';
import {  View,  StyleSheet,  Dimensions,  Image,  TouchableOpacity,  Platform,  Text, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

import Dashboard from '../screens/Dashboard';
import Review from '../screens/Review';
import Cart from '../screens/Cart';
import Logout from '../screens/Logout';
import Register from '../screens/Register';
import Login from '../screens/Login';
import Splash from '../screens/Splash';
import ProductDetail from '../screens/ProductDetail';
import DrawerMenu from './DrawerMenu';
import Userdetail from '../screens/Userdetail';

const AuthStack = createStackNavigator({ 
  Splash:{
    screen:Splash,
  },
  Login:{
    screen:Login,
    navigationOptions: () => ({
      title: 'SignIn',
      headerStyle: {
        backgroundColor: '#003f5c',
      },
      headerTintColor: '#fff',
    }),
  },
  Register:{
    screen:Register,
    navigationOptions: () => ({
      title: 'SignUp',
      headerStyle: {
        backgroundColor: '#003f5c',
      },
      headerTintColor: '#fff',
    }),
  },  
});

const DrawerNavigator = createDrawerNavigator(
  {
    Dashboard:{
      screen:Dashboard,
    },
    Cart:{
      screen:Cart,
    },
    Logout:{
      screen:Logout,
    },
  },
  {
    drawerBackgroundColor: "#8080ff",
    contentOptions: {
      activeTintColor: "red" 
    },
    contentComponent: DrawerMenu
  }
);

const Appstack = createStackNavigator({
  Dashboard:{
    screen:DrawerNavigator,
  },
  Userdetail:{
    screen:Userdetail,
  },
  ProductDetail:{
    screen:ProductDetail,
  },
  Review:{
    screen:Review,
  },
},
);

const SwitchNavigator = createSwitchNavigator({  
  Splash:{
    screen:AuthStack,
  },
  Dashboard:{
    screen:Appstack,
  },
},
{
  initialRouteName: 'Splash',  
}
);

export default createAppContainer(SwitchNavigator);