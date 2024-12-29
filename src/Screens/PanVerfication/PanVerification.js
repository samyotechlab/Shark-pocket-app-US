import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'


export default function PanVerfication() {
  const [value,setValue] =  useState([])
      const [nameError, setNameError] = useState('')
  return (
   <>
   <BackgroundScreen/>
      <CommonHeader title={"PAN Verification"} />
       <Text style={styles.kyc}>Complete Your PAN Details </Text>
                  <View style={styles.container}>
       
                       <View style={[{ justifyContent: 'center', marginVertical: hp('3%') }]}>
                           <View style={styles.inputContainer}>
                               <TextInput
                                   style={styles.input}
                                   placeholder="Full Name"
                                   placeholderTextColor="#FFFFFFCC"
                                   keyboardType="numeric"
                                   maxLength={25}
                                   value={value}
                                   onChangeText={(text) => setValue(text)}
                                   error={Boolean(nameError)}
                               />
       
                           </View>
                           {Boolean(nameError) && (
                               <Text style={styles.errorText}>{nameError}</Text>
                           )}
                       </View>

                       <View style={[{ justifyContent: 'center',marginBottom:wp('7%')}]}>
                           <View style={styles.inputContainer}>
                               <TextInput
                                   style={styles.input}
                                   placeholder="Enter Pan Number"
                                   placeholderTextColor="#FFFFFFCC"
                                   keyboardType="numeric"
                                   maxLength={25}
                                   value={value}
                                   onChangeText={(text) => setValue(text)}
                                   error={Boolean(nameError)}
                               />
       
                           </View>
                           {Boolean(nameError) && (
                               <Text style={styles.errorText}>{nameError}</Text>
                           )}
                       </View>
                       <View style={[{ padding: hp('1%') }]}>
                           <CommonButton title={'Save'} />
                           <Text style={styles.kycText}>
                           Why do we need PAN Verification?
                               <Text style={{ textDecorationLine: 'underline', fontFamily: 'Montserrat-Bold' }}> Read FAQ’s</Text>
                           </Text>
                       </View>
                       <Toast ref={Toast.setRef} />
                   </View>
   </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: hp('2%'),
},
box: {
    flex: 1,
    backgroundColor: 'red',
},
text: {
    textAlign: 'center',
    color: '#FFFFFF',
},
inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.5%'),
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    width: '100%',
},
input: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
},
errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: hp('2%'),
    marginLeft: wp('2%'),
},
kyc: {
    color: '#FFFFFFCC',
    fontSize: hp('1.3'),
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: hp('8%'),
},
kycText: {
    color: '#FFFFFF',
    fontSize: hp('1.5'),
    fontFamily: 'Montserrat-Regular',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('2%'),
}
})