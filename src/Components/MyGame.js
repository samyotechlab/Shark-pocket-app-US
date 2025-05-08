import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PinkPrizeCard from './PinkPrizeCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.43;
const HORIZONTAL_PADDING = 10;
const EMPTY_TEXT = 'No games or tickets are currently available.';

const MyGame = ({ myGame }) => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    setCarouselData(myGame);
  }, [myGame]);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
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
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp('1%'),
  },
  flatListContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  cardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: wp('1%'),
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
});

export default MyGame;
