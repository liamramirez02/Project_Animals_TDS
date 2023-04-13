import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react'
import { Button } from 'react-native-elements'
import Loading from '../../Componentes/Loading'
import { ScrollView } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Login from './Login';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function UsuarioInvitado() {
  const navigation = useNavigation() //navegar a otra pantalla

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/Welcome_image.jpg")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.titulo}> 
          Bienvenido a PetSafe 
        </Text>
        <Text style={styles.descripcion}>
        Encuentra tu compañero perfecto a través de la adopción, apoya a los rescatistas locales 
        y realiza donaciones para mejorar la vida de los animales en necesidad. 
        ¡Únete a nuestra comunidad de amantes de los animales y ayuda a hacer la diferencia!
        </Text>
        
      </View>
      <View style={styles.botonContainer}>
        <Button
          buttonStyle={styles.boton}
          title="COMENZAR"
          onPress={() => navigation.navigate("login")} //navegacion hacia login
        />
        </View>
    </View>
    
  );
}

//<Loading isVisible = {true} text="Cargando..."/>

//Diseño del Apartado de Inicio
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  image: {
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 40,
    marginVertical: 20,
    textAlign: "center",
    color: '#fff',
  },
  descripcion: {
    color: "#fff",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
  },
  botonContainer: {
    position: 'absolute',
    top: 0,
    bottom: -750,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boton: {
    backgroundColor: '#0aabba',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});