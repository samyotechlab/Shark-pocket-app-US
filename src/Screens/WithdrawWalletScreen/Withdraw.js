import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TDSBreakupDialog from '../../Components/TDSBreakupDialog'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconics from 'react-native-vector-icons/FontAwesome';
import secure from '../../../assets/images/Screens/Safe.png';
import light from '../../../assets/images/Screens/light.png';
import profile from '../../../assets/images/Screens/profile.png';

export default function Withdraw() {
  const [value, setValue] = useState('');
  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <LinearGradient
            colors={["#3d1911", "#6a1701"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Icons name="account-balance-wallet" size={24} color={'white'} />
            <Text style={styles.text}>Withdraw wallet Balance</Text>
            <Text style={styles.amount}>₹200</Text>
          </LinearGradient>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.title}>Withdraw Balance</Text>
          </View>

          {/* Input Section */}
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Amount</Text>
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
                placeholderTextColor="#aaa"
                placeholderStyle={{ alignSelf: 'center' }}
              />
            </View>
          </View>

          {/* Tax and Learn More */}
          <Text style={styles.infoText}>
            No Govt. Tax on this withdrawal <Text style={styles.learnMore}>Learn More</Text>
          </Text>

          {/* Withdraw Button */}
          <TouchableOpacity style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>WITHDRAW CASH</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
          <View style={styles.bankDetails}>
            <Text style={styles.bankDetailsLabel}>Send Winnings to</Text>
            <View style={styles.bankInfo}>
              <Iconics name={'bank'} size={30} />
              <View>
                <Text style={styles.bankName}>ICICI BANK LIMITED</Text>
                <Text style={styles.bankAccount}>XXXXXXXXXXXX0213</Text>
              </View>
            </View>
          </View>
           <TDSBreakupDialog />
              <View style={styles.featuresRow}>
              <View style={styles.feature}>
                 <Image
                          source={secure} 
                          style={styles.icon}
                        />
                <Text style={styles.featureText}>100% Safe Payments</Text>
              </View>
              <View style={styles.feature}>
               <Image
                        source={light} 
                        style={styles.icon}
                      />
                <Text style={styles.featureText}>Instant Deposit {"\n"}And Withdrawal</Text>
              </View>
              <View style={styles.feature}>
                <Image
                         source={profile} 
                         style={styles.icon}
                       />
                <Text style={styles.featureText}>Trusted by {"\n"}15cr+ Players</Text>
              </View>
            </View>
        </View>
        
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#DDF1E6',
    width: wp('90%'),
    borderBottomColor: 'black',
    border: 1,
    borderRadius: wp('3%'),
    paddingBottom: hp(0.7),
  },
  label: {
    position: 'absolute',
    top: -hp('1%'),
    left: wp('35%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('2%'),
    fontSize: hp('1.5%'),
    color: '#555',
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    fontSize: hp('2%'),
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4C2C2B',
    paddingVertical: 15,
    marginVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "90%",
    marginLeft: "5%",
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 10
  },
  amount: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputWrapper: {
    width: '90%',
    position: 'relative',
    alignItems: 'center',
  },
  outerInputcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
  },
  learnMore: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
  },

  withdrawButton: {
    backgroundColor: '#4FBF03',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#4FBF03',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 15,
    elevation: 10,
    width: '90%',
    marginLeft: '5%',
  },
  withdrawButtonText: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: '#F88600',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  bankDetails: {
    backgroundColor: 'white',
    padding: 30,
  },
  bankDetailsLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  bankIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  bankName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  bankAccount: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#607D8B',
    marginBottom: 4,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp("5%"),
    marginTop: hp("2%"),
  },
  feature: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: wp("6%"),
    marginBottom: hp("1%"),
  },
  featureText: {
    fontSize: wp("3%"),
    textAlign: 'center',
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

  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#333333',
  },
});




