import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ListItem, Icon } from 'react-native-elements'
import {map} from 'lodash'

export default function Opciones_Cuenta({user, toastRef}) {

    const opciones_menu = generateOptions()

    return (
        <View>
            {
                map(opciones_menu, (menu, index) => ( //por cada opcion esta el menu y el index
                    <ListItem 
                        key={index} //no se repite
                        style={styles.menuItem} 
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

        </View>
    )
}

function generateOptions () {
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
            onPress: () => selectedComponent("email")
        },
        {
            title: "Cambio de Contraseña",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#a7bfd3",
            iconNameRight: "chevron-right",
            iconColorRight: "#a7bfd3",
            onPress: () => selectedComponent("password")
        }
    ]
}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3",
    },
})