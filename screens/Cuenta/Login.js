import { ScrollView, StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Login_Form from '../../Componentes/Cuenta/Login_Form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' //nuevo scroll


export default function Login() {

  return (
    <KeyboardAwareScrollView>
          {/* <Image
              source={require("../../assets/logo_v2.jpg")}
              resizeMode="contain"
              style={styles.image}
          />   */}
          <View>
            <Login_Form/>
            {/* <Crearcuenta/> */}
            {/* <Divider style={styles.divider}/> */}

          </View>
    </KeyboardAwareScrollView>
  )
}

// function Crearcuenta(props) {
//   const navigation = useNavigation() //navegar a otra pantalla

//   return (
//     <Text
//     style={styles.registro} 
//     onPress={() => navigation.navigate("registro")} //navegacion hacia registro
// >
//     Aun no tienes cuenta? {" "} 
//     <Text style={styles.bton_registro}>
//       Registrate
//     </Text>
//     </Text>
//   )
//   }


const styles = StyleSheet.create({
  // container: {
  //   // marginHorizontal: 40
  // },
  // image: {
  //   height: 150,
  //   width:"100%",
  //   marginBottom: 40,
  //   textAlign: "center"
  // },
  divider:{
    backgroundColor: "#646464",
    margin: 40
  },
  registro:{
    marginTop: 15,
    marginHorizontal: 10,
  },
  bton_registro:{
    color: "#318CE7",
    fontWeight: "bold"
  }


})

