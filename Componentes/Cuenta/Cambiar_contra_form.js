import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button,Icon } from 'react-native-elements'
import { isEmpty, size } from 'lodash';
import { reauthenticate, updateEmail, updatePassword } from './../../utilidades/actions';

export default function Cambiar_contra_form({setShowModal, toastRef}) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentpassword, setcurrentpassword] = useState(null)
    const [confirmpass, setconfirmpass] = useState(null)
    const [mostrar_passw, setMostrar_passw] = useState(false)
    const [errorcurrentpassword, setErrorcurrentpassword] = useState(null)
    const [errorconfirmpass, setErrorconfirmpass] = useState(null)
    const [errornewPassword, seterrornewPassword] = useState(null)
    const [loading, setLoading] = useState(false) //false para que no empiece cargando a la hora de ejecutar
    
    const onSubmit = async () => {
        if (!validateForm()) { 
            return
        }

        setLoading(true)
        const resultado_reautenticacion = await reauthenticate(currentpassword)
        if (!resultado_reautenticacion.statusResponse) {
            setLoading(false)        
            setErrorcurrentpassword("Contraseña incorrecta.")
            return
        }

        const resultadoActualizarPass = await updatePassword(newPassword)
        setLoading(false)        

        if (!resultadoActualizarPass.statusResponse) {
            seterrornewPassword("Error al Cambiar la contraseña.")
            return
        }

        toastRef.current.show("Contraseña actualizada.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        seterrornewPassword(null)
        setErrorcurrentpassword(null)
        setErrorconfirmpass(null)

        let isValid = true
        
        if(size(currentpassword) < 6) {
            setErrorcurrentpassword("Debes de ingresar una contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(size(newPassword) < 6) {
            seterrornewPassword("Debes de ingresar una nueva contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(size(confirmpass) < 6) {
            setErrorconfirmpass("Debes de ingresar una confirmación de al menos 6 carácteres.")
            isValid = false
        }

        if(newPassword !== confirmpass) {
            seterrornewPassword("La nueva contraseña y la confirmación, no son iguales.")
            setErrorconfirmpass("La nueva contraseña y la confirmación, no son iguales.")
            isValid = false
        }

        if(newPassword === currentpassword) {
            seterrornewPassword("Debes ingresar una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid
    }

  return (
    <View style={styles.view}>
    <Input
        placeholder="Ingresa tu contraseña actual:"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!mostrar_passw}
        onChange={e => setcurrentpassword(e.nativeEvent.text)}
        defaultValue={currentpassword}
        errorMessage={errorcurrentpassword}
        rightIcon={
            <Icon
                type="material-community"
                name={ mostrar_passw ? "eye-off-outline": "eye-outline" }
                iconStyle={{ color: "#c2c2c2" }}
                onPress={() => setMostrar_passw(!mostrar_passw)}
            />
        }
    />
    <Input
        placeholder="Ingresa una nueva contraseña:"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!mostrar_passw}
        onChange={e => setNewPassword(e.nativeEvent.text)}
        defaultValue={newPassword}
        errorMessage={errornewPassword}
        rightIcon={
            <Icon
                type="material-community"
                name={ mostrar_passw ? "eye-off-outline": "eye-outline" }
                iconStyle={{ color: "#c2c2c2" }}
                onPress={() => setMostrar_passw(!mostrar_passw)}
            />
        }
    />
    <Input
        placeholder="Ingresa la confirmación para la nueva contraseña..."
        containerStyle={styles.input}
        password={true}
        secureTextEntry={!mostrar_passw}
        onChange={e => setconfirmpass(e.nativeEvent.text)}
        defaultValue={confirmpass}
        errorMessage={errorconfirmpass}
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
        title="Cambiar Contaseña"
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
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#21000f",
        borderRadius: 10
    }
})