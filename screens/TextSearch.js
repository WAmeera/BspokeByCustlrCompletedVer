import React from 'react';
import { Button, Image, SrollView, StyleSheet, View, Text, TextInput, AppRegistr,FlatList,ListView, ActivityIndicator,Divider, StatusBar} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; 
import { Card2, CardSection2 ,Card, CardSection, Spinner, Header } from '../src/components/common';
import Items from '../components/items';
import * as firebase from 'firebase';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class TextSearch extends React.Component {


  static navigationOptions = {
          title: 'Search     ',
          tabBarIcon:({tintColor}) =>(
          <Image source={require('./image/search.png')}
            style={{width:22,height:22,tintColor:'white'}}>
            </Image>
        )
  };

 constructor(props) {
    super(props);
    this.state = {
  dataSource: [],
  loading: false,
  word : '',
  };
  }

  componentWillMount(){
  this.setState({loading:false});

  firebase.database().ref('items').once('value', snapshot =>{//get data from the database
   var items = [];
     snapshot.forEach((child) => {
       items.push({
          brand: child.val().brand,
          name: child.val().name,
      category : child.val().category,
      color : child.val().color,
       Photo1: child.val().Photo1,
      Status : child.val().Status,
      Materials : child.val().Materials,
      Details: child.val().Details,
      Price: child.val().Price
       });
    });
  this.setState({
  dataSource : items
 });

 
 });
  }

  checkAvailability (data){
  if (data.length != 0)
  return (
   <FlatList
           numColumns={2}
           data = {data}
            renderItem = {this.renderItem}
          />
  )
else
return (
	<View style={styles.warning}>
      <Image source={require('./image/search.png')} style={{width:100,height:100,tintColor:'black'}}></Image>
      <View style={styles.text}>
      <Text style={styles.warningText}> No item  </Text>
      </View>

</View>
)
  }

  renderContent() {
 
  const {word,dataSource} = this.state;
  console.log (dataSource);
  var dataFilter=[];
  for (i=0;i<this.state.dataSource.length;i++) //search through all the tags for each item in database
  {
  if ( (dataSource[i].brand.includes(word) || 
     dataSource[i].name.includes(word) || 
     dataSource[i].category.includes(word) || 
     dataSource[i].color.includes(word) || 
     dataSource[i].Status.includes(word) || 
     dataSource[i].Materials.includes(word) ||
     dataSource[i].Details.includes(word)) && (word!='') )
     {
       dataFilter.push(dataSource[i]) //push that item into a filtered array if the string matches any tags in it
     }
  }
   console.log(dataFilter);
  if (this.state.loading == false){
    return (
      <View style={{ flex: 1 }}>
     <Card2>
        <CardSection2>
      <TextInput
      placeholder= "Search"
      autoCorrect={false}
      style={styles.inputStyle}
      value={this.state.word}
      onChangeText={word => this.setState({ word })} //rerender whenever user changes the text input
      />
        </CardSection2>
    </Card2>
  <View style={styles.container}> 

       {this.checkAvailability(dataFilter)}
    
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

renderItem = ({item}) => {
      return(
        <View style={styles.menuContainer}>
         <Items itemImage={{uri:item.Photo1}} 
      navigation={this.props.navigation} 
      itemID={item.ID}
      category={item.category}
      Price ={item.Price}
      color = {item.color}
      >
             <Text style  = {{fontSize: 16, color: 'black'}}>
                {item.brand}
              </Text>
              <Text style  = {{fontSize: 12, color: 'black'}}>
                {item.name}
              </Text>
              <Text style  = {{fontSize: 10, color: 'red'}}>
                RM {item.Price}
              </Text>
            </Items>
        </View>
    
        
      )
    }

render() {
    return (
      <View style = {{flex:1}}>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },
   container: {
    flex: 1,
    width:wp('100%'),
    height:hp('75%'),

  },
    warning:{
    alignItems:'center',
    justifyContent:'center',
    flex:1,


  },

  warningText:{
    fontSize:20,
    fontWeight:'bold',
  }
};