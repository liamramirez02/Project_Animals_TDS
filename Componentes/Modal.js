import React from 'react'
import { StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'

//Overlay

export default function Modal({isVisible, setVisible, children}) {

    // const closeModal = () => setIsVisible(false)

    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.overlay}
            onBackdropPress={() => setVisible(false)} //cuando se presione afuera se cerrara
        >
            { children }
        </Overlay>
    )
}

const styles = StyleSheet.create({
    overlay: {
        width: "90%"
    }
})