import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { color, Icon } from 'react-native-elements'

import AccountStack from '../navegation/AccountStack'
import BuscarStack from '../navegation/BuscarStack'
import FavoritosStack from '../navegation/FavoritosStack'
import MascotasStack from '../navegation/MascotasStack'
import MapaStack from '../navegation/MapaStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  const screenOptions = (route) => {
      let iconName
      switch (route.name) {
        case "Cuenta":
          iconName = "account-circle"
          break;
        case "Buscar":
          iconName = "magnify"
          break;
        case "Favoritos":
          iconName = "star"
          break;
        case "Mascotas":
          iconName = "dog"
          break;
        case "Mapa":
          iconName = "map"
          break;

      }
      return (
        <Icon
          type="material-community"
          name={iconName}
          size={30}
          color={color}
        />
      )
  }

  return (
    <NavigationContainer>
        <Tab.Navigator
            initialRouteName="Cuenta"
            screenOptions2={{  
                headerShown: "false",
                inactiveTintColor:"#4d4d4d",
                activeTintColor:"#040404", 
                "tabBarStyle": [
                  {
                    "display": "flex"
                  },
                  null
                ]
            }}
            screenOptions={({route }) => ({
              tabBarIcon: ({color}) => screenOptions(route, color)
            })}
        >
            <Tab.Screen
                name="Cuenta"
                component={AccountStack}
                options={{title: "Cuenta" }} 
            />
            <Tab.Screen
                name="Buscar"
                component={BuscarStack}
                options={{title: "Buscar" }} 
            />
            <Tab.Screen
                name="Favoritos"
                component={FavoritosStack} 
                options={{title: "Favoritos" }}
            />
            <Tab.Screen
                name="Mascotas"
                component={MascotasStack} 
                options={{title: "Mascotas" }}
            />
            <Tab.Screen
                name="Mapa"
                component={MapaStack} 
                options={{title: "Mapa" }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}