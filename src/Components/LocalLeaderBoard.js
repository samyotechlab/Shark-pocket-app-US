import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { gameList } from '../Service/Game'
import { useNavigation } from '@react-navigation/native'
import AnimatedLoader from './AnimatedLoader'
import AvailableCard from './AvailableCard'
import Toast from 'react-native-toast-message'
import useLoginDataStorage from '../Service/CustomStorageHook'

export default function LocalLeaderBoard({type}) {
  const [loader, setLoader] = useState(false)
  const [weeklyData, setWeeklyData] = useState([])
  const [dailyData, setDailyData] = useState([])
  const navigation = useNavigation();
  const { loginData, isReady, storeLoginData } = useLoginDataStorage();
  const [userId, setUserId] = useState('');

  let msg;

  const availableGames = async (user_id) => {
    setLoader(true)
    try {
      const response = await gameList(user_id);
      if (response) {
       const weekData = response.data?.filter((item)=>item.frequency === "weekly")
       const dayData = response.data?.filter((item)=>item.frequency === "daily")
        setWeeklyData(weekData);
        setDailyData(dayData)
      } else {
        msg = response.message
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: { msg },
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      msg = error.message
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: { msg },
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false)
    }
  };

    useEffect(() => {
      const data = isReady && loginData && loginData?.data;
      if (loginData && isReady) {
        availableGames(data._id);
        setUserId(data._id);
      }
    }, [isReady, loginData]);

  const renderItem = ({ item, index }) => {
    return (<>
      <View style={{ flex: 1}}>
        <TouchableOpacity style={styles.container1} onPress={() => {
          navigation.navigate('LocalGameBoard', { game_id: item._id ,user_id:userId })
        }} >
          <AvailableCard gameData={item} status={"3"} index={index} />
        </TouchableOpacity>
      </View>
    </>)
  }
  return (
    <View style={styles.container}>
      {
      weeklyData ? 
        (!loader ? (<FlatList
          data={type === "weekly" ? weeklyData :dailyData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        />) : (<AnimatedLoader />)):(
          <View style={styles.emptyContainer}>
                      <Text style={styles.emptyText}>
                        No games or tickets are currently available.
                      </Text>
                    </View>
        )
      }
  <Toast ref={Toast.setRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: wp('2%'),
  },
  container1: {
    flex: 1,
    paddingLeft: wp('5%'),
    marginBottom: hp('2%')
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
})