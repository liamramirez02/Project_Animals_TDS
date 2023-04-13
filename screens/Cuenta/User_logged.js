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
  const [reloadUser, setReloadUser] = useState(false)

  useEffect(() => {
  setUser(getCurrentUser())
  setReloadUser(false)

  },[reloadUser])

  return (
    <View styles={styles.container}>
    {                                       
      user && (                              //si hay usuario logueado manda la informacion
        <View>
         <User_info user={user} setLoading={setLoading} setLoadingtext={setLoadingtext}/>
         <Opciones_Cuenta
          user={user}
          toastRef={toastRef}
          setReloadUser={setReloadUser}
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
        containerStyle={styles.buttonContainer}
      />
      <Toast ref={toastRef} position="center" opacity={0.9}/>
      <Loading isVisible={loading} text={loadingText}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  btncerrar: {
    borderRadius: 30,
    backgroundColor: "#B81125",
    paddingVertical: 12,
    paddingHorizontal: 25,
    elevation: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    width: 200,

  },
  btncerrarTitle: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonContainer: {
    marginTop: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
