import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Favoritos from '../screens/Favoritos'

const Stack = createStackNavigator()

export default function FavoritosStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Favoritos"
            component={Favoritos}
            options={{ title: "Favoritos" }}
        />
    </Stack.Navigator>
  )
}