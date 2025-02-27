import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions, View, ScrollView, PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';

const { width,height } = Dimensions.get('window');

const AvailbleGameCard = (props) => {
  const navigation = useNavigation();
  const { gameData, availability,setScrollEnabled } = props
  let myGameData = []
  let data = []

  const getResponsiveHeight = () => {
    const baseHeight = height * 0.24;
    const adjustedHeight = PixelRatio.roundToNearestPixel(baseHeight);
    return adjustedHeight;
};

const carouselHeight =getResponsiveHeight(); 

  if (availability === '2') {
     myGameData = gameData?.filter((game) => game.status === 3) 
     data =  myGameData?.filter((item)=>item.frequency === "daily")
  }else if(availability === "3"){
     myGameData = gameData?.filter((game) => game.status === 3) 
     data =  myGameData?.filter((item)=>item.frequency === "weekly")
  }else{
    data = gameData?.filter((game) => game.status === 3) 
  }

  const handleNavigation = (item) => {
    console.log("item",item)
    navigation.navigate('GameName', { game_id: item._id , title: item.title });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => {
        handleNavigation(item);
      }}
    >
      <AvailableCard gameData={item} status={'1'} index={index} />
    </TouchableOpacity>
  );

  return (
    <>
      {!data.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games or tickets are currently available.
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Carousel
            data={data}
            renderItem={renderItem}
            width={width}
            height={carouselHeight}
            loop={true}
            autoPlay={true}
            autoPlayInterval={5000}
            mode='stack-horizontal-right'
            pagingEnabled={true}
            style={[styles.carouselContainer]}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10], 
              failOffsetY: [-10, 10], 
            }}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)} 
            onTouchCancel={() => setScrollEnabled(true)} 
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:hp('1%')
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: hp('2%'),
  },
  cardContainer: {
    flex: 1,
    paddingLeft: wp('2%'),
  },
  carouselContainer: {
    flexGrow: 0,
  },
});

export default AvailbleGameCard;
