import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

const AlertDialog = ({ visible, onClose,onOkPress }) => {
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
          <View style={styles.header}>
            <Text style={styles.headerText}>ALERT</Text>
          </View>

          {/* Alert Content */}
          <View style={styles.content}>
            <Text style={styles.message}>
              Lorem ipsum dolor sit amet consectetur. Consequat et viverra ac cursus elementum.
              Proin sit purus purus massa gravida
            </Text>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={()=>{
                onOkPress();
            }}>
              <Text style={styles.okText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'trasparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: '#FFB6B6',
    width: '85%',
    borderRadius: 10,
    paddingBottom: 20,
    elevation: 10,
    borderColor: '#FFCECE',
    borderWidth: 2,
  },
  header: {
    backgroundColor: '#E94E4E',
    paddingVertical: 18,
    paddingHorizontal: 80,
    marginTop:10,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  content: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 10,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  okText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
});

export default AlertDialog;
