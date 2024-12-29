import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import trophy from '../../../assets/images/Screens/trophy2.png'
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { Loader } from '../../Components/Loader';
import Toast from 'react-native-toast-message';
import { historyData } from '../../Service/GameHistory';
import { useNavigation } from '@react-navigation/native';

const PlayedHistory = () => {
  const [loader,setLoader] = useState(false)
  const {loginData,isReady} = useLoginDataStorage()
  const [history, setHistory] = useState([]);
  const data = isReady && loginData && loginData?.data 
  const navigation = useNavigation()

  const historyDataList = async () => {
    setLoader(true)
    try {
      const response = await historyData(data._id);
      console.log('response', response);
      if (response) {
        setHistory(response?.data);
      } else {
        Toast.error(response?.message);
      }
    } catch (error) {
      console.log('error', error);
    }finally{
      setLoader(false);
    }
  };
    useEffect(()=>{
      if(isReady){
        historyDataList();
      }else{
        setLoader(true)
      }
    },[isReady, loginData])

  const renderItem = ({ item }) => {
    console.log("item",item)
    return (
      <>
       <View style={styles.container1} >
        <TouchableOpacity style={styles.cardOuterContainer} onPress={()=>{
          navigation.navigate('GameFinishHistory',{_id:item._id,user_id:item.user_id})
        }}>
          <LinearGradient
            colors={['#F38424', '#F7A552', '#F9D479']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.cardContainer}>
            {/* Trophy Icon */}
            <Image
              source={trophy}
              style={styles.trophyIcon}
            />

            {/* Details Section */}
            <View style={styles.detailsContainer}>
              <Text style={styles.titleText}>Played On</Text>
              <View style={styles.dateTimeRow}>
                <Text style={styles.dateText}>{item.start_date}</Text>
                {/* <Text style={styles.timeText}>02:23 Pm</Text> */}
              </View>
            </View>

            {/* Score */}
            <Text style={styles.scoreText}>{item.score}</Text>
          </LinearGradient>
        </TouchableOpacity>
        </View>
      </>
    )
  }
  return (

    <View style={styles.container}>
      {
        !loader ?( <FlatList
          data={history}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        />) : (<Loader/>)
      }
     
    </View>

  );
};

const styles = StyleSheet.create({
  cardOuterContainer: {
    backgroundColor: '#F2E30B',
    borderRadius: 12,
    padding: 4,


  },
          container:{
                flex:1,
            },
            container1: {
              flex: 1,
              margin:10
          },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  trophyIcon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  titleText: {
    color: '#2A1610',
    fontSize: 18,
    fontFamily: 'Audiowide-Regular',
    marginBottom: 5,
  },
  dateTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    color: '#000000B2',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold',
  },
  timeText: {
    color: '#000',
    fontSize: 14,
  },
  scoreText: {
    color: '#2A1610',
    fontSize: 24,
    fontFamily: 'Audiowide-Regular',
  },
});

export default PlayedHistory;
