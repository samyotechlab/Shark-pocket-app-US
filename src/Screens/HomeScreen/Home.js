import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import sharkLogo from '../../../assets/images/Screens/sharkLogo.png'
import bell from '../../../assets/images/Screens/bell.png'
import wheel from '../../../assets/images/Screens/wheel.png'
import rupees from '../../../assets/images/Screens/rupees.png'
import { Divider } from 'react-native-elements'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import WinnerCard from '../../Components/WinnerCard'
import Lighting from '../../../assets/images/Screens/Lighting.png'
import PinkPrizeCard from '../../Components/PinkPrizeCard'
import GoldenCard from '../../Components/GoldenCard'
import AvailbleGameCard from '../../Components/AvailableGameCard'
import UpcomingGameCard from '../../Components/UpcomingGameCard'

export default function HomeScreen() {
  return (
    <LinearGradient
           colors={['#361911', '#361911', '#6A1700']}
           style={styles.linearGradient}>
            <View style={{flex:0.5,flexDirection:'row',marginTop:wp('6%')}}>
              <View style={{flex:0.5,justifyContent:'center',alignItems:'center'}}>
                <Image source={sharkLogo} style={{height:hp('7%'),width:wp('13.5%')}}/>
              </View>
              <View style={{flex:1,backgroundColor:'#552113',margin:wp('4%'),flexDirection:'row',alignItems:'center',gap:1}}>
               
              <Image source={rupees} style={{height:hp('4%'),width:wp('8%')}} />
              <Text style={{color:'#FFFFFF',fontSize:wp('7%'),fontFamily:'Montserrat-Bold'}}> ₹ 1000</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',flexDirection:'row',alignItems:'center',gap:wp('8%')}}>
                     <Image source={bell} style={{height:hp('5%'),width:wp('10%')}}/>
                     <Image source={wheel} style={{height:hp('6%'),width:wp('12%')}}/>
                </View>
                <Divider width={150} mx="5"  style={{backgroundColor:'red'}} />
            </View>
            <View style={{flex:1,margin:wp('2%')}}>
                <WinnerCard/>
            </View>
            <View style={{flex:1,margin:wp('2%')}}>
              <View style={{flex:0.5,flexDirection:'row',alignItems:'center',paddingLeft:22}}>
                <Image source={Lighting} style={styles.light}/>
                <Text style={styles.myGame}>MY GAME</Text>
              </View>
              <View style={{flex:1.5,flexDirection:'row'}}>
                <PinkPrizeCard/>
                <GoldenCard />
              </View>
            </View>
            <View style={{flex:1.2,margin:wp('2%')}}>
            <View style={{flex:0.5,flexDirection:'row',alignItems:'center',paddingLeft:22}}>
                <Image source={Lighting} style={styles.light}/>
                <Text style={styles.myGame}>AVAILABLE GAMES </Text>
                <TouchableOpacity><Text style={styles.view}>View All</Text></TouchableOpacity>
              </View>
              <View style={{flex:1.5}}>
              <AvailbleGameCard />
              </View>
            </View>
            <View style={{flex:0.8,margin:wp('2%')}}>
            <View style={{flex:0.5,flexDirection:'row',alignItems:'center',paddingLeft:22}}>
                <Image source={Lighting} style={styles.light}/>
                <Text style={styles.myGame}>UPCOMING GAMES</Text>
                <TouchableOpacity><Text style={styles.view}>View All</Text></TouchableOpacity>
              </View>
              <View style={{flex:1.5,flexDirection:'row'}}>
                <UpcomingGameCard/>
              {/* <AvailbleGameCard/> */}
              </View>
            </View>
         </LinearGradient>
  )
}

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
      },
      container:{
        flex:1
      },
      myGame:{
        color:'#FFB700',
        fontFamily:'Montserrat-Bold',
        fontSize:20,
        paddingLeft:10
      },
      light:{
        paddingLeft:10
      },
      view:{
        color:'#FFB700',
        fontFamily:'Montserrat-Bold',
        textDecorationLine:'underline',
        paddingLeft:hp('5%')
      }
})