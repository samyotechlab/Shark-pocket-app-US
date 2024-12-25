import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  import Clipboard from '@react-native-clipboard/clipboard';
  import Icon from 'react-native-vector-icons/FontAwesome';
  import { Divider } from 'react-native-paper'; 
import HeaderComponent from './HeaderComponent';

export default function DepositeDetails() {
  const copyToClipboard = () => {
    Clipboard.setString( transactionData.transaction_id);
  };
  return (
<>
    <HeaderComponent/>   
    <SafeAreaView style={styles.main}>
    <View>
      <View style={styles.section}>
        <Text >Transaction ID</Text>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={[styles.increaseFontWeight, styles.extraSmallFont]}>
          DD2024111314031724039756
          </Text>
          <TouchableOpacity style={[styles.row, styles.copyButton]} onPress={copyToClipboard}>
            <Icon name="clone" size={10} color="#000" />
            <Text style={[styles.fontColorBlack, styles.extraSmallFont,{paddingLeft:10}]}>COPY</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Divider style={styles.divider} />

      <Text style={[styles.increaseFontWeight, styles.fontColorBlack]}>
        Deposit Details
      </Text>
      <View style={styles.innerDeposit}>
        <View style={styles.depositRow}>
          <Text>Deposit Amount (excl. Govt. Tax)</Text>
          <Text>₹60.15</Text>
        </View>
        <View style={styles.depositRow}>
          <Text>Govt. Tax (28% GST)</Text>
          <Text style={[styles.increaseFontWeight, styles.smallFont]}>
          ₹16.85
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.depositRow}>
          <Text style={[styles.increaseFontWeight, styles.changeGreen]}>
            Total
          </Text>
          <Text style={[styles.increaseFontWeight, styles.changeGreen]}>
          ₹77
          </Text>
        </View>
      </View>

      {/* Additional Information */}
      <View style={styles.innerDeposit}>
        <View style={styles.depositRow}>
          <Text>
            <View style={styles.circle}>
              <Icon name="right" size={15} color="black" />
            </View>{' '}
            Request Raised
          </Text>
          <Text>13 Nov 2024, 7:33 PM</Text>
        </View>
        <View style={styles.depositRow}>
          <Text>Deposit Successfully</Text>
          <Text>13 Nov 2024, 7:33 PM</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      {/* Options */}
      <TouchableOpacity style={styles.optionsRow} >
        <View style={styles.row}>
          <Icon name="file-text-o" size={15} color="#000" />
          <Text style={styles.optionText}>Tax Invoice</Text>
        </View>
        <Icon name="angle-right" size={20} color="black" />
      </TouchableOpacity>
      <View style={styles.optionsRow}>
        <View style={styles.row}>
          <Icon name="question-circle-o" size={15} color="#000" />
          <Text style={styles.optionText}>Need Help?</Text>
        </View>
        <Icon name="angle-right" size={20} color="black" />
      </View>
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
        alignItems: 'center',
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
        backgroundColor:'#F2F2F2'
      },
      depositRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: hp(0.5),
      },
      innerDeposit: {
        padding: wp(4),
        borderColor: '#99ffbb',
        borderWidth: 1,
        borderRadius: wp(2.5),
        marginVertical: hp(1),
      },
      optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp(1),
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      divider: {
        marginVertical: hp(1),
        backgroundColor: '#ccc',
      },
      increaseFontWeight: {
        fontWeight: '600',
      },
      changeGreen: {
        color: '#009900',
      },
      fontColorBlack: {
        color: '#000',
      },
      largeFont: {
        fontSize: wp(6),
      },
      smallFont: {
        fontSize: wp(4),
      },
      extraSmallFont: {
        fontSize: wp(3),
      },
      copyButton: {
        padding: wp(1),
        borderWidth: 1,
        borderRadius: wp(1),
        flexDirection: 'row',
        alignItems: 'center',
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
        width: wp(5),
        height: wp(5),
        borderRadius: wp(2.5),
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: wp(1),
      },
})