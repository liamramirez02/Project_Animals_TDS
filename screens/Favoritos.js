import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useCallback,useRef} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { getFavoritelist } from './../utilidades/actions';
import { Image, Icon, Button } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import Loading from './../Componentes/Loading';
import firebase from "firebase/app"
import "firebase/firestore"



export default function Favoritos({navigation}) {

  const toastRef = useRef()

  const [mascotas, setMascotas] = useState(null)
  const [userLogged, setUserLogged] = useState(false)
  const [loading, setLoading] = useState(false)
  const [reloadData, setReloadData] = useState(false)

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false)
})

  useFocusEffect(
    useCallback(() => {
      if (userLogged){  
        async function getData() {
          setLoading(true)
          const response = await getFavoritelist()
          setMascotas(response.favorites)
          setLoading(false)     
      } 
      getData()
    }
    setReloadData(false)
    },[userLogged, reloadData])
)

if (!userLogged) {
  return <UserNoLogged navigation={navigation}/>
}

if (!mascotas) { //si no hay valor, aun siguen cargando las mascotas.  Si no hay mascotas favoritas llama a "NotFoundRestaurants"
  return <Loading isVisible={true} text="Cargando Mascotas..."/>
} else if(mascotas?.length === 0) {
  return <NotFoundMascotas/>
}

  return (
    <View>
      <Text></Text>
      <Toast ref={toastRef} position="center" opacity={0.9}/>
      <Loading text="Eliminando mascota..." isVisible={Loading}/>
    </View>
  )
}

function NotFoundMascotas() {
  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Icon type="material-community" name="alert-outline" size={50}/>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Aún no tienes Mascotas favoritas</Text>
      </View>
  )    
}

function UserNoLogged({navigation}) {

  return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Icon type="material-community" name="alert-outline" size={50}/>
          <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
              Necesitas estar logueado para ver los favoritos
          </Text>
          <Button 
              title="Ir al Login" 
              containerStyle={{ marginTop: 20, width: "80%"}}
              buttonStyle={{ backgroundColor: "#442484" }}
              onPress={() => navigation.navigate("C2", { screen: "login" })}
          />
      </View>
  )
}
const styles = StyleSheet.create({})