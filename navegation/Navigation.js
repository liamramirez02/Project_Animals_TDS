import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { color, Icon } from 'react-native-elements'

import Account from '../cuentas/Account'
import Buscar from '../screens/Buscar'
import Favoritos from '../screens/Favoritos'
import Mascotas from '../screens/Mascotas'
import TopAnimals from '../screens/TopAnimals'

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
        case "Ranking":
          iconName = "format-list-numbered"
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
            tabBarOptions={{
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
                component={Account}
                options={{title: "Cuenta" }} 
            />
            <Tab.Screen
                name="Buscar"
                component={Buscar}
                options={{title: "Buscar" }} 
            />
            <Tab.Screen
                name="Favoritos"
                component={Favoritos} 
                options={{title: "Favoritos" }}
            />
            <Tab.Screen
                name="Mascotas"
                component={Mascotas} 
                options={{title: "Mascotas" }}
            />
            <Tab.Screen
                name="Ranking"
                component={TopAnimals} 
                options={{title: "Ranking" }}
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}