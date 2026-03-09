import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const PresetAmountButtons = ({ onAmountPress }) => {
  const amounts = ['100', '500', '1000', '5000'];
  return (
    <View style={styles.buttonsRow}>
      {amounts.map((value) => (
        <TouchableOpacity
          key={value}
          style={styles.amountButton}
          onPress={() => onAmountPress(value)}
        >
          <Text style={styles.amountText}>{value}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

PresetAmountButtons.propTypes = {
  onAmountPress: PropTypes.func.isRequired,
};

export default PresetAmountButtons;