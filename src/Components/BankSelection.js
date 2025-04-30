import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Iconics from 'react-native-vector-icons/FontAwesome';
import { Checkbox } from 'react-native-paper';

const BankSelection = ({ bankDetail, selectedBank, setSelectedBank, isAccountVerified }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleBankSelection = (item) => {
    setSelectedBank(item);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.bankDetails}>
      <View style={{ flex: 0.5 }}>
        <Text style={styles.bankDetailsLabel}>Send Winnings to</Text>
        {!selectedBank ? (
          <Text style={[styles.bankDetailsLabel, { color: 'red', fontSize: 12, lineHeight: hp('1.5%') }]}>
            Please select bank
          </Text>
        ) : null}
      </View>
      <View style={styles.bankInfo}>
        <Iconics name={'bank'} size={hp('3.5%')} />
        <View style={styles.dropdownContainer}>
          {isAccountVerified === 1 ? (
            <>
              <TouchableOpacity
                style={styles.dropdownHeader}
                onPress={() => {
                  if (bankDetail.length === 1) {
                    handleBankSelection(bankDetail[0]);
                  } else {
                    toggleDropdown();
                  }
                }}
              >
                <View>
                  <Text style={styles.bankName}>
                    {selectedBank?.bank_name || bankDetail[0]?.bank_name}
                  </Text>
                  <Text style={styles.bankAccount}>
                    {selectedBank?.account_no || bankDetail[0]?.account_no}
                  </Text>
                </View>
                {bankDetail.length > 1 && (
                  <Iconics
                    name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
                    size={hp('2.5%')}
                  />
                )}
              </TouchableOpacity>
              {isDropdownOpen && bankDetail.length > 1 && (
                <View style={styles.dropdownList}>
                  <FlatList
                    data={bankDetail}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={true}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.dropdownItem}
                        onPress={() => handleBankSelection(item)}
                        activeOpacity={0.7}
                      >
                        <View style={styles.bankRow}>
                          <Checkbox
                            status={selectedBank?.account_no === item.account_no ? 'checked' : 'unchecked'}
                            onPress={() => handleBankSelection(item)}
                            color="red"
                          />
                          <View style={styles.bankDetailsContainer}>
                            <Text style={styles.bankName}>{item.bank_name}</Text>
                            <Text style={styles.bankAccount}>{item.account_no}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </>
          ) : (
            <Text style={styles.bankAccount}>Bank Details Not Found</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bankDetails: {
    flex: 0.5,
    padding: hp('1.5%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
    zIndex: 9999999,
    margin: hp('1%'),

  },
  bankInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'visible',
    alignItems: 'center',
    zIndex: 1,
  },
  dropdownContainer: {
    flex: 1,
    marginLeft: hp('2%'),
    position: 'relative',
    zIndex: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('1%'),
    borderRadius: 8,
  },
  dropdownList: {
    position: 'absolute',
    top: hp('6%'),
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownItem: {
    padding: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    zIndex: 9999,
    position: 'relative',
  },
  bankDetailsLabel: {
    fontSize: hp('2%'),
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
    lineHeight: hp('3%'),
  },
  bankName: {
    fontSize: hp('1.8%'),
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  bankAccount: {
    fontSize: hp('1.6%'),
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  bankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bankDetailsContainer: {
    marginLeft: 10,
  },
});

export default BankSelection;