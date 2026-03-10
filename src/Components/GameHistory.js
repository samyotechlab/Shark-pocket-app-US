import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UpcomingGameCard from './UpcomingGameCard';

const GameHistory = ({ gameData, setScrollEnabled }) => {
  const filteredData = Array.isArray(gameData)
    ? gameData.filter((item) => item.status === 4)
    : [];

  const renderItem = (items) => (
    <UpcomingGameCard items={items} status="1" />
  );

  if (filteredData.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No games are currently available.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      horizontal
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContent}
    />
  );
};

const styles = StyleSheet.create({

  emptyContainer: {
    flex:            1,
    alignItems:      'center',
    justifyContent:  'center',
    paddingVertical: hp('2%'),
  },
  emptyText: {
    color:             'white',
    fontSize:          wp('4%'),   
    fontWeight:        '500',
    textAlign:         'center',
    paddingHorizontal: wp('4%'),    
  },
  flatListContent: {
    paddingHorizontal: wp('2%'),   
  },
});

export default GameHistory;