//conexion a base de datos
import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'
// other services is needed

const db = firebase.firestore(firebaseApp)  //acceso a base de datos

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user != null && (isLogged = true)
    })

    return isLogged
}

export const getCurrentUser = () => {   //Devuelve el usuario que esta log en el sistema
    return firebase.auth().currentUser
}

export const CloseSession = () => {   //Cierra la sesion usuario que esta log en el sistema
    return firebase.auth().signOut()
}

export const registerUser = async(email, password) => {
    const R = { statusResponse: true, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        R.statusResponse = false
        R.error = "Este correo ya esta registrado."
    }
    return R
}

export const loginEmailandPass = async(email, password) => {
    const R = { statusResponse: false, error: null }
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        R.statusResponse = true
    } catch (error) {
        R.error = "El usuario o Contraseña no son validos"
    }
    return R
}

export const subirImagen = async (image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name) //almacena la ruta de la imagen en el firebase
    const blob = await fileToBlob(image) //convertir a binario
    await ref.put(blob) //sube la imagen

    try {
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL() //obtener la ruta de la imagen ya almacenada
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error    
    }

    return result
}

export const actualizarPerfil = async (data) => {
    const result = { statusResponse: false, error: null }
 
    try {
        await firebase.auth().currentUser.actualizarPerfil(data)
        result.statusResponse = true    
    } catch (error) {
        result.error = error    
    }

    return result
}