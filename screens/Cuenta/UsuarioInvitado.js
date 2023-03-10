import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React from 'react'
import Loading from '../../Componentes/Loading'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Login from './Login';

export default function UsuarioInvitado() {
  const navigation = useNavigation() //navegar a otra pantalla

  return (
    <ScrollView
    centerContent
    style={styles.viewBody}
    >
          <Image
              source={require("../../assets/logo_v2.jpg")}
              resizeMode="contain"
              style={styles.image}
          />  
          <Text style={styles.titulo}> 
          Bienvenido a PetSafe 
          </Text>
          <Text style={styles.descripcion}>
            En esta aplicación podras brindar ayuda a las mascotas perdidas
            desde tu casa, donde podras visualizar su información, reportar
            los casos,entre otras cosas.
          </Text>
          <Button
            buttonStyle={styles.boton}
            title="Ver Perfil"
            onPress={() => navigation.navigate("login")} //navegacion hacia login
          />
    </ScrollView>
  )
}

//<Loading isVisible = {true} text="Cargando..."/>

//Diseño del Apartado de Inicio
const styles = StyleSheet.create({
  viewBody: {
    marginHorizontal: 30
  },
  image: {
    height: 450,
    width:"105%",
    marginBottom: -170,
    textAlign: "center"
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 20,
    textAlign: "center"
  },
  descripcion: {
    color: "#646464",
    textAlign: "justify",
    fontSize: 15,
    marginBottom: 20,
  },
  boton: {
    backgroundColor: "#646464"
  }
})
