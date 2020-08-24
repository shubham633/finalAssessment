import React from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';

const Logout = ({navigation}) =>{
  return(navigation.navigate('Login'));
}

const styles = StyleSheet.create({});

export default Logout;