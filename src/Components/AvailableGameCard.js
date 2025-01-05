import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, Text, Dimensions} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';
const { height ,width} = Dimensions.get('window');
const AvailbleGameCard = props => {

  const navigation = useNavigation();
  const myGames = props.gameData;
  const myGameData = myGames.filter(game => game.status === 3);

  const handleNavigation = (item) => {
    navigation.navigate('GameName', {game_id:item._id});
  };

  const renderItem = items => {
    const {item} = items;

    return (
      <>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            handleNavigation(item);
          }}>
          <AvailableCard gameData={item} status={'1'} index={items.index} />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <>
    {
      !myGameData ? (
         <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>
                                    No games or tickets are currently available.
                                </Text>
                            </View>
      ):( <FlatList
        horizontal
        data={myGameData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />)
     
    }
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
emptyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: hp('2%'),
},
});
export default AvailbleGameCard;
