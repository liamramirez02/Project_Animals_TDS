import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import Registro_Form from './../../Componentes/Cuenta/Registro_Form';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view" //nuevo scroll

export default function Registro() {
  return (
    <KeyboardAwareScrollView>
         <Image
              source={require("../../assets/logo_v2.jpg")}
              resizeMode="contain"
              style={styles.image}
          />  
      <Registro_Form/> 
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
    image: {
        height: 150,
        width:"100%",
        marginBottom: 40,
        textAlign: "center"
      }
})