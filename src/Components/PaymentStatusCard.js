import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const PaymentStatusCard = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/Screens/walletImage.png")}
        style={styles.icon}
      />

<Text style={styles.statusText}>Payment Successful!</Text>

      <Text style={styles.transactionId}>MLZHJUD1236DSHG</Text>
      <Text style={styles.subText}>Your Transaction ID</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Tap to view balance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: wp("5%"),
  },
  icon: {
    width: wp("20%"),
    height: wp("20%"),
    marginBottom: hp("2%"),
  },
  transactionId: {
    fontSize: wp("4%"),
    fontWeight: "600",
    color: "#000",
    marginBottom: hp("1%"),
  },
  subText: {
    fontSize: wp("3.5%"),
    color: "#666", 
    marginBottom: hp("5%"),
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: wp("4%"),
    paddingVertical: hp("1.7%"),
    paddingHorizontal: wp("24%"),
    marginTop: hp("8%"),
  },
  buttonText: {
    fontSize: wp("4%"),
    color: "#000",
  },
  statusText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50", // Green color
    marginBottom: 10,
  },
});

export default PaymentStatusCard;
