import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Button, Input, Icon} from 'react-native-elements'


//Formulario de registro

export default function Registro_Form() {
    const [mostrar_passw, setMostrar_passw] = useState(false)

  return (
    <View style={styles.formulario} >
      <Input
      containerStyle={styles.input}
      placeholder="Ingresa tu email"
      />
     <Input
      containerStyle={styles.input}
      placeholder="Ingresa tu Contraseña"
      password ={true}
      secureTextEntry={!mostrar_passw} //oculta los digitos
      rightIcon={
        <Icon                           //icono del ojo
          type='material-community'
          name={mostrar_passw ? 'eye-off-outline' : 'eye-outline'} //si el pass se esta mostrando se cambia el icono
          iconStyle={styles.icon}
          onPress = {() => setMostrar_passw(!mostrar_passw)} //muestra lo contrario a la hora de clickear
        
        />}
      />
     <Input
      containerStyle={styles.input}
      placeholder="Confirma tu Contraseña"
      password ={true}
      secureTextEntry={!mostrar_passw} //oculta los digitos
      rightIcon={
      <Icon                           //icono del ojo
        type='material-community'
        name={mostrar_passw ?'eye-off-outline' : 'eye-outline'}
        iconStyle={styles.icon}
        onPress = {() => setMostrar_passw(!mostrar_passw)}
      
      />}
      />
     <Input
      containerStyle={styles.input}
      placeholder="Ingresa otra vaina"
      />
      <Button
      containerStyle={styles.btnContainer}
      title="Registrar usuario"
      buttonStyle={styles.btn}
      />
    </View>
  )
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
        backgroundColor:"green"
    },
    icon:{
        color: "#c1c1c1"
    }
})