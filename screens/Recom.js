import React, { Component } from 'react';
import { Image,ScrollView,View, Text, Button, StyleSheet, AsyncStorage } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import Items from '../components/items';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {AppRegistr,FlatList,ListView, ActivityIndicator,Divider, StatusBar} from 'react-native';
import * as firebase from 'firebase';


export default class Recommendation extends React.Component {
    static navigationOptions = {
      title: 'Recommend                              ',
           tabBarIcon:({tintColor}) =>(
          <Image source={require('./image/recommend.png')}
            style={{paddingRight:2,width:22,height:22,tintColor:'white'}}>
            </Image>
        )
  };

constructor (props){
      super(props);
	  global.Category="";
	  global.Color="";
      this.state = {
	dataSource : [],
	Result :[]
	}
}

async getCateKey(key) { //read the array of storing the browsing history for 'category' tag
    try {
      const value = await AsyncStorage.getItem(key);
	  global.Category = value;
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  };

async getColorKey(key) {//read the array of storing the browsing history for 'color' tag
    try {
      const value = await AsyncStorage.getItem(key);
	  global.Color = value;
    } catch (error) {
      console.log("Error retrieving data" + error);
    }
  };


calculateRender (){ //main function to calculate what item from database to render
	var cateForParse = global.Category;
	cateForParse = "[" + cateForParse + "]";
	var catArray = JSON.parse(cateForParse);

	var colorForParse = global.Color;
	colorForParse = "[" + colorForParse + "]";
	var colorArray = JSON.parse(colorForParse);
	
	var countCategory = [{type:"Muscle Fit",frequency:0}];
	var newCateType = {};
	var catFreTotal =0;

	var countColor = [{type:"blue",frequency:0}];
	var newColorType = {};
	var colorFreTotal =0;

	var renderQueue = [];
	var renderQueueLength = 0;
	var data = this.state.dataSource;
	var random = 0;
	
	for (i = 0; i < catArray.length ; i++) //calculate the frequency for each category type
	{ 
		if (countCategory[0].frequency === 0) //storing the first type of category
		{
			countCategory[0].type = catArray[0];
			countCategory[0].frequency = 1;
		}
		else
		{
			for (j=0;j<countCategory.length;j++) 
			{
				if (catArray[i]=== countCategory[j].type) //if the type of category already exists
				{
					countCategory[j].frequency++; //increase frequency of that type of category by 1
					break;
				}
				if (j==(countCategory.length-1)) //if the type of category doesn't exist yet
				{
					newCateType = { type : catArray[i] , frequency : 1 }; //create a new type of category
					countCategory.push(newCateType); 
					break;
				}
			}
		}

	}

	for (i = 0; i < colorArray.length ; i++) //calculate frequency for each colour type, similar with the loop above
	{ 
		if (countColor[0].frequency === 0) 
		{
			countColor[0].type = colorArray[0];
			countColor[0].frequency = 1;
		}
		else
		{
			for (j=0;j<countColor.length;j++)
			{
				if (colorArray[i]=== countColor[j].type)
				{
					countColor[j].frequency++;
					break;
				}
				if (j==(countColor.length-1))
				{
					newColorType = { type : colorArray[i] , frequency : 1 };
					countColor.push(newColorType);
					break;
				}
			}
		}

	}

	for (i=0;i<countCategory.length;i++) //calculate the total frequency for category
	{
		catFreTotal += countCategory[i].frequency; 
	}

	for (i=0;i<countCategory.length;i++) //calculate the probability for each category type
	{
		countCategory[i].frequency = countCategory[i].frequency / catFreTotal;
	}

	for (i=0;i<countColor.length;i++) //calculate the total frequency for colour
	{
		colorFreTotal += countColor[i].frequency; 
	}

	for (i=0;i<countColor.length;i++) // calculate the probability for each colour type
	{
		countColor[i].frequency = countColor[i].frequency / colorFreTotal;
	}
	
	while (renderQueueLength < ( ((1/10)*data.length) ||10 ) ) //render the amount equal to 10 % of the total items or at least 10 items
	{ 
		for (i = 0; i < data.length ; i++) //for each item in the database
		{	
			var categoryFrequency =0;
			var colorFrequency=0;
			var combinedFrequency = 0;
			
			random = Math.random();
			
			//get the calculated probability
			for (j=0; j<countCategory.length;j++)
			{
				if (data[i].category == countCategory[j].type)
				{
					categoryFrequency = countCategory[j].frequency; //the probability is stored in 'frequency'
				}
			}	
			
			for (j=0; j<countColor.length;j++)
			{
				if (data[i].color == countColor[j].type)
				{
					colorFrequency = countColor[j].frequency;
				}
			}	

			combinedFrequency= (categoryFrequency+colorFrequency)/2; //combine the probability for both colour and category
			console.log ("random:"+random);
			console.log("combinedFrequency"+combinedFrequency);
			if ( random < (combinedFrequency || 0.05) ) //if rendered, break the loop to find a new item to display
			{
				renderQueue.push(data[i]);
				console.log(renderQueue);
				renderQueueLength++;
				data.splice(i,1);
				i--;
				break;
			}
		}
	
	}
	
this.setState({Result:renderQueue});
};

componentWillMount (){
	this.getCateKey('PreferCategory');
	this.getColorKey('PreferColor');

	firebase.database().ref('items').once('value', snapshot =>{
	 var items = [];
     snapshot.forEach((child) => {
       items.push({
          brand: child.val().brand,
          name: child.val().name,
          Price: child.val().Price,
		  ID : child.val().ID,
		  category : child.val().category,
		  color : child.val().color,
		  Photo1 : child.val().Photo1,
		  Photo2 : child.val().Photo2,
		  Photo3 : child.val().Photo3
       });
    });
	
	this.setState({
	dataSource : items
	});
	this.calculateRender();	
	});
	
 };



renderItem = ({item}) => {
      return(
        <View style={styles.menuContainer}>
            <Items itemImage={{uri : item.Photo1 }} 
			navigation={this.props.navigation} 
			itemID={item.ID}
			category={item.category}
			Price ={item.Price}
			color = {item.color}
			brand = {item.brand}
			name = {item.name}
			Photo1 = {item.Photo1}
			Photo2 = {item.Photo2}
			Photo3 = {item.Photo3}
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
       const {navigate} = this.props.navigation;
    return (
    <View style={styles.container}> 
        <FlatList
           numColumns={2}
           data = {this.state.Result}
            renderItem = {this.renderItem}
          />
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




  menuContainer:{
    flexDirection:'row',
    flexWrap: 'wrap',
  },

  scroll:{
        backgroundColor:'#efefef',

  }




});