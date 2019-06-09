import React, { Component } from 'react';
import {TouchableOpacity, Image, ScrollView,Button, Linking, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import TailorItem from './TailorItem';

export default class Tailor1 extends Component {

    static navigationOptions = {
      title: 'Tailors       ',

  };


  render() {

const image = this.props.navigation.getParam('image',' ');
const coordinate = this.props.navigation.getParam('coordinate',' ');
const number = this.props.navigation.getParam('number', ' ');

    return (
      <View style={styles.container}>
    
         <View style={styles.menuContainer}>

            <TailorItem 
	   itemImage={{uri: image}} 
	   numbers={number}
	   coordinate={coordinate}
	   />
            



         </View>







      </View>
    );
  }
  

  

}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:65,

  },

         image: {
            margin:15,
            width:wp('50%'),
            height:hp('40%'),

         },


  menuContainer: {

    width:wp('100%'),
    height:hp('100%'),
  },



});