import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function CommonButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2A1610',
    borderColor: '#F5D236',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F5D236',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 15,
  },
  buttonText: {
    color: '#F5D236',
    fontSize: 18,
  },
  disabledButton: {
    opacity: 0.7, 
    elevation: 5, 
    shadowOpacity: 0.5, 
  },
  disabledButtonText: {
    opacity: 0.8, 
  },
});
