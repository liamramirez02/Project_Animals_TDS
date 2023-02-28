import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'
import { cargarimagegallery } from '../../utilidades/helpers'

export default function user_info({user}) { //recibe el usuario

    const cambiarimagen = async () => {
        const result = await cargarimagegallery([1, 1])
        console.log(result)
        // if (!result.status) {
        //     return
        }

        return (
    <View style={styles.viewUserInfo}>
      <Avatar
       rounded
       size="large"
    //    containerStyle={styles.userAvatar}
       onPress={cambiarimagen}
       source={
           user.photoURL 
           ? { uri: photoURL }               //si el user tiene foto usara la url que el usuario le indique
           : require("../../assets/logo_v2.jpg") // de lo contrario mostrara una imagen por default
       }
      />
      <View style={styles.user_info}>
        <Text style={styles.display_name}>
            {
                user.diplayName ? user.displayName : "Anonimo"    // si el usuario tiene nombre devuelve el nombre de lo contrario devuelve "Anonimo"
            }
        </Text>
        <Text>
            {
                user.email
            }
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    viewUserInfo: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30,
    },
    user_info: {
        marginLeft: 20
    },
    display_name: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})

