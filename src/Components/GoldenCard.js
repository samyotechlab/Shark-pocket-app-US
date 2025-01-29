import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Win from '../../assets/images/Screens/Buttons.png';
import Winner from '../../assets/images/Screens/Winner.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GoldenCard = ({ item }) => {
  const game_color = item.gameColor
  const Colors = {
    yellow: ['#F38424', '#F7A552', '#F9D479'],
    pink: ['#E3398C', '#CC8FAD'],
    green: ['#75B831', '#BAFF74'],
    blue: ['#0916B9', '#A1A8FF']

  }
  const borderColor = {
    yellow: '#F2E30B',
    pink: "#5C233F",
    green: "#78C800",
    blue: "#4644A7"
  }
  return (
    <TouchableOpacity style={styles.container}>
      <LinearGradient
        colors={Colors[game_color] ? Colors[game_color] : ['#F38424', '#F7A552', '#F9D479']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 1 }}
        style={[styles.card, { borderColor: borderColor[game_color] ? borderColor[game_color] : "#F2E30B" }]}
      >
        <View style={styles.innerCard}>
          <Image source={Win} style={styles.winImage} resizeMode="contain" />
          <Image source={Winner} style={styles.winnerImage} resizeMode="contain" />
          <Text style={styles.winnerText} numberOfLines={2} adjustsFontSizeToFit>
            {item.game_title}
          </Text>
          <Text style={styles.amount}>₹{item.game_winning_cost}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: hp('2%'),
  },
  card: {
    // flex:1,
    width: wp('40%'),
    height: hp('15%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('2.5%'),
    borderWidth: hp('0.5%'),
    elevation: wp('5%'),
  },
  innerCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: hp('1%'), // Add padding to prevent text overflow
    width: wp('40%'), // Ensure the card has a defined width
  },
  winnerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('35%'),
    height: 'auto',
    maxHeight: hp('5%'),
  },
  // winImage: {
  //   width: wp('35%'),
  //   height: 'auto', // Let height adjust dynamically
  //   maxHeight: hp('5%'), // Set max height to prevent excessive stretching
  // },
  winnerText: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    textAlign: 'center', // Center the text
    fontFamily: 'Rajdhani-Medium',
    marginTop: hp('0.5%'),
    maxWidth: wp('35%'), // Prevents text from overflowing
  },
  amount: {
    color: '#463614',
    fontSize: hp('2.8%'),
    fontFamily: 'Overlock-Bold',
    marginTop: hp('0.6%'),
    textAlign: 'center',
  },

  playWin: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: hp('1.5%'),
    fontWeight: 'light',
    textAlign: 'center',
    top: hp('0.5%'),
  }
});

export default GoldenCard;
