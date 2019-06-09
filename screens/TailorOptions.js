import React, { Component } from 'react';
import {Dimensions,Text,TouchableOpacity, Image, ScrollView,Button, Linking, View, StyleSheet } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase';

export default class TailorOptions extends React.Component {


    static navigationOptions = {
      title: 'Options       ',

  };

  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null,
	  dataSource: [],
	  isLoading :true
    };
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
		 long: child.val().long,
		 lat: child.val().lat,
       });
    });
	this.setState({
	dataSource : items,
	isLoading : false
 });
 });
 };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }



  calculateDis(latitude, longitude){

   const dataSource = this.state.dataSource;
    var arrayLat =['1.3521','6.2088','2.9935','12.8797'];
    var arrayLong=['103.8198','106.8456','101.7874','121.7740'];
      var shortest =100000;
      var shortLat=0.0;
      var shortLong=0.0;
	  var shortestIndex = 0;
      for (var i = 0; i <= dataSource.length-1 ; i++) {
          distance = Math.sqrt(Math.pow(( dataSource[i].lat-latitude),2) + Math.pow(( dataSource[i].long-longitude),2)  ) ;

          if(distance<=shortest){
            shortest=distance;
			shortestIndex = i;
          }

        }
		

    

          this.props.navigation.navigate('Tailor1',{
					image:dataSource[shortestIndex].image,
					coordinate:dataSource[shortestIndex].coordinate,
					number:dataSource[shortestIndex].number
					});
   
     



        



    }




  render() {
     const {navigate} = this.props.navigation;

  


    return (
      <View style={styles.container}>
    

        <TouchableOpacity activeOpacity={1} onPress={()=>{this.calculateDis(this.state.latitude, this.state.longitude)}} style={styles.buttonContainer}>
            
            <Image source={require('./image/nearest.png')}  style={styles.img}/>

        </TouchableOpacity>


        <TouchableOpacity activeOpacity={1}  onPress={() => navigate('Tailor')} style={styles.buttonContainer}>

            <Image source={require('./image/tailorlist.png')}  style={styles.img}/>


        </TouchableOpacity>



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




  buttonContainer: {
    width:wp('100%'),
    height:hp('50%'),
    justifyContent: 'center',



  },

  img:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.5,


  }

});