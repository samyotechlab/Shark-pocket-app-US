import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import { widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import call from '../../../assets/images/Applogo/call.png'
import { useNavigation } from '@react-navigation/native'
import { login } from '../../Service/Login'

export default function Login() {
    const navigation = useNavigation();
    const handleNavigation = ()=>{
      navigation.navigate('OtpScreen')
      login();
    }
  return (
 <>
 <BackgroundScreen/>
 <View style={styles.container}>
           <View style={[styles.box,{justifyContent:'center'}]}>
             <Text style={[styles.text, {fontSize:hp('3%'),
        fontFamily:'Montserrat-Bold'}]}>Welcome Back!</Text>
             <Text style={[styles.text,{fontFamily:'Montserrat-Light'}]}>Please enter your phone number</Text>
           </View>
           <View style={[styles.box, {justifyContent:'center'}]}>
            <View style={styles.inputContainer}>
                 <Image source={call}   style={styles.icon} />
                 <TextInput
                   style={styles.input}
                   placeholder='Phone Number'
                   placeholderTextColor="gray"
                   keyboardType='numeric'
                 />
               </View>
           </View>
           <View style={[styles.box,{padding:hp('2%')}]}>
            <CommonButton title={'Log in'} onPress={handleNavigation}/>
           </View>
       </View>
 </>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:0.5,
        margin:hp(2),
        marginTop:hp(10),
      },
      box:{
        flex:1,
      },
      text:{
        textAlign:'center',
        color:'#FFFFFF'
      },
      inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        width: '100%',
    
      },
      icon: {
        marginRight: 10,
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
      },
})