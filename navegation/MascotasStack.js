import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Mascotas from '../screens/Mascotas'

const Stack = createStackNavigator()

export default function MascotasStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="M2"
            component={Mascotas}
            options={{ title: "Mascotas", headerShown: false }}
        />
    </Stack.Navigator>
  )
}