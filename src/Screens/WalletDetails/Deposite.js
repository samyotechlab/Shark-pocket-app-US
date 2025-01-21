import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Debit from '../Deposite/Debit';
import Credit from '../Deposite/Credit';
import All from '../Deposite/All';
import WalletDetailsCard from '../../Components/WalletDetailsCard';
import { WalletTransactionList } from '../../Service/Wallet';
import AnimatedLoader from '../../Components/AnimatedLoader';

export default function Deposite(props) {

  const  {user_id} = props
  const [selectedTab, setSelectedTab] = useState('All');
  const [loader, setLoader] = useState(false);
  const [walletData, setWalletData] = useState([]);

  const handlePress = tab => {
    setSelectedTab(tab);
  };

  const WalletRequest = async () => {
    setLoader(true)
    try {
      const response = await WalletTransactionList(user_id);
      setWalletData(response?.data);
    } catch (error) {
      console.log('error', error);
    }finally{
      setLoader(false)
    }
  };

  useEffect(()=>{
    WalletRequest()
  },[])

  return (
    <>
      <View
        style={{
          flex:1,
          flexDirection: 'row',
         padding: hp('2%'),
         gap:wp('3%'),
        //  backgroundColor:'red'
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
      !loader ? ( <All walletData={walletData}/>):(<AnimatedLoader/>)
    ) : selectedTab === 'Debit' ? (
      !loader ? ( <Debit walletData={walletData}/>):(<AnimatedLoader/>)  
    ) : (
      !loader ? ( <Credit walletData={walletData}/>):(<AnimatedLoader/>)  
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