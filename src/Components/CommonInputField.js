import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import call from '../../assets/images/Applogo/call.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function CommonInputField({data}) {
  return (
    <View style={styles.inputContainer}>
      <Image source={call}   style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={data.placeholder}
        placeholderTextColor="gray"
        keyboardType='numeric'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',

  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
})