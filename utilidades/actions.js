//conexion a base de datos
import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'
// other services is needed

const db = firebase.firestore(firebaseApp) //acceso a base de datos

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
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

export const uploadImage = async (image, path, name) => {
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

export const updateProfile = async (data) => { //actualizar perfil
    const result = { statusResponse: false, error: null }
 
    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false    
        result.error = error    
    }

    return result
}

export const reauthenticate = async(password) => {  //reautenticacion de usuario
    const result = { statusResponse: false, error: null }
    const user = getCurrentUser()    
    const credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
    )

    try {
        await user.reauthenticateWithCredential(credentials)
        result.statusResponse = true
    } catch (error) {
        result.error = error
    }

    return result
}

export const updateEmail = async (email) => {  //actualizar email
    const result = { statusResponse: false, error: null }
 
    try {
        await firebase.auth().currentUser.updateEmail(email)
        result.statusResponse = true    
    } catch (error) {
        result.error = error    
    }

    return result
}

export const updatePassword = async (password) => { //actualizar contra
    const result = { statusResponse: false, error: null }
 
    try {
        await firebase.auth().currentUser.updatePassword(password)
        result.statusResponse = true    
    } catch (error) {
        result.error = error    
    }

    return result
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        console.log(error)
        result.statusResponse = false
        result.error = error
    }
    return result     
}