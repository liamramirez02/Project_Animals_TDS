import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'


export function validateEmail(email){ //Validacion de Caracteres
    const RQ = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return RQ.test(email)
}


// Metodo que importa la imagen desde la galeria

export const cargarimagegallery = async (array) => {
    const response = { status: false, image: null }
    const rpermisos = await Permissions.askAsync(Permissions.CAMERA) //permiso para acceso a la camara
    
    if (rpermisos.status === "denied") { //si el usuario deniega el permiso
      Alert.alert("Dar permiso para acceder a la imagenes")
      return response
    }
  
    const resultado = await ImagePicker.launchImageLibraryAsync({  //si el usuario aprueba los permisos, toma las imagenes de la galeria
      allowsEditing: true,
      aspect: array
    })
  
    if (resultado.cancelled) { // si el usuario cancela la operacion 
      return response
    }
  
    response.status = true
    response.image = resultado.uri 
    return response  
}