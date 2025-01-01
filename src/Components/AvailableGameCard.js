import React from 'react';
import {StyleSheet, TouchableOpacity, FlatList, Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AvailableCard from './AvailableCard';

const AvailbleGameCard = props => {
  const navigation = useNavigation();
  const myGames = props.gameData;
  const myGameData = myGames.filter(game => game.status === 3);

  const handleNavigation = () => {
    navigation.navigate('AvailableGame', {gameData: myGames});
  };

  const renderItem = items => {
    const {item} = items;

    return (
      <>
        <TouchableOpacity
          style={styles.container}
          onPress={() => {
            handleNavigation();
          }}>
          <AvailableCard gameData={item} status={'1'} index={items.index} />
        </TouchableOpacity>
      </>
    );
  };
  return (
    <FlatList
      horizontal
      data={myGameData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: hp('45%'),
  },
});
export default AvailbleGameCard;
