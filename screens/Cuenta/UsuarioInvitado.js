import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Loading from '../../Componentes/Loading'

export default function UsuarioInvitado() {
  return (
    <View>
      <Text>UsuarioInvitado</Text>
      <Loading isVisible = {true} text="Cargando..."/>
    </View>
  )
}

const styles = StyleSheet.create({})