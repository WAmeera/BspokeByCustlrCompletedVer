import React from 'react';
import { Dimensions, TouchableOpacity, StyleSheet, Button, Image, View, Text} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { Card, CardSection, Input, Spinner, Header } from '../src/components/common';
import * as firebase from 'firebase';

export default class statusModal extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
	card: '',
	mail: '',
	name: '',
	loading: false
	};
  }
   
  componentWillMount(){
  this.setState({loading:false}); 
  }

render() {
const Shipment = this.props.navigation.getParam('Shipment','x');
    return (
      <View style = {{height:Dimensions.get('window').height ,    backgroundColor:'#f4f4f4'}}>

      <View style={styles.user}>
        <Image source={require('./image/shipping2.png')}  style={styles.btn2}/>
      </View>

        <Text style = {styles.status}> {Shipment} </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({


  btn2:{
    width: Dimensions.get('window').width*0.4,
    height: Dimensions.get('window').height*0.2,
   
     
  },

  user:{
    justifyContent: 'center', 
    alignItems:'center',
    margin:35,
  },

  status:{
    textAlign:'center',
    fontSize:20,
    fontWeight:'bold',

  }






});


