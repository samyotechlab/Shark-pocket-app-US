import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AlertDialogGreen = ({ visible, onClose, onOkPress, message,ok}) => {
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
          <LinearGradient colors={['#01D101', '#C1FF83', '#01D101']} 
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
           style={styles.header}>
            <Text style={styles.headerText}>ALERT</Text>
          </LinearGradient>

          <View style={styles.content}>
            <Text style={styles.message}>{message}</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.cancelText}>No</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onOkPress();
              }}
            >
              <Text style={styles.okText}>Yes</Text>
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
    backgroundColor: 'transparent', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    backgroundColor: 'white',
    width: wp('65%'), 
    borderRadius: wp('2%'),
    paddingBottom: hp('3%'),
    elevation: 5,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
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
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing:1

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
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#444',
  },
  okText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#444',
  },
});


export default AlertDialogGreen;

// import React from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const AlertDialogGreen = ({ visible, onClose, onOkPress, message, ok }) => {
//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.dialog}>
//           {/* Alert Title */}
//           <LinearGradient
//             colors={['#00FF87', '#00FFEA', '#00FF87']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={styles.header}
//           >
//             <Text style={styles.headerText}>ALERT</Text>
//           </LinearGradient>

//           {/* Alert Content */}
//           <View style={styles.content}>
//             <Text style={styles.message}>{message}</Text>
//           </View>

//           {/* Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity
//               style={[styles.button, styles.cancelButton]}
//               onPress={onClose}
//             >
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, styles.okButton]}
//               onPress={() => {
//                 onOkPress();
//               }}
//             >
//               <Text style={styles.okText}>Yes</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.4)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dialog: {
//     backgroundColor: '#1E1E1E',
//     // backgroundColor: 'white', 
//     width: wp('75%'),
//     borderRadius: wp('4%'),
//     paddingBottom: hp('3%'),
//     elevation: 10,
//     shadowColor: '#00FF87',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//   },
//   header: {
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('10%'),
//     borderTopLeftRadius: wp('4%'),
//     borderTopRightRadius: wp('4%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerText: {
//     fontSize: wp('6%'),
//     fontFamily: 'LilitaOne-Regular',
//     color: '#FFF',
//     textTransform: 'uppercase',
//     textShadowColor: '#00FF87',
//     textShadowOffset: { width: 0, height: 0 },
//     textShadowRadius: 10,
//     letterSpacing: 1,
//   },
//   content: {
//     marginVertical: hp('3%'),
//     paddingHorizontal: wp('5%'),
//   },
//   message: {
//     fontSize: wp('4.5%'),
//     // color: '#1E1E1E',
//     color:'white',
//     textAlign: 'center',
//     lineHeight: wp('6%'),
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: hp('2%'),
//   },
//   button: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     marginHorizontal: wp('2%'),
//     borderRadius: wp('2%'),
//     borderWidth: 1,
//   },
//   cancelButton: {
//     backgroundColor: '#FF2D55',
//     borderColor: '#FF2D55',
//   },
//   okButton: {
//     backgroundColor: '#00FF87',
//     borderColor: '#00FF87',
//   },
//   cancelText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#FFF',
//   },
//   okText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#1E1E1E',
//   },
// });

// export default AlertDialogGreen;

// import React from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const AlertDialogGreen = ({ visible, onClose, onOkPress, message }) => {
//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.dialog}>
//           {/* Alert Title */}
//           <LinearGradient colors={['#00ff00', '#00d4ff']} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={styles.header}>
//             <Text style={styles.headerText}>⚡ ALERT ⚡</Text>
//           </LinearGradient>

//           {/* Alert Content */}
//           <View style={styles.content}>
//             <Text style={styles.message}>{message}</Text>
//           </View>

