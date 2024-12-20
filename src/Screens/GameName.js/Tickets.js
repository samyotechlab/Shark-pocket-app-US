import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Tickets() {
    const navigation = useNavigation();
    const handleNavigation  = ()=>{
        navigation.navigate("PlayingInstruction")
    }
  return (
    <View>
        <TouchableOpacity style={styles.button} onPress={()=>{
            handleNavigation()
        }}>
          <Text style={styles.buttonText}>Press</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2A1610',
        borderColor: '#F5D236',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#F5D236',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation:15,
      },
      buttonText: {
        color: '#F5D236',
        fontSize: 18,
      },
})