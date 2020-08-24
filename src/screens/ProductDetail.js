import React,{ useState, useEffect } from 'react';
import { FlatList,  Text,  View,  Image,  Button,  TouchableOpacity,  StyleSheet,} from 'react-native';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Review from '../components/Review';

const ProductDetail = ({navigation}) =>{
    const [fetchdata, setFetchdata] =useState(false);
    const id = navigation.getParam('id');

    useEffect(() => {
        detail(id);
    }, []);
    
    const detail = async id => {
        var raw = {
            product_id:id,
            customer_id:96, 
            wcode:'DWK,HWH,S71'          
        };
        const result = await Axios.post(
          'https://preprod.vestigebestdeals.com/api/rest/productdetails',
          raw,
        );
        console.log('hello'  +result.data.data.product_id);
        setFetchdata(result.data.data);        
    };
    
    return(
        <View style={styles.container}>   
        <View style={styles.nameContainer}>   
        <Text style={styles.name}>{fetchdata.name}</Text> 
        </View>       
        <View style={styles.imageContainer}>
        <ScrollView horizontal={true}>
        <Image style={styles.image} source={{uri: fetchdata.image_url}}/>
        </ScrollView>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Review', {id:fetchdata.product_id})}>
        <Text>See Review</Text>
        </TouchableOpacity>
        </View>         
        
        <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.cartBtn}
        onPress={()=>console.log('cart')}>
        <Text style={styles.cartText}>ADD TO CART</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyBtn}
        onPress={()=>console.log('buy')}>
        <Text style={styles.buyText}>BUY NOW</Text>
        </TouchableOpacity>
        </View>

        </View>               
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        flex:1,
    },
    nameContainer:{
        flex:1,
    },
    name:{
        fontSize:22,
        fontWeight:'bold',  
        marginBottom:5,     
    },
    imageContainer:{
        flex:5,
    },
    image:{
        width:200,
        height:250,       
    },
    btnContainer:{
        flexDirection:'row',
        flex:1,        
    },
    cartBtn:{
        flex:1,
        backgroundColor:'#8080ff',
        alignItems:'center',
        justifyContent:'center',
    },
    buyBtn:{
        flex:1,
        backgroundColor:'#0000ff',
        alignItems:'center',
        justifyContent:'center',
    },
    cartText:{
        fontWeight:'bold',
        fontSize:28,
        color:'#0000ff',
    },
    buyText:{
        fontWeight:'bold',
        fontSize:28,
        color:'white',
    }

});

export default ProductDetail;