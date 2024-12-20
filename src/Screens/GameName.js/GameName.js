import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Loader } from '../../Components/Loader'
import Tickets from './Tickets'
import PlayedHistory from './PlayedHistory'

export default function GameName() {
        const [selectedTab, setSelectedTab] = useState('Tickets');
        const [loader, setLoader] = useState(false);
        const handlePress = tab => {
            setSelectedTab(tab);
          };
          const dynamicStyles = getDynamicStyles(selectedTab);
  return (
    <LinearGradient
                 colors={['#361911', '#361911', '#6A1700']}
                 style={dynamicStyles.linearGradient}>
                    <CommonHeader title={"Games Name"}/>
                        <View style={{marginTop:10}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              padding: hp('2%'),
                              gap :wp('10%')
                            }}>
                            <TouchableOpacity onPress={() => handlePress('Tickets')}>
                              <Text
                                style={dynamicStyles.Tickets}>
                                Tickets
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePress('PlayedHistory')}>
                              <Text
                                style={dynamicStyles.PlayedHistory}>
                                PlayedHistory
                              </Text>
                            </TouchableOpacity>

                          </View>
                    
                          {selectedTab === 'Tickets' ? (
                            !loader ? ( <Tickets/>):(<Loader/>)
                          ) :(
                            !loader ? ( <PlayedHistory/>):(<Loader/>) 
                          )}
                        </View>
               </LinearGradient>
  )
}

      const getDynamicStyles = selectedTab =>
        StyleSheet.create({
            linearGradient: {
                flex: 1,
              },
          Tickets: {
            fontSize: 18,
            color: selectedTab === 'Tickets' ? '#FEB801' : '#FFFFFF',
            fontFamily: selectedTab === 'Tickets' ? 'Montserrat-Bold' : 'Montserrat-Regular',
            borderBottomWidth: 3,
            borderBottomColor: selectedTab === 'Tickets' ? '#FEB801':'#565656', 
          },
          PlayedHistory: {
            fontSize: 18,
            borderBottomWidth: 3,
            borderBottomColor: selectedTab === 'PlayedHistory' ? '#FEB801':'#565656', 
            color: selectedTab === 'PlayedHistory' ? '#FEB801' : '#FFFFFF',
            fontFamily: selectedTab === 'PlayedHistory' ? 'Montserrat-Bold' : 'Montserrat-Regular',
          },
          winning: {
            fontSize: 18,
            borderBottomWidth: 3,
            borderBottomColor: selectedTab === 'Winning' ? '#FEB801':'#565656', 
            color: selectedTab === 'Winning' ? '#FEB801' : '#FFFFFF',
            fontFamily: selectedTab === 'Winning' ? 'Montserrat-Bold' : 'Montserrat-Regular',
          },
          withdraw: {
            fontSize: 18,
            borderBottomWidth: 3,
            borderBottomColor: selectedTab === 'Withdraw' ? '#FEB801':'#565656', 
            color: selectedTab === 'Withdraw' ? '#FEB801' : '#FFFFFF',
            fontFamily: selectedTab === 'Withdraw' ? 'Montserrat-Bold' : 'Montserrat-Regular',
          },
        });