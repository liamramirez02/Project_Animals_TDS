import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'

import { getDocumentById } from '../../utilidades/actions'
import Loading from '../Loading'

export default function GoTo_Mascotas({navigation, route}) {
  const {id, name } = route.params
  const [mascota, setMascota] = useState(null) 

  navigation.setOptions({title: name })

  useEffect(() => {
    (async() =>{
      const response = await getDocumentById("mascotas", id)
      if(response.statusResponse) {
        setMascota(response.document)
      }else {
        setMascota({})
        Alert.alert("Ha sucedido un error cargando la mascota, Intentelo más tarde!")
      }
    })()
  }, [])
  
  if(!mascota){
    return <Loading isVisible={true} text="Cargando Mascotas!"/>
  }
  
  return (
    <View>
      <Text>{mascota.description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})