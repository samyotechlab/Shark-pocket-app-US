import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import All from '../Winning/All';
import Debit from '../Winning/Debit';
import Credit from '../Winning/Credit';
import { WinningList } from '../../Service/Wallet';
import AnimatedLoader from '../../Components/AnimatedLoader';

export default function Winning(props) {

  const  {user_id} = props
  const [selectedTab, setSelectedTab] = useState('All');
  const [loader, setLoader] = useState(false);
  const [winningData, setWinningData] = useState([]);

  const handlePress = tab => {
    setSelectedTab(tab);
  };

  const Winning = async () => {
    setLoader(true)
    try {
      const response = await WinningList(user_id);
      setWinningData(response?.data);
    } catch (error) {
      console.log('error', error);
    }finally{
      setLoader(false)
    }
  };

  useEffect(()=>{
    Winning();
  },[])

  return (
    <>
      <View
        style={{
          flex:1,
          flexDirection: 'row',
         padding: hp('2%'),
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
      !loader ? ( <All winningData={winningData} />):(<AnimatedLoader/>) 
    ) : selectedTab === 'Debit' ? (
      !loader ? ( <Debit winningData={winningData}/>):(<AnimatedLoader/>)  
    ) : (
      !loader ? ( <Credit winningData={winningData}/>):(<AnimatedLoader/>)  
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