import React, {useState} from 'react';
import {View,Text,TouchableOpacity,Image,Button,TextInput,StyleSheet} from 'react-native';
import Realm from 'realm';
import {Schema} from '../database/Schema';
import {updateUser} from '../database/AllQuerySchema';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

let realm;
const Userdetail = (props) => {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [editable, setEditable] = useState(false);

  
  var value;
  var obj;
  realm = new Realm({schema: [Schema]});
    obj = realm.objects('Signup');
    console.log(obj);
    for(value of obj)
    console.log('update'+value.username);
  
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 10}}>UserName: </Text>
        <TextInput
          style={styles.text}
          placeholder={value.username}
          value={name}
          onChangeText={(text) => {
            setName(text);}}
          editable={editable}
        />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 10}}>PhoneNo: </Text>
        <TextInput
          style={styles.text}
          placeholder={value.phone_no}
          value={phoneNo}
          onChangeText={(text) => {
            setPhoneNo(text);}}
          editable={editable}
        />
      </View>
      <Button
        title="update"
        onPress={() => {
          const userData = {
            username: username,
            phone_no: phone_no,
          };
          updateUser(userData);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create(
    {
        text:{
            width:'60%',
            fontWeight:'bold'
        }, 

    }
)
export default Userdetail;
