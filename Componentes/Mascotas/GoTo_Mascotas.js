import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function GoTo_Mascotas({navigation, route}) {
  const {id, name } = route.params

  navigation.setOptions({title: name })

  return (
    <View>
      <Text>GoTo_Mascotas...</Text>
    </View>
  )
}

const styles = StyleSheet.create({})