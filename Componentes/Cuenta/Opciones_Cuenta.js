import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Icon } from 'react-native-elements'
import { map } from 'lodash'
import { useState } from 'react'
import Modal from '../Modal'
import Cambiar_nombre_form from './Cambiar_nombre_form';
import Cambiar_email_form from './Cambiar_email_form';

export default function Opciones_Cuenta({user, toastRef, setReloadUser}) {


    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null) //para mandar al modal


    const generateOptions = () => {
        return [
            {
                title: "Cambio de Nombre y Apellidos",
                iconNameLeft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("displayName")
            },
            {
                title: "Cambio de Email",
                iconNameLeft: "at",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("editar_email")
            },
            {
                title: "Cambio de Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponent("editar_password")
            }
        ]
    }

    const selectedComponent = (key) => { //elegir opciones
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <Cambiar_nombre_form
                        displayName={user.displayName}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;

                case "editar_email":
                    setRenderComponent(
                        <Cambiar_email_form
                            email={user.email}
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUser={setReloadUser}
                        />
                    )
                    break;

                default:
                    setRenderComponent(null)
                    break;
            
        }
    
        setShowModal(true)
    }

    
    const opciones_menu = generateOptions()

    return (
        <View>
            {
                map(opciones_menu, (menu, index) => ( //por cada opcion esta el menu y el index
                    <ListItem 
                        key={index} //no se repite
                        style={styles.menuItem} 
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content> 
                            <ListItem.Title>{menu.title}</ListItem.Title> 
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            {
                    renderComponent && (

                    <Modal isVisible={showModal} setVisible={setShowModal} >
                        {renderComponent}
                    </Modal>      
               )
                    }
        </View>
    )
}


const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3",
    },
})