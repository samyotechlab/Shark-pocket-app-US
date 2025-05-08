import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import WalletBalance from '../../Components/WalletBalance';
import WithdrawInput from '../../Components/WithdrawInput';
import BankSelection from '../../Components/BankSelection';
import FeaturesSection from '../../Components/FeaturesSection';
import AlertDialogRed from '../../Components/AlertDialogRed';
import TDSBreakupDialog from '../../Components/TDSBreakupDialog';
import { showTds, withdrawCash, approvedRequest } from '../../Service/WithDraw';
import { bankAccountDetails } from '../../Service/Bank';
import { encryptData, generateKey } from '../../Utilities/utilies';

const Withdraw = ({ dataUser }) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bankDetail, setBankDetail] = useState([]);
  const [tdsData, setTdsData] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [account, setAccount] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isOkayBtn, setOkayBtn] = useState(false);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        setIsLoading(true);
        const response = await bankAccountDetails(dataUser._id);
        const filterData = response.data.filter(item => item.status === 'approved');
        setBankDetail(filterData);
        if (filterData.length === 1) {
          setSelectedBank(filterData[0]);
        }
      } catch (error) {
        console.log('Bank details error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBankDetails();
  }, [dataUser._id]);

  const handleWithdraw = () => {
    if (parseFloat(amount) > dataUser.total_earning) {
      setVisible(true);
      setMessage(`Your wallet balance is ₹${dataUser.total_earning}. Please enter a valid amount.`);
    } else {
      validateWithdrawal();
    }
  };

  const validateWithdrawal = async () => {
    try {
      setIsLoading(true);
      if (dataUser.is_pan_verified !== 1) {
        setVisible(true);
        setMessage('Your PAN is not verified. Please verify your PAN to proceed.');
        setAccount('pan');
        return;
      }
      if (dataUser.is_account_verified !== 1) {
        setVisible(true);
        setMessage('Your bank is not verified. Please verify your bank to proceed.');
        setAccount('bank');
        return;
      }
      if (!amount) {
        setVisible(true);
        setMessage('Please enter an amount.');
        return;
      }
      if (selectedBank && parseFloat(amount) < selectedBank.minAmount) {
        setVisible(true);
        setMessage('Minimum withdrawal amount is 50 Rupees.');
        return;
      }
      await toggleTdsModal(false);
    } catch (error) {
      console.log('Validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTdsModal = async (calledFromWithdrawInput) => {
    try {
      const response = await showTds(dataUser._id, amount);
      console.log('TDS response:', response);
      if (response.status === 1) {
        setTdsData(response.data);
        setModalVisible(!isModalVisible);
        if (calledFromWithdrawInput) {
          setOkayBtn(true);
        }
      } else {
        console.log(response.message);
        setVisible(true);
        setMessage('Withdraw request is required.');
      }
    } catch (error) {
      console.log('TDS modal error:', error);
    }
  };

  

  const handleWithdrawRequest = async () => {
    try {
      const key = await generateKey(dataUser.mobile, dataUser.name, dataUser.aadhaar, dataUser._id);
      const data = {
        amount,
        pay_amount: parseFloat(tdsData.current_withdraw).toFixed(2),
        user_id: dataUser._id,
        name: dataUser.name,
        ifsc: selectedBank?.ifsc_code,
        account_number: selectedBank?.account_no,
        contact_id: dataUser.razorpay_contact_id,
      };
      const encryptedData = await encryptData(key, data);
      const response = await withdrawCash(dataUser._id, encryptedData);
      if (response.status === 0) {
        Toast.show({
          type: 'error',
          text1: 'Withdraw Request',
          text2: response.message,
          visibilityTime: 3000,
        });
      } else {
        setModalVisible(false);
        await handleApproveRequest(response.data);
      }
    } catch (error) {
      console.log('Withdraw request error:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const key = await generateKey(dataUser.mobile, dataUser.name, dataUser.aadhaar, dataUser._id);
      const data = {
        _id: requestId,
        amount,
        pay_amount: parseFloat(tdsData.current_withdraw).toFixed(2),
        user_id: dataUser._id,
        name: dataUser.name,
        ifsc: selectedBank?.ifsc_code,
        account_number: selectedBank?.account_no,
        mobileNumber: dataUser.mobile,
      };
      const encryptedData = await encryptData(key, data);
      const response = await approvedRequest(dataUser._id, encryptedData);
      if (response.status === 1) {
        Toast.show({
          type: 'success',
          text1: 'Withdraw Request',
          text2: 'Amount credited successfully to your bank account',
          visibilityTime: 3000,
        });
        setAmount('');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Approval Failed',
          text2: response.message,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log('Approve request error:', error);
    }
  };

  const handleNavigation = () => {
    setVisible(false);
    if (account === 'pan') {
      navigation.navigate('PanVerification', { user_id: dataUser._id, mobile: dataUser.mobile });
    } else if (account === 'bank') {
      navigation.navigate('BankAccount', { user_id: dataUser._id, mobile: dataUser.mobile });
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    setOkayBtn(false);
  }

  return (
    <>
    <AlertDialogRed
        visible={visible}
        onClose={() => setVisible(false)}
        message={message}
        onOkPress={handleNavigation}
      />
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <WalletBalance balance={dataUser.total_earning} />
        <WithdrawInput
          amount={amount}
          setAmount={setAmount}
          tdsData={tdsData}
          onLearnMore={()=>toggleTdsModal(true)}
        />
        <BankSelection
          bankDetail={bankDetail}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          isAccountVerified={dataUser.is_account_verified}
        />
        <View style={styles.withdrawButtonContainer}>
          <TouchableOpacity
            style={[styles.withdrawButton, { opacity: amount && selectedBank && !isLoading ? 1 : 0.5 }]}
            onPress={handleWithdraw}
            disabled={!amount || !selectedBank || isLoading}
          >
            <Text style={styles.withdrawButtonText}>
              {isLoading ? 'PROCESSING...' : 'WITHDRAW CASH'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FeaturesSection />
    </View>
    {isModalVisible && (
        <TDSBreakupDialog
          isVisible={isModalVisible}
          onClose={() => handleClose()}
          tdsData={tdsData}
          handleWithdrawRequest={handleWithdrawRequest}
          isOkayBtn={isOkayBtn}
        />
      )}
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop: hp('2%'),
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  withdrawButtonContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#4FBF03',
    borderRadius: wp('4%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: wp('0.5%'),
    shadowColor: '#4FBF03',
    shadowOffset: { width: 0, height: hp('1%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('3%'),
    elevation: 10,
    width: wp('85%'),
  },
  withdrawButtonText: {
    fontSize: hp('2.5%'),
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFFFFF',
    letterSpacing: wp('0.5%'),
    textShadowColor: '#F88600',
    textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    textShadowRadius: wp('2%'),
  },
});

export default Withdraw;





