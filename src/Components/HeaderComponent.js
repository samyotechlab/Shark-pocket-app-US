import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CommonHeader from "./CommonHeader";
import Iconics from "react-native-vector-icons/Feather";

const HeaderComponent = ({title,transactionData,status}) => {
  console.log("transactionData",transactionData)
  const icon = {
    success:"check-circle",
    failed:"x-circle",
    deposite:"check-circle"
  }
  const color = {
    success:"#00C659",
    failed:"#D80000",
    deposite:"#FFFFFF"
  }
  const message = {
    success:"Successfull",
    failed:"failed",
    deposite:"Successful"
  }
  const backgroundColor = {
    success:"#00C659",
    failed:"#D80000",
    deposite:"transparent"
  }
  return (
<>
    <View style={styles.main}>
      <CommonHeader title={title}/>
      <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.amount}>₹ {status === "amount" ? 77.89:(transactionData.transaction_amount)}</Text>
        <Iconics name={icon[status]?icon[status]:"clock"} size={wp("7%")} color={color[status]?color[status]:"#FDCB50"} />
      </View>

      <View style={styles.statusRow}>
      <View style={[styles.successBadge,{backgroundColor:backgroundColor[status]?backgroundColor[status]:"#FDCB50"}]}>
          <Text style={styles.successText}>{message[status]?message[status]:"Checking"}</Text>
        </View>       
         <Text style={styles.date}>•{status === "amount" ? ("03-03-2025"):(transactionData.deposite_date)}</Text>
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
    paddingHorizontal: wp("3%"),
    borderRadius: 20, 
    backgroundColor:'red'
  },
  successText: {
    color: "#fff",
    fontFamily:"Montserrat-SemiBold",
    fontSize: wp("4%"),
  },
});

export default HeaderComponent;
