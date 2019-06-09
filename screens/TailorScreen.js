import React, { Component } from 'react';
import {TouchableOpacity, Image, ScrollView,Button, Linking, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import TailorItem from './TailorItem';
import * as firebase from 'firebase';
import { Spinner } from '../src/components/common';
import {AppRegistr,FlatList,ListView, ActivityIndicator,Divider, StatusBar} from 'react-native';

export default class Tailor extends Component {

    static navigationOptions = {
      title: 'Custom Tailor       ',

  };

  constructor (props){
      super(props)
      this.state = {
        dataSource : [],
        isLoading: true,
      }
    } 

  componentWillMount (){
  this.setState({isLoading : true});
	firebase.database().ref('Tailors').once('value', snapshot =>{
	 var items = [];
     snapshot.forEach((child) => {
       items.push({
          image: child.val().image,
          coordinate: child.val().coordinate,
          number: child.val().number,
       });
    });
	this.setState({
	dataSource : items,
	isLoading : false
 });
 });
 };

 renderItem = ({item}) => {
      return(
       <TailorItem 
	   itemImage={{uri: item.image}} 
	   numbers={item.number}
	   coordinate={item.coordinate}
	   />
        
      )
    }


renderContent (){
if (this.state.isLoading == true){
return (<Spinner size="large" />);
}
else{
return (<FlatList
            numColumns={1}
            data = {this.state.dataSource}
          renderItem = {this.renderItem}
          />)
}

}
  render() {



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


  },




  menuContainer: {
    width:wp('100%'),
    height:hp('100%'),

  },



});