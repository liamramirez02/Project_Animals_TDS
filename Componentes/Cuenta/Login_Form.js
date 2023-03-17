import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input, Icon} from 'react-native-elements'
import Loading from './../Loading';
import { useNavigation } from '@react-navigation/native'
import { validateEmail } from '../../utilidades/helpers'
import { loginEmailandPass } from './../../utilidades/actions';
import {isEmpty} from 'lodash'

export default function Login_Form() {

    const [mostrar_passw, setMostrar_passw] = useState(false)
    const [FData, setFData] = useState(defaultFormValues())
    const [errorE, setErrorEmail] = useState("")
    const [errorP, setErrorPassword] = useState("")
    const [loading, setloading] = useState(false)

    const navigation = useNavigation()


    const dLogin = async() =>{

      if(!validateData()) {
       return;
      }

      setloading(true)
      const R = await loginEmailandPass(FData.email, FData.password)
      setloading(false)

      if(!R.statusResponse) { //si hubo problemas (statusResponse) envia el error
       setErrorEmail(R.error)
       setErrorPassword(R.error)
       return
      }
      
      navigation.navigate("C2") // si logro iniciar sesion, envia al usuario a la vista de cuenta

    }

//VALIDACIONES
const validateData = () => {
  setErrorEmail("")
  setErrorPassword("")
  let isValid = true

  if(!validateEmail(FData.email)) 
  {
    setErrorEmail("Ingresar un email válido")
    isValid = false
  }

  if(isEmpty(FData.password)) 
  {
    setErrorPassword("Ingresar una Contraseña")
    isValid = false
  }

  return isValid
}

const onChange = (e, type) => {
  setFData({...FData, [type]: e.nativeEvent.text })
  
}

  return (
    <View style={styles.container}>
         <Input //Email
      containerStyle={styles.input}
      placeholder="Ingresa tu email"
      onChange={(e) => onChange(e, "email")} 
      keyboardType="email-address" //Tipo de Teclado
      errorMessage={errorE}
      defaultValue={FData.email} 
      /> 

     <Input //Contraseña
      containerStyle={styles.input}
      placeholder="Ingresa tu Contraseña"
      password ={true}
      secureTextEntry={!mostrar_passw} //oculta los digitos
      onChange={(e) => onChange(e, "password")}
      errorMessage={errorP}
      defaultValue={FData.password}
      rightIcon={
        <Icon                           //icono del ojo
          type='material-community'
          name={mostrar_passw ? 'eye-off-outline' : 'eye-outline'} //si el pass se esta mostrando se cambia el icono
          iconStyle={styles.icon}
          onPress = {() => setMostrar_passw(!mostrar_passw)} //muestra lo contrario a la hora de clickear
          />
         }
        />
      <Button
      containerStyle={styles.btnContainer}
      title="Iniciar Sesion"
      buttonStyle={styles.btn}
      onPress={dLogin}
      />
        <Loading isVisible={loading} text="Iniciando Sesions"/>

    </View>
  )
}

const defaultFormValues = () => {
  return { email: "", password: ""}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",       
    alignItems: "center",
    marginTop: 30
  },
  input:{
    width: "100%"
},
btnContainer:{
    marginTop: 20,
    width: "90%",
    alignSelf: "center"
},
btn:{
    backgroundColor:"gray"
},
icon:{
    color: "#c1c1c1"
}
})