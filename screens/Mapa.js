import { StyleSheet, Text, View,Alert } from 'react-native'
import React, {useState, useEffect,useCallback,useRef} from 'react'
import  MapView  from 'react-native-maps';
import  openMap   from 'react-native-open-maps';
import { Marker } from 'react-native-maps';
import MapaMascota from './../Componentes/Mascotas/MapaMascota';
import firebase from "firebase/app"
import "firebase/firestore"
import { getLocations } from './../utilidades/actions';
import { useFocusEffect } from '@react-navigation/native';
import { firebaseApp } from './../utilidades/firebase';
import { useWindowDimensions } from "react-native";
import { map } from 'lodash';

const db = firebase.firestore(firebaseApp) //acceso a base de datos

export default function Mapa() {
    
  const [mascotas, setMascotas] = useState([]);
  const [region, setRegion] = useState({   //Santo Domingo Este
    latitude: 18.493272,                 
    longitude: -69.847596,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useFocusEffect(
    useCallback(() => {
    (async () => {
      const response = await getLocations('mascotas')
      if (response.statusResponse) {
        setMascotas(response.document)
        // console.log(response)
      } else {
        setMascotas([])
        Alert.alert("Ha sucedido un error cargando las mascotas, Intentelo más tarde!")
      }
    })()
  }, [])
  )
  

  return (
    <MapView style={{ flex: 1 }} region={region}>
      {mascotas.map((mascota,index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: mascota.latitude,
            longitude: mascota.longitude
        }}
          title={mascota.nombre}
          description={mascota.descripcion}
        />
      ))}
    </MapView>
  );
};





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
})







  //   const [mascota, setMascota] = useState(null) 

    // useFocusEffect(
    //   useCallback(() => {
    //     (async () => {
    //       const response = await getLocations('mascotas');
    //       console.log(response);
    //       if(response.statusResponse) {
    //         setMascota(response.document)
    //       }else {
    //         setMascota({})
    //         Alert.alert("Ha sucedido un error cargando la mascota, Intentelo más tarde!")
    //       }
    //     })();
    //   }, [])
    // );

    
  // const location = {
  //       latitude: 37.78825,
  //       longitude: -122.4324,
  //       latitudeDelta: 0.0922,
  //       longitudeDelta: 0.0421,
  //     };
    
  //     const name = 'San Francisco';
    
  //     return (
  //       <View style={styles.container}>
  //         <MapaMascota location={location} name={name} height={"100%"} />
  //       </View>
  //     );
    // }
    


  /* Actualiza la región del mapa de acuerdo con las coordenadas de las mascotas que se muestran en el mapa.
  
  Primero, la función verifica si hay mascotas en la lista. Si no hay mascotas, no hace nada. De lo contrario, utiliza los valores de latitud y longitud de cada mascota para calcular la latitud y longitud mínimas y máximas en la lista. 
  Luego, utiliza estas latitudes y longitudes mínimas y máximas para calcular la latitud y longitud promedio del centro del mapa y el tamaño del mapa que se muestra. Finalmente, establece la nueva región del mapa utilizando setRegion.

  La verificación de valores NaN se realiza en caso de que los cálculos produzcan un resultado inválido. En caso de que se detecten valores NaN,
  se emite una advertencia en la consola y la función no establece la nueva región del mapa. */

  // const updateMapRegion = useCallback(() => {
  //   if (mascotas.length > 0) {
  //     const latitudes = mascotas.map(mascota => mascota.latitud);
  //     const longitudes = mascotas.map(mascota => mascota.longitud);
  //     const minLat = Math.min(...latitudes);
  //     const maxLat = Math.max(...latitudes);
  //     const minLng = Math.min(...longitudes);
  //     const maxLng = Math.max(...longitudes);
  //     const newRegion = {
  //       latitude: (minLat + maxLat) / 2,
  //       longitude: (minLng + maxLng) / 2,
  //       latitudeDelta: (maxLat - minLat) + 0.02,
  //       longitudeDelta: (maxLng - minLng) + 0.02,
  //     };
  //     // Check for NaN values
  //     if (isNaN(newRegion.latitude) || isNaN(newRegion.longitude) || isNaN(newRegion.latitudeDelta) || isNaN(newRegion.longitudeDelta)) {
  //       console.error('Invalid region:', newRegion);
  //       return;
  //     }
  //     setRegion(newRegion);
  //   }
  // }, [mascotas]);


  // useEffect(() => {
  //   updateMapRegion();
  // }, [mascotas, updateMapRegion]);