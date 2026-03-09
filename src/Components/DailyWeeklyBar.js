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
  const { gameData, status } = route.params;
  const days = status === '5' ? 'Daily' : 'Weekly';
  const [selectedTab, setSelectedTab] = useState(days);

  const title = {
    1:"My Game",
    2:"Available Game",
    3:"Upcoming Game",
    4:"Game History",
    5:"Daily Game",
    6:"Weekly Game",
  }

  const filteredGames = {
    myGames: gameData.filter(game => game?.status === 1),
    myAllGames: gameData.filter(game => game?.status === 3),
  };

  const handlePress = (tab) => setSelectedTab(tab);

  const getGameData = () => {
    if (status === '1') return gameData;
    if (status === '2') return filteredGames.myAllGames;
    if (status === '3') return filteredGames.myGames;
    if (status === '4') return gameData
    if (status === '5') return filteredGames.myAllGames
    if (status === '6') return filteredGames.myAllGames
  };

  return (
    <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
      <CommonHeader title={title[status]?title[status]:"Game"} />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          {['Weekly', 'Daily'].map((tab) => (
            <TouchableOpacity key={tab} onPress={() => handlePress(tab)}>
              <Text style={styles.tab(selectedTab === tab)}>{`${tab} Games`}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {selectedTab === 'Daily' ? (
            <DailyCard gameData={getGameData()} frequencyStatus={status} />
          ) : (
            <WeeklyCard gameData={getGameData()} frequencyStatus={status} />
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: { flex: 1 },
  container: { marginTop: hp('1%'), flex: 1 },
  tabContainer: { flexDirection: 'row', padding: hp('1%'), justifyContent: 'space-evenly'},
  tab: (isActive) => ({
    fontSize: hp('2%'),
    color: isActive ? '#FEB801' : '#FFFFFF',
    fontFamily: isActive ? 'Montserrat-Bold' : 'Montserrat-Regular',
    borderBottomWidth: hp('0.3%'),
    borderBottomColor: isActive ? '#FEB801' : '#565656',
  }),
});
