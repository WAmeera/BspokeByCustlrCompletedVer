import React, { Component } from 'react';
import { Dimensions, Image,ScrollView,View, Text, Button, StyleSheet, AsyncStorage, TouchableOpacity} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Items from '../components/items';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import {AppRegistr,FlatList,ListView, ActivityIndicator,Divider, StatusBar} from 'react-native';
import * as firebase from 'firebase';
import { Spinner} from '../src/components/common';

export default class shipment extends React.Component {
    static navigationOptions = {
      title: 'Shipment       ',

  };

constructor (props){
      super(props)
      this.state = {
        dataSource : [],
        isLoading: true,
		categoryArray : '',
		colorArray : '',
		currentUser : null,
      }
    } 

componentWillMount (){
this.setState ({isLoading :true});
 firebase.auth().onAuthStateChanged((user) => {
   const { currentUser } = firebase.auth();
    this.setState ({currentUser});
	currentUser2 = this.state.currentUser;
	firebase.database().ref(`Shipping/${currentUser2.uid}/`).once('value', snapshot =>{
	 var items = [];
     snapshot.forEach((child) => {
       items.push({
          brand: child.val().item.brand,
          name: child.val().item.name,
          Price: child.val().item.Price,
		  ID : child.val().item.ID,
		  category : child.val().item.category,
		  color : child.val().item.color,
		  Shipment : child.val().item.Shipment,
		  Photo1 : child.val().item.Photo1,
       });
    });
	this.setState({
	dataSource : items,
	isLoading :false
 });
 });
 })};
    
renderItem = ({item}) => {
      return(
         <View style = {styles.menuItem}>




                <View style = {styles.menuItem}>
                    <TouchableOpacity activeOpacity={1} style={styles.buttonContainer} onPress={() => 
					this.props.navigation.navigate('statusModal',{ Shipment : item.Shipment})} >
                        <Image source={{uri:item.Photo1}}  style={styles.image}/>         
                        <Text style  = {{fontSize: 16, color: 'black'}}>
                {item.brand}
              </Text>
              <Text style  = {{fontSize: 12, color: 'black'}}>
                {item.name}
              </Text>
              <Text style  = {{fontSize: 10, color: 'red'}}>
                RM {item.Price}
              </Text>
                    </TouchableOpacity>
                </View>
           
            </View>
      )
    }
	
renderContent(){
if (this.state.isLoading == false)
{
  
	if (this.state.dataSource.length!= 0)
		return (
		 
        <FlatList
           numColumns={2}
           data = {this.state.dataSource}
            renderItem = {this.renderItem}
          />
		
    
		)
		else
		return (
      <View style={styles.imgContainer}>
    <Image source={require('../empty_shopping_bag.png')} style={styles.img}/>
    <View style={styles.textContainer}>
      <Text style={styles.text}> Empty </Text>
    </View>
    </View>
      )
}
else
{
return <Spinner size="large" />;
}		
}

 render() {
    const {navigate} = this.props.navigation;
    return (
	<View style={styles.container}>
    {this.renderContent()}
	</View>
    );
  }

}      

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:wp('100%'),
    height:hp('100%'),
    backgroundColor:'#f4f4f4'

  },


  img:{
    width: Dimensions.get('window').width*1,
    height: Dimensions.get('window').height*0.75,

  },

  menuContainer:{
    flexDirection:'row',
    flexWrap: 'wrap',
  },

  scroll:{
        backgroundColor:'#efefef',

  },

  menuItem: {

            backgroundColor:'#fff',
            borderColor:'#dddddd',
             borderWidth: 1,
             alignItems:'center',
             margin: 5,
             width: wp('46%'),
             height:hp('40%'), 



         },

         image: {
            width:wp('43%'),
            height:hp('30%'),

         },

           buttonContainer: {
             width:'90%',
             justifyContent: 'center',
             margin: 10,


           },

           text:{
            textAlign:'center',
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
   img:{
    width: Dimensions.get('window').width*0.55,
      height:Dimensions.get('window').height*0.3,

    },



});