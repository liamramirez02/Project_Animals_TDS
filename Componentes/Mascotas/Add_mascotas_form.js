import { StyleSheet, Text, View, ScrollView,Alert,Dimensions} from 'react-native'
import React, {useState, useEffect} from 'react'
import { Button, Input, Icon, color, Avatar,Image } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import { loadImageFromGallery,cargarimagegallery,getCurrentLocation,loadImageFromCamera, validateEmail } from '../../utilidades/helpers';
import { openGalleryAndSaveImage, Cameras } from './../../utilidades/helpers';
import MapView from "react-native-maps"
import { Marker } from 'react-native-maps';
import uuid from 'random-uuid-v4';
 
import Modal from '../Modal'
import { getCurrentUser, uploadImage } from '../../utilidades/actions';
import { addDocumentWithoutId } from './../../utilidades/actions';
import { BorderlessButton } from 'react-native-gesture-handler';

const widthScreen = Dimensions.get("window").width; //para obtener las dimensiones de la pantalla

export default function Add_mascotas_form({toastRef, setLoading, navigation}) {
  

  const [FData, setFData] = useState(defaultFormValues())
  const [errorName, setErrorName] = useState(null)
  const [errorDescription, setErrorDescription] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorDireccion, seterrorDireccion] = useState(null)
  const [errorPhone, seterrorPhone] = useState(null)
  const [seleccionImagenes, setSeleccionImagenes] = useState([]);

//localizacion
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationMascota, setLocationMascota] = useState(null);

  const add_mascotas = async() =>{
    if(!validForm()){
        return
    }

    setLoading(true)
    const responseuploadimage = await uploadImages()
    const mascota = {
      name: FData.name,
      address: FData.address,
      description: FData.description,
      phone: `${FData.callingCode}${FData.phone}`,
      location: locationMascota,
      email: FData.email,
      images: responseuploadimage,
      rating: 0,
      ratingTotal: 0,
      quantityVoting: 0,
      createAt: new Date(), //fecha actual 
      createBy: getCurrentUser().uid //id del usuario que creo el reporte de la mascota
    }
    const responseAddDocument = await addDocumentWithoutId("mascotas", mascota)
    setLoading(false)

    if (!responseAddDocument.statusResponse) {
      toastRef.current.show("Error al grabar la mascota, intentelo más tarde", 3000)
      return
    }

    navigation.navigate("mascotas")
  }
  
  const uploadImages = async () => {
    const imagesUrl = []

    await Promise.all(
        map(seleccionImagenes, async(image) => {
            const response = await uploadImage(image, "Mascotas", uuid())
            if (response.statusResponse) {
                imagesUrl.push(response.url)
            }
        })
    )

    return imagesUrl
}


  //Validacion del formulario
 const validForm = () => {
      clearErrors()
      let isValid = true

      if(isEmpty(FData.name)) {
        setErrorName("Debes ingresar la mascota")
        isValid = false
      }

      if(isEmpty(FData.address)) {
        seterrorDireccion("Debes ingresar la direccion donde se encuentra la mascota")
        isValid = false
      }

      if(!validateEmail(FData.email)) {
        setErrorEmail("Debes ingresar un email de contacto validor")
        isValid =  false
      }

      if(isEmpty(FData.phone)){
        seterrorPhone("Debes ingresar un telefono de contacto Valido")
        isValid = false
      }

      if(isEmpty(FData.description)){
        setErrorDescription("Debes ingresar la descripcion")
        isValid = false
      }

      if(!locationMascota){
        toastRef.current.show("Debes de ingresar la localizacion de la mascota en el mapa.", 3000)
        isValid =  false
      }
      else if(size(seleccionImagenes) === 0) {
        toastRef.current.show("Tienes que agregar al menos una imagen del restaurante.", 3000);
        isValid = false
    }

      return isValid
 }
  
  const clearErrors = () =>{
    setErrorName(null)
    setErrorEmail(null)
    seterrorDireccion(null)
    setErrorDescription(null)
    seterrorPhone(null)
  }

  return (
    <ScrollView style={styles.container_view}>
      <ImagenMascota
        imagenMascota={seleccionImagenes[0]}
      />

      <Form_add                                   //pasando estados al form
        FData={FData}
        setFData={setFData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorDireccion={errorDireccion}
        errorPhone={errorPhone}
        errorEmail={errorEmail}
        setIsVisibleMap={setIsVisibleMap}
        locationMascota={locationMascota}
      />
      <UploadImage
        toastRef={toastRef}
        seleccionImagenes={seleccionImagenes}
        setSeleccionImagenes={setSeleccionImagenes}/>
      <Button
        title={"Salvar Mascota"}
        onPress={add_mascotas}
        buttonStyle={styles.btnmascotas}
      />
      <Map_Mascostas 
      isVisibleMap={isVisibleMap} 
      setIsVisibleMap={setIsVisibleMap} 
      locationMascota={locationMascota}
      setLocationMascota={setLocationMascota}
      toastRef={toastRef}/>
    </ScrollView>
  )
}

