import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useRoute } from '@react-navigation/native'
import CommonHeader from './CommonHeader'
import DailyCard from './DailyCard'
import WeeklyCard from './WeeklyCard'


export default function DailyWeeklyBar() {
  const route = useRoute();
  const { gameData } = route.params
  const [selectedTab, setSelectedTab] = useState('Daily');
  const handlePress = tab => {
    setSelectedTab(tab);
  };
  const dynamicStyles = getDynamicStyles(selectedTab);
  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={dynamicStyles.linearGradient}>
      <CommonHeader title={'Availbale Game'}/>
      <View style={{ marginTop: 10,flex:1}}>
        <View
          style={{
            flexDirection: 'row',
            padding: hp('2%'),
            gap: wp('10%')
          }}>
         
          <TouchableOpacity onPress={() => handlePress('Weekly')}>
            <Text
              style={dynamicStyles.Weekly}>
               Weekly Games
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('Daily')}>
            <Text
              style={dynamicStyles.Daily}>
              Daily Games
            </Text>
          </TouchableOpacity>

        </View>
     <View style={{flex:1}}>
        {selectedTab === 'Daily' ? (
            <DailyCard gameData={gameData}/>
        ) : (
            <WeeklyCard gameData={gameData}/>
                )}
        
        </View>
      </View>
    </LinearGradient>
  )
}

const getDynamicStyles = selectedTab =>
  StyleSheet.create({
    linearGradient: {
      flex: 1,
    },
    Daily: {
      fontSize: 18,
      color: selectedTab === 'Daily' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Daily' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Daily' ? '#FEB801' : '#565656',
    },
    Weekly: {
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Weekly' ? '#FEB801' : '#565656',
      color: selectedTab === 'Weekly' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Weekly' ? 'Montserrat-Bold' : 'Montserrat-Regular',
    }
  });