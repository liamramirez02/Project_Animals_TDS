import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { Button, Input, Icon, color, Avatar } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'


export default function Add_mascotas_form({toastref, setloading, navigation}) {
  

  const [FData, setFData] = useState(defaultFormValues())
  const [errorName, sEterrorName] = useState(null)
  const [errorDescription, setErrorDescription] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorDireccion, seterrorDireccion] = useState(null)
  const [errorPhone, seterrorPhone] = useState(null)
  const [seleccionImagenes, setSeleccionImagenes] = useState([]);

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
      />
      <UploadImage
        toastref={toastref}
        SeleccionImagenes={seleccionImagenes}
        setSeleccionImagenes={setSeleccionImagenes}/>
      <Button
        title={"Salvar Mascota"}
        onPress={add_mascotas}
        buttonStyle={styles.btnmascotas}
      />
    </View>
  )
}


function UploadImage({toastref,seleccionImagenes,setSeleccionImagenes}){

  return (
    <ScrollView 
      horizontal
      style = {styles.imagenes}

    >

      {
        size(seleccionImagenes) < 10 && ( //muestra el icnoco de imagenes si son menores que 10
         
          <Icon
          type='material-community'
          name='camera'
          color='#7a7a7a'
          containerStyle={styles.containerIcon}
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

function Form_add({FData,setFData,errorName,errorDescription,errorDireccion,errorPhone,errorEmail}){
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