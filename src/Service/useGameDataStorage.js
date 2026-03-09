import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useGameDataStorage = () => {
  const [gameData, setGameData] = useState([]);
  const [myGames, setMyGames] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Store game data in AsyncStorage
  const storeGameData = async (gameData, myGames, bannerData) => {
    try {
      await AsyncStorage.setItem('@gameData', JSON.stringify(gameData));
      await AsyncStorage.setItem('@myGames', JSON.stringify(myGames));
      await AsyncStorage.setItem('@bannerData', JSON.stringify(bannerData));
      setGameData(gameData);
      setMyGames(myGames);
      setBannerData(bannerData);
    } catch (error) {
      console.error('Error storing game data in AsyncStorage:', error);
    }
  };

  // Retrieve game data from AsyncStorage
  const getGameDataFromStorage = async () => {
    try {
      const gameDataJson = await AsyncStorage.getItem('@gameData');
      const myGamesJson = await AsyncStorage.getItem('@myGames');
      const bannerDataJson = await AsyncStorage.getItem('@bannerData');

      setGameData(gameDataJson ? JSON.parse(gameDataJson) : []);
      setMyGames(myGamesJson ? JSON.parse(myGamesJson) : []);
      setBannerData(bannerDataJson ? JSON.parse(bannerDataJson) : []);
    } catch (error) {
      console.error('Error retrieving game data from AsyncStorage:', error);
    } finally {
      setIsReady(true);
    }
  };

  // Clear game data from AsyncStorage
  const clearGameData = async () => {
    try {
      await AsyncStorage.removeItem('@gameData');
      await AsyncStorage.removeItem('@myGames');
      await AsyncStorage.removeItem('@bannerData');
      setGameData([]);
      setMyGames([]);
      setBannerData([]);
    } catch (error) {
      console.error('Error clearing game data from AsyncStorage:', error);
    }
  };

  // Update game data in AsyncStorage
  const updateGameData = async (gameData, myGames, bannerData) => {
    try {
      await AsyncStorage.setItem('@gameData', JSON.stringify(gameData));
      await AsyncStorage.setItem('@myGames', JSON.stringify(myGames));
      await AsyncStorage.setItem('@bannerData', JSON.stringify(bannerData));
      setGameData(gameData);
      setMyGames(myGames);
      setBannerData(bannerData);
    } catch (error) {
      console.error('Error updating game data in AsyncStorage:', error);
    }
  };

  useEffect(() => {
    getGameDataFromStorage();
  }, []);

  return {
    gameData,
    myGames,
    bannerData,
    isReady,
    storeGameData,
    getGameDataFromStorage,
    clearGameData,
    updateGameData,
  };
};

export default useGameDataStorage;