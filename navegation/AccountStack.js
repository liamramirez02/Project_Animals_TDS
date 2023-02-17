import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../screens/Cuenta/Account'
import Login from '../screens/Cuenta/Login'

const Stack = createStackNavigator()

export default function AccountStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="C2"
            component={Account}
            options={{ title: "Cuenta", headerShown: false }}
        />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ title: "Iniciar Sesion"}}
        />
    </Stack.Navigator>
  )
}