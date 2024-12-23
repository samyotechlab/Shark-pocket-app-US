import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const data = [
  { id: '1', time: '07:33 pm', amount: '₹77', note: 'Credit Note' },
  { id: '2', time: '07:33 pm', amount: '₹77', note: 'Credit Note' },
];

const WalletDetailsCard = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.circle} >
        <Image source={require("../../assets/images/Screens/arrow.png")} 
        style={{height:25,width:25,}}
        />
        </View>
      <View style={styles.textContainer}>
        <Text style={styles.note}>{item.note}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View>
      <Text style={styles.amount}>{item.amount}</Text>
      </View>
    </View>
  );
  return (
    <>
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>12 November 2024</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: hp('2%'),
  },
  dateContainer: {
    width: wp('100%'),
    backgroundColor: '#E0E0E0',
    alignItems: 'flex-start',
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('3%'),
  },
  date: {
    fontSize: wp('4%'),
    fontWeight: '400',
    color: 'black',
  },
  list: {
    paddingVertical: hp('1%'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'ffff',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
   
  },
  circle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#00ff00',
    opacity:0.5,
    alignItems:"center",
    justifyContent:"center"
  },
  textContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  
  },
  note: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: 'black',
  },
  time: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
    color: 'gray',
    marginTop: hp('0.5%'),
  },
  amount: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: 'black',
    marginBottom: hp('2%'),

  },
});

export default WalletDetailsCard;
