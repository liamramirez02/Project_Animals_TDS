import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input } from 'react-native-elements';
import CountryPicker from 'react-native-country-picker-modal'

export default function Add_mascotas_form({toastref, setloading, navigation}) {
  
  const add_mascotas = () =>{
    console.log("esta to jevi")
  }
  
  return (
    <View style={styles.container_view}>
      <Form_add/>
      <Button
        title={"Salvar Mascota"}
        onPress={add_mascotas}
        buttonStyle={styles.btnmascotas}
      />
    </View>
  )
}


function Form_add(){
  const [country, setCountry] = useState("DO")
  const [callingCode, setCallingcode] = useState("57")
  const [phone, setphone] = useState("")

  return(
    <View style={styles.form_view}>
      <Input
        placeholder="Nombre del Animal"
      />
       <Input
        placeholder="Direccion en donde se encuentra la mascota"
      />
       <Input
        placeholder="Email del Contacto"
        keyboardType="email-address"
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
            setCountry(country.cca2) //cca2: es el codigo internacional del pais de dos caracteres
            setCallingcode(country.callingCode[0]) //arreglo de los codigos internacionales
          }}
        />

        <Input
        placeholder="WhatsApp del Contacto"
        keyboardType="phone-pad"
        containerStyle={styles.inputWhatsApp}
      />
      </View>
      <Input
        placeholder="Descripcion de la Situacion"
        multiline
        containerStyle={styles.textarea}
      />
    </View>
  )


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
   margin: 20,
   backgroundColor: "#442484"
},
})