import { FlatList, TouchableOpacity, View, StyleSheet } from 'react-native';
import React, { useState, useEffect, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import CommonHeader from '../../Components/CommonHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRoute, useNavigation } from '@react-navigation/native';
import AvailableCard from '../../Components/AvailableCard';
import DailyWeeklyBar from '../../Components/DailyWeeklyBar';
import DailyCard from '../../Components/DailyCard';
import WeeklyCard from '../../Components/WeeklyCard';

export default function AvailableGame() {
  const navigation = useNavigation();
  const route = useRoute();
  const { gameData, status } = route.params;
  const [disabled, setDisabled] = useState(false);

  const titleMap = {
    "5": "Daily Game",
    "6": "Weekly Game",
  };2

  const title = titleMap[status] || "Available Games";

  const myGames = useMemo(() => {
    const statusFilterMap = {
      "1": gameData,
      "2": gameData.filter(game => game?.status === 3),
      "3": gameData.filter(game => game?.status === 1),
      "4": gameData.filter(game => game?.status === 4),
    };
    return statusFilterMap[status] || gameData.filter(game => game?.status === 3);
  }, [gameData, status]);

  const handleNavigation = (item) => {
    const navigationMap = {
      "4": { screen: "AllGameName", params: { game_id: item._id, title: item.title } },
      "3": { screen: "UpcomingGameInfo", params: { game_id: item._id, game_name: item.title } },
    };

    const { screen, params } = navigationMap[status] || { screen: "GameName", params: { game_id: item._id, title: item.title } };
    navigation.navigate(screen, params);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.container1} onPress={() => handleNavigation(item)} disabled={disabled}>
      <AvailableCard gameData={item} status={status === "1" ? "4" : "2"} />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.linearGradient}>
      {["1", "2", "3", "4"].includes(status) ? (
        <DailyWeeklyBar gameData={gameData} />
      ) : (
        <>
          <CommonHeader title={title} />
          {status === "5" ? (
            <DailyCard gameData={myGames} />
          ) : status === "6" ? (
            <WeeklyCard gameData={myGames} />
          ) : (
            <View style={styles.container}>
              <FlatList
                data={myGames}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContainer}
              />
            </View>
          )}
        </>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: hp('3%'),
  },
  scrollContainer: {
    marginBottom: hp('5%'),
  },
  container1: {
    flex: 1,
    paddingLeft: wp('5%'),
    marginBottom: hp('2%'),
  },
});