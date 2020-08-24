import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Schema } from '../database/Schema';
import Realm from 'realm';

const menuData = [
  { icon: "home", name: "Dashboard", screenName: "Dashboard", key: 1 },
  { icon: "shopping-cart", name: "Cart", screenName: "Cart", key: 2 },
  { icon: "lock", name: "Logout", screenName: "Logout", key: 3}
];

let realm;
realm = new Realm({ schema: [Schema] })
var obj= realm.objects('Signup')
console.log(obj);
var data;
for(data of obj)
{
  console.log('hello'+data.username);
}

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
    this.props = props;
}
  render() { 
    return (
      <View style={styles.container}>
      <View style={styles.userContainer}>
      <Image style={styles.image}/>
      <Text style={styles.text}>Hello {data.username}</Text>
      <View style={styles.personalBtn}>
      <TouchableOpacity
      onPress={()=>this.props.navigation.navigate('Userdetail')}>
      <View style={{flexDirection:'row'}}>
      <Icon name='user' size={25} color="blue"/>
      <Text style={styles.personalText}>Personal Information</Text>
      </View>
      </TouchableOpacity>
      </View>
      </View>
        <View style={styles.drawerConatiner}>
        <FlatList
          data={menuData}
          keyExtractor={item => item.key.toString()}
          renderItem={({ item }) => (
            <DrawerItem
              navigation={this.props.navigation}
              screenName={item.screenName}
              icon={item.icon}
              name={item.name}
              key={item.key}
            />
          )}
        />
        </View>
      </View>
    );
  }
}

const DrawerItem = ({ navigation, icon, name, screenName }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={() =>
      navigation.navigate(`${screenName}`, { isStatusBarHidden: false })
    }
  >
    <Icon name={icon} size={25} color="blue" style={{ margin: 15 }} />
    <Text style={styles.menuItemText}>{name}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.43)",
    paddingTop: 5,
  },
  userContainer:{
    alignItems:'center',
  },
  menuItem: {
    flexDirection: "row"
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "300",
    margin: 15,
    color:'blue'
  },
  image:{
    borderColor: 'black',
    borderWidth: 1,
    height:150,
    width: 150,
    borderRadius: 100,
    backgroundColor:'white',
    margin:15
  },
  text:{
    fontSize:18,
    fontWeight:'bold',
    marginLeft:15
  },
  personalBtn:{
    margin:15,
    marginTop:15
  },
  personalText:{
    fontSize:18,
    fontWeight:'bold',
    color:'blue',
    marginLeft:15
  },
  drawerConatiner:{
    marginTop:40
  }
});

export default DrawerMenu;