import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import Game from '../../assets/images/Screens/game1.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {formatDate, truncateText} from '../Utilities/utilies';

export default function AvailableCard({gameData, status, index}) {
  const game_color = gameData.gameColor
  const Colors = {
    yellow :    ['#F38424', '#F7A552', '#F9D479'],
    pink :   ['#E3398C', '#CC8FAD'],
    green :  ['#75B831', '#BAFF74'],
    blue:   ['#0916B9', '#A1A8FF']
   
  }
  const borderColor = {
    yellow : '#F2E30B',
    pink: "#5C233F",
    green :  "#78C800",
    blue :"#1A0DAB"
  }
  const borderBottom = {
    yellow : '#C05112',
    pink: "#E3398C",
    green :  "#75B831",
    blue :"#4644A7"
  }
  
  const formattedDate = formatDate(gameData.start_date);
  return (
    <View style={{borderBottomWidth: wp(1.3),
      borderBottomColor:  borderBottom[game_color]? borderBottom[game_color]: "#C05112" ,borderBottomStartRadius:wp(3),borderBottomEndRadius:wp(8)}}>
      <LinearGradient
        colors={
          Colors[game_color]?Colors[game_color]:['#F38424', '#F7A552', '#F9D479']
        }
        start={{x: 0, y: 0.5}}
        end={{x: 0.8, y: 1}}
        style={[
          styles.card,
          {borderColor: borderColor[game_color] ? borderColor[game_color] : "#F2E30B" },
        ]}>
        <View style={styles.content}>
          <Image source={Game} style={styles.characterImage} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              {
                status === "4"?gameData.game_title:gameData.title
              }
            
            </Text>
            <Text style={styles.description}>
              {
                status === "4"?gameData.game_description:gameData.description
              }
            </Text>
            <Text style={styles.startText}>
              Start <Text style={styles.dateText}>{formattedDate}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                ₹{status === "4"
                    ? gameData.game_winning_cost
                    : gameData.winning_cost}{' '}
                  CASH WIN
                </Text>
              </View>
            </View>
          </View>
        </View>
                <View style={styles.linesContainer}>
                  <View style={styles.line} />
                  <View style={[styles.line, styles.secondLine]} />
                </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: hp('0.5%')},
    shadowOpacity: 0.3,
    shadowRadius: wp('1.5%'),
    elevation: 5,
    borderWidth: wp('1%'),
    paddingVertical: hp('0.5%'),
    marginRight: hp('2%'),
    marginLeft: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  characterImage: {
    width: wp('25%'),
    maxHeight: hp('20%'),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    paddingLeft: wp('3%'),
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: wp('6%'),
    fontFamily: 'Audiowide-Regular',
    color: '#2A1610',
  },
  description: {
    fontSize: wp('3%'),
    color: '#000000',
    marginVertical: hp('1%'),
    fontFamily: 'Montserrat-Bold',
    flexWrap: 'wrap', 
    lineHeight: hp('2%'), 
    maxWidth: wp('65%'), 
  },
  startText: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontFamily: 'Audiowide-Regular',
  },
  dateText: {
    color: '#FFFFFF',
    paddingHorizontal: wp('2%'),
    borderRadius: wp('1%'),
    fontFamily: 'Audiowide-Regular',
    fontSize: wp('4%'),
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginTop: hp('1.5%'),
  },
  button: {
    backgroundColor: '#3E2723',
    borderRadius: wp('2%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('7%'),
    alignItems: 'center',
    borderColor: '#F5D236',
    borderWidth: wp('0.5%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFDC4D',
    letterSpacing: wp('0.25%'),
    textShadowColor: '#F88600',
    textShadowOffset: {width: 0, height: hp('0.25%')},
    textShadowRadius: wp('3.75%'),
  },
  linesContainer: {
    position: 'absolute',
    right: wp('2%'),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    gap : wp(1.5),
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


