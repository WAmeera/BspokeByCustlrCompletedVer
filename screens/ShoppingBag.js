import React, {Component} from 'react';
import {ScrollView,Dimensions,TouchableOpacity,Styles,AppRegistry,StyleSheet,Text,View,Button,FlatList,Image,ActivityIndicator,Divider, StatusBar} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase';
import { Spinner} from '../src/components/common';


/***************************class ShoppingBag*************************************/
export default class ShoppingBag extends React.Component {
   static navigationOptions = {
          title: 'Cart     ',
          tabBarIcon:({tintColor}) =>(
        <View style={{paddingRight:5,paddingTop:2}}>
 
          <Image source={require('./image/cart.png')}
            style={{width:23,height:23,tintColor:'white'}}>
            </Image>
        </View>   
        )
  };
    //default constructor for class ShoppingBag
    constructor (){
      super()
      this.state = {
        dataSource : [],
        isLoading: true,
    currentUser : null
      }
    }
  

  //fetch user's items and its information from database
  componentWillMount (){
   global.itemCount = 0;  
   global.totalPrice = 0; 
   this.setState ({isLoading : true});

  firebase.auth().onAuthStateChanged((user) => {
   const { currentUser } = firebase.auth();
   this.setState ({currentUser});
   const currentUser2 = this.state.currentUser;

  firebase.database().ref(`ShoppingBag/${currentUser2.uid}/cart/`).once('value', snapshot =>{
   var ShoppingBag = [];
     snapshot.forEach((child) => {
       ShoppingBag.push({
          brand: child.val().brand,
          name: child.val().name,
          Price: child.val().Price,
          itemID : child.val().itemID,
          Size: child.val().size,
          Quantity: child.val().Quantity,
          Photo1: child.val().Photo1,
          category: child.val().category,
          collar: child.val().collar,
          shoulder: child.val().shoulder,
          chest: child.val().chest,
          sleeve: child.val().sleeve,
          uniqueKey: child.key,
      
       });
        itemCount += 1; 
        totalPrice += child.val().Price; 
    });
   totalPrice = totalPrice.toFixed(2);
  this.setState({
  dataSource : ShoppingBag,
  isLoading : false
 });
 });
 })};


  //function renderItem - will show the informations fetched from the database to the user-end (the shopping bag list)
    renderItem = ({item}) => {
      const size = this.props.navigation.getParam('size', '');
      var itemprice = item.Price;  
      var uniqueKey = item.uniqueKey;  
      return(
        <View style ={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
         <Image  style = {{width: 140, height: 190, margin: 5}}
            source = {{uri : item.Photo1}} />
            <View style ={{flex:1, justifyContent: 'center', marginLeft :5}}>
              <Text style  = {{fontSize: 20, color: 'black', marginBottom: 2, marginTop : 0}}>
                {item.brand}
              </Text>
              <Text style  = {{fontSize: 16, color: 'black'}}>
                {item.name}
              </Text>
              <Text style  = {{fontSize: 14, color: 'red', marginBottom: 15}}>
                RM {item.Price.toFixed(2)}
              </Text>
              <Text style  = {{fontSize: 14, color: 'black'}}>
                Size : {item.Size} 
              </Text>
              <Text style  = {{fontSize: 14, color: 'black', marginBottom: 2}}>
                Measurement : {item.collar}cm (Collar) - {item.shoulder}cm (Shoulder) - {item.chest}cm (Chest) - {item.sleeve}cm (Sleeve)
              </Text>
              <Text style  = {{fontSize: 14, color: 'green'}}>
                Quantity : {item.Quantity} 
              </Text>
               <Button onPress={() => this.deleteData(uniqueKey, itemprice)} title="Remove Item" color="black"/> 
            </View>
        </View>
      )
    }

    //upon deleting an item, remove that item from database, minus that item's price off from total price, 
    //minus that item counts from the total counts, and through the function onDelete(), re-fetch items from database
    deleteData  = (key, price)  => { 
    const currentUser2 = this.state.currentUser;
      totalPrice -= price;  
      itemCount -= 1;
      firebase.database().ref(`ShoppingBag/${currentUser2.uid}/cart/`).child(key).remove();
      this.onDelete();
    }

    onDelete = () => {
      this.componentWillMount ();
    }

    renderSeperator = () => {
      return(
        <View
          style={{height: 1, width: '100%', backgroundColour : 'black'}}>
        </View>
      )
    }
  
  submit(){
  console.log (this.state.dataSource);
  if (this.state.dataSource.length=== 0)
  alert ("Purchase something before you checkout!");
  else
  this.props.navigation.navigate('Payment1');
  }

  checkCart (){
if (this.state.isLoading == false)
{
  if (this.state.dataSource.length!= 0)
  {
    return (
    <FlatList
            data = {this.state.dataSource}
            renderItem = {this.renderItem}
            ItemSeperatorComponent = {this.renderSeperator}
          />
    )
  }
  else
  {
    return (
     <View style={styles.imgContainer}>
    <Image source={require('../empty_shopping_bag.png')} style={styles.img}/>
    <View style={styles.textContainer}>
      <Text style={styles.text}> Cart is Empty </Text>
    </View>
    </View>


    )
  }
}
else
{ 
  return 
  <View>
  <Spinner size="large" />
  </View>;
  }
  }

    render () {
      return (
        <View style = {{flex: 1, alignContent: 'center'}}>
      
            {this.checkCart()}    
        

        <View style={styles.bottom}>
          <View style={{ backgroundColor: '#AAAAAA'}}>
            <Text></Text>
            <Text style  = {{fontSize: 14, color: '#FFFF'}}>  Sub-total ({itemCount} item(s)) : RM {totalPrice} </Text> 
            <Text></Text>
            <Text style  = {{fontSize: 14, color: '#FFFF'}}>  Est. Shipping : FREE </Text>
            <Text></Text>
            <Text></Text>
            <View style={{ borderBottomColor: '#FFFF', borderBottomWidth: 1, borderWidth: 0.5}}/>
            <Text></Text>
            <Text style  = {{fontSize: 14, color: '#FFFF'}}>  Grand total : RM {totalPrice} </Text>
            <Text></Text>
            <Text></Text>
            <View style={{ borderBottomColor: '#FFFF', borderBottomWidth: 1, borderWidth: 0.5}}/>
              <View style={{ backgroundColor: 'black'}}>
                <Text></Text>
                <Text></Text>
          <View style={styles.button}>
            <TouchableOpacity activeOpacity={1}  onPress={() => this.submit()} >
              <Image source={require('./image/checkout.png')}  style={styles.btn}/>
            </TouchableOpacity>
    
         </View>   






                <Text></Text>
                <Text></Text>
              </View>
            </View>
            </View>


        </View>
    );
  }
} 


const styles = StyleSheet.create({

   img:{
    width: Dimensions.get('window').width*0.55,
      height:Dimensions.get('window').height*0.3,

    },

bottom:{
flex: 1,
  justifyContent: 'flex-end',
},

imgContainer:{
  alignItems:'center',
  justifyContent:'center',
  flex:1,
  margin:20,
},

text:{
  fontSize:20,
  fontWeight:'bold',
  color:'grey',
},
textContainer:{
  margin:10,
},

btn:{
      width: Dimensions.get('window').width,
      height:Dimensions.get('window').height*0.04,

}
  


});