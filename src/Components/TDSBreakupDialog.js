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

const { height } = Dimensions.get('window');

const TDSBreakupDialog = ({ isVisible, onClose,setTdsData,tdsData }) => {

  console.log("tdsData===========>",tdsData)


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
            <View style={styles.dialogHeader}>
              <Text style={styles.dialogTitle}>Govt Tax (TDS) Breakup</Text>
              <TouchableOpacity onPress={onClose}>
                <Iconics name="close" size={30} color={'black'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.subHeader}>Financial Year 2024-25</Text>
            <Text style={styles.amountText}>₹{tdsData.withdraw_request}</Text>
            <Text style={styles.amountSubText}>
              Withdrawal (after Govt. Tax)
            </Text>

            <ScrollView contentContainerStyle={styles.detailsContainer}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>
                  Total Withdrawals (1 April onwards)
                </Text>
                <Text style={styles.rowValue}>₹{tdsData.total_withdraw}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>
                  Total Deposits (1 April onwards)
                </Text>
                <Text style={styles.rowValue}>-₹{tdsData.total_deposite}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>
                  Opening Balance (as on 1 April)
                </Text>
                <Text style={styles.rowValue}>-₹{tdsData.opening_balance}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Taxable Amount</Text>
                <Text style={styles.rowValue}>₹{tdsData.taxable_amount}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>30% Govt. Tax (TDS)</Text>
                <Text style={styles.rowValue}>₹{tdsData.tds_tax}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Tax (TDS) Paid Till Date</Text>
                <Text style={styles.rowValue}>-₹{tdsData.tds_deducted}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Tax (TDS) On This Withdrawal</Text>
                <Text style={styles.rowValue}>₹{tdsData.total_tax}</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.rowLabel}>
                  Withdrawal (after Govt. Tax)
                </Text>
                <Text style={styles.rowValue}>₹{tdsData.current_withdraw}</Text>
              </View>
            </ScrollView>

          
            <Text style={styles.footerNote}>
              Note: Sharkpocket follows the new TDS law set for the online
              gaming industry by the income Tax Act of India (Section 194BA).{' '}
              <Text style={styles.readMore}>Read More..</Text>
            </Text>

           
            <TouchableOpacity style={styles.confirmButton} onPress={onClose}>
              <Text style={styles.confirmButtonText}>OKAY, GOT IT!</Text>
            </TouchableOpacity>
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

  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',

  },
  dialogContainer: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    maxHeight: height * 0.9,
  },
  dialogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#999',
  },
  subHeader: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
    marginBottom: 16,
  },
  amountText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  amountSubText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
    borderWidth:0.3,
    borderRadius:15,
    borderColor:"gray"
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    padding:7,
   
  },
  rowLabel: {
    fontSize: 14,
    color: '#333',
  },
  rowValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 12,
   
  },
  footerNote: {
    fontSize: 12,
    color: '#777',
    marginBottom: 20,
    lineHeight: 16,
  },
  readMore: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#00000033',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontFamily:"Montserrat-Medium",
    color: '#696969',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#333333',
  },
});

export default TDSBreakupDialog;
