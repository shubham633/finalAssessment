import React, {useEffect, useState} from 'react';
import { FlatList,  Text,  View,  Image,  Button,  TouchableOpacity,  StyleSheet, TouchableWithoutFeedback}
 from 'react-native';
import Axios from 'axios';
import {ScrollView } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import Sorting from '../components/Sorting';

const ProductsList = ({navigation}) => {
  const [fetchdata, setFetchdata] =useState(false);
  const [layout, setLayout] = useState(true);
  const [sortPrice, setSortPrice] = useState([]);

  const linear = () => {
    setLayout(false);
  };

  const grid = () => {
    setLayout(true);
  };

  const itemSeparatorLine = () => {
    return (
      <View style={styles.itemSeparatorLine}/>
    );
  }

  useEffect(() => {
    list();
  }, []);

  const list = async () => {
    var raw = {
      category_id: 13,
      filter: '',
      page_num: 1,
      sort: '',
      customer_id: 96,
      wcode: 'DWK,HWH,S71',
    };

    const result = await Axios.post(
      'https://preprod.vestigebestdeals.com/api/rest/dynamickittingproductlistwithfiltersortwarehouse',
      raw,
    );

    const newArray = result.data.data.items.map((item, index) => {
      return {
        id: item['product_id'],
        customerId: item['customer_id'],
        imageUrl: item['images'],
        productName: item.name,
        description: item.description,
        productPrice: item.price,
        specialPrice: item.special_price,
      };
    });
    console.log()
    setFetchdata(newArray);   
  };

  const sortData = ()=>{  
    setName(fetchdata.sort((a, b) => a.productName.localeCompare(b.productName)));
  };

  const sortHighPrice =()=>{
    setSortPrice(fetchdata.sort((Low, High) => parseInt(High.productPrice) - parseInt(Low.productPrice)));
  };
  const sortLowPrice =()=>{
    setSortPrice(fetchdata.sort((Low, High) => parseInt(Low.productPrice) - parseInt(High.productPrice)));
  };

  console.log('price'+sortPrice);
  //console.log('hello'+sortData);
  //console.log(sortData());

  if(layout===true)
  return (
    <View style={styles.linearContainer}>

    <View style={{flex:9}}>
        <FlatList
          data={fetchdata}        
          ItemSeparatorComponent = {itemSeparatorLine}  
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <View>
              <ScrollView>
                <View style={styles.container}>
                  
                  <View style={styles.imageContainer}>
                  <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail', {id:itemData.item.id})}>
                  <Image style={styles.image} source={{ uri: itemData.item.imageUrl }} />
                  </TouchableOpacity>
                  </View>                  

                  <View style={styles.detailContainer}>
                  <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail', {id:itemData.item.id})}>
                  <Text style={styles.productName}>{itemData.item.productName}</Text>  
                  </TouchableOpacity>                 
                  <View style={styles.mrpsaveContainer}>
                  <Text style={styles.mrp}>MRP:  ₹{itemData.item.productPrice}</Text>
                  <Text style={styles.save}>Save:  ₹{
                    (itemData.item.productPrice - itemData.item.specialPrice)
                  }</Text>
                  </View>
                  <Text style={styles.specialPrice}>specialPrice:  ₹{itemData.item.specialPrice}</Text>
                  </View>

                </View>
              </ScrollView>
            </View>
          )}
        /> 
        </View>  

        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.linear}
        onPress={linear}>
        <Text style={styles.linearText}>Grid</Text>
        </TouchableOpacity>    
            
        <Sorting
        sort= {sortData} 
        highPrice={sortHighPrice}
        lowPrice={sortLowPrice}    
        //hello={console.log('welcome'+sortData)}  
        />     
        </View> 

      </View>
  );
  else
  return (
    <View style={styles.gridMainContainer}>
    
    <View style={{flex:9}}>
      <FlatList
        data={fetchdata}  
        numColumns={2}
        key={2}
        horizontal={false}
        ItemSeparatorComponent = {itemSeparatorLine}             
        renderItem={(itemData) => (
          <View>   
              <ScrollView>       
              <View style={styles.gridContainer}>       
                <TouchableOpacity onPress={()=>navigation.navigate('ProductDetail', {id:itemData.item.id})}>
                <Text style={styles.gridProductName}>{itemData.item.productName}</Text>  
                <Image style={styles.gridImage} source={{ uri: itemData.item.imageUrl }} />
                </TouchableOpacity>  

                <View>
                <Text style={styles.mrp}>MRP:  ₹{itemData.item.productPrice}</Text>
                <Text style={styles.save}>Save:  ₹{
                  (itemData.item.productPrice - itemData.item.specialPrice)
                }</Text>          
                <Text style={styles.specialPrice}>specialPrice:  ₹{itemData.item.specialPrice}</Text>                 
                </View>   
                </View>
                </ScrollView>                                                         
        </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        /> 
        </View>  

        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.linear}
        onPress={grid}>
        <Text style={styles.linearText}>Linear</Text>
        </TouchableOpacity> 

        <Sorting
        sort= {sortData} 
        highPrice={sortHighPrice}
        lowPrice={sortLowPrice}    
        //hello={console.log('welcome'+sortData)}  
        />   
        </View> 

      </View>
  );
};

const styles = StyleSheet.create({
    linearContainer:{
      flex:1,
    },
    gridMainContainer:{
        flex:1,
    },
    gridContainer:{
      flexDirection:'column',
      width:'50%'
    },
    gridProductName:{
      fontSize:18,
      fontWeight:'bold',       
    },
    itemSeparatorLine:{
        height: 2,
        width: "100%",
        backgroundColor: "#111a0b",
    },
    container:{
        alignItems:'center',
        flexDirection:'row',    
        flex:1,
    },
    imageContainer:{
        flex:2,
        height:150,
    },
    detailContainer:{
        flex:3,
        height:150,
    },
    mrpsaveContainer:{
        flexDirection:'row',
    },
    productName:{
        fontSize:18,
        fontWeight:'bold',  
        marginBottom:5,   
    },
    mrp:{
        fontSize:18,
        color:'gray',
    },
    save:{
        fontSize:18,
        color:'red',
        marginLeft:10,
    },
    image: {
        height: '100%',
        width: '100%',
    },
    specialPrice:{
        fontSize:18,
    },
    gridImageConatiner:{  
      flex:1,    
      flexDirection:'row',
    },
    gridImage:{
      height:150,
      width:150,
    },
    btnContainer:{
      backgroundColor:'blue',
      flex:1,
      flexDirection:'row',
    },
    linear:{
      flex:1,
      backgroundColor:'#8080ff',
      alignItems:'center',
      justifyContent:'center',
    },
    linearText:{
      fontWeight:'bold',
      fontSize:18,
      color:'#0000ff',
    },
    sort:{
      flex:1,
      backgroundColor:'#0000ff',
      alignItems:'center',
      justifyContent:'center',
    },
    sortText:{
      fontWeight:'bold',
      fontSize:18,
      color:'white',
    }

});
export default ProductsList;
