import { StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import firebase from 'firebase/firestore'

import UserGuest from './Invitado'
import UserLogged from './Sesion_Iniciada'

export default function Account() 
{
  const [login, setlogin] = useState(null)

  firebase.auth().onAuthStateChanged((user) => {
      user !== null ? (setlogin(false)) : setlogin(true)
  })

  if (login == null)
  {
    return <text>Cargando...</text>
  }

  return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})