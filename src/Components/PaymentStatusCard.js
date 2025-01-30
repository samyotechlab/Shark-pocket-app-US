import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CommonHeader from "./CommonHeader";
import HeaderComponent from "./HeaderComponent";
import Toast from "react-native-toast-message";

const PaymentStatusCard = ({ checksPaymentStatus, status, setIsPaymentSuccess, setCheckPaymentStatus, amount, date, buttonText, toast,ticket_id,game_id,user_id }) => {

  const navigation = useNavigation()
  const transactionData = {
    transaction_amount: amount,
    deposite_date: date
  }
  const image = {
    success: require("../../assets/images/Screens/wallet.gif"),
    failed: require("../../assets/images/Screens/fail.gif")
  }
  const pendingImage = require("../../assets/images/Screens/pending.gif")

  const message = {
    success: {
      heading: "Payment Successful!",
      title: "MLZHJUD1236DSHG",
      subTitle: "Your Transaction ID"
    },
    failed: {
      heading: "Payment Failed!",
      title: "",
      subTitle: ""
    },
    pending: {
      heading: "",
      title: "Please wait, we're processing your transaction. Don't go back.",
      subTitle: ""
    }
  }
  const color = {
    success: "#00C659",
    failed: "#D80000",
  }
  if (toast) {
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Succesful!',
      text2: 'Ticket purchased Succesfully',
      visibilityTime: 3000,
    });
  }

  const handelNavigation = () => {
    setIsPaymentSuccess("")
    setCheckPaymentStatus(false)
    if(toast){
     navigation.navigate('PlayingInstruction',{
      ticket_id: ticket_id,
      game_id: game_id,
      screen_name: "GameName",
    })
    }else{
      navigation.navigate('HomeScreen', { screen: "Wallet" })
    }
  }

  if (!checksPaymentStatus && status == "") {
    return <></>
  }

  return (
    <>
      <HeaderComponent transactionData={transactionData} status={status} title={"Payment Details"} />
      <View style={styles.container}>
        <Image
          source={(image[status] ? image[status] : pendingImage)}
          style={styles.icon}
        />
        <Text style={[styles.statusText, { color: color[status] }]}>{message[status] ? message[status].heading : message.pending.heading}</Text>
        <Text style={styles.transactionId}>{message[status] ? message[status].title : message.pending.title}</Text>
        <Text style={styles.subText}>{message[status] ? message[status].subTitle : message.pending.subTitle}</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          handelNavigation()
        }}>
          <Text style={styles.buttonText}>{buttonText ? buttonText : "Tap to view balance"}</Text>
        </TouchableOpacity>
      </View>
       <Toast ref={Toast.setRef} />
    </>
    
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
    fontFamily: 'Montserrat-SemiBold',
    color: "#000",
    marginBottom: hp("1%"),
  },
  subText: {
    fontSize: wp("3.5%"),
    marginBottom: hp("5%"),
    fontFamily: 'Montserrat-Medium',
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
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
  },
});

export default PaymentStatusCard;
