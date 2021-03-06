import React from 'react';
import { Dimensions,TouchableOpacity,Image,ScrollView,View, Text, Button, StyleSheet } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import MenuButton from '../components/MenuButton.js';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {DrawerActions} from 'react-navigation-drawer';



export default class HomeScreen extends React.Component {

  static navigationOptions =({navigation}) =>({
          title: 'Home       ',
          tabBarIcon:({tintColor}) =>(      //icon on tab navigator
         <View style={{paddingRight:5}}>

          <Image source={require('./image/homeicon.png')}
            style={{width:22,height:22,tintColor:'white'}}>
            </Image>
        </View>
        ),
		 
		headerRight: <TouchableOpacity onPress={()=> navigation.navigate('Login') }>  //instruction to move to next screen
		<Image source={require('./image/homeicon.png')}
            style={{width:22,height:22,tintColor:'white',marginRight : 20}}>
            </Image></TouchableOpacity>
  });

  

  render() {
     const {navigate} = this.props.navigation;



    return (

	
      <View style={styles.container1}>
      <View style={styles.buttonContainer}>
       

        
      <TouchableOpacity activeOpacity={1} onPress={() => navigate('Muscle')} style={styles.btn}>
        <View style={styles.absoluteView}>
            
        </View>
        <Image source={require('./image/muscle.jpg')}  style={styles.img}/>
      </TouchableOpacity>




       </View>

       <View style ={styles.buttonContainer2}>
      
   
      <TouchableOpacity activeOpacity={1} onPress={() => navigate('Slim')} style={styles.btn2}>
        <View style={styles.absoluteView}>
            
        </View>
        <Image source={require('./image/slim.jpg')}  style={styles.img2}/>
      </TouchableOpacity>



       </View>

       <View style ={styles.buttonContainer}>
                 
      <TouchableOpacity  activeOpacity={1}  onPress={() => navigate('Regular')} style={styles.btn}>
        
        <Image source={require('./image/regular.jpg')}  style={styles.img}/>
      </TouchableOpacity>

              </View>

      </View>
    );
  }
}



const styles = StyleSheet.create({

  absoluteView: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },


  container1: {
    flex: 1,
    width:wp('100%'),
    height:hp('100%'),
    alignItems: 'center',
    justifyContent: 'center'
  },


  buttonContainer: {
    width:wp('100%'),
    height:Dimensions.get('window').height*0.2666,
    justifyContent: 'center',




  },


  buttonContainer2: {
    width:wp('100%'),
    height:Dimensions.get('window').height*0.266,
    justifyContent: 'center',
       marginTop:5,
    marginBottom:5,



  },
  btn2:{
    marginTop:5,
    marginBottom:5,

  },

  header: {
    fontSize: 30,
  },


  img:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.2666,



  },

    img2:{
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*0.2666,
           marginTop:15,
    marginBottom:15,
 


  }









});


