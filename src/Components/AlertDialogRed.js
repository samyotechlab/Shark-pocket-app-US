import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AlertDialogRed = ({ visible, onClose, onOkPress, message, show ,bankShow}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          <LinearGradient colors={['#FA3E41', '#FF8385', '#FA3E41']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.header}>
            <Text style={styles.headerText}>ALERT</Text>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            {show ? (
              <TouchableOpacity onPress={onOkPress}>
                <LinearGradient
                  colors={['#67FF00', '#3E9900']}
                  style={styles.addCashButton}>
                  <Text style={styles.buttonText}>{bankShow ? "Verify" :"ADD CASH" }</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
                <Text style={styles.okText}>Ok</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#FFB6B6',
    width: wp('65%'),
    borderRadius: wp('3%'),
    paddingBottom: hp('3%'),
    elevation: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderColor: 'white',
    borderWidth: wp('0.8%'),
  },
  header: {
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('12%'),
    marginTop: hp('1%'),
    borderRadius: wp('2%'),
    alignSelf: 'center',
    elevation: 5,
  },
  headerText: {
    fontSize: wp('6.5%'),
    fontFamily: 'LilitaOne-Regular',
    color: '#FFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  content: {
    marginVertical: hp('2.5%'),
    paddingHorizontal: wp('5%'),
  },
  message: {
    fontSize: wp('4.5%'),
    color: '#333',
    textAlign: 'center',
    lineHeight: wp('5.5%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp('5%'),
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    borderColor: '#000',
    borderWidth: wp('0.5%'),
    borderRadius: wp('2%'),
    backgroundColor: '#FFF',
    marginRight: wp('2%'),
  },
  okButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    borderColor: '#000',
    borderWidth: wp('0.5%'),
    borderRadius: wp('2%'),
    backgroundColor: '#FFF',
  },
  cancelText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#444',
  },
  okText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#444',
  },
  addCashButton: {
    flex: 1,
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: hp('1.7%'),
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default AlertDialogRed;
