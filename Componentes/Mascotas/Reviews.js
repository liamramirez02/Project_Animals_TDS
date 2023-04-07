import { StyleSheet, Text, View,ActivityIndicator  } from 'react-native'
import React, {useState,useEffect,useCallback} from 'react'
import firebase from 'firebase/app';
import { Button, Avatar } from 'react-native-elements';
import moment from 'moment/min/moment-with-locales'
import { getMascotasReviews } from '../../utilidades/actions';
import { size, map } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';

moment.locale("es")

export default function Reviews({navigation, idMascota}) {

    const [userLogged, SetuserLogged] = useState(false)
    const [reviews, setReviews] = useState([])

    firebase.auth().onAuthStateChanged((user) => {
        user ? SetuserLogged(true) : SetuserLogged(false)
    })
    
    useFocusEffect(
        useCallback(() => {
        (async() => {
            const response = await getMascotasReviews(idMascota)
            if (response.statusResponse) {
                setReviews(response.reviews)
            }
        })()
    }, [])
    )

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
        {
                size(reviews) > 0 && ( //si el size es mayor a 0 entonces pinta las  reviews
                    map(reviews, (reviewDocument) => (
                        <Review reviewDocument={reviewDocument}/>
                    ))
                )
        }

    </View>
  )
}

function Review({reviewDocument}) {
   
    const { title, review, createAt, avatarUser } = reviewDocument
    const createReview = new Date(createAt.seconds * 1000)    //obtener fecha de creacion de la review

    return(
        <View style={styles.viewReview}>
            <View style={styles.imagenAvatar}>
                <Avatar
                    renderPlaceholderContent={<ActivityIndicator color="#fff"/>}
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={
                        avatarUser
                        ? { uri: avatarUser}
                        : require("../../assets/no-image.png")
                    }
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Text style={styles.reviewDate}>{moment(createReview).format('LLL')}</Text>
            </View>
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
    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    imagenAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "gray",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
})