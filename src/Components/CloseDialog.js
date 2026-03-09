
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const CloseDialog = ({ visible, onClose, onOkPress, message }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Alert Title */}
          <LinearGradient colors={['#FA3E41','#FF8385','#FA3E41']} 
           start={{x: 0, y: 0.5}}
           end={{x: 1, y: 0.5}}
           
          style={styles.header}>
            <Text style={styles.headerText}>ALERT</Text>
          </LinearGradient>

          {/* Alert Content */}
          <View style={styles.content}>
            <Text style={styles.message}>
              {message}
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.button} onPress={onOkPress}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#FFFFFF90',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
  backgroundColor: '#FFB6B6',
    width: wp('65%'), 
    borderRadius: wp('5%'),
    paddingBottom: hp('3%'),
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    borderColor:'white',
    borderWidth:wp('1.5%')
  },
  header: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('10%'),
    marginTop: hp('1%'),
    borderRadius: wp('1.5%'),
    borderWidth: wp('0.5%'),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: wp('6%'),
    fontFamily:'LilitaOne-Regular',
    color: '#FFF',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 1 },
    textShadowRadius: 2,
    letterSpacing:2

  },
  content: {
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  message: {
    fontSize: wp('4%'),
    color: '#333',
    textAlign: 'center',
    lineHeight: wp('5%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
    marginHorizontal: wp('2%'),
    borderColor: '#000',
    borderWidth: wp('0.5%'),
    borderRadius: wp('2%'),
  },
  cancelText: {
    fontSize: wp('5%'),
    color: '#FFFFFF',
    fontFamily:'LilitaOne-Regular',
    textShadowColor: '#000000', 
    textShadowOffset: { width: 1.5, height: 1 },  
    textShadowRadius: 6,  
    letterSpacing:1
  },
  okText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#444',
  },
});

export default CloseDialog;
