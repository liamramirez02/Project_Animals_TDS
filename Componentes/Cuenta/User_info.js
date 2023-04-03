import { Alert, StyleSheet, Text, View } from 'react-native'
import React, {useState}from 'react'
import { Avatar } from 'react-native-elements'
import { cargarimagegallery,loadImageFromCamera,loadImageFromGallery } from '../../utilidades/helpers'
import { subirImagen,uploadImage } from '../../utilidades/actions'
import { actualizarPerfi,updateProfile } from './../../utilidades/actions';

export default function user_info({user,setLoading, setLoadingtext}) { //recibe el usuario

    
    const [photoURL, setphotoURL] = useState(user.photoURL)

    // const cambiarimagen = async () => {
    //     const result = await cargarimagegallery([1, 1])
    //     if (!result.status) {
    //         return 
    //     }
    //     setLoadingtext("Actualizando Imagen...")
    //     setLoading(true)
    //     const resultado_subirImagen = await subirImagen(result.image,"Perfiles", user.uid)
        
    //     if (!resultado_subirImagen.statusResponse){
    //         setLoading(false)
    //         Alert.alert("Ha ocurrido un error en la subida de la Imagen")
    //         return 
    //     }

    //     const resultado_actualizarImagen = await actualizarPerfil({ photoURL: resultado_subirImagen.url})
    //     setLoading(false)
    //     setphotoURL(resultado_subirImagen.url)

    // }

    const changePhotoFromGallery = async() => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.status) {
            return
        }
        setLoadingtext("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "Perfiles", user.uid)
        if (!resultUploadImage.statusResponse) {
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        }
        const resultUpdateProfie = await updateProfile({ photoURL: resultUploadImage.url })
        setLoading(false)
            setphotoURL(resultUploadImage.url)
    }

    const changePhotoFromCamera = async() => {
        const result = await loadImageFromCamera([1, 1])
        if (!result.status) {
            return
        }
        setLoadingtext("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "Perfiles", user.uid)
        if (!resultUploadImage.statusResponse) {
            setLoading(false)
            Alert.alert("Ha ocurrido un error al almacenar la foto de perfil.")
            return
        }
        const resultUpdateProfie = await updateProfile({ photoURL: resultUploadImage.url })
        setLoading(false)
            setphotoURL(resultUploadImage.url)
    }

    function PhotoSource() {
        Alert.alert(  
        'Elija una opción',  
        'De dónde quiere obtener la imagen?',  
        [  
            {text: 'Cancelar', onPress: () => null},  
            {  
                text: 'Cámara',  
                onPress: changePhotoFromCamera  
            },  
            {
                text: 'Galería',
                onPress: changePhotoFromGallery
            },  
        ],  
        {cancelable: false}  
        )  
    }

        return (
    <View style={styles.viewUserInfo}>
      <Avatar
       rounded
       size="large"
    //    containerStyle={styles.userAvatar}
       onPress={PhotoSource}
       source={
           photoURL 
           ? { uri: photoURL }               //si el user tiene foto usara la url que el usuario le indique
           : require("../../assets/logo_v2.jpg") // de lo contrario mostrara una imagen por default
       }
      />
      <View style={styles.user_info}>
        <Text style={styles.displayName}>
            { 
                user.displayName ? user.displayName : "Anonimo"    // si el usuario tiene nombre devuelve el nombre de lo contrario devuelve "Anonimo"
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
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})

