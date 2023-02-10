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
            />
            <Tab.Screen
                name="Buscar"
                component={Buscar} 
            />
            <Tab.Screen
                name="Favoritos"
                component={Favoritos} 
            />
            <Tab.Screen
                name="Mascotas"
                component={Mascotas} 
            />
            <Tab.Screen
                name="Ranking"
                component={TopAnimals} 
            />
        </Tab.Navigator>
    </NavigationContainer>
  )
}