import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import LeaderBoard from '../../Components/LeaderBoard'

export default function ResultScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
          <LeaderBoard/>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  }
})