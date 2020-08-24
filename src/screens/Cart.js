import React,{ useState, useEffect } from 'react';
import { FlatList,  Text,  View,  Image,  Button,  TouchableOpacity,  StyleSheet,} from 'react-native';
import Axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const Cart = ({navigation}) =>{
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
        </View>         
        
        <View style={styles.btnContainer}>
        <View style={styles.totalOrderContainer}>
        <Text style={styles.totalOrderText}>Total Order Value</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn}
        onPress={()=>console.log('checkout')}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
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
    totalOrderContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    checkoutBtn:{
        flex:1,
        backgroundColor:'#0000ff',
        alignItems:'center',
        justifyContent:'center',
    },
    totalOrderText:{
        fontWeight:'bold',
        fontSize:18,
        color:'black'
    },
    checkoutText:{
        fontWeight:'bold',
        fontSize:18,
        color:'white',
    }

});

export default Cart;