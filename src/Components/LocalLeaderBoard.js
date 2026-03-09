import React, { useEffect, useState, useCallback, memo } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { gameList } from '../Service/Game';
import useLoginDataStorage from '../Service/CustomStorageHook';
import AnimatedLoader from './AnimatedLoader';
import AvailableCard from './AvailableCard';

const LocalLeaderBoard = ({ type = 'daily' }) => {
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState({ weekly: [], daily: [] });

  const showErrorToast = useCallback((message) => {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: 'Error!',
      text2: message,
      visibilityTime: 3000,
    });
  }, []);

  const fetchGames = useCallback(async (userId) => {
    if (!userId) return;

    setIsLoading(true);
    try {
      const response = await gameList(userId);
      if (response?.data) {
        setGameData({
          weekly: response.data.filter(item => item.frequency === 'weekly'),
          daily: response.data.filter(item => item.frequency === 'daily'),
        });
      } else {
        showErrorToast(response?.message || 'Failed to fetch games');
      }
    } catch (error) {
      showErrorToast(error.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [showErrorToast]);

  useEffect(() => {
    if (isReady && loginData?.data?._id) {
      fetchGames(loginData.data._id);
    }
  }, [isReady, loginData?.data?._id, fetchGames]);

  const handleNavigation = (item)=>{
    if (item?.status === 5) {
     console.log('Game is already played');
     navigation.navigate('LocalGameDescription')
  }else{
    navigation.navigate('LocalGameBoard', {
      game_id: item?._id,
      user_id: loginData?.data?._id
    });
  }
  }

  const renderGameItem = useCallback(({ item, index }) => (
    <TouchableOpacity
      style={styles.gameContainer}
      onPress={() => handleNavigation(item)}
    >
      <AvailableCard gameData={item} status="3" index={index} />
    </TouchableOpacity>
  ), [navigation, loginData?.data?._id]);

  const data = type === 'weekly' ? gameData.weekly : gameData.daily;

  return (
    <View style={styles.container}>
      {isLoading ? (
        <AnimatedLoader />
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games are currently available.
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderGameItem}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        />
      )}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: wp('2%'),
  },
  gameContainer: {
    flex: 1,
    paddingLeft: wp('5%'),
    marginBottom: hp('2%'),
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
  scrollContainer: {
    paddingBottom: hp('2%'),
  },
});

export default memo(LocalLeaderBoard);