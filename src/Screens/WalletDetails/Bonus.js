import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import All from '../Bonus.js/All';
import Debit from '../Bonus.js/Debit';
import Credit from '../Bonus.js/Credit';
import { bonusWallet, WalletTransactionList } from '../../Service/Wallet';
import AnimatedLoader from '../../Components/AnimatedLoader';

export default function Bonus(props) {

  const  {user_id} = props
  const [selectedTab, setSelectedTab] = useState('All');
  const [loader, setLoader] = useState(false);
  const [bonusData, setBonusData] = useState([]);

  const handlePress = tab => {
    setSelectedTab(tab);
  };

  const bonusRequest = async () => {
    setLoader(true)
    try {
      const response = await bonusWallet(user_id);
      console.log("response====>",response)
      setBonusData(response?.data);
    } catch (error) {
      console.log('error', error);
    }finally{
      setLoader(false)
    }
  };

  useEffect(()=>{
    bonusRequest()
  },[])

  return (
    <>
      <View
        style={{
          flex:1,
          flexDirection: 'row',
         padding: hp('1%'),
         gap:wp('3%'),
        }}>
        <TouchableOpacity
          onPress={() => {
            handlePress('All');
          }}
          style={[styles.common,{ backgroundColor: selectedTab === 'All' ? '#FEB801' : '#FFFFFF4D'}]}>
          <Text
            style={styles.txt}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress('Credit');
          }}
          style={[styles.common,{
            backgroundColor: selectedTab === 'Credit' ? '#FEB801' : '#FFFFFF4D',
          }]}>
          <Text
            style={styles.txt}>
           Credit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress('Debit');
          }}
          style={[styles.common,{
            backgroundColor: selectedTab === 'Debit' ? '#FEB801' : '#FFFFFF4D',
          }]}>
          <Text
            style={styles.txt}>
            Debit
          </Text>
        </TouchableOpacity>
      </View>
  <View style={{flex:17}}>
      {selectedTab === 'All' ? (
      !loader ? ( <All bonusData={bonusData}/>):(<AnimatedLoader/>)
    ) : selectedTab === 'Debit' ? (
      !loader ? ( <Debit bonusData={bonusData}/>):(<AnimatedLoader/>)  
    ) : (
      !loader ? ( <Credit bonusData={bonusData}/>):(<AnimatedLoader/>)  
    )}
    </View>
    </>
  )
}

 const styles =  StyleSheet.create({
     common:{
      height: hp('4%'),
      width: wp('20%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: hp('5%'), 
    
    },
    txt:{
      fontSize: hp('1.8%'),
      color: '#FFFFFF',
      fontFamily:'Montserrat-Regular'
    }
  });