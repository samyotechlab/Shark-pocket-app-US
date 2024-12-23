import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import ModalScreen from '../../Components/ModalScreen';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';
import CommonButton from '../../Components/CommonButton';

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
    <LinearGradient colors={['#361911', '#361911', '#6A1700']}
            style={styles.linearGradient}>
      <ModalScreen
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={' Please select a super number first.'}
        closeTitle={'Close'}
      />
              <CommonHeader title={'Playing Instruction'}/>
      {/* <ConfirmationModal
        visible={isModalVisible2}
        onClose={() => setIsModalVisible2(false)}
        onYes={handleOnYes}
        title="Are you sure you want to Quit game?"
      /> */}
      <View style={{flex: 1}}>
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
                          marginBottom:10
                        }}
                      />
            <Text style={styles.oddtext}>
              Each Odd Number selected will be scored based on length if the
              number
            </Text>

            <Text style={[styles.oddtext,{fontFamily:'Montserrat-SemiBold'}]}>
              2 digit Equals to 2
              Points.
            </Text>

            <Text style={[styles.oddtext,{fontFamily:'Montserrat-SemiBold'}]}>
              3 digit Equals to 3
              Points.
            </Text>

            <Text style={[styles.oddtext,{fontFamily:'Montserrat-SemiBold'}]}>
              4 digit Equals to 4
              Points.
            </Text>
            <LinearGradient
                        colors={['#999999', '#FFFFFF', '#999999']} 
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          height: 1.5,              
                          marginTop: 10,          
                          marginHorizontal: wp(2), 
                          marginBottom:10
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
                          marginBottom:10
                        }}
                      />
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

            <Text style={[styles.oddtext, {marginTop: 5,fontFamily:'Montserrat-SemiBold'}]}>
              Last Digit of the Odd Selected Number
            </Text>
            <Text style={[styles.oddtext,{    fontFamily:'Montserrat-SemiBold'}]}>
                 5 Extra Points for Each
              of Those Eligible Numbers
            </Text>
            <Text style={[styles.oddtext, {marginBottom: 5,    fontFamily:'Montserrat-SemiBold',}]}>
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
                          marginBottom:10
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
                          marginBottom:10
                        }}
                      />
            <Text style={styles.oddtext}>Extra Bonus Points </Text>
            <Text style={[styles.oddtext,{  fontFamily:'Montserrat-SemiBold',}]}>
              Odd Numbers More Than 10 = 10
                , 30 = 30, 70 = 70, 100 = 100
            </Text>
            <Text style={[styles.oddtext,{  fontFamily:'Montserrat-SemiBold',}]}>
              Super Numbers More Than 5 = 10 10 = 30 ,  20 = 50
            </Text>
            <Text style={[styles.oddtext,{  fontFamily:'Montserrat-SemiBold',}]}>
              Each Selected Prime Number will get Additional
           10 Points
            </Text>
            <LinearGradient
                        colors={['#999999', '#FFFFFF', '#999999']} 
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          height: 1.5,              
                          marginTop: 10,          
                          marginHorizontal: wp(2), 
                          marginBottom:10
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
                          marginBottom:10
                        }}
                      />
            <Text style={styles.oddtext}>
              Negative Scoring for Even Number Selected will be as Below :-
            </Text>
            <Text style={[styles.oddtext,{fontFamily:'Montserrat-SemiBold'}]}>
              2 Digit Number = 0.30
            </Text>
            <Text style={[styles.oddtext,{fontFamily:'Montserrat-SemiBold',}]}>
              {' '}
              3 Digit Number ={' '}
             0.45
            </Text>
            <Text style={[styles.oddtext,{fontFamily:'Montserrat-SemiBold',}]}>
              {' '}
              4 DIgit Number ={' '}
             0.60
            </Text>
            <LinearGradient
                        colors={['#999999', '#FFFFFF', '#999999']} 
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          height: 1.5,              
                          marginTop: 10,          
                          marginHorizontal: wp(2), 
                          marginBottom:10
                        }}
                      />
          </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-start',
          }}>
            <View  style={{
              marginHorizontal: hp(3),
              borderRadius: 10,
              marginVertical: hp(4),
            }}>
            <CommonButton title={'Start Game'}  onPress={handleStartGame}/>
          </View>
        </View>
      </View>
    </LinearGradient>
  </ScrollView>
  )
}

const styles = StyleSheet.create({
  linearGradient:{
    flex:1
  },
    container: {
        flex: 1,
        backgroundColor:'#A38C85',
        margin:15,
        borderRadius:20,
        paddingLeft: hp(1),
        paddingVertical: hp(1),
        marginBottom:-5
      },
      container2: {
        flex: 1,
        backgroundColor:'#A38C85',
        borderRadius: 10,
        justifyContent: 'center',
        paddingLeft: hp(1),
        paddingVertical: hp(1),
      },
      oddtext: {marginHorizontal: 10, color: '#FFFFFF',fontFamily:'Montserrat-Regular'},
      heading: {
        marginHorizontal: 10,
        color: '#FFFFFF',
        fontSize: hp(2.1),
        fontFamily:'Montserrat-SemiBold',
        letterSpacing: 1,
      },
      box: {
        flex: 0.8,
        marginHorizontal: 15,
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
        borderColor:'#000000',
        backgroundColor:'#A1A1A1'
      },
      selectedBox: {
        backgroundColor: '#FFA402',
      },
      boxText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontFamily:'Montserrat-SemiBold'
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