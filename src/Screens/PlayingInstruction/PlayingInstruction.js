import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';
import CommonButton from '../../Components/CommonButton';
import { gameRule } from '../../Service/Game';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import AlertDialogRed from '../../Components/AlertDialogRed';
import AnimatedLoader from '../../Components/AnimatedLoader';

export default function PlayingInstruction() {
  const route = useRoute();
  const { game_id } = route.params;
  const { ticket_id } = route.params;
  const [visible, setVisible] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [oddData, setOddData] = useState({});
  const [negativeData, setNegativeData] = useState({});
  const [superData, setSuperNumber] = useState({});
  const [bonusPoint, setBonusPoint] = useState({});
  const [numberArray, setNumberArray] = useState([]);
  const [loader, setLoader] = useState(false);

  const { loginData, isReady } = useLoginDataStorage();
  const navigation = useNavigation();

  const handleNumberSelect = number => {
    setSelectedNumber(number);
  };

  const data = isReady && loginData && loginData?.data;

  const gameRuleList = async () => {
    try {
      setLoader(true);
      const response = await gameRule();
      if (response) {
        setOddData(response.oddSelection);
        setNegativeData(response.negativePoint);
        setSuperNumber(response.superNumber);
        setBonusPoint(response.bonusPoint);

        if (response.superNumber && response.superNumber.supernumber) {
          const str = response.superNumber.supernumber;
          const arr = str.split(',').map(Number);
          setNumberArray(arr);
        }
      }
    } catch (error) {
      console.log('Error fetching game rules:', error);
    } finally {
      setLoader(false);
    }
  };

  const handleOnYes = () => {
    navigation.goBack();
  };

  useEffect(() => {
    try {
      gameRuleList();
    } catch (error) {
      console.log('Error in getList:', error);
    }
  }, [data]);

  const handleStartGame = () => {
    if (selectedNumber) {
      console.log('Starting game with super number:', selectedNumber);
      navigation.navigate('GameScreen', {
        selectedNumber: selectedNumber,
        game_id: game_id,
        ticket_id: ticket_id,
        user_id: data._id,
        gameRuleData: { oddData, negativeData, superData, bonusPoint },
      });
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
        <CommonHeader title={'Playing Instruction'} />

        <ScrollView>
          {loader ? (
            <View style={styles.loaderContainer}>
              <AnimatedLoader />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <View style={styles.container}>
                <Text style={styles.heading}>Odd Number</Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 2,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
                <Text style={styles.oddtext}>
                  Each Odd Number selected will be scored based on length if the
                  number
                </Text>

                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  2 digit Equals to {oddData.twoDigit} Points.
                </Text>

                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  3 digit Equals to {oddData.threeDigit} Points.
                </Text>

                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  4 digit Equals to {oddData.fourDigit} Points.
                </Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.heading}>Select one super number</Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginVertical: hp(1),
                    flexDirection: 'row',
                  }}>
                  {numberArray.map(number => (
                    <TouchableOpacity
                    key={number}
                     style={[styles.upperBox, selectedNumber === number && styles.selectedBox]}
                     onPress={() => handleNumberSelect(number)}
                     >
                    <View
                      style={[
                        styles.box,
                      ]}
                     >
                        <Text
                          style={[
                            styles.boxText,
                            selectedNumber === number && styles.selectedBoxText,
                          ]}>
                          {number}
                        </Text>
                   
                    </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text
                  style={[
                    styles.oddtext,
                    { marginTop: 5, fontFamily: 'Montserrat-SemiBold' },
                  ]}>
                  Last Digit of the Odd Selected Number
                </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  {superData.points} Extra Points for Each of Those Eligible
                  Numbers
                </Text>
                <Text
                  style={[
                    styles.oddtext,
                    { marginBottom: 5, fontFamily: 'Montserrat-SemiBold' },
                  ]}>
                  Not Applicable for Single Digit
                </Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.heading}>Bonus Number</Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
                <Text style={styles.oddtext}>Extra Bonus Points </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  Odd Numbers More Than 10 = {bonusPoint.oddMoreThan10}, 30 ={' '}
                  {bonusPoint.oddMoreThan30}, 70 = {bonusPoint.oddMoreThan70},
                  100 = {bonusPoint.oddMoreThan100}
                </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  Super Numbers More Than 5 = {bonusPoint.superMoreThan5}, 10 ={' '}
                  {bonusPoint.superMoreThan10}, 20 ={' '}
                  {bonusPoint.superMoreThan20},
                </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  Each Selected Prime Number will get Additional{' '}
                  {bonusPoint.primeNumberPoints} Points
                </Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
              </View>
              <View style={styles.container}>
                <Text style={styles.heading}>Negative Score</Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
                <Text style={styles.oddtext}>
                  Negative Scoring for Even Number Selected will be as Below :-
                </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  2 Digit Number = {negativeData.negTwoDigit}
                </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  3 Digit Number = {negativeData.negThreeDigit}
                </Text>
                <Text
                  style={[styles.oddtext, { fontFamily: 'Montserrat-SemiBold' }]}>
                  4 DIgit Number = {negativeData.negFourDigit}
                </Text>
                <LinearGradient
                  colors={['#999999', '#FFFFFF', '#999999']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 1.5,
                    marginTop: 10,
                    marginHorizontal: wp(2),
                    marginBottom: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 0.5,
                  justifyContent: 'flex-start',
                }}>
                <View
                  style={{
                    marginHorizontal: hp(3),
                    borderRadius: 10,
                    marginVertical: hp(4),
                  }}>
                  <CommonButton
                    title={'Start Game'}
                    onPress={handleStartGame}
                  />
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
      <AlertDialogRed
        visible={visible}
        onClose={() => setVisible(false)}
        message={'Please Select a Super Number.'}
      />
    </>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: hp('40%'),
  },
  container: {
    flex: 1,
    backgroundColor: '#A38C85',
    margin: 15,
    borderRadius: 20,
    paddingLeft: hp(1),
    paddingVertical: hp(1),
    marginBottom: -5,
  },
  container2: {
    flex: 1,
    backgroundColor: '#A38C85',
    borderRadius: 10,
    justifyContent: 'center',
    paddingLeft: hp(1),
    paddingVertical: hp(1),
  },
  oddtext: {
    marginHorizontal: 10,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular',
  },
  heading: {
    marginHorizontal: 10,
    color: '#FFFFFF',
    fontSize: hp(2.1),
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 1,
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    // backgroundColor:'white'
  },
  upperBox:{
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    paddingVertical: hp(0.6),
    marginHorizontal: 15,
    backgroundColor: '#A1A1A1',
  
    // backgroundColor: '#FF671F',
 
  },
  selectedBox: {
    backgroundColor: '#FFA402',
  },
  boxText: {
    fontSize: 22,
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold',
  },
  selectedBoxText: {
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeModalText: {
    color: '#FF671F',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerBackground: {
    height: Platform.OS === 'ios' ? height * 0.1 : 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    paddingTop: 10,
    position: 'relative',
  },
  headerLeft: {
    marginLeft: '20%',
  },
  headerText: {
    fontSize: hp('2.5%'),
    color: 'black',
    fontWeight: '500',
  },
});
