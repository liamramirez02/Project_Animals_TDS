//Importacion de paquetes de react navigation

import React from 'react';
import Navigation from './navegation/Navigation';
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs();

export default function App() {
  return (
      <Navigation/>
  );
}

