import React, { memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions, View, PixelRatio } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';

const { width, height } = Dimensions.get('window');

const UpcomingGame = ({ gameData, availability, setScrollEnabled, cardName }) => {
  const navigation = useNavigation();

  const carouselHeight = useMemo(() => {
    const baseHeight = height * 0.25;
    return PixelRatio.roundToNearestPixel(baseHeight);
  }, []);

  const filteredData = useMemo(() => {
    const upcomingGames = Array.isArray(gameData) ? gameData.filter((game) => game.status === 1) : [];
    return upcomingGames;
  }, [gameData, availability]);

  const handleNavigation = (item) => {
    navigation.navigate('UpcomingGameInfo', {
        game_id: item._id,
        game_name: item.title,
        game_info: item.game_info,
      });
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
          failOffsetY: [-10, 10],
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
    flex: 1,
    paddingTop: hp('1%'),
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

export default memo(UpcomingGame);



