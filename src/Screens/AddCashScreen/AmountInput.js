import React from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { COLORS } from './constants';

const AmountInput = ({ amount, setAmount }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>Enter Amount</Text>
    <TextInput
      style={styles.input}
      value={amount ? `₹${amount}` : ''}
      placeholder="₹0"
      placeholderTextColor={COLORS.lightGray}
      onChangeText={(text) => {
        const numericValue = text.replace(/[^0-9]/g, '');
        setAmount(numericValue);
      }}
      keyboardType="numeric"
    />
  </View>
);

AmountInput.propTypes = {
  amount: PropTypes.string.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default AmountInput;