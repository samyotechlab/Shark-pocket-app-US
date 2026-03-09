import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../assets/images/Screens/Button.png'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const PinkPrizeCard = ({ item}) => {
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


  const navigation = useNavigation()
  const handleNavigation = (item) => {
    navigation.navigate('GameName', { game_id: item._id , title: item.game_title,game_info:item.game_info});
  };
  return (
    <TouchableOpacity style={styles.container} onPress={() => {
      handleNavigation(item)
    }}>
      <LinearGradient
        colors={Colors[game_color]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.8, y: 1 }}
        style={[styles.card, { borderColor: borderColor[game_color] ? borderColor[game_color] : "#F2E30B" }]}
      >
        <View style={styles.innerCard}>
          <Image source={Button} />
        <Text style={styles.heading}>{item.game_title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  card: {
    width: wp('43%'),
    height: hp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: hp('5%'),
    borderRadius: hp('2.5%'),
    borderWidth: hp('0.5%'),
  },
  heading: {
    color: '#2A1610',
    fontSize: hp('2%'),
    fontFamily: 'PatuaOne-Regular',
    marginTop: hp('1%'),
    textTransform: 'uppercase',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 1
  },
  innerCard:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    color: '#2A1610',
    fontSize: hp('2.8%'),
    fontFamily: 'Overlock-Bold',
    marginTop: hp('0.5'),
  },
});

export default PinkPrizeCard;


