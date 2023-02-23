import React, {useState, useEffect, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getCurrentUser, isUserLogged } from '../../utilidades/actions';
import   firebase from 'firebase';
import UsuarioInvitado from './UsuarioInvitado';
import User_logged from './User_logged';
import Loading from '../../Componentes/Loading';
import {useFocusEffect} from '@react-navigation/native'



export default function Account ()  {
    const [login, setLogin] = useState(null)

    useFocusEffect( 
        useCallback(()=> {   //cada que cargue esta pantalla, se ejecutara el metodo seLogin, y chequeara si el usuarioe sta logueado
            const user = getCurrentUser()
            user ? setLogin(true): setLogin(false)
        }, [])
    )

    if(login == null) {  
        return <Loading isVisible={true} text="Cargando..."/>
  }

    return login ? <User_logged/> : <UsuarioInvitado/>
}


const styles = StyleSheet.create({})