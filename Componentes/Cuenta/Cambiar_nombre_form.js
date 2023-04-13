import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { isEmpty } from 'lodash';
import { actualizarPerfil, updateProfile } from './../../utilidades/actions';

export default function Cambiar_nombre_form({displayName, setShowModal, toastRef, setReloadUser}) {

    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false) //false para que no empiece cargando a la hora de ejecutar
    
    const onSubmit = async () => {
        if (!validateForm()) { 
            return
        }

        setLoading(true)
        const resultado = await updateProfile({ displayName: newDisplayName}) //actualiza el nombre
        setLoading(false)

        if (!resultado.statusResponse) { //si no hubo respuesta muestra el error
            setError("Hubo un Error al intentar modificar el usuario.")
            return;
        }

        setReloadUser(true)
        toastRef.current.show("Datos modificados corecctamente.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setError(null)
        
        if(isEmpty(newDisplayName)) {
            setError("Debes de ingresar nombres y apellidos.") //si se encuentra el campo vacio
            return false
        }
        
        if(displayName === newDisplayName) {
            setError("Debes de ingresar nombres y apellidos diferentes a los actuales.") //si los nombres y apellidos son iguales
            return false
        }

        return true
    }

  return (
    <View style={styles.view}>
    <Input
        placeholder="Ingresa tus Nombres y Apellidos"
        containerStyle={styles.input}
        defaultValue={displayName}
        rightIcon={{
            type: "material-community",
            name: "account-circle-outline",
            color: "#c2c2c2"
        }}
        onChange={e => setNewDisplayName(e.nativeEvent.text)} //para obtener lo que el usario digita
        errorMessage={error}
    />
    <Button
        title="Cambiar Nombres y Apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={{ ...styles.btn, backgroundColor: "green" }}
        onPress={onSubmit}
        loading={loading}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10,
      },
      input: {
        width: "90%",
        marginBottom: 10,
      },
      icon: {
        color: "#c2c2c2",
      },
      btnContainer: {
        width: "90%",
        marginTop: 20,
      },
    btn: {
        backgroundColor: "#21000f",
        borderRadius:15
    }
})