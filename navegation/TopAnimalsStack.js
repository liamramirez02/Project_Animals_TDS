import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import TopAnimals from '../screens/TopAnimals'

const Stack = createStackNavigator()

export default function TopAnimalsStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
            name="TopAnimals"
            component={TopAnimals}
            options={{ title: "TopAnimals" }}
        />
    </Stack.Navigator>
  )
}