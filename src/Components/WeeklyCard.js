import React from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AvailableCard from './AvailableCard';

const WeeklyCard = ({gameData}) => {
  const weeklyGameData = gameData?.filter(item => item.frequency === "weekly")
  const renderItem = ({ item, index }) => {
    return (<>

      <TouchableOpacity style={styles.container1} >
        <AvailableCard gameData={item} status={"2"} />
      </TouchableOpacity>
    </>)
  }
  return (
    <FlatList
      data={weeklyGameData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    />
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginBottom: hp('5%'),
  },
  container1: {
    flex: 1,
    paddingLeft: wp('5%'),
    marginBottom: hp('2%'),
  }
});

export default WeeklyCard;