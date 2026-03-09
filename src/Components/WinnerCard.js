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
      Linking.openURL(item?.sourceUrl).catch(err => console.error("Failed to open URL:", err));
    };

    return (
      <TouchableOpacity style={styles.container} disabled={!clickable} onPress={openLink}>
        <Image
          source={{ uri: item?.bannerUrl }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    )
  }

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
  profileImage: {
    height: hp('10%'),
    resizeMode: 'cover',
  },
});
export default WinnerCard;