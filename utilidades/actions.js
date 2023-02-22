//conexion a base de datos
import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
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
    return firebase.auth().singOut()
}

export const registerUser = async(email, password) => {
    const R = { statusResponse: true, error: null }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        R.error = "Este correo ya esta registrado."
    }
    return R
}