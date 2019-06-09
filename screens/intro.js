import React, { Component } from 'react'
import { TouchableOpacity ,Text, Button, Animated, View, StyleSheet, Image, Dimensions, ScrollView } from 'react-native'
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10
const images = [    //image link
'https://i.ibb.co/n7w9CHp/1.png',
'https://i.ibb.co/jh6PN13/2.png',
'https://i.ibb.co/StCdYbr/3.png',
] 

export default class Intro extends Component {


  static navigationOptions = {
      title: 'Bspoke    ',

      headerTitleStyle: {
        fontWeight: 'bold',

    },

  };

  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  render() {
    

    let imageArray = []
    let barArray = []
    images.forEach((image, i) => {
      console.log(image, i)
      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: screenWidth }}
        />
      )
      imageArray.push(thisImage)

      const scrollBarVal = this.animVal.interpolate({
        inputRange: [screenWidth * (i - 1), screenWidth * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      barArray.push(thisBar)
    })

    return (
      <View
        style={styles.container}
        flex={1}>
          
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          pagingEnabled
          onScroll={
            Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
            )
          }
        >
         {imageArray}

        </ScrollView>

        <View style={styles.barContainer}>
          {barArray}

          <View style={styles.button}>
            <TouchableOpacity title="SKIP" onPress={() => this.props.navigation.navigate('Login')} >

                 <Image source={require('./image/skip.png')}  style={styles.img}/>

            </TouchableOpacity>
          </View>
        </View>
        
        
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',


  },
  barContainer: {
    position: 'absolute',
    zIndex: 2,
    bottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height:hp('20%'),

  },
  track: {
    backgroundColor: '#ccc',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: '#023C69',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    fontStyle: 'italic',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  button: {
    height: 100,
    width: 100,
    position: 'absolute',
    left: 90,

    top: 100,
  },

  img:{
    height: 50,
    width: 60,
  }
})