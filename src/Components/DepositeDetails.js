import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome';
import Iconicons from 'react-native-vector-icons/Feather';
import { Divider } from 'react-native-paper';
import HeaderComponent from './HeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { transactionDepositeData } from '../Service/Transaction';
import Toast from 'react-native-toast-message';
import AnimatedLoader from './AnimatedLoader';
import { encryptData, generateKey } from '../Utilities/utilies';
import useLoginDataStorage from '../Service/CustomStorageHook';

export default function DepositeDetails() {
  const route = useRoute();
  const { item, page } = route.params
  const [transactionData, setTransactionData] = useState({})
  const [loader, setLoader] = useState()
  const {loginData , isReady}  = useLoginDataStorage();
  const navigation = useNavigation()

  const[userData,setUserData]=useState({
    name:"",
    mobile:"",
    userId:"",
    aadhaar:""
  })

  const headerTitle = {
    bonus: "Bonus Details",
    winning: "Winning Details"
  }

  const Header = {
    bonus: "Bonus Details",
    winning: "Winning Details"
  }
  const title = {
    bonus: "Deposit Amount (excl. Govt. Tax)",
    winning: "Withdraw Amount (excl. Govt. Tax)"
  }

  const date_title = {
    bonus: "Deposit Successfull",
    winning: "Withdraw Successfull"
  }

  const transactionId = {
    bonus: item.transaction_id,
    winning: item.transaction_id
  }
  const depositeAmount = {
    bonus: parseFloat(item.actual_amount).toFixed(2),
    winning: parseFloat(item.user_amount).toFixed(2)
  }

  const gstAmount = {
    bonus: parseFloat(item.gst_amount).toFixed(2),
    winning: parseFloat(item.tds).toFixed(2)
  }
  const totalAmount = {
    bonus: (item.actual_amount + item.gst_amount),
    winning: item.winning_amount
  }
  const requestRaised = {
    bonus: item.request_raised,
    winning: item.created_at,
  }
  const depositeDate = {
    bonus: item.deposite_date,
    winning: item.created_at,
  }
  const bonusData = {
    bonus: {
      transaction_amount: (item.actual_amount + item.gst_amount),
      deposite_date: item.deposite_date
    },
    winning: {
      transaction_amount: item.winning_amount,
      deposite_date: item.created_at
    }
  }
  const depositeData = async () => {
    const mobileNumber = userData?.mobile;
    const username = userData?.name;
    const aadharNumber = userData?.aadhaar;
    const userId = userData?.userId;
    const key = generateKey(mobileNumber, username, aadharNumber, userId);
    const encryptedData = encryptData(key, item.user_id);

    setLoader(true)
    try {
      const response = await transactionDepositeData(item.transaction_id, encryptedData,item.user_id);
      if (response.status === 1 && response) {
        const formattedData = {
          ...response.data,
          actual_amount: parseFloat(response.data.actual_amount).toFixed(2),
          gst_amount: parseFloat(response.data.gst_amount).toFixed(2),
        };
        setTransactionData(formattedData);
      } else {
        const msg = response.message || "Unexpected error occurred"
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error!',
          text2: msg,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      const msg = error.message
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error!',
        text2: { msg },
        visibilityTime: 3000,
      });
    } finally {
      setLoader(false)
    }
  }
  const isNotEmpty = (obj) => {
    return Object.values(obj).some(value => value !== "");
};
  useEffect(() => {
    if (page !== "bonus" && isNotEmpty(userData)) {
      depositeData();
    }
  }, [page,userData])

  useEffect(()=>{

    if(loginData&&isReady){
      setUserData({ 
        name:loginData?.data?.name,
        mobile:loginData?.data?.mobile,
        userId:loginData?.data?._id,
        aadhaar:loginData?.data?.aadhaar
      })
    }

  },[loginData,isReady])

  const copyToClipboard = () => {
    Clipboard.setString(transactionData.transaction_id);
  };


  return (
    <>
      <HeaderComponent transactionData={bonusData[page] ? bonusData[page] : transactionData} title={headerTitle[page] ? headerTitle[page] : 'Deposite Details'} status={"deposite"} />
      {
        !loader ? (
          <SafeAreaView style={styles.main}>
            <View style={styles.section}>
              <Text style={styles.transaction}>Transaction ID</Text>
            </View>
            <View style={[styles.row, styles.spaceBetween]}>
              <Text style={styles.extraSmallFont}>
                {transactionId[page] ? transactionId[page] : transactionData.transaction_id}
              </Text>
              <TouchableOpacity style={[styles.row, styles.copyButton]} onPress={copyToClipboard}>
                <Icon name="clone" size={15} color="#747474" />
                <Text style={[styles.extraSmallFont]}>COPY</Text>
              </TouchableOpacity>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.deposite}>
              {Header[page] ? Header[page] : "Deposite Details"}
            </Text>
            <LinearGradient
              colors={['#FFFFFF4D', '#00C6590F']}
              style={styles.innerDeposit}>
              <View style={styles.depositRow}>
                <Text style={styles.amount}>{title[page] ? title[page] : "Deposit Amount (excl. Govt. Tax)"}</Text>
                <Text style={styles.amount}>₹{depositeAmount[page] ? depositeAmount[page] : transactionData.actual_amount}</Text>
              </View>
              <View style={styles.depositRow}>
                <Text style={styles.amount}>Govt. Tax (28% GST)</Text>
                <Text style={[styles.amount, { fontFamily: 'Montserrat-Bold' }]}>
                  ₹{gstAmount[page] ? gstAmount[page] : transactionData.gst_amount}
                </Text>
              </View>
              <Divider style={styles.divider} />
              <View style={styles.depositRow}>
                <Text style={styles.changeGreen}>
                  Total
                </Text>
                <Text style={[styles.changeGreen]}>
                  ₹{gstAmount[page] ? totalAmount[page] : transactionData.transaction_amount}
                </Text>
              </View>
            </LinearGradient>

            <View style={[styles.innerDeposit, { backgroundColor: 'transparent' }]}>
              <View style={styles.depositRow}>
                <View style={styles.circle}>
                  <Iconicons name="check-circle" size={hp('3%')} color="#000000CC" />
                  <Text style={styles.request}>Request Raised</Text>
                </View>
                <Text style={styles.amount}>{requestRaised[page] ? requestRaised[page] : transactionData.request_raised}</Text>
              </View>
              <View style={styles.depositRow}>
                <View style={styles.circle}>
                  <Iconicons name="check-circle" size={hp('3%')} color="#000000CC" />
                  <Text style={styles.request}>{date_title[page] ? date_title[page] : "Deposit Successful"}</Text>
                </View>
                <Text style={styles.amount}>{depositeDate[page] ? depositeDate[page] : transactionData.deposite_date}</Text>
              </View>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: wp(5) }}>
              <TouchableOpacity style={styles.optionsRow} onPress={()=>navigation.navigate('Support',{user_id:item.user_id})}>
                <View style={styles.row}>
                  <Icon name="question-circle-o" size={20} color="#000000B2" />
                  <Text style={styles.amount}>Need Help</Text>
                </View>
                <Icon name="angle-right" size={30} color="#000000B2" style={{ marginRight: hp(1) }} />
              </TouchableOpacity>
            </View>
            <Toast ref={Toast.setRef} />
          </SafeAreaView>) : (
          <AnimatedLoader />
        )
      }
    </>
  )
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: wp(3),
    backgroundColor: '#fff',
  },
  back: {
    padding: wp(3),
  },
  row: {
    flexDirection: 'row',
    margin: wp(1),
    gap: hp('1%')
  },
  spaceBetween: {
    justifyContent: 'space-between',
    paddingTop: hp('2%')
  },
  amountContainer: {
    backgroundColor: '#e6ffee',
    padding: wp(5),
    borderRadius: wp(2.5),
    marginBottom: hp(1),
  },

  section: {
    marginBottom: hp(1),
    backgroundColor: '#F2F2F2',
    padding: wp('2%')
  },
  transaction: {
    color: '#696969',
    fontFamily: 'Montserrat-Medium',
    fontSize: hp('1.5%')
  },
  depositRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: hp(0.5),
  },
  innerDeposit: {
    padding: wp(4),
    borderColor: '#00000033',
    borderWidth: 1,
    borderRadius: wp(2.5),
    marginVertical: hp(1),
    backgroundColor: '#00C6590F'
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1),
    borderWidth: 1,
    borderRadius: wp(4),
    borderColor: '#00000033',

  },
  divider: {
    marginVertical: hp('1%'),
    backgroundColor: '#ccc',
  },
  changeGreen: {
    color: '#00C659',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: hp('2%')
  },
  largeFont: {
    fontSize: wp(6),
  },
  extraSmallFont: {
    fontSize: wp('3.5%'),
    color: '#696969',
    fontFamily: 'Montserrat-Medium',

  },
  copyButton: {
    padding: wp(1),
    borderWidth: 1,
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00000033'
  },
  optionText: {
    marginLeft: wp(5),
    fontSize: wp(4),
  },
  creditIcon: {
    padding: wp(2.5),
    backgroundColor: '#fff',

    borderRadius: wp(10),
    color: '#009900',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(1),
    flexDirection: 'row'
  },
  deposite: {
    fontFamily: 'Montserrat-Bold',
    color: '#3E3E3E',
    fontSize: hp('2%'),
    marginVertical: hp('2%')
  },
  amount: {
    fontFamily: 'Montserrat-Medium',
    color: '#696969',
    fontSize: hp('1.5%')
  },
  request: {
    fontFamily: 'Montserrat-Medium',
    color: '#3A3939',
    paddingHorizontal: wp(3),
    fontSize: wp('3%')
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  noDataText: {
    fontSize: wp('5%'),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
})