import { FlatList, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Failed({ data }) {

  const filteredData = Array.isArray(data)
  ? data.filter((item) => item.status === 2)
  : [];

  const groupedData = filteredData.reduce((groups, item) => {
    const [date] = item.created_at.split(' ');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  const sections = Object.keys(groupedData).map((date) => ({
    title: date,
    data: groupedData[date],
  }));

  const navigation = useNavigation()

  const handleNavigation = () => {
    navigation.navigate('DepositeDetails')
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={
      () => {
        handleNavigation()
      }
    }>
      <View style={styles.circle} >
        <Image source={require("../../../assets/images/Screens/arrow.png")}
          style={{ height: 20, width: 20, tintColor: 'red', }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.note}>Failed</Text>
        <Text style={styles.time}>{item.created_at ? item.created_at.split(' ')[1].substring(0, 5) : 'N/A'}</Text>
      </View>
      <View>
        <Text style={styles.amount}>₹{item.amount}</Text>
      </View>
    </TouchableOpacity>
  );


  const renderSectionHeader = ({ section: { title } }) => {
    console.log(title)
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{title}</Text>
      </View>
    )
  }
  return (
    <>
      <View style={styles.container}>
        {filteredData.length === 0 ? (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
          </View>
        ) : (
          <SectionList
            sections={sections}
            renderItem={renderItem}
            renderSectionHeader={renderSectionHeader}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: hp('1.5%'),
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
    fontFamily: 'Montserrat-Regular'
  },
  list: {
    paddingVertical: hp('1%'),
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'ffff',
    padding: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    borderBottomColor: '#0000003A',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50
  },
  circle: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: '#F100001A',
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    flex: 1,
    marginLeft: wp('3%'),

  },
  note: {
    fontSize: wp('4%'),
    color: '#F10000',
    fontFamily: 'Montserrat-medium'
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
    marginBottom: hp('2%'),
    marginRight: hp('1%')

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
})