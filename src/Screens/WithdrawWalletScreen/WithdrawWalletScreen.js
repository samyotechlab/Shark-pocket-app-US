import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import TDSBreakupDialog from '../../Components/TDSBreakupDialog';

const WithdrawWalletScreen = () => {
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Withdraw Wallet</Text>
     
      </View>

      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={["#3d1911", "#6a1701"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.icon}>💳</Text> 
          <Text style={styles.text}>Withdraw wallet Balance</Text>
          <Text style={styles.amount}>₹200</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={{marginLeft:"30%",marginTop:10}}>
      <Text style={styles.title}>Withdraw Balance</Text>
      </View>

{/* Input Section */}
<View style={styles.outerInputcontainer}>
<View style={styles.inputWrapper}>
        <Text style={styles.label}>Enter Amount</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value="₹200"
            editable={false} // Make it non-editable for now
          />
        </View>
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
      
      {/* Bank Details */}
      <View style={styles.bankDetails}>
        <Text style={styles.bankDetailsLabel}>Send Winnings to</Text>
        <View style={styles.bankInfo}>
          <Image
            source={require("../../../assets/images/Screens/bank.png")}
            style={styles.bankIcon}
          />
          <View>
            <Text style={styles.bankName}>ICICI BANK LIMITED</Text>
            <Text style={styles.bankAccount}>XXXXXXXXXXXX0213</Text>
          </View>
        </View>
      </View>

      {/* Download TDS Certificate */}
      {/*
       <TouchableOpacity style={styles.buttonContainer}>
      <View style={styles.iconContainer}> */}
        {/* <Image
          source={require('./path-to-your-icon.png')} 
          style={styles.icon}
        /> */}
      {/* </View>
      <Text style={styles.buttonText}>Download TDS Certificate</Text>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrow}>{'>'}</Text> 
      </View> 
    </TouchableOpacity>
      ß*/}
      <TDSBreakupDialog />

      {/* Footer */}
       <View style={styles.featuresRow}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>✔</Text>
                <Text style={styles.featureText}>100% Safe Payments</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>⚡</Text>
                <Text style={styles.featureText}>Instant Deposit {"\n"}And Withdrawal</Text>
              </View>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>👥</Text>
                <Text style={styles.featureText}>Trusted by {"\n"}15cr+ Players</Text>
              </View>
            </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F5F5F5',
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
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "90%", 
    marginLeft:"5%",
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
    fontWeight: '500',
  },
  amount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
  },
  inputWrapper: {
    width: '90%',
    position: 'relative',
    alignItems: 'center',
  },
  label: {
    position: 'absolute',
    top: -17, 
    paddingHorizontal: 9,
    fontSize: 15,
    color: '#7F7F7F', 
    fontWeight:"600"
  },
  outerInputcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop:5
  },
  inputContainer: {
    borderWidth: 0.2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    backgroundColor: '#F9F9F9',
    paddingVertical: 2,
    width:"95%",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, 
  },
  input: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
  },
  
  infoText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  learnMore: {
    fontSize: 12,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  withdrawButton: {
    backgroundColor: '#32CD32', 
    borderRadius: 8,
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#32CD32',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  withdrawButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'uppercase',
  },
 

  withdrawButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bankDetails: {
    marginBottom: 24,
  },
  bankDetailsLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  bankName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bankAccount: {
    fontSize: 14,
    color: '#607D8B',
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
      marginBottom: hp("2%"),
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
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
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
        fontWeight: '500',
        color: '#333333',
      },
      arrowContainer: {
        marginLeft: 8,
      },
      arrow: {
        fontSize: 18,
        color: '#333333',
      },
});

export default WithdrawWalletScreen;
