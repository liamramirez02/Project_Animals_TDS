import { Alert, Dimensions, StyleSheet, Text, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'

import { ViewPropTypes } from 'deprecated-react-native-prop-types'

import { getDocumentById } from '../../utilidades/actions'
import Loading from '../Loading'
import CarouselImages from '../Carousel'

const widthScreen = Dimensions.get("window").width

export default function GoTo_Mascotas({navigation, route}) {
  const {id, name } = route.params
  const [mascota, setMascota] = useState(null) 

  navigation.setOptions({title: name })

  //Ir a los datos de las mascota al momento de seleccionar unas de la publicada
  useEffect(() => {
    (async() => {
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
  
  //Mostrar Informacion de la Mascota publicada al momento de entrar
  return (
    <ScrollView style={styles.viewBody}>
      <CarouselImages
        images={mascota.images}
        height={230}
        width={widthScreen}
      />
      <Text>{mascota.description}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  }
})