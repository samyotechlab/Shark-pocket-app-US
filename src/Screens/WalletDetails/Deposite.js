import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Loader } from '../../Components/Loader';
import Debit from '../Deposite/Debit';
import Credit from '../Deposite/Credit';
import All from '../Deposite/All';

export default function Deposite() {

  const [selectedTab, setSelectedTab] = useState('All');
  const [loader, setLoader] = useState(false);

  const handlePress = tab => {
    setSelectedTab(tab);
  };

  return (
    <>
    <View style={{flex: 1}}>
      <View
        style={{
          flex:1,
          flexDirection: 'row',
         padding: hp('2%'),
         gap:wp('3%')
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
      {selectedTab === 'All' ? (
      !loader ? ( <All/>):(<Loader/>)
    ) : selectedTab === 'Debit' ? (
      !loader ? ( <Debit/>):(<Loader/>)  
    ) : (
      !loader ? ( <Credit/>):(<Loader/>)  
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
      fontSize: 16,
      color: '#FFFFFF',
      fontFamily:'Montserrat-Regular'
    }
  });