import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import { Camera } from 'expo-camera';


export function validateEmail(email){ //Validacion de Caracteres
    const RQ = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return RQ.test(email)
}


// Metodo que importa la imagen desde la galeria

export const cargarimagegallery = async (array) => {
    const response = { status: false, image: null }
    const { status } = await Camera.requestCameraPermissionsAsync() //permiso para acceso a la camara
    
    if (status !== "granted") { //si el usuario deniega el permiso
      Alert.alert("Para cargar una imagen desde la galería, es necesario otorgar permiso para acceder a las imágenes. Por favor, otorgue permiso en la configuración de su dispositivo")
      return response
    }
  
    const resultado = await ImagePicker.launchImageLibraryAsync({  //si el usuario aprueba los permisos, toma las imagenes de la galeria
      allowsEditing: true,
      aspect: array,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })
  
    if (resultado.canceled) { // si el usuario cancela la operacion 
      return response
    }
  
    response.status = true
    response.image = resultado.assets[0].uri  
    return response  
}

//metodo para convertir la imagen en binario
export const fileToBlob = async(path) => {
  const file = await fetch(path)
  const blob = await file.blob()
  return blob
}