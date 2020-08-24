import React from 'react';
import {View, Text, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Userdetail = ({navigation}) =>{
  return(
    <View>
    <Text>
    Userdetail
    </Text>
    <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
    <Text>Dashboard</Text>
    </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({});

export default Userdetail;