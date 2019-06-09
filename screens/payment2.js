import React, { Component } from 'react';
import {
  Dimensions,
  TouchableOpacity,
  AppRegistry,
  Text,
  Image,
  View,
  Button,
  StyleSheet,
  TextInput,
  Linking,
  Alert,
  Navigator
} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import t from 'tcomb-form-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as firebase from 'firebase';
import { Card2, CardSection2, Input, Spinner, Header } from '../src/components/common';


// here we are: define your domain model


/*const LoginFields = t.struct({
  address: t.String,
 
});*/

/*const options = {
  fields: {

    address: [{
      error: 'Insert address'
    }]
  }
}; // optional rendering options (see documentation)*/


export default class Payment1 extends React.Component {

  static navigationOptions = {
      title: 'Payment       ',
  };

  
  constructor(props) {
    super(props);
    this.state = {
      buttonState: false,
      value: '',
      value2: '',
      value3:''
    }
  }
   componentWillMount (){
   firebase.auth().onAuthStateChanged((user) => {
   const { currentUser } = firebase.auth();
    this.setState ({currentUser});
  })
  };

//make sure all fields are not empty before proceeding, if not then alert
  _onSubmit() {
  const currentUser = this.state.currentUser;
   firebase.database().ref(`/users/${currentUser.uid}/info`)
      .update({ mailingAddress : this.state.value });

    if (this.state.value=='')
    alert ("The card number is empty.");
    else if (this.state.value2=='')
    alert ("CVR is empty");
    else if (this.state.value3=='')
    alert ("The expiry date is empty");
    else
      this.props.navigation.navigate('Payment3');

    
  }

 
  render() {
    return (



 <View style={styles.container}>
      

         <View style={styles.infoContainer}>

            <View style={styles.title}>
              <Text style={styles.mainTitle}> CARD INFO </Text>
              <View style={styles.image1}>
               <Image 
              
              source={require('./image/card.png')}
              style={styles.image}
              />
              </View>
            </View> 

           <View style={styles.form}>//form of fields of card information 




             <Card2>

                  <View style={styles.card}>
                          <CardSection2>
                        <TextInput
                        placeholder="Card Number"
                        autoCorrect={false}
                        style={styles.inputStyle}
                        label="Address"
                        value={this.state.value}
                        onChangeText={value => this.setState({ value })}
                      />
                   </CardSection2> 

                   </View>



                    <View style={styles.card}>

                      <CardSection2>
                        <TextInput
                          placeholder="CVC"
                          autoCorrect={false}
                          style={styles.inputStyle}
                          label="Address"
                          value={this.state.value2}
                          onChangeText={value2 => this.setState({ value2 })}
                        />

                        

                      </CardSection2> 
                      </View>


       <View style={styles.card}>

        <CardSection2>
          <TextInput
            placeholder="Expiry date"
            autoCorrect={false}
            style={styles.inputStyle}
            label="Address"
            value={this.state.value3}
            onChangeText={value3 => this.setState({ value3 })}
          />

        </CardSection2> 

        </View>



       </Card2>

            </View>

            <View style={styles.button}>

                 <TouchableOpacity activeOpacity={0.8} onPress={this._onSubmit.bind(this)}
                  title="Login"
                  disabled={this.state.buttonState}
                  accessibilityLabel="Ok, Great!" >

                  <View style={styles.buttonContainer}>
            
                    <Image source={require('./image/select4.png')}  style={styles.img}/>

                  </View>
                </TouchableOpacity>

          </View>
        </View>

      </View>









 


    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width:wp('100%'),
    height:hp('100%'),

  },


    header: {
      fontSize: 30,
      color: '#ffffff',

    },

     infoContainer: {
            

        width:wp('80%'),
        height:hp('100%'),


  },

  image: {
          width:wp('20%'),
          height:hp('8%'),
          
         },

  title: {
      alignItems:'center',
      paddingTop:60,
      paddingBottom:60,

        },

  mainTitle:{
     fontSize: 20,
     fontWeight: 'bold',
  },

  button:{
    width:'100%',
    alignItems:'center',

  },

  buttonContainer:{
    width: Dimensions.get('window').width*0.66,
    width:"58%",

    
  },
     img:{
    width: Dimensions.get('window').width*0.45,
    height:hp('10%'),

    },

    form:{
      margin:15,
    },

      inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },


  card:{
    margin:20,
  },
  image1:
  {
    margin:5
  }



});
