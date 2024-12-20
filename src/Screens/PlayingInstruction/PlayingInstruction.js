import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import ModalScreen from '../../Components/ModalScreen';
import { useNavigation } from '@react-navigation/native';

export default function PlayingInstruction() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState(null);
    const navigation = useNavigation()
    const handleNumberSelect = number => {
        setSelectedNumber(number);
      };

      const handleStartGame = ()=>{
        navigation.navigate("GameScreen",{
            selectedNumber: 5,
        })
      }
  return (
    <ScrollView>
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ModalScreen
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={' Please select a super number first.'}
        closeTitle={'Close'}
      />
      {/* <ConfirmationModal
        visible={isModalVisible2}
        onClose={() => setIsModalVisible2(false)}
        onYes={handleOnYes}
        title="Are you sure you want to Quit game?"
      /> */}
      <View style={styles.headerBackground}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={{position: 'absolute', top: hp('1.3%'), left: hp('1.8%')}}>
            {/* <Icon name="arrow-left" size={hp('3.5%')} color="black" /> */}
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text style={styles.headerText}>Playing Instraction</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1, padding: hp(1.5), justifyContent: 'center'}}>
          <View style={styles.container}>
            <Text style={styles.heading}>Odd Number</Text>
            <Text style={styles.oddtext}>
              Each Odd Number selected will be scored based on length if the
              number
            </Text>

            <Text style={styles.oddtext}>
              2 digit Equals to 2
              Points.
            </Text>

            <Text style={styles.oddtext}>
              3 digit Equals to 3
              Points.
            </Text>

            <Text style={styles.oddtext}>
              4 digit Equals to 4
              Points.
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            padding: hp(1.5),
            justifyContent: 'center',
          }}>
          <View style={styles.container}>
            <Text style={styles.heading}>Select one super number</Text>

            <View
              style={{
                flex: 1,
                marginVertical: hp(1),
                flexDirection: 'row',
              }}>
              {[1, 3, 5, 7, 9].map(number => (
                <TouchableOpacity
                  key={number}
                  style={[
                    styles.box,
                    selectedNumber === number && styles.selectedBox,
                  ]}
                  onPress={() => handleNumberSelect(number)}>
                  <Text
                    style={[
                      styles.boxText,
                      selectedNumber === number && styles.selectedBoxText,
                    ]}>
                    {number}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.oddtext, {marginTop: 5}]}>
              Last Digit of the Odd Selected Number
            </Text>
            <Text style={styles.oddtext}>
                 5 Extra Points for Each
              of Those Eligible Number
            </Text>
            <Text style={[styles.oddtext, {marginBottom: 5}]}>
              Not Applicable for Single Digit
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1.1,

            padding: hp(1.5),
            justifyContent: 'center',
          }}>
          <View style={styles.container2}>
            <Text style={styles.heading}>Bonus Number</Text>
            <Text style={styles.oddtext}>Extra Bonus Points </Text>
            <Text style={styles.oddtext}>
              Odd Numbers More Than 10 = 10
                , 30 = 30, 70 = 70, 100 = 100
            </Text>
            <Text style={styles.oddtext}>
              Super Numbers More Than 5 = 10 10 = 30 ,  20 = 50
            </Text>
            <Text style={styles.oddtext}>
              Each Selected Prime Number will get Additional
           10 Points
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            padding: hp(1.5),
            justifyContent: 'center',
          }}>
          <View style={styles.container}>
            <Text style={styles.heading}>Negative Score</Text>
            <Text style={styles.oddtext}>
              Negative Scoring for Even Number Selected will be as Below :-
            </Text>
            <Text style={styles.oddtext}>
              2 Digit Number = 0.30
            </Text>
            <Text style={styles.oddtext}>
              {' '}
              3 Digit Number ={' '}
             0.45
            </Text>
            <Text style={styles.oddtext}>
              {' '}
              4 DIgit Number ={' '}
             0.60
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 0.5,

            justifyContent: 'flex-start',
          }}>
          <TouchableOpacity
            onPress={handleStartGame}
            style={{
              padding: hp(1.5),
              backgroundColor: '#FF671F',
              marginHorizontal: hp(4),
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: hp(2.5),
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                letterSpacing: 1,
                fontWeight: '500',
              }}>
              START GAME
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#CDCDCD',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: hp(1),
        paddingVertical: hp(1),
      },
      container2: {
        flex: 1,
        borderColor: '#CDCDCD',
        // backgroundColor: 'pink',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: hp(1),
        paddingVertical: hp(1),
      },
      oddtext: {marginHorizontal: 10, color: '#414141', fontWeight: '400'},
      heading: {
        marginHorizontal: 10,
        color: '#414141',
        fontSize: hp(2.1),
        fontWeight: 'bold',
        letterSpacing: 1,
        marginTop: 5,
        marginBottom: 5,
      },
      box: {
        flex: 0.8,
        marginHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#FF671F',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
      },
      selectedBox: {
        backgroundColor: '#FF671F',
      },
      boxText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF671F',
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
})