function ImagenMascota({imagenMascota}) {

  return (
      <View style={styles.vPhoto}>
          <Image
              source={
                imagenMascota
                      ? { uri: imagenMascota }
                      : require("../../assets/no-image.png")
              }
              style={{ width: widthScreen, height: 200 }}
          />
      </View>
  )
}

function UploadImage({toastRef,seleccionImagenes,setSeleccionImagenes}){

  const seleccionImagen = async() => {
      const response = await loadImageFromGallery([4,3])

      if(!response.status){
        toastRef.current.show("No se selecciono ninguna imagen",3000)
        return
      }

      setSeleccionImagenes([...seleccionImagenes,response.image]);


  }


  // const imageSelect = async () => {
  //   const response = await loadImageFromGallery([4, 3])
  //   if (!response.status) {
  //       toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
  //       return
  //   }
  //   setSeleccionImagenes([...seleccionImagenes, response.image]);
// }

const removeImage = (image) => {
  Alert.alert(
      "Eliminar Imagen",
      "¿Estas seguro de eliminar esta imagen?",
      [
          {
              text: "No",
              style: "Cancelar",
          },
          {
              text: "Sí",
              onPress: () => {
                setSeleccionImagenes(
                      filter(seleccionImagenes, (imageUrl) => imageUrl !== image)
                  )
              },
          },
      ],
      { 
        cancelable: false 
      }
  )
}

  return (
    <ScrollView 
      horizontal
      style = {styles.imagenes}

    >

      {
        size(seleccionImagenes) < 10 && ( //solo muestra 10 imagenes, si sobrepasa desaparece el icon
         
          <Icon
          type='material-community'
          name='camera'
          color='#7a7a7a'
          containerStyle={styles.containerIcon}
          onPress={seleccionImagen}
        />

        )
        }
      
      {
      map(seleccionImagenes, (imagenMascota, index) => (
          <Avatar
            key={index}
            style={styles.miniaturaStyle}
            source={{ uri: imagenMascota }}
            onPress={() => removeImage(imagenMascota)} //llamando a la funcion eliminar imagen
          />
         ))
        }
    </ScrollView>
  )
}

