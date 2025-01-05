import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Success from '../WithDrawHistory/Success';
import Failed from '../WithDrawHistory/Failed';
import Pending from '../WithDrawHistory/Pending';
import { withdrawHistory } from '../../Service/WithDraw';
import AnimatedLoader from '../../Components/AnimatedLoader';


const WithdrawHistory = ({dataUser}) => {
  const [selectedTab, setSelectedTab] = useState('Success');
  const [loader, setLoader] = useState(false);
  const [data,setData] = useState([])

  const handlePress = tab => {
    setSelectedTab(tab);
  };

  const withdrawDetails = async () => {
    setLoader(true)
    try {
      const response = await withdrawHistory(dataUser._id);
      console.log('response', response);
      setData(response.data);
    } catch (error) {
      console.log('error', error);
    }
    finally {
      setLoader(false)
    }
  };

  useEffect(() => {
    withdrawDetails();
  }, [])


  return (
    <>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: hp('2%'),
          gap: wp('3%'),

        }}>
        <TouchableOpacity
          onPress={() => {
            handlePress('Success');
          }}
          style={[styles.common, { backgroundColor: selectedTab === 'Success' ? '#FEB801' : '#FFFFFF4D' }]}>
          <Text
            style={styles.txt}>
            Success
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress('Pending');
          }}
          style={[styles.common, {
            backgroundColor: selectedTab === 'Pending' ? '#FEB801' : '#FFFFFF4D',
          }]}>
          <Text
            style={styles.txt}>
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handlePress('Failed');
          }}
          style={[styles.common, {
            backgroundColor: selectedTab === 'Failed' ? '#FEB801' : '#FFFFFF4D',
          }]}>
          <Text
            style={styles.txt}>
            Failed
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 17 }}>
        {selectedTab === 'Success' ? (
          !loader ? (<Success data ={data} />) : (<AnimatedLoader />)
        ) : selectedTab === 'Failed' ? (
          !loader ? (<Failed data ={data}/>) : (<AnimatedLoader />)
        ) : (
          !loader ? (<Pending data ={data}/>) : (<AnimatedLoader />)
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  common: {
    height: hp('4%'),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp('5%'),

  },
  txt: {
    fontSize: hp('1.9%'),
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Regular'
  }
});

export default WithdrawHistory;