import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getCurrentUser } from '../../utilidades/actions';
import   firebase from 'firebase';
import UsuarioInvitado from './UsuarioInvitado';
import User_logged from './User_logged';
import Loading from '../../Componentes/Loading';



export default function Account ()  {
    const [login, setLogin] = useState(null)

    useEffect(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])


    if(login == null) {  
        return <Loading isVisible={true} text="Cargando..."/>
  }

    return login ? <User_logged/> : <UsuarioInvitado/>
}


const styles = StyleSheet.create({})