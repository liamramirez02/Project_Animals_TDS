import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useRef,useEffect} from 'react'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { CloseSession, getCurrentUser } from './../../utilidades/actions';
import Toast from 'react-native-easy-toast' 
import Loading from './../../Componentes/Loading';
import User_info from '../../Componentes/Cuenta/User_info';
import Opciones_Cuenta from './../../Componentes/Cuenta/Opciones_Cuenta';

export default function User_logged() {

  const toastRef = useRef()
  const navigation = useNavigation()
  
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingtext]= useState("")
  const [user, setUser]= useState(null)

  useEffect(() =>{
  setUser(getCurrentUser())
  },[])

  return (
    <View styles={styles.comtainer}>
    {                                       
      user &&(                              //si hay usuario logueado manda la informacion
        <View>
         <User_info user={user} setLoading={setLoading} setLoadingtext={setLoadingtext}/>
         <Opciones_Cuenta
          user={user}
          ref={toastRef}
          />
         </View>
         )
        }     
      <Button
        title="Cerrar Sesion"
        buttonStyle={styles.btncerrar}
        titleStyle={styles.btncerrarTitle}
        onPress={() => {
          CloseSession()
          navigation.navigate("Mascotas")
        }}
      />
      <Toast ref={toastRef} position="center" opacity={0.9}/>
      <Loading isVisible={loading} text={loadingText}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    minHeight:"100%",
    backgroundColor: "black"
  },
  btncerrar:{
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#442484",
    borderBottomWidth: 1,
    borderBottomColor: "#442484",
    paddingVertical: 10
  },
  btncerrarTitle:{
    color:"#442484"
  }
})