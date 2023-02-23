import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { CloseSession } from './../../utilidades/actions';

export default function User_logged() {

  const navigation = useNavigation()
  
  return (
    <View>
      <Text>User_logged</Text>
      <Button
        title="Cerrar Sesion"
        onPress={() => {
          CloseSession()
          navigation.navigate("Mascotas")
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({})