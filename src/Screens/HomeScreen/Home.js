import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import sharkLogo from '../../../assets/images/Screens/sharkLogo.png'
import bell from '../../../assets/images/Screens/bell.png'
import wheel from '../../../assets/images/Screens/wheel.png'
import rupees from '../../../assets/images/Screens/rupees.png'
import { Divider } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import WinnerCard from '../../Components/WinnerCard'
import Lighting from '../../../assets/images/Screens/Lighting.png'
import PinkPrizeCard from '../../Components/PinkPrizeCard'
import GoldenCard from '../../Components/GoldenCard'
import AvailbleGameCard from '../../Components/AvailableGameCard'
import UpcomingGameCard from '../../Components/UpcomingGameCard'
import { useRoute } from '@react-navigation/native'
import useLoginDataStorage from '../../Service/CustomStorageHook'
import { getGameData } from '../../Service/Home'

export default function HomeScreen({route}) {


  const {loginData,isReady} = useLoginDataStorage();
  const [loader,setLoader] = useState(false)

  const data = isReady && loginData && loginData?.data 

  const getAllData = async()=>{
    setLoader(true)
    try {
      const response =await  getGameData(data._id)
    } catch (error) {
      console.log("error",error)
    }finally{
      setLoader(false)
    }
  }
  useEffect(()=>{
    if(isReady){
      getAllData();
    }else{
      setLoader(true)
    }
  },[])


  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Image source={sharkLogo} style={styles.logo} />
          </View>  

          {/* Rupee Wallet Section */}
          <View style={styles.walletContainer}>
            <Image source={rupees} style={styles.walletIcon} />
            <Text style={styles.walletText}>{data.total_balance}</Text>
          </View>

          {/* Icons Section */}
          <View style={styles.iconsContainer}>
            <Image source={bell} style={styles.icon} />
            <Image source={wheel} style={styles.icon} />
          </View>
        </View>

        <Divider 
        color="#FFCE63"  
        width={2}      
        style={{ marginVertical: 6 }} 
      />
        <View style={{ flex: 1, margin: wp('2%') }}>
          <WinnerCard />
        </View>

        <View style={{ flex: 1, margin: wp('2%') }}>
          <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', paddingLeft: 22 }}>
            <Image source={Lighting} style={styles.light} />
            <Text style={styles.myGame}>MY GAME</Text>
          </View>
          <View style={{ flex: 1.5, flexDirection: 'row',marginTop:10 }}>
            <PinkPrizeCard />
            <GoldenCard />
          </View>
        </View>

        <View style={{ flex: 1.2, margin: wp('2%') }}>
          <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', paddingLeft: 22 }}>
            <Image source={Lighting} style={styles.light} />
            <Text style={styles.myGame}>AVAILABLE GAMES </Text>
            <TouchableOpacity>
              <Text style={styles.view}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.5,marginTop:10 }}>
            <AvailbleGameCard />
          </View>
        </View>

        <View style={{ flex: 0.8, margin: wp('2%') }}>
          <View style={{ flex: 0.5, flexDirection: 'row', alignItems: 'center', paddingLeft: 22 }}>
            <Image source={Lighting} style={styles.light} />
            <Text style={styles.myGame}>UPCOMING GAMES</Text>
            <TouchableOpacity>
              <Text style={styles.view}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1.5, flexDirection: 'row'}}>
            <UpcomingGameCard />
            {/* <AvailbleGameCard /> */}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  light:{
    paddingLeft:10
  },
  myGame:{
    color:'#FFB700',
    fontFamily:'Montserrat-Bold',
    fontSize:20,
    paddingLeft:10
  },
  view:{
    color:'#FFB700',
    fontFamily:'Montserrat-Bold',
    textDecorationLine:'underline',
    paddingLeft:hp('5%')
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    backgroundColor: '#361911',
    marginTop: hp('4%'),
  },
  logoContainer: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: hp('6%'),
    width: wp('12%'),
    resizeMode: 'contain',
  },
  walletContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#552113',
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
  },
  walletIcon: {
    height: hp('4%'),
    width: wp('8%'),
    resizeMode: 'contain',
  },
  walletText: {
    color: '#FFFFFF',
    fontSize: wp('5%'),
    fontFamily: 'Montserrat-Bold',
    marginLeft: wp('2%'),
  },
  iconsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: wp('5%'),
  },
  icon: {
    height: hp('5%'),
    width: wp('10%'),
    resizeMode: 'contain',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#361911',
  },
})