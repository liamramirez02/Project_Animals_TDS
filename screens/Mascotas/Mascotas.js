//StyleSheet: creacion de estilos
//Text: textos
//View: contenedor

import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import {Icon} from 'react-native-elements'
import { useEffect } from 'react';
import Loading from './../../Componentes/Loading';
import firebase from 'firebase/app'

export default function Mascotas({navigation}) {

  const [user, setUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false) //si hay usuario log o no
    })

  },[])

if (user === null) {
  return <Loading isVisible={true} text="Cargando..."/>
}


return (
    <View style={styles.viewB}>
      <Text>hola mascota</Text>
      {     

      user && (                              //si hay usuario muestra el icono
       <Icon
        type="material-community"
        name="plus"
        color = "#442484"
        reverse
        containerStyle={styles.btnContainer}
        onPress={() => navigation.navigate("addmascotas")}
      />
      )
      }

    </View>
  )
}

const styles = StyleSheet.create({

  viewB:{
    flex: 1,
    backgroundColor: "#fff"
  },
  btnContainer:{
    position: 'absolute',
    bottom: 5,
    right: 0,
    shadowColor: 'black',
    shadowOffset: {width: 2, height: 2 },
    shadowOpacity: 0.5    

  }
})
