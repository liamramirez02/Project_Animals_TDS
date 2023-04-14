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
        case "Mascotas":
          iconName = "dog"
          break;
        case "Buscar":
          iconName = "magnify"
          break;
          case "Mapa":
            iconName = "map"
            break;
        case "Favoritos":
          iconName = "star"
          break;
          case "Cuenta":
          iconName = "account-circle"
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
                name="Mascotas"
                component={MascotasStack} 
                // options={{title: "Mascotas" }}
                options={{ headerShown: false }}  
            />
            <Tab.Screen
                name="Buscar"
                component={BuscarStack}
                options={{ headerShown: false }}  
            />
             <Tab.Screen
                name="Mapa"
                component={MapaStack} 
                options={{ headerShown: false }}  
            />
            <Tab.Screen
                name="Favoritos"
                component={FavoritosStack} 
                options={{ headerShown: false }}  
            />
           <Tab.Screen
                name="Cuenta"
                component={AccountStack}
                options={{ headerShown: false }}  
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}