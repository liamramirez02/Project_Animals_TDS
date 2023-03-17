import { StyleSheet, Text, View } from 'react-native'
import React, {useRef, useState} from 'react'
import { Toast } from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../Componentes/Loading';
import Add_mascotas_form from './../../Componentes/Mascotas/Add_mascotas_form';

export default function Add_mascotas({navigation}) {

    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
    <KeyboardAwareScrollView>
      <Add_mascotas_form toastRef={toastRef} setLoading={setLoading}
      />
      
      <Loading isVisible={loading} text="Agregando Mascota"
     />
     
     <Toast ref={toastRef} position="center" opacity={0.9}
     />

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({})