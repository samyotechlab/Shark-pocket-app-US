import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const WithdrawInput = ({ amount, setAmount, tdsData, onLearnMore }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Withdraw Balance</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          placeholderTextColor="#aaa"
          placeholderStyle={{ alignSelf: 'center' }}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.infoText}>
        {tdsData.tds_tax === undefined || tdsData.tds_tax === null
          ? `No Govt. Tax on this withdrawal`
          : tdsData.tds_tax === 0
            ? `No Govt. Tax on this withdrawal`
            : `${parseFloat(tdsData.tds_tax).toFixed(2)} Tax on this withdrawal `}
        <TouchableOpacity onPress={onLearnMore} style={{ marginBottom: hp('1.3%') }}>
          <Text style={styles.learnMore}>Learn More</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 0.5,
  },
  title: {
    fontSize: hp('1.9%'),
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#DDF1E6',
    width: wp('90%'),
    borderBottomColor: 'black',
    borderWidth: wp('0.2%'),
    borderRadius: wp('3%'),
    paddingBottom: hp('0.5%'),
  },
  label: {
    position: 'absolute',
    top: -hp('1.5%'),
    left: wp('35%'),
    backgroundColor: '#fff',
    fontSize: hp('1.5%'),
    color: '#555',
    zIndex: 1,
  },
  input: {
    borderWidth: wp('0.2%'),
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    fontSize: hp('2%'),
    backgroundColor: '#fff',
  },
  infoText: {
    fontSize: hp('1.5%'),
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    paddingLeft: wp('5%'),
    marginTop: hp('0.5%'),
  },
  learnMore: {
    fontSize: hp('1.5%'),
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
  },
});

export default WithdrawInput;