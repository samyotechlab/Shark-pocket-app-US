import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CommonHeader from '../../Components/CommonHeader';
import Coin from '../../../assets/images/Screens/CoinStack.png';
import AnimatedLoader from '../../Components/AnimatedLoader';

export default function GameFinishHistory() {
  const [loader, setLoader] = useState(false);
  const route = useRoute();
  const {gameHistoryData} = route.params;

  console.log('gameHistoryData---------->', gameHistoryData);

  console.log('gameHistoryData', gameHistoryData?.double_digit);

  return (
    <>
      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.container}>
        <CommonHeader title={'Games Name'} />
        {!loader ? (
          <>
            <View style={styles.headerContainer}>
              <LinearGradient
                colors={['#F38424', '#F7C929', '#F9D479']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{
                  flex: 1,
                  borderRadius: wp('2%'),
                  margin: wp('1.5%'),
                  width: wp('89.5%'),
                }}>
                <View style={styles.score}>
                  <Text style={styles.headerText}>YOUR SCORE</Text>
                </View>
                <View style={styles.scoreBox}>
                  <LinearGradient
                    colors={['#00E000', '#00B300', '#00B300']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.scoreBox1}>
                    <Image source={Coin} style={styles.coinImage} />
                    <Text style={styles.scoreText}>
                      {gameHistoryData.score}
                    </Text>
                  </LinearGradient>
                </View>
              </LinearGradient>
            </View>
            <View style={{flex: 2, margin: wp('3%')}}>
              <Text
                style={{
                  color: '#FFB700',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: 20,
                  marginBottom: wp('4%'),
                }}>
                Points Calculation
              </Text>
              <LinearGradient
                colors={['#F38424', '#F7A552', '#F9D479']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={styles.tableContainer}>
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Double</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.double_digit.selected}*
                      {gameHistoryData.double_digit.assignedScore}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.double_digit.score}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#EE8423', '#FFFFFF', '#F0B226']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}
                />
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Triple</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.triple_digit.selected}*
                      {gameHistoryData.triple_digit.assignedScore}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.triple_digit.score}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#EE8423', '#FFFFFF', '#F0B226']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}
                />
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Quadraple</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.quadruple_digit.selected}*
                      {gameHistoryData.quadruple_digit.assignedScore}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.quadruple_digit.score}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#EE8423', '#FFFFFF', '#F0B226']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}
                />
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Prime</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.prime_number.selected}*
                      {gameHistoryData.prime_number.assignedScore}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.prime_number.score}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#EE8423', '#FFFFFF', '#F0B226']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}
                />
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Super</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.super_number.selected}*
                      {gameHistoryData.super_number.assignedScore}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.super_number.score}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#EE8423', '#FFFFFF', '#F0B226']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}
                />
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Bonus</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>-</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.bonus_point_score.bonusPoints}
                    </Text>
                  </View>
                </View>
                <LinearGradient
                  colors={['#EE8423', '#FFFFFF', '#F0B226']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.gradientBorder}
                />
                <View style={styles.row}>
                  <View style={{flex: 2.5}}>
                    <Text style={styles.rowText}>Wrong</Text>
                  </View>
                  <View style={{flex: 1.5}}>
                    <Text style={styles.rowText}>-</Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={styles.rowText}>
                      {gameHistoryData.bonus_point_score.superPoints}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}></View>
            </View>
          </>
        ) : (
          <AnimatedLoader />
        )}
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  underContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    width: wp('97%'),
  },
  container1: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    margin: wp('5%'),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    backgroundColor: '#F2E30B',
  },
  headerContainer: {
    flex: 0.5,
    backgroundColor: '#F2E30B',
    margin: wp('4%'),
    borderRadius: wp('2%'),
    borderColor: '#000000',
    borderWidth: 2,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 10,
    shadowRadius: 1,
  },
  headerText: {
    fontSize: 28,
    fontFamily: 'LilitaOne-Regular',
    color: '#FFF',
    textAlign: 'center',
  },
  score: {
    flex: 1,
    backgroundColor: '#F2BB00',
    borderRadius: wp('10%'),
    margin: wp('3.5%'),
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreBox1: {
    height: hp('6%'),
    width: wp('35%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  coinImage: {
    width: 30,
    height: 30,
  },
  tableContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  row1: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  row: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  gradientBorder: {
    height: 1.5,
    width: '90%',
    alignSelf: 'center',
  },
  rowText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    // alignSelf: 'center',
    textAlign: 'flex-start',
  },
  homeButton: {
    // flex:1.5,
    backgroundColor: '#F2BB00',
    borderRadius: wp('10%'),
    margin: wp('3.5%'),
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'white',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: wp('3%'),
    paddingHorizontal: wp('13%'),
  },
  homeButtonText: {
    fontSize: 28,
    fontFamily: 'LilitaOne-Regular',
    color: '#FFF',
    textAlign: 'center',
  },
});
