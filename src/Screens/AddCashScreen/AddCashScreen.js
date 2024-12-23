import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Iconics from "react-native-vector-icons/Ionicons";
import CommonHeader from '../../Components/CommonHeader';
import { useNavigation } from '@react-navigation/native';

const AddCashScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#361911'}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Iconics name="chevron-back" size={wp("6%")} color={"white"} />
        </TouchableOpacity>
        <Text style={styles.title}>Add Cash</Text>
        <View style={styles.wallet}>
          <Text style={styles.walletText}>₹1000</Text>
        </View>
      </View>

      <View style={styles.addCashContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          placeholderTextColor="#999"
          value="₹200"
        />
        <View style={styles.buttonsRow}>
          {["₹100", "₹500", "₹1000", "₹5000"].map((amount) => (
            <TouchableOpacity key={amount} style={styles.amountButton}>
              <Text style={styles.amountText}>{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.addCashButton}>
          <Text style={styles.addCashButtonText}>ADD CASH</Text>
        </TouchableOpacity>
      </View>

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

      <TouchableOpacity style={styles.referralBanner}>
        <Image source={require("../../../assets/images/Screens/referal.png")} />
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    width: "100%",
  },
  header: {
    backgroundColor: "#361911",
    height: hp("15%"),
    justifyContent: 'flex-end',
    padding: wp("4%"),
    position: 'relative',
    paddingBottom: hp("7%"),
  },
  backButton: {
    top: hp("4%"),
    padding: wp("2%"),
  },
  title: {
    fontSize: wp("5%"),
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  wallet: {
    position: 'absolute',
    right: wp("4%"),
    top: hp("4%"),
    backgroundColor: '#000',
    padding: wp("2%"),
    borderRadius: wp("2%"),
  },
  walletText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp("4%"),
  },
  addCashContainer: {
    backgroundColor: '#fff',
    borderRadius: wp("3%"),
    padding: wp("4%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: wp("2%"),
    elevation: 4,
    marginTop: -hp("5%"),
    marginHorizontal: wp("4%"),
  },
  input: {
    fontSize: wp("6%"),
    textAlign: 'center',
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: hp("2%"),
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp("2%"),
  },
  amountButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp("2%"),
    padding: wp("2%"),
    minWidth: wp("15%"),
    alignItems: 'center',
  },
  amountText: {
    fontSize: wp("4%"),
    fontWeight: 'bold',
    color: '#000',
  },
  addCashButton: {
    backgroundColor: '#39B54A',
    padding: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
  },
  addCashButtonText: {
    fontSize: wp("4.5%"),
    color: '#fff',
    fontWeight: 'bold',
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
  referralBanner: {
    marginVertical: hp("8%"),
    padding: wp("4%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
  },
});

export default AddCashScreen;
