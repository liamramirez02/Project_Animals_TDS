import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


import Account from '../screens/Account'
import Buscar from '../screens/Buscar'
import Favoritos from '../screens/Favoritos'
import Mascotas from '../screens/Mascotas'
import TopAnimals from '../screens/TopAnimals'

const Tab = createBottomTabNavigator()

export default function Navigation() {
  return (
    <NavigationContainer>
        <Tab.Navigator>
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