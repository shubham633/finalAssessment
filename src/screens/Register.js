import React,{Component} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar, Image, Dimensions, TouchableOpacity, TextInput, Alert}
from 'react-native';
import ChooseImage from '../components/ChooseImage';
import { addUser } from '../database/AllQuerySchema'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            name: '',
            email: '',
            mobile: '',
            password:'',
            confirmPassword:'',
        }
    }

    registerUser = () => {
        const myData = {
            username: this.state.name,
            email_id: this.state.email,
            password: this.state.password,
            phone_no: this.state.mobile,
            confirm_password: this.state.confirmPassword
          }
        if((this.state.name=='')||(this.state.mobile==''))
        {
            Alert.alert('Please fill the details')
        }
        else if ((this.state.email == '') && (this.state.password == ''))         
            Alert.alert('Email and password can not be empty')        
        else if((this.state.password !== this.state.confirmPassword))
            Alert.alert('Password and Re-enter Password must be same')
        else {         
            addUser(myData) 
            console.log(myData);
            Alert.alert("SignUp Sucessfull")
        }
    }


    render() {
        return(
            <View style={styles.container}>

            <ChooseImage/>

            <TouchableOpacity style={styles.btnSignin}
            onPress={()=>this.props.navigation.navigate('Login')}>
            <Text  style={styles.btnTextSignin}>Signin</Text>
            </TouchableOpacity>

            <TextInput placeholder='Enter Your Name' style={styles.textField}
            onChangeText={name => this.setState({ name })} />

            <TextInput placeholder='Enter Your Email' style={styles.textField}
            keyboardType='email-address'
            onChangeText={email => this.setState({ email })} />

            <TextInput placeholder='Enter Your mobile' style={styles.textField}
            keyboardType='numeric'
            onChangeText={mobile => this.setState({ mobile })} />

            <TextInput secureTextEntry={true}
            placeholder='Enter Your password' style={styles.textField}
            onChangeText={password => this.setState({ password })} />

            <TextInput secureTextEntry={true}
            placeholder='Re-enter Your password' style={styles.textField}
            onChangeText={confirmPassword => this.setState({ confirmPassword })} />

            <TouchableOpacity style={styles.btnSignup}
            onPress = {this.registerUser}>
            <Text style={styles.btnTextSignup}>Signup</Text>
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
    btnSignin:{
        marginBottom:10,
        backgroundColor:'red',
        borderRadius:5,
        height:30,
        width:'25%',
        marginLeft:200,
        alignItems: 'center',
    },
        btnTextSignin:{
        color:'white',
        fontWeight: 'bold',
        fontSize:20,
    },

    textField:{
        backgroundColor:'white',
        width:'80%',
        height:40,        
        marginBottom:10,
        alignItems:'center',
        fontSize:18,
    },

    btnSignup:{
        backgroundColor:'red',
        width:'40%',
        marginTop:15,
        marginBottom:10,
        borderRadius:5,
        height:30,
        alignItems:'center',
    },
    btnTextSignup:{
        color:'white',        
        fontWeight: 'bold',
        fontSize:20,
    },
});