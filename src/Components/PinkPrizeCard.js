import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../assets/images/Screens/Button.png'
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


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


const PinkPrizeCard = ({ item }) => {
  const game_color = item.gameColor
  const navigation = useNavigation()
  const handleNavigation = (item) => {
    navigation.navigate('GameName', { game_id: item._id, title: item.game_title, game_info: item.game_info });
  };
  return (

    <TouchableOpacity onPress={() => handleNavigation(item)}>
      <View style={[styles.borderContainer, { borderColor: borderColor[game_color] || '#F2E30B' }]}>
        <LinearGradient
          colors={Colors[game_color]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.innerGradient}
        >
          <View style={styles.content}>
            <Image source={Button} style={styles.buttonImage} />
            <Text style={styles.heading}>{item.game_title}</Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    width: wp('43%'),
    height: hp('12%'),
    borderRadius: wp('5%'),
    borderWidth: 5,
    overflow: 'hidden',
    // backgroundColor: '#000',
  },
  innerGradient: {
    flex: 1,
    borderRadius: wp('5%') - 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp('2%'),   
    paddingVertical:   hp('0.5%'),
  },
  heading: {
    color: '#2A1610',
    fontSize: wp('4.5%'),
    fontFamily: 'PatuaOne-Regular',
    marginTop: hp('1%'),
    textTransform: 'uppercase',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 1
  },
  buttonImage: {
    width: wp('35%'),
    height: hp('4%'),
    resizeMode: 'contain',
  },
});

export default PinkPrizeCard;


