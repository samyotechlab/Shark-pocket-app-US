import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, useWindowDimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel from 'react-native-reanimated-carousel';
import Banner1 from '../../assets/images/Screens/Banner.png';
import Banner2 from '../../assets/images/Screens/banner.jpg';

const items = [
  { bannerUrl: Banner1, sourceUrl: 'https://www.google.com', isClickable: false },
  { bannerUrl: Banner2, sourceUrl: 'https://www.google.com', isClickable: false },
];

const WinnerCard = (props) => {
  const { data } = props;

  const { width } = useWindowDimensions();

  const renderItem = ({ item }) => {
    const clickable = item?.isClickable === true;

    const openLink = () => {
      Linking.openURL(item?.sourceUrl).catch(err =>
        console.error('Failed to open URL:', err)
      );
    };

    return (
      <TouchableOpacity
        style={[styles.container, { width: width * 0.95 }]}
        disabled={!clickable}
        onPress={openLink}
      >
        <Image
          source={item?.bannerUrl}
          style={[styles.profileImage, { width: width * 0.95, height: hp('15%') }]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {!data?.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games or tickets are currently available.
          </Text>
        </View>
      ) : (
        <Carousel
          loop
          width={width * 0.95}
          height={hp('15%')}
          autoPlay={true}
          data={items}
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
    flex: 1,
    paddingLeft: wp('3%'),

  },
  profileImage: {
    resizeMode: 'contain',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('2%'),
  },
  emptyText: {
    fontSize: wp('3.5%'),
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: wp('5%'),
  },
});

export default WinnerCard;