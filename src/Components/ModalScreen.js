import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
  
  export default function ModalScreen({
    visible,
    onClose,
    title,
    closeTitle,
    heading,
  }) {
    return (
      <View>
        <Modal
          visible={visible}
          transparent={true}
          animationType="slide"
          onRequestClose={onClose}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  height: hp('8%'),
                  width: wp('16%'),
                  backgroundColor: '#FF671F',
                  marginBottom: 15,
                  borderRadius: hp('8%'),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <Image source={require('../assets/Cross.png')} /> */}
              </View>
              <Text style={styles.heading}>Error</Text>
              <Text style={styles.modalText}>{title}</Text>
              <TouchableOpacity
                onPress={onClose}
                style={{
                  height: hp('5%'),
                  width: wp('40%'),
                  backgroundColor: '#FF671F',
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.closeModalText}>{closeTitle}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      marginBottom: 15,
      textAlign: 'center',
      color: '#414141',
    },
    closeModalText: {
      color: 'white',
      fontSize: 20,
      fontWeight: '500',
      letterSpacing: 1,
    },
    heading: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#414141',
      marginBottom: 10,
    },
  });
  