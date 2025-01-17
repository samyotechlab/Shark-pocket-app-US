import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const groupByDateAndType = (data) => {
  return data.reduce((acc, item) => {
    const date = item.created_at.split(' ')[0];
    const typeKey = `${date}.credit`;
    if (!acc[typeKey]) acc[typeKey] = [];
    acc[typeKey].push(item);
    return acc;
  }, {});
};

export default function Debit(props) {
  const { bonusData = [] } = props;
  const navigation = useNavigation();
  const debitTransactions = Array.isArray(bonusData)
    ? bonusData.filter((item) => item.type === 0)
    : [];


  const groupedData = groupByDateAndType(debitTransactions);

  const handleNavigation = () => {
    navigation.navigate('DepositeDetails');
  };

  const renderTransaction = ({ item }) => {
    const transaction_amount = parseFloat(item.gst_amount).toFixed(2)
    return (<TouchableOpacity
      style={styles.itemContainer}
      onPress={handleNavigation}
    >
      <View style={[styles.circle, { backgroundColor: '#F100001A' }]}>
        <Image
          source={require('../../../assets/images/Screens/arrow.png')}
          style={{
            height: 20,
            width: 20,
            tintColor: 'red',
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.note, { color: '#F10000' }]}>
          {item.note || 'No Note'}
        </Text>
        <Text style={styles.time}>{item.request_raised ? item.request_raised.split(' ')[1].substring(0, 5) : 'N/A'} pm</Text>
      </View>
      <View>
        <Text style={styles.amount}>₹{transaction_amount || '₹0'}</Text>
      </View>
    </TouchableOpacity>)

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
        debitTransactions.length == 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
          </View>
        ) : (<FlatList
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
