//StyleSheet: creacion de estilos
//Text: textos
//View: contenedor

import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useCallback} from 'react'
import {Icon} from 'react-native-elements'
import { useEffect } from 'react';
import Loading from './../../Componentes/Loading';
import { useFocusEffect } from '@react-navigation/native' //para cargar la pantalla
import { getMascotas } from '../../utilidades/actions';
import Listado_Macotas from '../../Componentes/Mascotas/Listado_Macotas';
import { size } from 'lodash';
import { getMoreMascotas } from './../../utilidades/actions';

import { firebaseApp } from "../../utilidades/firebase"
import firebase from "firebase/app"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

export default function Mascotas({navigation}) {

  const [user, setUser] = useState(null)
  const [mascotas, setMascotas] = useState(null)
  const [startMascota, setStartMascota] = useState(null)
  const [loading, setLoading] = useState(false)


  const [activeSlide, setActiveSlide] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [userLogged, setUserLogged] = useState(false)
  const [loadingText, setLoadingText] = useState(null)
  const [currentUser, setcurrentUser] = useState(null)
  const [modalNotification, setModalNotification] = useState(false)

  
  const limitMascotas = 7

  // console.log("mascotas",mascotas)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      userInfo ? setUser(true) : setUser(false) //si hay usuario log o no
    })

  },[])


  useFocusEffect( //Obteniendo la lista de mascotas
    React.useCallback(() => {
        async function fetchData() {
            setLoading(true);
            const response = await getMascotas(limitMascotas);
            
            if(response.statusResponse) {
              setStartMascota(response.startMascota);
              setMascotas(response.mascotas);
            }
            setLoading(false);
        }

        fetchData();
    }, [])
);

const handleLoadMore = async() => { //cargar mas mascotas en la paginacion
  if (!startMascota) { 
      return
  }

  const resultMascotas = []
  setLoading(true);

  db.collection("mascotas")
      .orderBy("createAt", "desc")
      .startAfter(startMascota.data().createAt)
      .limit(limitMascotas)
      .get()
      .then((response) => {
          if (response.docs.length > 0) {
            setStartMascota(response.docs[response.docs.length - 1])
          } else {
            setStartMascota(null)
          }

          response.forEach((doc) => {
              const mascota = doc.data()
              mascota.id = doc.id
              resultMascotas.push(mascota)
          });

          setMascotas([...mascotas, ...resultMascotas])
      })

  setLoading(false)
  // // const resultMascotas = []
  // setLoading(true);

  // const response = await getMoreMascotas(limitMascotas,startMascota)

  // if(response.statusResponse) {
  //   setStartMascota(response.startMascota)
  //   setMascotas({...mascotas, ...response.mascotas})
  // }

  // setLoading(false)
}



if (user === null) {
  return <Loading isVisible={true} text="Cargando..."/>
}


return (
    <View style={styles.viewB}>
      {
        size(mascotas) > 0 ? (
          <Listado_Macotas
          mascotas={mascotas}
          navigation={navigation}
          handleLoadMore={handleLoadMore}
          />
        ) :(
          <View style={styles.notFoundView}>
            <Text style={styles.notFoundText}> No hay Mascotas registradas</Text>
          </View>

        )
}
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
        <Loading isVisible={loading} text="Cargando mascotas..."/>
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
  },
  notFoundView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},    
notFoundText: {
    fontSize: 18,
    fontWeight: "bold"
}
})
