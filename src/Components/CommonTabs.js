import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedLoader from './AnimatedLoader'

export default function CommonTabs() {
  return (
       <View style={{ marginTop: 10 }}>
         <View
           style={{
             flexDirection: 'row',
             padding: hp('2%'),
             gap: wp('10%')
           }}>
           <TouchableOpacity onPress={() => handlePress('Withdraw')}>
             <Text
               style={dynamicStyles.Withdraw}>
               Withdraw
             </Text>
           </TouchableOpacity>
           <TouchableOpacity onPress={() => handlePress('WithdrawHistory')}>
             <Text
               style={dynamicStyles.WithdrawHistory}>
               Withdraw History
             </Text>
           </TouchableOpacity>
 
         </View>
 
         {selectedTab === 'Withdraw' ? (
           !loader ? (<Tickets />) : (<AnimatedLoader />)
         ) : (
           !loader ? (<WithdrawHistory />) : (<AnimatedLoader />)
         )}
       </View>
  )
}

const styles = StyleSheet.create({})