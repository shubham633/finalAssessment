import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator,}
from 'react-native';
import { Schema } from '../database/Schema';
import Realm from 'realm';
import GoogleSignIn from '../components/GoogleSignIn';
import FacebookSignIn from '../components/FacebookSignIn';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            email: '',
            password: '',
      }
    }

     validateUser=()=> {
        let realm;
        realm = new Realm({ schema: [Schema] })
        var obj= realm.objects('Signup')
        console.log(obj)

        if ((this.state.email == '' && this.state.password == '')) {
            Alert.alert('Please fill the Details')
        }
        else {
            for (let arr of obj) {
                console.log(arr.email_id);
                console.log(arr.password);
                console.log('user'+this.state.email);
              if (arr.email_id == this.state.email && arr.password == this.state.password) {
                this.props.navigation.navigate('Dashboard');
                console.log('success');
                return true;
              }
            }
            alert("enter the correct Email and password");
            return false           
        }
    }
  render(){     
        return(
            
            <View style={styles.container}>

            <TouchableOpacity style={styles.btnSignup}
            onPress={()=>this.props.navigation.navigate('Register')}>
            <Text style={styles.btnTextSignup}>Signup</Text>
            </TouchableOpacity>
            
            <TextInput placeholder='Enter Your Email' style={styles.textField}
            keyboardType='email-address'
            onChangeText={email => this.setState({ email })} />

            <TextInput secureTextEntry={true}
            placeholder='Enter a password' style={styles.textField}
            onChangeText={password => this.setState({ password })} />

            <TouchableOpacity style={styles.btnSignin}
            onPress = {this.validateUser}>
            <Text style={styles.btnTextSignin}>Signin</Text>
            </TouchableOpacity>

            <FacebookSignIn/>
            <GoogleSignIn/>
       
            <Text style={styles.text}>If you don not have an account</Text>

            <TouchableOpacity style={styles.skipSignin}
              onPress={()=>this.props.navigation.navigate('Dashboard')}>
              <Text style={styles.skipTextSignin}>Press Here</Text>
            </TouchableOpacity>

            </View>);
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#003f5c',
    },

    textField:{
        backgroundColor:'white',
        width:'80%',
        height:40,
        borderRadius:10,
        marginBottom:20,
        alignItems:'center',
        fontSize:18,
    },

    btnSignup:{
        marginBottom:20,
        backgroundColor:'red',
        borderRadius:5,
        height:30,
        width:'25%',
        marginLeft:200,
        alignItems: 'center',
  },

    btnTextSignup:{
        color:'white',
        fontWeight: 'bold',
        fontSize:20,
  },

    btnSignin:{
        backgroundColor:'red',
        width:'40%',
        marginTop:5,
        borderRadius:5,
        height:30,
        alignItems:'center',
  },
    btnTextSignin:{
        color:'white',    
        fontWeight: 'bold',
        fontSize:20,
  },
  skipSignin:{
        backgroundColor:'red',
        width:'40%',    
        height:30,
        alignItems:'center',
        marginLeft:200,
        marginTop:10,
  },
    skipTextSignin:{
        color:'white',    
        fontWeight: 'bold',
        fontSize:20,
  },
  text:{    
        fontSize:15,
        color:'white',
        marginTop:120,
  },
});
