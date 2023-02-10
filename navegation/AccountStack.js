import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Account from '../cuentas/Account'

const Stack = createStackNavigator()

export default function AccountStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="Cuenta"
            component={Account}
            options={{ title: "Cuenta" }}
        />
    </Stack.Navigator>
  )
}