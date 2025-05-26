import { Button, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconicons from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import { useNavigation, useRoute } from '@react-navigation/native';
import ViewTdsModal from './ViewTdsModal';

export default function AmountDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const { item } = route.params;
  const copyToClipboard = () => {
    Clipboard.setString(item.reference_id);
  };

    const handleClose = () => {
    setModalVisible(false);
  }
  return (
    <>
      <HeaderComponent title={"Amount Details"} transactionData={item} status={"withdraw"} />
      <SafeAreaView style={styles.main}>
        <View style={styles.section}>
          <Text style={styles.transaction}>Reference ID</Text>
        </View>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.extraSmallFont}>
            {item.reference_id}
          </Text>
          <TouchableOpacity style={[styles.row, styles.copyButton]} onPress={copyToClipboard}>
            <Icon name="clone" size={10} color="#000" />
            <Text style={[styles.extraSmallFont, { paddingLeft: 10 }]}>COPY</Text>
          </TouchableOpacity>
        </View>

        <Divider style={styles.divider} />
        <Text style={styles.to}>To</Text>
        <Text style={[styles.amount, { paddingHorizontal: hp(2), paddingBottom: hp(1) }]}>{item?.bank_name} {item?.account_number}</Text>

        <View style={{
          flex: 0.3,
          justifyContent: 'center',
        }}>
          <TouchableOpacity style={styles.showtds} onPress={()=>{
            setModalVisible(true)
          }}>
            <Text style={styles.showtdstext}>View TDS Data</Text>
          </TouchableOpacity>
        </View>

        {/* Additional Information */}
        <View style={[styles.innerDeposit, { backgroundColor: 'transparent' }]}>
          <View style={styles.depositRow}>
            <View style={styles.circle}>
              <Iconicons name="check-circle" size={25} color="#000000CC" />
              <Text style={styles.request}>Request Raised</Text>
            </View>
            <Text style={[styles.amount, { fontSize: 12 }]}>{item?.created_at}</Text>
          </View>
          <View style={styles.depositRow}>
            <View style={styles.circle}>
              <Iconicons name="check-circle" size={25} color="#000000CC" />
              <Text style={styles.request}>Deposit Successful</Text>
            </View>
            <Text style={[styles.amount, { fontSize: 12 }]}>{item?.updated_at}</Text>
          </View>
          <View style={styles.depositRow}>
            <View style={styles.circle}>
              <Iconicons name="check-circle" size={25} color="#000000CC" />
              <Text style={styles.request}>Deposit Successful</Text>
            </View>
            <Text style={[styles.amount, { fontSize: 12 }]}>{item?.updated_at}</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: wp(5) }}>
          <TouchableOpacity style={styles.optionsRow} onPress={() => {
            navigation.navigate('Support', { user_id: item.user_id })
          }}>
            <View style={styles.row}>
              <Icon name="question-circle-o" size={20} color="#000000B2" />
              <Text style={styles.amount}>Need Help</Text>
            </View>
            <Icon name="angle-right" size={30} color="#000000B2" style={{ marginRight: hp(1) }} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
          {isModalVisible && (
        <ViewTdsModal
          isVisible={isModalVisible}
          onClose={() => handleClose()}
          tdsData={item.tdsData}
        />
      )}
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
  withdrawButton: {
    backgroundColor: '#4FBF03',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    marginBottom: hp('4%'),
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#4FBF03',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 15,
    elevation: 10,
    width: '90%',
    marginLeft: '5%',
  },
  withdrawButtonText: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: '#F88600',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  showtds: {
    width: wp('40%'),
    padding: wp(2),
    borderWidth: 1,
    borderRadius: wp(1),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00000033',
    marginLeft: hp(2),
    backgroundColor: '#4FBF03',
    borderColor: '#FFFFFF',
    shadowColor: '#4FBF03',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 15,
    elevation: 10,
  },
  showtdstext:   {
    fontSize: 16,
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: '#F88600',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  }
})