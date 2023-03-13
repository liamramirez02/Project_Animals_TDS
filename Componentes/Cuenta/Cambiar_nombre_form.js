import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Input, Button } from 'react-native-elements'

export default function Cambiar_nombre_form(displayName, setShowModal, toastRef ) {
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
        // onChange={e => setNewDisplayName(e.nativeEvent.text)}
        // errorMessage={error}
    />
    <Button
        title="Cambiar Nombres y Apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        // onPress={onSubmit}
        // loading={loading}
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
        backgroundColor: "#442484"
    }
})