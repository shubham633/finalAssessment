import React, {useState} from 'react';  
import {Platform, StyleSheet, Text, View, Button, Modal, Alert, TouchableOpacity} from 'react-native';  
  
const Sorting =(props)=> {  
  const [modalVisible, setModalVisible] = useState(false); 
  const [isSelected, setSelection] = useState(false);

    return (  
      <View style = {styles.container}>  
        <Modal            
          animationType = {"fade"}  
          transparent = {true}  
          visible={modalVisible}  
          onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          }} >
         
              <View style = {styles.modal}>   
              <Button title='high to low' onPress={props.highPrice}/>
              <Button title='low to high' onPress={props.lowPrice}/>  
              <TouchableOpacity style={styles.okBtn}
              onPress={()=>setModalVisible(!modalVisible)}>
              <Text style={styles.okText}>OK</Text>
              </TouchableOpacity>
             </View>         
        </Modal>  
           
        <TouchableOpacity style={styles.sort}
        onPress={() => {setModalVisible(true);}}>
        <Text style={styles.sortText}>Sort</Text>
        </TouchableOpacity>
      </View>  
    );  
 
}  
  
const styles = StyleSheet.create({
    container:{
        flex: 1,  
        alignItems: 'center',  
        justifyContent: 'center',  
        backgroundColor: '#ecf0f1',
    },  
    modal:{  
        justifyContent: 'center',  
        alignItems: 'center',
        backgroundColor : "#8080ff",   
        height: '50%' ,  
        width: '80%',  
        borderRadius:10,            
        marginTop: '40%',  
        marginLeft: 40,
    },  
    okBtn:{
        marginTop:'40%',
        marginLeft:'60%'      
    },
    okText:{  
        color: 'white', 
        fontWeight:'bold',
        fontSize:18,  
    },
    btnText:{
        fontWeight:'bold',
        fontSize:18,
        color:'white',
        marginTop:50,
    },
    sort:{
        flex:1,
        backgroundColor:'#0000ff',
        alignItems:'center',
        justifyContent:'center',
        width:'100%'
    },
    sortText:{
        fontWeight:'bold',
        fontSize:18,
        color:'white',
    } 
});  

export default Sorting;