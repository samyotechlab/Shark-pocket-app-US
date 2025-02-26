import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';


const RangeInfoModal = ({ visible, onClose, rangeData }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.overlay}>
        <LinearGradient
          colors={['#F38424', '#F7A552', '#F9D479']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.modalContainer}
        >
          <TouchableOpacity style={{ position: 'absolute', top: 5, right: 2 }} onPress={onClose}>
            <Icon name="circle-with-cross" size={30} color="red" />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerText}>Range Selection</Text>
          </View>

          {
            rangeData.length != 0 ? (
            <View style={styles.tableContainer}>
              {/* Table Header */}
              <View style={styles.tableHeader}>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.headerTextStyle}>Rank</Text>
                </View>
                <View style={[styles.tableCell, { flex: 1 }]}>
                  <Text style={styles.headerTextStyle}>Winnings</Text>
                </View>
              </View>

              {/* Table Rows */}
              {rangeData.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <View style={[styles.tableCell, { flex: 1}]}>
                    <Text style={styles.cellText}>{item.startRange} - {item.endRange}</Text>
                  </View>
                  <View style={[styles.tableCell, { flex: 1 }]}>
                    <Text style={styles.cellText}>{item.value}</Text>
                  </View>
                </View>
              ))}
            </View>) : (
            <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No data found</Text>
                          </View>
            )
          }
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
    width: '85%',
    height: '55%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    borderColor: '#F2E30B',
    borderWidth: 4,
  },
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
  tableContainer: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#D4B300',
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F2E30B',
    borderBottomWidth: 2,
    borderBottomColor: '#D4B300',
  },
  headerTextStyle: {
    fontSize: wp('4%'),
    fontFamily:'Montserrat-SemiBold',
    color: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#D4B300',
  },
  tableCell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    fontSize: wp('4%'),
    color: '#fff',
    fontFamily:'Montserrat-SemiBold',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transprent',
  },
  noDataText: {
    fontSize: wp('5%'),
    color: 'black',
    fontFamily: 'Montserrat-Regular',
  },
});

export default RangeInfoModal;
