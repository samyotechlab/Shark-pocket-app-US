import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Game from '../../assets/images/Screens/game1.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { formatDate, truncateText } from '../Utilities/utilies';

export default function AvailableCard({ gameData, status,isComingSoon }) {
  const gameColor = gameData?.gameColor || 'yellow';
  console.log("========>",status)

  const colorTheme = {
    yellow: {
      gradient: ['#F38424', '#F7A552', '#F9D479'],
      borderColor: '#F2E30B',
      borderBottom: '#C05112',
    },
    pink: {
      gradient: ['#E3398C', '#CC8FAD'],
      borderColor: '#5C233F',
      borderBottom: '#E3398C',
    },
    green: {
      gradient: ['#75B831', '#BAFF74'],
      borderColor: '#78C800',
      borderBottom: '#75B831',
    },
    blue: {
      gradient: ['#0916B9', '#A1A8FF'],
      borderColor: '#1A0DAB',
      borderBottom: '#4644A7',
    },
  };

  const { gradient, borderColor, borderBottom } = colorTheme[gameColor] || colorTheme.yellow;

  const getFormattedDate = () =>
    formatDate(status === '4' ? gameData?.game_end_date : gameData?.end_date);

  const getTitle = () => (status === '4' ? gameData?.game_title : gameData?.title);

  const getDescription = () => {
    if (status === '4') return gameData?.game_description;
    // return status === '1' ? truncateText(gameData?.description, 15) : gameData?.description;
    return status === '1' ? gameData?.description : gameData?.description;
  };

  const getWinningPrice = () =>
    status === '4' ? gameData?.game_winning_price : gameData?.winning_price;

  return (
    <View style={[styles.cardWrapper, { borderBottomColor: borderBottom }]}>
      <LinearGradient colors={gradient} start={{ x: 0, y: 0.5 }} end={{ x: 0.8, y: 1 }} style={[styles.card, { borderColor }]}>
        <View style={styles.content}>
          <Image source={gameData.imageUrl ? {uri:gameData?.imageUrl}:Game} style={styles.characterImage} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>{getTitle()}</Text>
            <Text style={styles.description}>{getDescription()}</Text>
            {
              isComingSoon? (
                 <Text style={styles.startText}>
                 Coming Soon
            </Text>
              ):(
                 <Text style={styles.startText}>
              Expires On <Text style={styles.dateText}>{getFormattedDate()}</Text>
            </Text>
              )
            }
            {getWinningPrice() && (
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>{getWinningPrice()} </Text>
                </View>
              </View>
            )}
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
  cardWrapper: {
    borderBottomWidth: wp(1.3),
    borderBottomStartRadius: wp(3),
    borderBottomEndRadius: wp(8),
  },
  card: {
    // flex:1,
    borderRadius: wp(3),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp(0.5) },
    shadowOpacity: 0.3,
    shadowRadius: wp(1.5),
    elevation: 5,
    borderWidth: wp(1),
    paddingVertical: hp(0.5),
    marginRight: hp(2),
    marginLeft: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterImage: {
    width: wp(25),
    height:hp(20),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    paddingLeft: wp(3),
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: wp(6),
    fontFamily: 'Audiowide-Regular',
    color: '#2A1610',
  },
  description: {
    fontSize: wp(3),
    color: '#000',
    marginVertical: hp(1),
    fontFamily: 'Montserrat-Bold',
    flexWrap: 'wrap',
    lineHeight: hp(2),
    maxWidth: wp(65),
  },
  startText: {
    fontSize: wp(4),
    color: '#FFF',
    fontFamily: 'Audiowide-Regular',
  },
  dateText: {
    color: '#FFF',
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
    fontFamily: 'Audiowide-Regular',
    fontSize: wp(4),
  },
  buttonContainer: {
    alignItems: 'flex-start',
    marginTop: hp(1.5),
  },
  button: {
    backgroundColor: '#3E2723',
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(7),
    alignItems: 'center',
    borderColor: '#F5D236',
    borderWidth: wp(0.5),
  },
  buttonText: {
    fontSize: wp(4.5),
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFDC4D',
    letterSpacing: wp(0.25),
    textShadowColor: '#F88600',
    textShadowOffset: { width: 0, height: hp(0.25) },
    textShadowRadius: wp(3.75),
  },
  linesContainer: {
    position: 'absolute',
    right: wp(2),
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


