import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Favoritos from '../screens/Favoritos'

const Stack = createStackNavigator()

export default function FavoritosStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="F2"
            component={Favoritos}
            options={{ title: "Favoritos", headerShown: false }}
        />
    </Stack.Navigator>
  )
}