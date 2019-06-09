import React from 'react';
import { StyleSheet,Button, Image, View, Text,  ImageBackground,TouchableOpacity , Dimensions }from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { Card, CardSection, Input, Spinner, Header } from '../src/components/common';
import * as firebase from 'firebase';

export default class AddressModal extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
	text: 'Mailing Address',
	card: '',
	mail: '',
	name: '',
	loading: false
	};
  }
   
  componentWillMount(){
  this.setState({loading:false});
  
  }
 
 //saving all data entered in form into database
  saveInfo = (fullName , mailingAddress,cardNo) =>{
  
  const { currentUser } = firebase.auth();
  this.setState({loading:true});
  if (this.state.name != ''){
  const name = this.props.navigation.getParam('name', ' ');
  const card = this.props.navigation.getParam('card',' ');
  const mail = this.props.navigation.getParam('mail', ' ');
	firebase.database().ref(`/users/${currentUser.uid}/info`)
      .set({ fullName : fullName, mailingAddress : mail , cardNo : card})
	  }
  if (this.state.mail != ''){
  const name = this.props.navigation.getParam('name', ' ');
  const card = this.props.navigation.getParam('card',' ');
  const mail = this.props.navigation.getParam('mail', ' ');
	firebase.database().ref(`/users/${currentUser.uid}/info`)
      .set({ fullName : name, mailingAddress : mailingAddress , cardNo : card })
	  }
  if (this.state.card != ''){
  const name = this.props.navigation.getParam('name', ' ');
  const card = this.props.navigation.getParam('card',' ');
  const mail = this.props.navigation.getParam('mail', ' ');
	firebase.database().ref(`/users/${currentUser.uid}/info`)
      .set({ fullName : name, mailingAddress : mail , cardNo : cardNo })
	  }
  this.props.navigation.navigate('Login');
  }

  renderContent() {
  const name = this.props.navigation.getParam('name', '');
  const card = this.props.navigation.getParam('card','');
  const mail = this.props.navigation.getParam('mail', '');
  console.log(mail);

  if (this.state.loading == false){
    return (
            <View style={{ flex: 1 }}>

      <View style={styles.user}>
      <View style={styles.title}>
        <Text style={styles.title2}>EDIT </Text>
      </View>
        <Image source={require('./image/edit.png')}  style={styles.btn2}/>
      </View>

     <Card>     
        <CardSection>
          <Input
            placeholder= {name}
            label="Full Name"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
        </CardSection>

    <CardSection>
          <Input
            placeholder= {mail}
            label="Mailing Add."
            value={this.state.mail}
            onChangeText={mail => this.setState({ mail })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder= {card}
            label="Credit Card"
            value={this.state.card}
            onChangeText={card => this.setState({ card })}
          />
        </CardSection>

    </Card>


  //part above is form to enter credit card info


     <View style={styles.components}>

        <View style={styles.button}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.saveInfo(this.state.name,this.state.mail,this.state.card) }>
            <Image source={require('./image/apply.png')}  style={styles.btn}/>
          </TouchableOpacity>
        </View>




        <View style={styles.button}>
          <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('Login')}>
            <Image source={require('./image/cancel.png')}  style={styles.btn}/>
          </TouchableOpacity>
        </View>





      </View>







      </View>
    );
  }
  else
  {
      return 
    (
        <Spinner size="large" />
    );
  }
}

render() {
    return (
     <ImageBackground source={require('./image/background.jpg')} style={styles.main}>
      <View style = {{height : 700}}>
        {this.renderContent()}
      </View>
    </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({


  main:{
    flex:1,
    width:'100%',
    height:'100%',
  },

    components:{
    margin:30,

  },

button:{
    justifyContent: 'center', 
    alignItems:'center',
    marginBottom:10,
  },

  btn:{
    width: Dimensions.get('window').width*0.4,
    height: Dimensions.get('window').height*0.06,
   
     
  },

    user:{
    justifyContent: 'center', 
    alignItems:'center',
    margin:35,
  },

    btn2:{
    width: Dimensions.get('window').width*0.15,
    height: Dimensions.get('window').height*0.07,
   
     
  },

  title:{
      justifyContent: 'center', 
    alignItems:'center',
    width:'50%',
    margin:20,

  },

  title2:{
    fontSize:25,
    fontWeight:'bold',
    color:'white',
  },







});
