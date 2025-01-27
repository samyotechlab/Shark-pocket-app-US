import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, Dimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';

const { width } = Dimensions.get('window');

const AvailbleGameCard = (props) => {
  const navigation = useNavigation();
  const myGames = props?.gameData;

  const [currentIndex, setCurrentIndex] = useState(0);
  const myGameData = myGames?.filter((game) => game.status === 3) || [];

  const handleNavigation = (item) => {
    navigation.navigate('GameName', { game_id: item._id });
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
      {!myGameData.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games or tickets are currently available.
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Carousel
            data={myGameData}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width * 1}
            inactiveSlideScale={0.95}
            inactiveSlideOpacity={0.7}
            loop={true}
            autoplay={true}
            autoplayInterval={2000}
            onSnapToItem={(index) => setCurrentIndex(index)}
            enableMomentum={false}
            lockScrollWhileSnapping={true}
            inactiveSlideShift={0}
            containerCustomStyle={styles.carouselContainer}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
