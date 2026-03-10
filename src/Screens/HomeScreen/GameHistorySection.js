import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Lighting from '../../../assets/images/Screens/Lighting.png';
import GameHistory from '../../Components/GameHistory';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function GameHistorySection({ data, navigation, setScrollEnabled }) {
  if (!Array.isArray(data) || data.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Image source={Lighting} style={styles.icon} />
          <Text style={styles.title}>GAME HISTORY</Text>
        </View>
        <TouchableOpacity
          style={styles.viewAllContainer}
          onPress={() => navigation.navigate('AvailableGame', { gameData: data, status: '4' })}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <GameHistory gameData={data} setScrollEnabled={setScrollEnabled} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:      1,
    marginTop: hp('1%'),
  },
  header: {

    flexDirection:     'row',
    alignItems:        'center',
    paddingHorizontal: wp('2%'),
    marginBottom:      hp('0.5%'),
  },
  titleContainer: {
    flexDirection: 'row',
    flex:          1,
    alignItems:    'center',
  },
  icon: {
    width:      wp('4%'),
    height:     wp('4%'),
    resizeMode: 'contain',
    marginRight: wp('1.5%'),
  },
  title: {
    color:      '#FFB700',
    fontFamily: 'Montserrat-Bold',
    fontSize:   wp('3.5%'),
  },
  viewAllContainer: {
    flex:          1,
    justifyContent:'flex-end',
    flexDirection: 'row',
  },
  viewAllText: {
    color:             '#FFB700',
    fontFamily:        'Montserrat-Bold',
    textDecorationLine:'underline',
    fontSize:          wp('3%'),
  },
  content: {
    marginLeft: wp('2%'),
  },
});