function Form_add({
  FData, 
  setFData,
  errorName,
  errorDescription,
  errorDireccion,
  errorPhone,
  errorEmail,
  locationMascota,
  setIsVisibleMap}){
  // const [country, setCountry] = useState("DO")
  // const [callingCode, setCallingcode] = useState("1")
  // const [phone, setphone] = useState("")

  const onChange = (e, type) => {
    setFData({...FData, [type]: e.nativeEvent.text })
    
  }
  
  return(
    <View style={styles.form_view}>
      <Input
        placeholder="Introduzca el nombre de la mascota"
        defaultValue={FData.name}
        onChange={(e) => onChange(e, "name")} 
        errorMessage={errorName}
      />
       <Input
        placeholder="Introduzca su localización actual"
        defaultValue={FData.address}
        onChange={(e) => onChange(e, "address")}
        errorMessage={errorDireccion}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationMascota ? "#442484" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
       <Input
        placeholder="Introduzca su Correo Electronico"
        keyboardType="email-address"
        defaultValue={FData.email}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errorEmail}
      />
      <View style={styles.view_phone}>

        <CountryPicker
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          containerStyle={styles.countryPicker}
          countryCode={FData.country}
          onSelect={(country) => {
          setFData({...FData, "country":country.cca2, "callingCode": country.callingCode[0]}) //-------------ACA HAY ERROR-------------
            // setCountry(country.cca2) //cca2: es el codigo internacional del pais de dos caracteres
            // setCallingcode(country.callingCode[0]) //arreglo de los codigos internacionales
          }}
        />

        <Input
        placeholder="Introduzca su Número"
        keyboardType="phone-pad"
        containerStyle={styles.inputWhatsApp}
        defaultValue={FData.phone}
        onChange={(e) => onChange(e, "phone")}
        errorMessage={errorPhone}
      />
      </View>
      <Input
        placeholder="Describa la situación"
        multiline
        containerStyle={styles.textarea}
        defaultValue={FData.description}
        onChange={(e) => onChange(e, "description")}
        errorMessage={errorDescription}
      />
    </View>
  )


}

function Map_Mascostas({isVisibleMap,setIsVisibleMap,setLocationMascota,toastRef}) {
  const[newRegion, setNewRegion] = useState(null) 

  useEffect(() => {
    (async() => {
        const response = await getCurrentLocation() //obtiene la localizacion
        if (response.status) {
          setNewRegion(response.location)
          // console.log(response.location)
        }
    })()
}, [])

    const confirmLocation = () => {
    setLocationMascota(newRegion); //Muestra mensaje de localizacion guardada!
    toastRef.current.show("Localizacion guardada correctamente", 3000);
    setIsVisibleMap(false);
    }

  return (
  
    <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}> 
          <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region)=> setNewRegion(region)}
                            // onRegionChange={(region) => setLocation(region)}
                        >
                        <Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude,
                                }}
                                icon={require('../../assets/marker3.png')}
                                draggable
                            /> 
                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View> 
       
    </Modal>
)
}

const defaultFormValues = () => { //devolvera los valores por defecto del formulario
  return { 
      name: "", 
      description: "", 
      email:"",
      phone: "", 
      address: "", 
      country: "DO",
      callingCode: "1" 
  }
}


const styles = StyleSheet.create({
  container_view: {
    height: "90%"
},
form_view: {
    marginHorizontal: 10,
},
textarea: {
    height: 70,
    width: "100%",
},
view_phone: {
  width:"80%",
  flexDirection:"row",
  marginStart:20
},
inputWhatsApp:{
  width:"80%"
},
btnmascotas: {
   margin: 40,
   backgroundColor: "#21000f",
   borderRadius: 15
},
imagenes: {
  flexDirection: "row",
  marginHorizontal: 25,
  marginTop: 20,
  height: 80,
},
containerIcon: {
  alignItems: "center",
  justifyContent: "center",
  marginRight: 10,
  height: 80,
  width: 80,
  backgroundColor: "#e3e3e3",
},
miniaturaStyle: {
  width: 70,
  height: 70,
  marginRight: 10,
},
mapStyle: {
  width: "100%",
  height: 550,
},
viewMapBtn: {
  flexDirection: "row",
  justifyContent: "center",
  marginTop: 10,
},
vPhoto: {
  alignItems: "center",
  height: 200,
  marginBottom: 20,
},
viewMapBtnContainerCancel: {
  paddingLeft: 5,
},
viewMapBtnCancel: {
  backgroundColor: "#a65273",
},
viewMapBtnContainerSave: {
  paddingRight: 5,
},
viewMapBtnSave: {
  backgroundColor: "#442484",
},
})