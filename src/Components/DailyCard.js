import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AvailableCard from './AvailableCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const DailyCard = ({ gameData, frequencyStatus }) => {
  const navigation = useNavigation();
  const dailyGameData = gameData?.filter(item => item.frequency === 'daily') || [];
  console.log('dailyGameData', dailyGameData);

  const handleNavigation = (item) => {
    const navigationMap = {
      "4": { screen: "AllGameName", params: { game_id: item._id, title: item.title } },
      "3": { screen: "UpcomingGameInfo", params: { game_id: item._id, game_name: item.title } },
    };

    const { screen, params } = navigationMap[frequencyStatus] || { screen: "GameName", params: { game_id: item._id, title: item.title } };
    navigation.navigate(screen, params);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => handleNavigation(item)}>
      <AvailableCard gameData={item} status={frequencyStatus === '1' ? '4' : '2'} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dailyGameData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: hp('5%'),
  },
  itemContainer: {
    flex: 1,
    paddingLeft: wp('5%'),
    marginBottom: hp('2%'),
  },
  container: {
    flex: 1,
    marginTop: hp('3%'),
  },
});

export default DailyCard;
