import { StyleSheet, Text, View } from 'react-native'
import React, {useState,useCallback} from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { getFavoritelist } from './../utilidades/actions';

export default function Favoritos() {


  useFocusEffect(
    useCallback(() => {
      async function getData() {
        const response = await getFavoritelist()
        console.log(response)
      }
      
    getData()
    },[])
)

  return (
    <View>
      <Text></Text>
    </View>
  )
}

const styles = StyleSheet.create({})