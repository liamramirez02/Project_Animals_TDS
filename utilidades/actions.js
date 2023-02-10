import { FbApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(FbApp)

export const isUserLogged = () => 
{
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => 
    {
    user !== null && (isLogged = true)
    })
}

return isLogged