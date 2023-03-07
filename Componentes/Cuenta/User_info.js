import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {useState}from 'react'
import { Avatar } from 'react-native-elements'
import { cargarimagegallery } from '../../utilidades/helpers'
import { subirImagen } from '../../utilidades/actions'
import { actualizarPerfil } from './../../utilidades/actions';

export default function user_info({user,setLoading, setLoadingtext}) { //recibe el usuario

    const [photoURL, setphotoURL] = useState(user.photoURL)

    const cambiarimagen = async () => {
        const result = await cargarimagegallery([1, 1])
        if (!result.status) {
            return 
        }
        setLoadingtext("Actualizando Imagen...")
        setLoading(true)
        const resultado_subirImagen = await subirImagen(result.image,"Perfiles", user.uid)
        
        if (!resultado_subirImagen.statusResponse){
            setLoading(false)
            Alert.alert("Ha ocurrido un error en la subida de la Imagen")
            return 
        }

        const resultado_actualizarImagen = await actualizarPerfil({ photoURL: resultado_subirImagen.url})
        setLoading(false)
        if(resultado_actualizarImagen.statusResponse){
            setphotoURL(resultado_subirImagen.url)
        }else{
            Alert.alert("Ha ocurrido un error en la actualizacion de la Imagen")
        }
    }

        return (
    <View style={styles.viewUserInfo}>
      <Avatar
       rounded
       size="large"
    //    containerStyle={styles.userAvatar}
       onPress={cambiarimagen}
       source={
           photoURL 
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