//           {/* Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.okButton} onPress={onOkPress}>
//               <Text style={styles.okText}>Yes</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dialog: {
//     backgroundColor: '#111',
//     width: wp('70%'),
//     borderRadius: wp('3%'),
//     paddingBottom: hp('3%'),
//     elevation: 10,
//     shadowColor: '#00ff00',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.9,
//     shadowRadius: 10,
//     borderWidth: 2,
//     borderColor: '#00ff00',
//   },
//   header: {
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('8%'),
//     borderTopLeftRadius: wp('3%'),
//     borderTopRightRadius: wp('3%'),
//   },
//   headerText: {
//     fontSize: wp('6%'),
//     fontFamily: 'LilitaOne-Regular',
//     color: '#fff',
//     textAlign: 'center',
//     textShadowColor: '#00ff00',
//     textShadowOffset: { width: 0, height: 2 },
//     textShadowRadius: 5,
//   },
//   content: {
//     marginVertical: hp('2%'),
//     paddingHorizontal: wp('5%'),
//   },
//   message: {
//     fontSize: wp('4.5%'),
//     color: '#0f0',
//     textAlign: 'center',
//     lineHeight: wp('6%'),
//     textShadowColor: '#00ff00',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   cancelButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     marginHorizontal: wp('2%'),
//     borderRadius: wp('2%'),
//     backgroundColor: '#222',
//     borderWidth: 2,
//     borderColor: '#ff0044',
//     shadowColor: '#ff0044',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.9,
//     shadowRadius: 6,
//   },
//   okButton: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     marginHorizontal: wp('2%'),
//     borderRadius: wp('2%'),
//     backgroundColor: '#00ff00',
//     shadowColor: '#00ff00',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.9,
//     shadowRadius: 6,
//   },
//   cancelText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#ff0044',
//     textShadowColor: '#ff0044',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   okText: {
//     fontSize: wp('4%'),
//     fontWeight: 'bold',
//     color: '#111',
//     textShadowColor: '#0f0',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
// });

// export default AlertDialogGreen;


// 4444444444444444

// import React from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// const AlertDialogNeon = ({ visible, onClose, onOkPress, message }) => {
//   return (
//     <Modal
//       transparent={true}
//       visible={visible}
//       animationType="fade"
//       onRequestClose={onClose}
//     >
//       <View style={styles.overlay}>
//         <View style={styles.dialog}>
//           {/* Alert Title */}
//           <LinearGradient
//             colors={['#0F0', '#39FF14', '#0F0']}
//             start={{ x: 0, y: 0.5 }}
//             end={{ x: 1, y: 0.5 }}
//             style={styles.header}
//           >
//             <Text style={styles.headerText}>ALERT</Text>
//           </LinearGradient>

//           {/* Alert Content */}
//           <View style={styles.content}>
//             <Text style={styles.message}>{message}</Text>
//           </View>

//           {/* Buttons */}
//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
//               <Text style={styles.cancelText}>Cancel</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, styles.okButton]}
//               onPress={() => {
//                 onOkPress();
//               }}
//             >
//               <Text style={styles.okText}>Yes</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   dialog: {
//     backgroundColor: 'white',
//     width: wp('70%'),
//     borderRadius: wp('3%'),
//     paddingBottom: hp('3%'),
//     elevation: 10,
//     borderWidth: 2,
//     borderColor: '#39FF14',
//     shadowColor: '#39FF14',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//   },
//   header: {
//     paddingVertical: hp('2%'),
//     paddingHorizontal: wp('10%'),
//     borderRadius: wp('1.5%'),
//     borderWidth: wp('0.5%'),
//     borderColor: '#0F0',
//     alignSelf: 'center',
//     shadowColor: '#0F0',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     elevation: 10,
//   },
//   headerText: {
//     fontSize: wp('7%'),
//     fontFamily: 'LilitaOne-Regular',
//     color: '#000',
//     textTransform: 'uppercase',
//     textAlign: 'center',
//     letterSpacing: 2,
//   },
//   content: {
//     marginVertical: hp('2%'),
//     paddingHorizontal: wp('5%'),
//   },
//   message: {
//     fontSize: wp('5%'),
//     color: 'black',
//     textAlign: 'center',
//     lineHeight: wp('6%'),
//     textShadowColor: '#0F0',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: hp('2%'),
//   },
//   button: {
//     flex: 1,
//     alignItems: 'center',
//     paddingVertical: hp('1.5%'),
//     marginHorizontal: wp('2%'),
//     borderRadius: wp('2%'),
//   },
//   cancelButton: {
//     backgroundColor: '#222',
//     borderColor: '#FF0000',
//     borderWidth: 2,
//     shadowColor: '#FF0000',
//     shadowOpacity: 0.8,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   okButton: {
//     backgroundColor: '#39FF14',
//     borderColor: '#0F0',
//     borderWidth: 2,
//     shadowColor: '#0F0',
//     shadowOpacity: 0.8,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   cancelText: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: '#FF0000',
//     textShadowColor: '#FF0000',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
//   okText: {
//     fontSize: wp('5%'),
//     fontWeight: 'bold',
//     color: '#000',
//     textShadowColor: '#0F0',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 3,
//   },
// });

// export default AlertDialogNeon;

