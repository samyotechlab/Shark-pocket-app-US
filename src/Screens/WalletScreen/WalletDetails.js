import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Deposite from '../WalletDetails/Deposite';
import Bonus from '../WalletDetails/Bonus';
import Winning from '../WalletDetails/Winning';
import WithDraw from '../WalletDetails/WithDraw';
import { Loader } from '../../Components/Loader';
import WalletDetailsCard from '../../Components/WalletDetailsCard';

export default function WalletDetails() {
    const [selectedTab, setSelectedTab] = useState('Deposite');
    const [loader, setLoader] = useState(false);
    const handlePress = tab => {
        setSelectedTab(tab);
      };
      const dynamicStyles = getDynamicStyles(selectedTab);
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#361911'}}>
      <CommonHeader title={"Wallet  Details"}/>
    <View style={{marginTop:10}}>
      <View
        style={{
          flexDirection: 'row',
          padding: hp('2%'),
          justifyContent:'space-between',
        }}>
        <TouchableOpacity onPress={() => handlePress('Deposite')}>
          <Text
            style={dynamicStyles.deposite}>
            Deposite
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Bonus')}>
          <Text
            style={dynamicStyles.bonus}>
            Bonus
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Winning')}>
          <Text
            style={dynamicStyles.winning}>
            Winning
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('Withdraw')}>
          <Text
            style={dynamicStyles.withdraw}>
            WithDraw
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'Deposite' ? (
        !loader ? ( <Deposite/>):(<Loader/>)
      ) : selectedTab === 'Bonus' ? (
        !loader ? (  <Bonus/>):(<Loader/>)  
      ) :selectedTab === 'Winning' ? (
        !loader ? ( <Winning/>):(<Loader/>)  
      ):(
        !loader ? ( <WithDraw/>):(<Loader/>) 
      )}
    </View>
    <WalletDetailsCard />

    </SafeAreaView>
  )
}

const getDynamicStyles = selectedTab =>
  StyleSheet.create({
    deposite: {
      fontSize: 18,
      color: selectedTab === 'Deposite' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Deposite' ? 'Montserrat-Bold' : 'Montserrat-Regular',
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Deposite' ? '#FEB801':'#565656', 
    },
    bonus: {
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Bonus' ? '#FEB801':'#565656', 
      color: selectedTab === 'Bonus' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Bonus' ? 'Montserrat-Bold' : 'Montserrat-Regular',
    },
    winning: {
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Winning' ? '#FEB801':'#565656', 
      color: selectedTab === 'Winning' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Winning' ? 'Montserrat-Bold' : 'Montserrat-Regular',
    },
    withdraw: {
      fontSize: 18,
      borderBottomWidth: 3,
      borderBottomColor: selectedTab === 'Withdraw' ? '#FEB801':'#565656', 
      color: selectedTab === 'Withdraw' ? '#FEB801' : '#FFFFFF',
      fontFamily: selectedTab === 'Withdraw' ? 'Montserrat-Bold' : 'Montserrat-Regular',
    },
  });
