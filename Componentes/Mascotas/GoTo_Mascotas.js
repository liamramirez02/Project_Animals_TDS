import { Alert, Dimensions, StyleSheet, Text, ScrollView, View } from 'react-native'
import React, {useState, useEffect,useCallback,useRef} from 'react'
import { ViewPropTypes } from 'deprecated-react-native-prop-types'
import { firebaseApp } from "../../utilidades/firebase"
import firebase from "firebase/app"
import "firebase/firestore"
import { getCurrentUser, getDocumentById, removeFavorites } from '../../utilidades/actions'
import Loading from '../Loading'
import CarouselImages from '../Carousel'
import { formatPhone } from '../../utilidades/helpers'
import MapaMascota from './MapaMascota'
import { map } from 'lodash'
import { ListItem, Icon } from 'react-native-elements'
import Reviews from './Reviews'
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-easy-toast'
import { addDocumentWithoutId, getFavorite } from './../../utilidades/actions';


const widthScreen = Dimensions.get("window").width
const db = firebase.firestore(firebaseApp)

export default function GoTo_Mascotas({navigation, route}) {
  const {id, name } = route.params
  const [mascota, setMascota] = useState(null) 
  const [activySlide, setActiveSlide] = useState(0)
  const [userLogged, setUserLogged] = useState(false)
  const [currentUser, setcurrentUser] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [loadingText, setLoadingText] = useState(null)
  const [loading, setLoading] = useState(false)

  const toastRef = useRef()


  navigation.setOptions({title: name })

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false)
    setcurrentUser(user)
})

  //Ir a los datos de las mascota al momento de seleccionar unas de la publicada
  useFocusEffect(
  useCallback(() => {
    (async() => {
      const response = await getDocumentById("mascotas", id)
      if(response.statusResponse) {
        setMascota(response.document)
      }else {
        setMascota({})
        Alert.alert("Ha sucedido un error cargando la mascota, Intentelo más tarde!")
      }
    })()
  }, [])
  )

  //obtener favoritos del usuario
  useEffect(() => {
    (async() => {
        if (userLogged && mascota) {
            const response = await getFavorite(mascota.id)
            response.statusResponse && setIsFavorite(response.isFavorite)
        }
    })()
}, [userLogged, mascota])

  if(!mascota){
    return <Loading isVisible={true} text="Cargando Mascotas!"/>
  }
  


  const addFavorite = async() => {
    if (!userLogged) {
        toastRef.current.show("Para agregar a favoritos tienes que estar logueado.", 3000)
        return
    }

    setLoadingText("Agregando a favoritos...")
    setLoading(true)
    const response = await addDocumentWithoutId("favoritos", {
        idUser: getCurrentUser().uid,
        idMascota: mascota.id            
    })
    setLoading(false)

    if (response.statusResponse) {
        setIsFavorite(true)
        toastRef.current.show("Mascota añadida a favoritos.", 3000)
    } else {
        toastRef.current.show("No se pudo agregar la mascota a favoritos.", 3000)
    }
}

const removeFavorite = async () => {
  setLoadingText("Eliminando de favoritos...")
  setLoading(true)
  const response = await removeFavorites(mascota.id)
  setLoading(false)

  if (response.statusResponse) {
      setIsFavorite(false)
      toastRef.current.show("Mascota eliminada de favoritos.", 3000)
  } else {
      toastRef.current.show("No se pudo eliminar la mascota de favoritos.", 3000)
  }
}

  //Mostrar Informacion de la Mascota publicada al momento de entrar
  return (
    <ScrollView style={styles.viewBody}>
       <View style={styles.viewFavorite}>
                <Icon
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline"} 
                    onPress={ isFavorite ? removeFavorite : addFavorite }
                    color={ isFavorite ? "#f00" : "#ff0000" }
                    size={35}
                    underlayColor="transparent"
                />
            </View>
      <CarouselImages
        images={mascota.images}
        height={230}
        width={widthScreen}
        activySlide={activySlide}
        setActiveSlide={setActiveSlide} 
      />
    <TitleMascota
        name={mascota.name}
        description={mascota.description}
    />
    <MascotaInfo
        name={mascota.name}
        location={mascota.location}
        address={mascota.address}
        email={mascota.email}
        phone={formatPhone(mascota.phone)}
    />
    <Reviews
      navigation={navigation}
      idMascota={mascota.id}/>
    
    <Toast ref={toastRef} position="center" opacity={0.9} />
    <Loading isVisible={loading} text={loadingText}/>
    </ScrollView>
  )
}

function MascotaInfo({ name, location, address, email, phone }){
    const listInfo = [
        { text: address, iconName: "map-marker" },
        { text: phone, iconName: "phone" },
        { text: email, iconName: "at" }
    ]

    return (
      <View style={styles.viewMascotaInfo}>
          <Text style={styles.MascotaInfoTitle}>
            Informacion sobre la Mascota
          </Text>
          <MapaMascota
              location={location}
              name={name}
              height={150}  
          />
          {
              map(listInfo, (item, index) => (
                  <ListItem
                      key={index}
                      style={styles.containerListItem}
                  >
                      <Icon
                          type="material-community"
                          name={item.iconName}
                          color="#442484"
                      />
                      <ListItem.Content>
                          <ListItem.Title>{item.text}</ListItem.Title>
                      </ListItem.Content>
                  </ListItem>
              ))
          }
      </View>
    )
}

function TitleMascota({ name, description }){
    return(
      <View style={styles.viewMascotaTitle}>
        <View style={styles.viewMascotaContainer}>
        <Text style={styles.nameMascota}>{name}</Text>
        </View>
        <Text style={styles.descriptionMascota}>{description}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor:"#fff"
  },
  viewMascotaTitle:{
    padding: 15,
  },
  viewMascotaContainer:{
    flexDirection: "row"
  },
  descriptionMascota:{
    marginTop: 5,
    color: "gray",
    textAlign: 'justify'
  },
  nameMascota:{
    fontWeight: "bold"
  },
  viewMascotaInfo:{
    margin: 15,
    marginTop: 25
  },
  MascotaInfoTitle:{
    fontSize: 20,
    fontWeight: "bold"
  },
  containerListItem:{
    borderBottomColor: "#a376c7",
    borderBottomWidth: 1
  },
  viewFavorite: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "transparent",
    borderBottomLeftRadius: 100,
    padding: 5,
    paddingLeft: 15
},
})