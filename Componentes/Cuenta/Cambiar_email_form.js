import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button,Icon } from 'react-native-elements'
import { isEmpty } from 'lodash';
import { reauthenticate, updateEmail } from './../../utilidades/actions';
import { validateEmail } from './../../utilidades/helpers';

export default function Cambiar_email_form({email, setShowModal, toastRef, setReloadUser}) {

    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [mostrar_passw, setMostrar_passw] = useState(false)
    const [errorP, setErrorPassword] = useState(null)
    const [errorEmail, seterrorEmail] = useState(null)
    const [loading, setLoading] = useState(false) //false para que no empiece cargando a la hora de ejecutar
    
    const onSubmit = async () => {
        if (!validateForm()) { 
            return
        }

        setLoading(true)
        const resultado_reautenticacion = await reauthenticate(password)
        if (!resultado_reautenticacion.statusResponse) {
            setLoading(false)        
            setErrorPassword("Contraseña incorrecta.")
            return
        }

        const resultadoActualizarEmail = await updateEmail(newEmail)
        setLoading(false)        

        if (!resultadoActualizarEmail.statusResponse) {
            seterrorEmail("El correo ingresado se encuntra en uso.")
            return
        }

        setReloadUser(true)
        toastRef.current.show("Email Actualizado.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        seterrorEmail(null)
        setErrorPassword(null)

        let isValid = true
        
        if(!validateEmail(newEmail)) {
            seterrorEmail("Ingresa un email válido.")
            isValid = false
        }
        
        if(email === newEmail) {
            seterrorEmail("Ingresa un email diferente al actual.")
            isValid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("Ingresa tu contraseña")
            isValid = false
        }

        return isValid
    }

  return (
    <View style={styles.view}>
    <Input
        placeholder="Ingresa un nuevo email"
        containerStyle={styles.input}
        defaultValue={email}
        rightIcon={{
            type: "material-community",
            name: "at",
            color: "#c2c2c2"
        }}
        onChange={e => setNewEmail(e.nativeEvent.text)} //para obtener lo que el usario digita
        errorMessage={errorEmail}
    />
     <Input
                placeholder="Ingresa tu contraseña"
                containerStyle={styles.input}
                password={true}
                secureTextEntry={!mostrar_passw}
                onChange={e => setPassword(e.nativeEvent.text)}
                defaultValue={password}
                errorMessage={errorP}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ mostrar_passw ? "eye-off-outline": "eye-outline" }
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setMostrar_passw(!mostrar_passw)}
                    />
                }
            />
    <Button
        title="Cambiar Email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={loading}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 5
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#21000f",
        borderRadius:10,
    }
})