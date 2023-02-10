import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Buscar from '../screens/Buscar'

const Stack = createStackNavigator()

export default function BuscarStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="B2"
            component={Buscar}
            options={{ title: "Buscar", headerShown: false }}
        />
    </Stack.Navigator>
  )
}