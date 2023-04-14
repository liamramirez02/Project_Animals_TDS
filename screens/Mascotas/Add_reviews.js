import { StyleSheet, Text, View,  Dimensions,Image} from 'react-native'
import React,{ useState, useRef } from 'react'
import Toast from 'react-native-easy-toast'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import Loading from './../../Componentes/Loading';
import { isEmpty } from 'lodash';
import { getCurrentUser, getDocumentById } from '../../utilidades/actions';
import { addDocumentWithoutId } from './../../utilidades/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Add_reviews({navigation, route}) {

  const {idMascota} = route.params

  const toastRef = useRef()

  const [rating, setRating] = useState(null)
  const [title, setTitle] = useState("")
  const [errorTitle, setErrorTitle] = useState(null)
  const [review, setReview] = useState("")
  const [errorReview, setErrorReview] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const addReview = async() => {
    // console.log("Si imprime we")
    if (!validacionForm()) {
        return
    }

    setIsLoading(true)
    const user = getCurrentUser()

    const data = {
        idUser: user.uid,
        avatarUser: user.photoURL,
        idMascota,
        title,
        review,
        createAt: new Date()
    }

    const responseAddReview = await addDocumentWithoutId("reviews", data)
    if (!responseAddReview.statusResponse) {  //si no hubo coleccion
        setIsLoading(false)
        toastRef.current.show("Error al enviar el comentario, intenta más tarde.", 3000)
        return
    }

    const responseGetMascota = await getDocumentById("mascotas", idMascota)
    if (!responseGetMascota.statusResponse) {
        setIsLoading(false)
        toastRef.current.show("Ha ocurrido un error, intenta más tarde.", 3000)
        return
    }
                                                              //ENVIAR RATING O LIKE DE LA MASCOTA 
    // const mascota = responseGetRestaurant.document
    // const ratingTotal = mascota.ratingTotal + rating
    // const quantityVoting = mascota.quantityVoting + 1
    // const ratingResult = ratingTotal / quantityVoting
    // const responseUpdateMascota = await updateRecord("mascotas", idmascota, {
    //     ratingTotal,
    //     quantityVoting,
    //     rating: ratingResult
    // })

    // setIsLoading(false)
    // if (!responseUpdateRestaurant.statusResponse) {
    //     toastRef.current.show("Error al actualizar la mascota, intenta más tarde.", 3000)
    //     return
    // }

    navigation.goBack()
}

const validacionForm = () => {
  setErrorTitle(null)
  setErrorReview(null)

  let isValid = true

  // if(!rating) {
  //     toastRef.current.show("Debes darle una puntuación al restaurante.", 3000)
  //     isValid = false
  // }

  if (isEmpty(title)) {
      setErrorTitle("Debes ingresar un titulo.")
      isValid = false
  }

  if (isEmpty(review)) {
      setErrorReview("Debes ingresar una descripción.")
      isValid = false
  }

  return isValid
}


  return (
    <KeyboardAwareScrollView style={styles.viewBody}>
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../../assets/descarga.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>
    <View style={styles.formReview}>
    <Input
        style={[styles.inputField]}
        placeholder="Título..."
        containerStyle={styles.input}
        onChange={(e) => setTitle(e.nativeEvent.text)}
        errorMessage={errorTitle}
    />
    <Input
        style={[styles.inputField]}
        placeholder="Comentario..."
        containerStyle={styles.input}
        multiline={true}
        onChange={(e) => setReview(e.nativeEvent.text)}
        errorMessage={errorReview}
    />
    <Button
        title="Enviar Comentario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={addReview}
    />
</View>
<Toast ref={toastRef} position="center" opacity={0.9}/>
<Loading isVisible={isLoading} text="Enviando comentario..."/>
</KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
  viewBody: {
    flex: 1
},
formReview: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
input: {
  marginBottom: -90
},
inputField: {
  backgroundColor: '#ffffff',
  borderWidth: 2,
  borderColor: '#0aabba',
  borderRadius: 5,
  padding: 15,
  marginTop: 120,
  
},
textArea: {
  height: 150,
  width: "100%",
  padding: 0,
  margin: 0
},
btnContainer: {
  flex: 1,
  justifyContent: "flex-end",
  marginTop: 20,
  marginBottom: 10,
  width: "95%",
  width: "80%",
},
btn: {
  borderRadius: 15,
  backgroundColor: "#0aabba",
  marginBottom: 280,
},
backgroundImage: {
  width: screenWidth,
  height: screenHeight,
},
  content: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 0,
  borderRadius: 10,
},
overlay: {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  opacity: 0.5,
},
})