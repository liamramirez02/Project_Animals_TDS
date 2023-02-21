import { StyleSheet, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input, Icon} from 'react-native-elements'
import { validateEmail } from '../../utilidades/helpers'
import {size} from 'lodash'

//Formulario de registro

export default function Registro_Form() {
    const [mostrar_passw, setMostrar_passw] = useState(false)
    const [FData, setFData] = useState(defaultFormValues())
    const [errorE, setErrorEmail] = useState("")
    const [errorP, setErrorPassword] = useState("")
    const [errorC, setErrorConfirm] = useState("")

    const onChange = (e, type) => {
      setFData({...FData, [type]: e.nativeEvent.text })
      
    }

    const registerUser = () =>{
       if(validateData()) {
        return;
       }

       console.log("Funciona!!")
    }

    const validateData = () => {
      setErrorConfirm("")
      setErrorEmail("")
      setErrorPassword("")
      let isValid = true

      if(!validateEmail(FData.email)) 
      {
        setErrorEmail("Ingresar un email válido")
        isValid = false
      }

      if(size(FData.password) < 6)
      {
        setErrorPassword("Ingresar una contraseña con maximo 6 caracteres")
        isValid = false
      }

      if(size(FData.confirm) < 6)
      {
        setErrorConfirm("Ingresar una confirmación con maximo 6 caracteres")
        isValid = false
      }

      if(FData.password !== FData.confirm)
      {
        setErrorPassword("La contraseña y la confirmación no son compatibles")
        setErrorConfirm("La contraseña y la confirmación no son compatibles")
        isValid = false
      }

      return isValid
    }
    

  return (
    <View style={styles.formulario} >
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
     <Input //Confirmar Contraseña
      containerStyle={styles.input}
      placeholder="Confirma tu Contraseña"
      password ={true}
      secureTextEntry={!mostrar_passw} //oculta los digitos
      onChange={(e) => onChange(e, "confirm")}
      errorMessage={errorC}
      defaultValue={FData.confirm}
      rightIcon={
      <Icon                           //icono del ojo
        type='material-community'
        name={mostrar_passw ?'eye-off-outline' : 'eye-outline'}
        iconStyle={styles.icon}
        onPress = {() => setMostrar_passw(!mostrar_passw)}
      
      />
    }
      />
      <Button
      containerStyle={styles.btnContainer}
      title="Registrar usuario"
      buttonStyle={styles.btn}
      onPress={() => registerUser()}
      />
    </View>
  )
}

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" }
}

const styles = StyleSheet.create({
    formulario:{
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