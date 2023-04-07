import React from 'react'
import  MapView  from 'react-native-maps';
import  openMap   from 'react-native-open-maps';
import { Marker } from 'react-native-maps';


export default function MapaMascota({ location, name, height }) {
    const openAppMap = () => {
        openMap ({
            latitude: location.latitude,
            longitude: location.longitude,
            zoom: 19,
            query: name
        })
    }

  return (
     <MapView
        style={{ height: height, width: "100%" }}
        initialRegion={location}
        onPress={openAppMap}
     >
        <Marker
            coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
            }}
        />
     </MapView>
  )
}
