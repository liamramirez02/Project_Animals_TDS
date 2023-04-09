import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import  MapView  from 'react-native-maps';
import  openMap   from 'react-native-open-maps';
import { Marker } from 'react-native-maps';
import MapaMascota from './../Componentes/Mascotas/MapaMascota';

export default function Mapa() {
    const location = {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    
      const name = 'San Francisco';
    
      return (
        <View style={styles.container}>
          <MapaMascota location={location} name={name} height={300} />
        </View>
      );
    }
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }
})