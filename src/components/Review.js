import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList,Button, alert, Alert, Modal} from 'react-native';
import Axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Review = (props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [fetchdata, setFetchdata] = useState(false);
  const productId = props.productId;
  console.log('hello'+productId);

  useEffect(() => {
    results();
  }, []);

  const results = async () => {
    var raw = { 
      product_id: 6205,
      customer_id: 96,
      wcode: 'DWK,HWH,S71'
    };
    const reviews = await Axios.get(
      'https://preprod.vestigebestdeals.com/api/rest/getreview/productId/6205',
      raw
    );
    const Array = reviews.data.data.reviewlist.map((item, index) => {
      return {
        date: item.date,
        name: item.nickname,
        detail: item.detail,
        vote: item.vote
      };
    });
    setFetchdata(Array);
  };

  return (
    <View>
    <Modal
    animationType = {"fade"}  
    transparent = {true}  
    visible={modalVisible}  
    onRequestClose={() => {
    Alert.alert("Modal has been closed.");
    }}>
    <View style = {styles.modal}>
    <FlatList
    data={fetchdata}
    keyExtractor={(item) => item.date}
    renderItem={(itemData)=>(
      <View style={styles.customerReview}>
      <Text style={styles.text}>Date: {itemData.item.date}</Text>
      <Text  style={styles.text}>Name: {itemData.item.name}</Text>
      <Text  style={styles.text}>Detail: {itemData.item.detail}</Text>
      <Text  style={styles.text}>Vote: {itemData.item.vote}</Text>
      </View>
     )}
    />
    <TouchableOpacity style={styles.okBtn}
    onPress={()=>setModalVisible(!modalVisible)}>
    <Text style={styles.okText}>OK</Text>
    </TouchableOpacity>
    </View>
    </Modal>     
        <TouchableOpacity 
        onPress={() => {setModalVisible(true);}}>
        <Text style={styles.reviewText}>See Review</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  customerReview:{
    marginBottom:100,
  },
  text:{
    fontSize:18
  },
  okText:{  
    color: 'white', 
    fontWeight:'bold',
    fontSize:18,  
  },
  reviewText:{
    fontWeight:'bold',
    fontSize:18,
    marginBottom:20
  } 
});

export default Review;