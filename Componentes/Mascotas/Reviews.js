import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import firebase from 'firebase/app';
import { Button } from 'react-native-elements';

export default function Reviews({navigation, idMascota}) {

    const [userLogged, SetuserLogged] = useState(false)

    firebase.auth().onAuthStateChanged((user) => {
        user ? SetuserLogged(true) : SetuserLogged(false)
    })
    
    return (
    <View>

        {
                                            //si hay log del usuario o no
        userLogged ? (
            <Button
                buttonStyle={styles.btncomentario}
                title={"Escribe un comentario"}
                titleStyle={styles.btntittlecomentario}
                onPress={() => navigation.navigate("addreview", {idMascota})}
                icon={{
                    type: "material-community",
                    name: "square-edit-outline",
                    color: "#a376c7"
                }}/>
        ): (
            <Text
            style={styles.mustLoginText}
            onPress={() => navigation.navigate("login")}
        >
            Para escribir un comentario es necesario estar logueado.{" "}
            <Text style={styles.loginText}>
                Pulsa AQUÍ para iniciar sesión.
            </Text>
        </Text>
        )
        
        }


    </View>
  )
}

const styles = StyleSheet.create({
    btncomentario: {
        backgroundColor: "transparent"
    },
    btntittlecomentario: {
        color: "#a376c7"
    },
    mustLoginText: {
        textAlign: "center", 
        color: "#a376c7", 
        padding: 20
    },
    loginText : {
        fontWeight: "bold"
    },
})