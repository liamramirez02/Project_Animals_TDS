import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Mascotas from '../screens/Mascotas/Mascotas'
import Add_mascotas from './../screens/Mascotas/Add_mascotas';

const Stack = createStackNavigator()

export default function MascotasStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="mascotas"
            component={Mascotas}
            options={{ title: "Mascotas", headerShown: false }}
        />
        <Stack.Screen
            name="addmascotas"
            component={Add_mascotas}
            options={{ title: "Agregar Mascotas", headerShown: false }}
        />
    </Stack.Navigator>
  )
}