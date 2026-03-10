import React, { memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Text, View, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';

const AvailableGameCard = ({ gameData, availability, setScrollEnabled, cardName }) => {
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const carouselHeight = useMemo(() => {
    return height * 0.25;
  }, [height]); 

  const filteredData = useMemo(() => {
    let filtered = gameData.filter((game) => game.status === 3);
    if (availability === '2') {
      filtered = filtered.filter((item) => item.frequency === 'daily');
    } else if (availability === '3') {
      filtered = filtered.filter((item) => item.frequency === 'weekly');
    }
    return filtered;
  }, [gameData, availability]);

  const handleNavigation = (item) => {
    navigation.navigate('GameName', { game_id: item._id, title: item.title });
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleNavigation(item)}
    >
      <AvailableCard gameData={item} status="1" index={index} />
    </TouchableOpacity>
  );

  if (!filteredData.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No games or tickets are currently available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Carousel
        data={filteredData}
        renderItem={renderItem}
        width={width}
        height={carouselHeight}
        loop
        autoPlay
        autoPlayInterval={5000}
        mode="stack-horizontal-right"
        pagingEnabled
        style={styles.carouselContainer}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
          failOffsetY:   [-10, 10],
        }}
        onTouchStart={() => setScrollEnabled(false)}
        onTouchEnd={() => setScrollEnabled(true)}
        onTouchCancel={() => setScrollEnabled(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:       1,
    paddingTop: hp('1%'),
  },
  emptyContainer: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
    paddingVertical: hp('2%'),
  },
  emptyText: {
    color:             'white',
    fontSize:          wp('4%'),  
    fontWeight:        '500',
    textAlign:         'center',
    paddingHorizontal: wp('4%'),   
  },
  cardContainer: {
    flex:        1,
    paddingLeft: wp('2%'),
  },
  carouselContainer: {
    flexGrow: 0,
  },
});

export default memo(AvailableGameCard);