import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-reanimated-carousel';
const { width } = Dimensions.get('window');
const WinnerCard = (props) => {
  const { data } = props

  const renderItem = ({ item }) => {
    const clickable = item?.isClickable === true;

    const openLink = () => {
      Linking.openURL(item.sourceUrl).catch(err => console.error("Failed to open URL:", err));
    };

    return (
      <TouchableOpacity style={styles.container} disabled={!clickable} onPress={openLink}>
        <Image
          source={{ uri: item?.banner }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    )
  }

  return (
    <>
      {!data.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games or tickets are currently available.
          </Text>
        </View>
      ) : (
        <Carousel
          loop
          width={width * 0.95}
          height={100}
          autoPlay={true}
          data={data}
          mode="stack-horizontal-left"
          modeConfig={{
            stackInterval: 20,
            scaleInterval: 0.08,
            opacityInterval: 0.2,
          }}
          scrollAnimationDuration={1000}
          renderItem={renderItem}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingLeft: wp('3%'),
  },
  card: {
    backgroundColor: '#69C60A',
    borderRadius: wp(2.5),
    flex: 1,
    width: wp('90%'),
    height: hp('20%'),
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 10,
    margin: wp('1.5%'),
  },
  profileImage: {
    height: hp('10%'),
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  winnerBadgeContainer: {
    alignItems: 'center',
  },
  winnerBadge: {
    width: wp(50),
    height: hp(12),
    resizeMode: 'cover',
  },
  rankScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginBottom: hp(1.2),
  },
  rankText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-SemiBold',
    color: '#48180B',
  },
  scoreText: {
    fontSize: wp(4),
    color: '#48180B',
    fontFamily: 'Montserrat-SemiBold',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.2),
  },
  trophyIcon: {
    width: wp(8),
    height: wp(8),
    marginRight: wp(1.2),
  },
  rewardText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Bold',
    color: '#48180B',
  },
  linesContainer: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: wp(1.5),
  },
  line: {
    width: wp(3),
    height: '100%',
    backgroundColor: '#FFFFFF33',
    marginVertical: hp(0.5),
    alignSelf: 'center',
  },
  secondLine: {
    marginTop: hp(1),
  },
});
export default WinnerCard;