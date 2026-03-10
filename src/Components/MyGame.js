import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, useWindowDimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PinkPrizeCard from './PinkPrizeCard';

const EMPTY_TEXT = 'No games or tickets are currently available.';

const MyGame = ({ myGame }) => {
  const [carouselData, setCarouselData] = useState([]);

  const { width } = useWindowDimensions();

  const CARD_WIDTH         = width * 0.43;
  const HORIZONTAL_PADDING = wp('2%'); 

  useEffect(() => {
    setCarouselData(myGame);
  }, [myGame]);

  const renderItem = ({ item }) => (
    <View style={[styles.cardContainer, { width: CARD_WIDTH }]}>
      <PinkPrizeCard item={item} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{EMPTY_TEXT}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {carouselData.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={carouselData}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: HORIZONTAL_PADDING }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('1%'),
    // backgroundColor:'yellow'
  },
  cardContainer: {
    marginHorizontal: wp('1%'),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: wp('4%'),      
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: wp('2%'),  
  },
});

export default MyGame;