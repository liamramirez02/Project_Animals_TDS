import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import { Camera } from 'expo-camera';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import * as Location from "expo-location"


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
    console.log('Imagen seleccionada:', resultado.assets[0].uri);
    return response  
}


export const loadImageFromGallery  = async(array) => {
  const response = { status: false, image: null }
  const resultPermissions = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
  if (resultPermissions.status === "denied") {
      Alert.alert("Para cargar una imagen desde la galería, es necesario otorgar permiso para acceder a las imágenes. Por favor, otorgue permiso en la configuración de su dispositivo")
      return response
  }
  const result = await ImagePicker.launchImageLibraryAsync ({
      allowsEditing: true,
      aspect: array
  })
  if (result.cancelled) {
      return response
  }
  response.status = true
  response.image = result.assets[0].uri
  return response
}

// Metodo para capturar imagen desde la camara
export const loadImageFromCamera = async(array) => {
  const response = { status: false, image: null }
  const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
  if (resultPermissions.status === "denied") {
      Alert.alert("Debes dar permiso para acceder a la cámara.")
      return response
  }
  const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: array
  })
  if (result.cancelled) {
      return response
  }
  response.status = true
  response.image = result.assets[0].uri
  return response
}



// export const loadImageFromCamera = async(array) => {
//   const response = { status: false, image: null }
//   const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
//   if (resultPermissions.status === "denied") {
//       Alert.alert("Debes dar permiso para acceder a la cámara.")
//       return response
//   }
//   const result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: array
//   })
//   if (result.cancelled) {
//       return response
//   }
//   response.status = true
//   response.image = result.uri
//   return response
// }

// export const openGalleryAndSaveImage = async () => {
//   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
//   if (status !== 'granted') {
//     throw new Error('No se ha otorgado permiso para acceder a la galería de imágenes');
//   }

//   const result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });

//   if (!result.canceled) {
//     // Guardar imagen en tu aplicación utilizando assets[0].uri
//     console.log('Imagen seleccionada:', result.assets[0].uri);
//   }
// };




//metodo para convertir la imagen en binario
export const fileToBlob = async(path) => {
  const file = await fetch(path)
  const blob = await file.blob()
  return blob
}


  //metodo para obtener la localizacion del user
  export const getCurrentLocation = async () => {
    const response = { status: false, location: null }
    const resultPersissions = await Permissions.askAsync(Permissions.LOCATION) 
  
    if (resultPersissions.status === "denied") {
      Alert.alert("Debes darle permiso a la localización")
      return response
    }
  
    const position = await Location.getCurrentPositionAsync({});
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    }
  
    response.status =  true
    response.location = location
    return response  
  }

