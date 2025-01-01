import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import Game from '../../assets/images/Screens/game1.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {formatDate} from '../Utilities/utilies';

export default function AvailableCard({gameData, status, index}) {
  const gradientColors = [
    ['#F38424', '#F7A552', '#F9D479'],
    ['#E3398C', '#CC8FAD'],
    ['#75B831', '#BAFF74'],
    ['#0916B9', '#A1A8FF'],
  ];

  const borderColors = ['#F2E30B', '#5C233F', '#78C800', '#1A0DAB'];
  const colors = gradientColors[index % gradientColors.length];
  const border = borderColors[index % borderColors.length];
  const formattedDate = formatDate(gameData.start_date);
  return (
    <View>
      <LinearGradient
        colors={
          status == 2 || status == 4
            ? colors
            : ['#F38424', '#F7A552', '#F9D479']
        }
        start={{x: 0, y: 0.5}}
        end={{x: 0.8, y: 1}}
        style={[
          styles.card,
          {borderColor: status == 2 || status == 4 ? border : '#F2E30B'},
        ]}>
        <View style={styles.content}>
          <Image source={Game} style={styles.characterImage} />
          <View style={styles.textContainer}>
            <Text style={styles.headerText}>
              GET{' '}
              {status == 4 ? gameData.game_winning_cost : gameData.enroll_cost}{' '}
              & PLAY NOW
            </Text>
            <Text style={styles.description}>
              You will get the{' '}
              {status == 4 ? gameData.game_winning_cost : gameData.enroll_cost}{' '}
              prize money enroll {'\n'} yourself before game start
            </Text>
            <Text style={styles.startText}>
              Start <Text style={styles.dateText}>{formattedDate}</Text>
            </Text>
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>
                  {status == 4
                    ? gameData.game_winning_cost
                    : gameData.enroll_cost}{' '}
                  CASH WIN
                </Text>
              </View>
            </View>
          </View>
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
    paddingVertical: 5,
    marginRight: 15,
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
    fontSize: wp('4%'),
    fontFamily: 'Audiowide-Regular',
    color: '#2A1610',
  },
  description: {
    fontSize: wp('3%'),
    color: '#000000',
    marginVertical: hp('1%'),
    fontFamily: 'Montserrat-Bold',
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
});
