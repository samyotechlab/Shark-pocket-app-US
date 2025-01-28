import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Win from '../../assets/images/Screens/Buttons.png';
import Winner from '../../assets/images/Screens/Winner.png';
import { widthPercentageToDP as wp , heightPercentageToDP as hp  } from 'react-native-responsive-screen';

const GoldenCard = ({item}) => {
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
        colors={Colors[game_color]?Colors[game_color]: ['#F38424', '#F7A552', '#F9D479']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 1 }}
        style={[styles.card,{ borderColor: borderColor[game_color] ? borderColor[game_color] : "#F2E30B" }]}
      >
        <View style={styles.innerCard}>  
          <Image source={Win} style={{width:wp('35%'),height:hp('3.5%')}}/>
            <Image source={Winner} style={styles.winnerImage}/>
            <Text style={styles.winnerText}>{item.game_title}</Text>
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
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerImage: {
        justifyContent:'center',
    alignItems:'center'
  },
  winnerText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: hp('2%'),
    left:hp('5.7%'),
    bottom:hp('5.3%'),
    fontFamily:'Rajdhani-Medium'

  },
  amount: {
    color: '#463614',
    fontSize: hp('2.8%'),
    fontFamily:'Overlock-Bold',
    marginTop: hp('0.6%'),
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
