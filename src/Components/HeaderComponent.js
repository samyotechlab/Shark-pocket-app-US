import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CommonHeader from "./CommonHeader";
import Iconics from "react-native-vector-icons/Feather";

const HeaderComponent = ({transactionData}) => {
  console.log("transactionData", transactionData)

  return (
<>
    <View style={styles.main}>
      <CommonHeader title={"Deposite Details"}/>
      <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.amount}>₹{transactionData.transaction_amount}</Text>
        <Iconics name="check-circle" size={wp("7%")} color="#fff" />
      </View>

      <View style={styles.statusRow}>
      <View style={styles.successBadge}>
          <Text style={styles.successText}>Successful</Text>
        </View>       
         <Text style={styles.date}>•  {transactionData.deposite_date}</Text>
      </View>
    </View>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#361911",
  },
  container: {
    backgroundColor: "#361911",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
    marginTop:hp("2.5%"),
  },
  title: {
    color: "#fff",
    marginLeft: wp("2%"),
    fontWeight: "600",
    fontSize: wp("4.5%"), 
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("2%"),
  },
  amount: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("6%"),
    marginLeft:wp("1%")
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  status: {
    color: "#fff",
    fontWeight: "600",
    fontSize: wp("4%"), 
  },
  date: {
    color: "#fff",
    marginLeft: wp("1%"),
    fontSize: wp("4%"),
    fontFamily:"Montserrat-Regular"
  },
  successBadge: {
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("2%"),
    borderRadius: 20, 
  },
  successText: {
    color: "#fff",
    fontFamily:"Montserrat-SemiBold",
    fontSize: wp("4%"),
  },
});

export default HeaderComponent;
