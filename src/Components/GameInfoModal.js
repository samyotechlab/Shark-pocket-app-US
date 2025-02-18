import React from 'react';
import { ScrollView } from 'react-native';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const GameInfoModal = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <LinearGradient 
          colors={['#F38424', '#F7A552', '#F9D479']} 
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.modalContainer}
        >

          <View style={styles.header}>
            <Text style={styles.headerText}>Points Selection</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Quisque at ipsum nec ligula facilisis consectetur. Suspendisse 
            potenti. Nulla facilisi. Integer vitae justo non velit faucibus 
            gravida vel non orci.
            
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Quisque at ipsum nec ligula facilisis consectetur. Suspendisse 
            potenti. Nulla facilisi. Integer vitae justo non velit faucibus 
            gravida vel non orci.
          </Text>
          </ScrollView>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    height: '45%', 
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    borderColor: '#F2E30B',
    borderWidth: 4,
  },
  // Header Style
  header: {
    width: '90%',
    paddingVertical: hp('1.2%'),
    backgroundColor: '#F2E30B',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 4 },
    borderWidth: 2,
    borderColor: '#D4B300',
  },
  headerText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  closeButton: {
    borderRadius: 8,
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('0.5%'),
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 11 },
    width: '100%',
    borderTopRightRadius: wp(3.3),
    backgroundColor:'#00b63d',
    borderTopColor: '#00e968',
    borderBottomColor:'#018312',
  },
  closeButtonText: {
    letterSpacing: 2,
    fontSize: wp('4.5%'),
    fontFamily: 'LilitaOne-Regular',
    color: '#FFFFFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textTransform: 'uppercase',
  },
});

export default GameInfoModal;
