import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const groupByDateAndType = (data) => {
  return data.reduce((acc, item) => {
    const date = item.created_at.split(' ')[0];
    const typeKey = item.type === 0 ? `${date}.debit` : `${date}.credit`;
    if (!acc[typeKey]) acc[typeKey] = [];
    acc[typeKey].push(item);
    return acc;
  }, {});
};

export default function All(props) {

  const { walletData = [] } = props;
  const navigation = useNavigation();
  const [transactionData, setTransactionData] = useState({})

  const groupedData = walletData.length > 0 ? groupByDateAndType(walletData) : {};

  const handleNavigation = (item) => {
    navigation.navigate('DepositeDetails', { item: item });
  };
  const renderTransaction = ({ item }) => {
    const isDebit = item.type === 0;
    const transaction_amount = parseFloat(item.transaction_amount).toFixed(2)

    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
        ]}
        disabled={isDebit}
        onPress={() => handleNavigation(item)}
      >
        <View
          style={[
            styles.circle,
            { backgroundColor: isDebit ? '#F100001A' : '#03C5263A' },
          ]}
        >
          <Image
            source={require('../../../assets/images/Screens/arrow.png')}
            style={{
              height: 20,
              width: 20,
              tintColor: isDebit ? 'red' : '#03C526',
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.note,
              { color: isDebit ? '#F10000' : '#696969' },
            ]}
          >
            {item.transaction_note || 'No Note'}
          </Text>
          <Text style={styles.time}>{item.created_at ? item.created_at.split(' ')[1].substring(0, 5) : 'N/A'} pm </Text>
        </View>
        <View>
          <Text style={styles.amount}>₹{transaction_amount || '₹0'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSection = ({ item }) => (
    <View>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <FlatList
        data={item.transactions}
        renderItem={renderTransaction}
        keyExtractor={(transaction) => transaction._id}
      />
    </View>
  );

  const sectionData = Object.keys(groupedData).map((key) => {
    const [date] = key.split('.');

    return {
      date: `${date}`,
      transactions: groupedData[key],
    };
  });

  return (
    <View style={styles.container}>
      {
        walletData == 0 ? (<View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No data found</Text>
        </View>) : (<FlatList
          data={sectionData}
          renderItem={renderSection}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.list}
        />)
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingVertical: hp('1.5%'),
  },
  dateContainer: {
    width: wp('100%'),
    backgroundColor: '#E0E0E0',
    alignItems: 'flex-start',
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('3%'),
  },
  date: {
    fontSize: wp('3.5%'),
    color: '#696969',
    fontFamily: 'Montserrat-Regular',
  },
  list: {
    paddingVertical: hp('1%'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    borderBottomColor: '#0000003A',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  circle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#03C5263A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  note: {
    fontSize: wp('4%'),
    color: '#696969',
    fontFamily: 'Montserrat-Medium',
  },
  time: {
    fontSize: wp('3%'),
    fontFamily: 'Montserrat-Regular',
    color: '#696969',
    marginTop: hp('0.5%'),
  },
  amount: {
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-Medium',
    color: '#696969',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: wp('5%'),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
});
