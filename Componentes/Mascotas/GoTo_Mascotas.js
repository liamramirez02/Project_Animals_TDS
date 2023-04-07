import { Alert, Dimensions, StyleSheet, Text, ScrollView, View } from 'react-native'
import React, {useState, useEffect} from 'react'

import { ViewPropTypes } from 'deprecated-react-native-prop-types'

import { getDocumentById } from '../../utilidades/actions'
import Loading from '../Loading'
import CarouselImages from '../Carousel'
import { formatPhone } from '../../utilidades/helpers'
import MapaMascota from './MapaMascota'
import { map } from 'lodash'
import { ListItem, Icon } from 'react-native-elements'
import Reviews from './Reviews'

const widthScreen = Dimensions.get("window").width

export default function GoTo_Mascotas({navigation, route}) {
  const {id, name } = route.params
  const [mascota, setMascota] = useState(null) 
  const [activySlide, setActiveSlide] = useState(0)

  navigation.setOptions({title: name })

  //Ir a los datos de las mascota al momento de seleccionar unas de la publicada
  useEffect(() => {
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
  
  if(!mascota){
    return <Loading isVisible={true} text="Cargando Mascotas!"/>
  }
  
  //Mostrar Informacion de la Mascota publicada al momento de entrar
  return (
    <ScrollView style={styles.viewBody}>
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
  }
})