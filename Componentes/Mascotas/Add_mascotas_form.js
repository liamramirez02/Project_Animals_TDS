import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { Button, Input, Icon, color, Avatar } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import { cargarimagegallery,loadImageFromCamera } from '../../utilidades/helpers';
import { openGalleryAndSaveImage, Cameras } from './../../utilidades/helpers';

import Modal from '../Modal'


export default function Add_mascotas_form({toastRef, setloading, navigation}) {
  

  const [FData, setFData] = useState(defaultFormValues())
  const [errorName, sEterrorName] = useState(null)
  const [errorDescription, setErrorDescription] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorDireccion, seterrorDireccion] = useState(null)
  const [errorPhone, seterrorPhone] = useState(null)
  const [seleccionImagenes, setSeleccionImagenes] = useState([]);

//localizacion
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationMascota, setLocationMascota] = useState(null);

  const add_mascotas = () =>{
    console.log(FData)
    console.log("esta to jevi")
  }
  
 
  
  return (
    <View style={styles.container_view}>
      <Form_add                                   //pasando estados al form
        FData={FData}
        setFData={setFData}
        errorName={errorName}
        errorDescription={errorDescription}
        errorDireccion={errorDireccion}
        errorPhone={errorPhone}
        errorEmail={errorEmail}
        setIsVisibleMap={setIsVisibleMap}
      />
      <UploadImage
        toastRef={toastRef}
        SeleccionImagenes={seleccionImagenes}
        setSeleccionImagenes={setSeleccionImagenes}/>
      <Button
        title={"Salvar Mascota"}
        onPress={add_mascotas}
        buttonStyle={styles.btnmascotas}
      />
      <Map_Mascostas isVisibleMap={isVisibleMap} 
      setIsVisibleMap={setIsVisibleMap} 
      setLocationMascota={setLocationMascota}
      toastRef={toastRef}/>
    </View>
  )
}
 
function Map_Mascostas({isVisibleMap,setIsVisibleMap,setLocationMascota,toastRef}) {
  
  
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={isVisibleMap}>
        
        <Text>este es el mapa</Text>
       
    </Modal>
)
}


function UploadImage({toastRef,seleccionImagenes,setSeleccionImagenes}){

  const seleccionImagen = async() =>{
      const response = await loadImageFromCamera([4,3])
      if(!response.status){
        toastRef.current.show("No se selecciono ninguna imagen",3000)
        return
      }

      setSeleccionImagenes([...seleccionImagenes,response.image])
  }

  // const imageSelect = async () => {
  //   const response = await loadImageFromGallery([4, 3])
  //   if (!response.status) {
  //       toastRef.current.show("No has seleccionado ninguna imagen.", 3000)
  //       return
  //   }
  //   setSeleccionImagenes([...seleccionImagenes, response.image]);
// }

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
      map(seleccionImagenes, (imagenesmascotas, index) => (
          <Avatar
            key={index}
            style={styles.miniaturaStyle}
            source={{ uri: imagenesmascotas }}
            // onPress={() => removeImage(imagenesmascotas)}
          />
         ))
        }
    </ScrollView>
  )
}

function Form_add({FData,setFData,errorName,errorDescription,errorDireccion,errorPhone,errorEmail,locationMascota,setIsVisibleMap}){
  const [country, setCountry] = useState("DO")
  const [callingCode, setCallingcode] = useState("1")
  const [phone, setphone] = useState("")

  const onChange = (e, type) => {
    setFData({...FData, [type]: e.nativeEvent.text })
    
  }
  
  return(
    <View style={styles.form_view}>
      <Input
        placeholder="Nombre del Animal"
        defaultValue={FData.name}
        onChange={(e) => onChange(e, "name")} 
        errorMessage={errorName}
      />
       <Input
        placeholder="Direccion en donde se encuentra la mascota"
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
        placeholder="Email del Contacto"
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
          countryCode={country}
          onSelect={(country) => {
          setFData = ({...FData, "country":country.cca2, "callingCode": country.callingCode[0]}) //-------------ACA HAY ERROR-------------
            // setCountry(country.cca2) //cca2: es el codigo internacional del pais de dos caracteres
            // setCallingcode(country.callingCode[0]) //arreglo de los codigos internacionales
          }}
        />

        <Input
        placeholder="WhatsApp del Contacto"
        keyboardType="phone-pad"
        containerStyle={styles.inputWhatsApp}
        defaultValue={FData.phone}
        onChange={(e) => onChange(e, "phone")}
        errorMessage={errorPhone}
      />
      </View>
      <Input
        placeholder="Descripcion de la Situacion"
        multiline
        containerStyle={styles.textarea}
        defaultValue={FData.description}
        onChange={(e) => onChange(e, "description")}
        errorMessage={errorDescription}
      />
    </View>
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
    height: 100,
    width: "100%",
},
view_phone: {
  width:"80%",
  flexDirection:"row",
},
inputWhatsApp:{
  width:"80%"

},
btnmascotas: {
   margin: 50,
   backgroundColor: "#442484"
},
imagenes: {
  flexDirection: "row",
  marginHorizontal: 20,
  marginTop: 30,
  height: 150,
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
})