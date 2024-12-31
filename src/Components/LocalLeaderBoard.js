import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { gameList } from '../Service/Game'
import { useNavigation } from '@react-navigation/native'
import AnimatedLoader from './AnimatedLoader'
import AvailableCard from './AvailableCard'

export default function LocalLeaderBoard() {
  const [loader, setLoader] = useState(false)
  const [gameData, setGameData] = useState([])
  const navigation = useNavigation();

  const availableGames = async () => {
    setLoader(true)
    try {
      const response = await gameList();
      if (response) {
        console.log('res', response);
        setGameData(response.data);
      } else {
        Toast.error(response.message);
      }
    } catch (error) {
      console.log('error', error);
      Toast.error(error);
    } finally {
      setLoader(false)
    }
  };

  useEffect(() => {
    availableGames();
  }, [])


  const renderItem = ({ item,index}) => {
    return (<>
      <View style={{ flex: 1, paddingBottom: wp('4%') }}>
        <TouchableOpacity style={styles.container1} onPress={() => {
          navigation.navigate('LocalGameBoard', { game_id: item._id })
        }} >
            <AvailableCard gameData={item} status={"3"} index={index}/>
        </TouchableOpacity>
      </View>
    </>)
  }
  return (
    <View style={styles.container}>
      {
        !loader ? (<FlatList
          data={gameData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        />) : (<AnimatedLoader />)
      }

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: wp('2%'),
  },
  scrollContainer: {
    marginBottom: 20,
  },
  container1: {
    flex: 1,
    paddingLeft: wp('5%'),
    marginBottom: hp('2%')
  }
})