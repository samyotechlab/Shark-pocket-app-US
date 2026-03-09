import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import Iconics from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const { height } = Dimensions.get('window');


const TDSBreakupDialog = ({ isVisible, onClose, setTdsData, tdsData,handleWithdrawRequest,isOkayBtn}) => {
  return (
    <View style={styles.container}>
      <Modal
        visible={isVisible}
        transparent
        onRequestClose={onClose}>
        <View style={styles.overlay}>
          <TouchableOpacity
            style={styles.backdrop}
            onPress={onClose}
          />
          <View style={styles.dialogContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              <View style={styles.dialogHeader}>
                <Text style={styles.dialogTitle}>Govt Tax (TDS) Breakup</Text>
                <TouchableOpacity onPress={onClose}>
                  <Iconics name="close" size={hp('2.5%')} color={'#000000'} />
                </TouchableOpacity>
              </View>
              <Text style={styles.subHeader}>Financial Year {tdsData.financialYear}</Text>
              <Text style={styles.amountText}>₹{tdsData.withdraw_request}</Text>
              <Text style={styles.amountSubText}>
                Withdrawal (after Govt. Tax)
              </Text>

              <View style={styles.detailsContainer}>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>
                    Total Withdrawals (1 April onwards){'\n'}
                    <Text style={{
                      fontSize: hp('1.2%'),
                      color: '#000000E5',
                      fontFamily: 'Montserrat-Regular',
                      lineHeight:hp('3%')
                    }}>Including current withdrawal amount</Text>
                  </Text>
                  <Text style={styles.rowValue}>₹{parseFloat(tdsData.total_withdraw).toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>
                    Total Deposits (1 April onwards)
                  </Text>
                  <Text style={styles.rowValue}>-₹{parseFloat(tdsData.total_deposite).toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>
                    Opening Balance (as on 1 April)
                  </Text>
                  <Text style={styles.rowValue}>-₹{parseFloat(tdsData.opening_balance).toFixed(2)}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Taxable Amount</Text>
                  <Text style={styles.rowValue}>₹{parseFloat(tdsData.taxable_amount).toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>30% Govt. Tax (TDS)</Text>
                  <Text style={styles.rowValue}>₹{parseFloat(tdsData.tds_tax_total).toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Tax (TDS) Paid Till Date</Text>
                  <Text style={styles.rowValue}>-₹{parseFloat(tdsData.tds_deducted).toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.rowLabel}>Tax (TDS) On This Withdrawal</Text>
                  <Text style={styles.rowValue}>₹{parseFloat(tdsData.tds_on_current_withdrawal).toFixed(2)}</Text>
                </View>
                <View style={styles.separator} />
                <View style={styles.row}>
                  <Text style={[styles.rowLabel,{fontFamily: 'Montserrat-SemiBold',fontSize:hp('1.6%')}]}>
                    Withdrawal (after Govt. Tax)
                  </Text>
                  <Text style={[styles.rowValue,{fontFamily: 'Montserrat-SemiBold',fontSize:hp('1.6%')}]}>₹{parseFloat(tdsData.current_withdraw).toFixed(2)}</Text>
                </View>
              </View>


              <Text style={styles.footerNote}>
                Note:<Text style={styles.underNote}> Sharkpocket follows the new TDS law set for the online
                gaming industry by the income Tax Act of India (Section 194BA).{' '}
                </Text>
                <Text style={styles.readMore}>Read More..</Text>
              </Text>
              {
                isOkayBtn ? (<></>):(
                  <TouchableOpacity style={styles.confirmButton} onPress={handleWithdrawRequest}>
                  <Text style={styles.confirmButtonText}>OKAY, GOT IT!</Text>
                </TouchableOpacity>
                )
              }
          
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollContent: {
    paddingBottom: hp('2%'),
  },

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dialogContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: hp('2%'),
    borderTopRightRadius: hp('2%'),
    paddingHorizontal: hp('2.5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
    maxHeight: hp('100%'),
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: hp('1.8%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    marginLeft: hp('9%')
  },
  subHeader: {
    fontSize: hp('1.4%'),
    color: '#000000E5',
    fontFamily: 'Montserrat-Regular',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  amountText: {
    fontSize: hp('4%'),
    fontFamily: 'Montserrat-SemiBold',
    color: '#000',
    textAlign: 'center',
  },
  amountSubText: {
    fontSize: hp('1.4%'),
    color: '#000000E5',
    textAlign: 'center',
    marginBottom: hp('2%'),
    fontFamily: 'Montserrat-Medium',
  },
  detailsContainer: {
    marginBottom: hp('2%'),
    borderWidth: hp('0.1%'),
    borderRadius: hp('1.5%'),
    borderColor: "#0000001A"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('0.3%'),
    padding: hp('0.8%'),

  },
  rowLabel: {
    fontSize: hp('1.5%'),
    color: '#000000E5',
    fontFamily: 'Montserrat-Medium',
  },
  rowValue: {
    fontSize: hp('1.5%'),
    color: '#000000E5',
    fontFamily: 'Montserrat-Medium',
  },
  separator: {
    height: hp('0.1%'),
    backgroundColor: '#EAEAEA',
    marginVertical: hp('1%'),

  },
  footerNote: {
    fontSize: hp('1.4%'),
    color: '#000000E5',
    marginBottom: hp('2%'),
    lineHeight: hp('2%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  underNote: {
    fontSize: hp('1.4%'),
    color: '#00000099',
    marginBottom: hp('2%'),
    lineHeight: hp('2%'),
    fontFamily: 'Montserrat-Medium',
  },
  readMore: {
    color: '#000000E5',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp('1.4%'),
  },
  confirmButton: {
    backgroundColor: '#4FBF03',
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1%'),
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
});

export default TDSBreakupDialog;
