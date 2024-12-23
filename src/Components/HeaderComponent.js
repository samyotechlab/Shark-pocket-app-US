import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Iconics from "react-native-vector-icons/Ionicons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const HeaderComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Iconics name="chevron-back" size={wp("6%")} color={"white"} />
        <Text style={styles.title}>Payment Details</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.amount}>₹77</Text>
        <Icon name="check-circle" size={wp("7%")} color="#fff" />
      </View>

      <View style={styles.statusRow}>
      <View style={styles.successBadge}>
          <Text style={styles.successText}>Successful</Text>
        </View>       
         <Text style={styles.date}>• 12 November 2024, 7:33 PM</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4B2D2D",
    paddingHorizontal: wp("5%"),
    paddingVertical: hp("2%"),
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp("1%"),
    marginTop:hp("2.5%")
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
  },
  successBadge: {
    backgroundColor: "#00C853", 
    paddingVertical: hp("0.5%"),
    paddingHorizontal: wp("4%"),
    borderRadius: 20, 
  },
  successText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: wp("3.5%"),
  },
});

export default HeaderComponent;
