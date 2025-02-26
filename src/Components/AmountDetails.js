import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconicons from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';

export default function AmountDetails() {
  const copyToClipboard = () => {
    Clipboard.setString("DD2024111314031724039756");
  };
  return (
    <>
      <HeaderComponent title={"Amount Details"} status={"deposite"} />
      <SafeAreaView style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.transaction}>Transaction ID</Text>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.extraSmallFont}>
            DD2024111314031724039756
          </Text>
          <TouchableOpacity style={[styles.row, styles.copyButton]} onPress={copyToClipboard}>
            <Icon name="clone" size={10} color="#000" />
            <Text style={[styles.extraSmallFont, { paddingLeft: 10 }]}>COPY</Text>
          </TouchableOpacity>
        </View>

        <Divider style={styles.divider} />

        <Text style={styles.to}>To</Text>
        <Text style={[styles.amount, { paddingHorizontal: hp(2) }]}>ICICI Bank LIMITED XXXXXX456</Text>

        {/* Additional Information */}
        <View style={[styles.innerDeposit, { backgroundColor: 'transparent' }]}>
          <View style={styles.depositRow}>
            <View style={styles.circle}>
              <Iconicons name="check-circle" size={25} color="#000000CC" />
              <Text style={styles.request}>Request Raised</Text>
            </View>
            <Text style={[styles.amount, { fontSize: 12 }]}>13 Nov 2024, 7:33 PM</Text>
          </View>
          <View style={styles.depositRow}>
            <View style={styles.circle}>
              <Iconicons name="check-circle" size={25} color="#000000CC" />
              <Text style={styles.request}>Deposit Successful</Text>
            </View>
            <Text style={[styles.amount, { fontSize: 12 }]}>13 Nov 2024, 7:33 PM</Text>
          </View>
          <View style={styles.depositRow}>
            <View style={styles.circle}>
              <Iconicons name="check-circle" size={25} color="#000000CC" />
              <Text style={styles.request}>Deposit Successful</Text>
            </View>
            <Text style={[styles.amount, { fontSize: 12 }]}>13 Nov 2024, 7:33 PM</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: wp(5) }}>
          <TouchableOpacity style={styles.optionsRow} >
            <View style={styles.row}>
              <Icon name="question-circle-o" size={20} color="#000000B2" />
              <Text style={styles.amount}>Need Help</Text>
            </View>
            <Icon name="angle-right" size={30} color="#000000B2" style={{ marginRight: hp(1) }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#fff',
  },
  back: {
    padding: wp(3),
  },
  row: {
    flexDirection: 'row',
    // alignItems: 'center',
    margin: wp(1),
    gap: wp(4)
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  amountContainer: {
    backgroundColor: '#e6ffee',
    padding: wp(5),
    borderRadius: wp(2.5),
    marginBottom: hp(1),
  },

  section: {
    marginBottom: hp(1),
    backgroundColor: '#F2F2F2',
    padding: wp('2%')
  },
  transaction: {
    color: '#696969',
    fontFamily: 'Montserrat-Medium',
    fontSize: 14
  },
  depositRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(0.5),
  },
  innerDeposit: {
    padding: wp(4),
    borderColor: '#00000033',
    borderWidth: 1,
    borderRadius: wp(2.5),
    marginVertical: hp(3),
    backgroundColor: '#00C6590F',
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderWidth: 1,
    borderRadius: wp(4),
    borderColor: '#00000033'

  },
  divider: {
    marginVertical: hp(1.5),
    backgroundColor: '#ccc',
  },
  changeGreen: {
    color: '#00C659',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18
  },
  largeFont: {
    fontSize: wp(6),
  },
  extraSmallFont: {
    fontSize: wp(3.65),
    color: '#696969',
    fontFamily: 'Montserrat-SemiBold',
  },
  copyButton: {
    padding: wp(1),
    borderWidth: 1,
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00000033'
  },
  optionText: {
    marginLeft: wp(5),
    fontSize: wp(4),
  },
  creditIcon: {
    padding: wp(2.5),
    backgroundColor: '#fff',

    borderRadius: wp(10),
    color: '#009900',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(1),
    flexDirection: 'row'
  },
  deposite: {
    fontFamily: 'Montserrat-Bold',
    color: '#3E3E3E',
    fontSize: 18
  },
  amount: {
    fontFamily: 'Montserrat-Medium',
    color: '#696969'
  },
  request: {
    fontFamily: 'Montserrat-Medium',
    color: '#3A3939',
    paddingHorizontal: wp(3),
    fontSize: 16
  },
  to: {
    fontFamily: 'Montserrat-Bold',
    color: '#3E3E3E',
    paddingHorizontal: hp(2)
  },
})