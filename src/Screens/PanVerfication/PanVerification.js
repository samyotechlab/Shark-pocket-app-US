import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { PanVerificationData } from '../../Service/PanVerfication'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


export default function PanVerfication() {
    const navigation = useNavigation();
    const route = useRoute();
    const [loader,setLoader] = useState(false)
    const { user_id } = route.params
    const [panData, setPanData] = useState({
        name: '',
        pan_number: '',
    });

    const handleInputChange = (name, value) => {
        setPanData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const {name, pan_number} = panData;
    
        if (name.trim() === '') {
          setIsModalVisible(true);
          setMessage('Name is required.');
          return false;
        }
    
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(pan_number)) {
          setIsModalVisible(true);
          setMessage(
            'Invalid PAN Number. Please enter a valid PAN in the format: ABCDE1234F.',
          );
          return false;
        }
    
        return true;
      };

      const handleVerifyPan = async () => {
        if (!validateForm()) return;
    
        const obj = {
          user_id: user_id,
          name: panData.name,
          pan: panData.pan_number,
        };
        setLoader(true)
        try {
          const response = await PanVerificationData(obj);
          if (response) {
            Toast.show({
                            type: 'success',
                            position: 'top',
                            text1: 'Succesful',
                            text2: 'Pan Verify Successfullly',
                            visibilityTime: 3000
                          });
            setTimeout(() => {
              navigation.navigate('ProfileScreen');
            }, 2000);
          } else {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error!',
                text2: 'Wrong Credentials',
                visibilityTime: 3000,
              });
          }
        } catch (error) {
            const msg = error.message
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error!',
                text2: msg,
                visibilityTime: 3000,
              });
        }finally {
            setLoader(false)
        }
      };
    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"PAN Verification"} />
            <Text style={styles.kyc}>Complete Your PAN Details </Text>
            <View style={styles.container}>

                <View style={[{ justifyContent: 'center', marginVertical: hp('3%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            value={panData.name}
                            maxLength={40}
                            onChangeText={value => handleInputChange('name', value)}
                        />

                    </View>
                </View>

                <View style={[{ justifyContent: 'center', marginBottom: wp('7%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Pan Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            maxLength={10}
                            value={panData.pan_number}
                            onChangeText={value => handleInputChange('pan_number', value)}
                        />

                    </View>
                </View>
                <View style={[{ padding: hp('1%') }]}>
                    <CommonButton title={'Save'}  onPress={handleVerifyPan}/>
                    <Text style={styles.kycText}>
                        Why do we need PAN Verification?
                         <TouchableOpacity style={{marginBottom: hp('1.3%')}} onPress={()=>{
                                                handleNavigation()
                                            }}>
                                                <Text style={[styles.kycText,{ textDecorationLine: 'underline', fontFamily: 'Montserrat-Bold',}]}> Read FAQ’s</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <Toast ref={Toast.setRef} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        margin: hp('2%'),
    },
    box: {
        flex: 1,
        backgroundColor: 'red',
    },
    text: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
        borderWidth: 1,
        borderColor: '#FFFFFF80',
        width: '100%',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: hp('2%'),
        marginLeft: wp('2%'),
    },
    kyc: {
        color: '#FFFFFFCC',
        fontSize: hp('1.3'),
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: hp('8%'),
    },
    kycText: {
        color: '#FFFFFF',
        fontSize: hp('1.5'),
        fontFamily: 'Montserrat-Regular',
    }
})