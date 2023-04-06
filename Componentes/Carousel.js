import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native-elements'
import { ActivityIndicator } from 'react-native'
import { ViewPropTypes } from 'deprecated-react-native-prop-types'
import { Carousel } from 'react-native-snap-carousel-v4'


//Funcion de la Imagen para que funcione en el apartado de la mascota
export default function ImagesMascota({ images, width ,height }) {
    const renderItem = ({ item }) => {
        return(
            <Image
                style={{width, height}}
                PlaceholderContent={<ActivityIndicator color="#fff"/>}
                source={{ uri:item }}
            />
        )    
    }

    return(
        <Carousel
            layout='default'
            data={images}
            sliderWidth={width}
            itemWidth={width}
            itemHeight={height}
            renderItem={renderItem}
        />
    )
}

const styles = StyleSheet.create({})