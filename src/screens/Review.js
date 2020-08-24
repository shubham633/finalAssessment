import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet, FlatList,Button, alert, Alert} from 'react-native';
import Axios from 'axios';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const Review = ({navigation}) => {
  const [fetchdata, setFetchdata] = useState(false);
  const id = navigation.getParam('id');

  useEffect(() => {
    results(id);
  }, []);

  const results = async id => {
    var raw = { 
      product_id: id,
      customer_id: 96,
      wcode: 'DWK,HWH,S71'
    };
    const reviews = await Axios.get(
      'https://preprod.vestigebestdeals.com/api/rest/getreview/productId/5273',
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
    </View>
  );
}

const styles = StyleSheet.create({
  customerReview:{
    marginBottom:100,
  },
  text:{
    fontSize:18
  },
});

export default Review;