import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, Text, ScrollView } from 'react-native'
import { SearchBar, ListItem, Icon, Image } from 'react-native-elements'
import { isEmpty, size } from 'lodash'
import { searchMascotas } from '../utilidades/actions'

export default function Buscar({navigation}) {

  const [search, setSearch] = useState("")
  const [mascotas, setMascotas] = useState([])

  console.log(mascotas)
  useEffect(() => {
    if (isEmpty(search)) {
        return
        } 

          async function getData() {
            const response = await searchMascotas(search)
            if (response.statusResponse){
              setMascotas(response.mascotas)
            }
        }
        getData()
}, [search])


const clearSearch = () => {
    setSearch("");
    setMascotas([]);
}

  return (
    <View>
    <SearchBar
        placeholder="Busca tu Mascota..."
        onChangeText={(e) => setSearch(e)}
        onClear={() => clearSearch()}
        containerStyle={styles.searchBar}
        value={search}
    />
    { 
        size(mascotas) > 0 ? (
            <FlatList
                data={mascotas}
                renderItem={(mascota) => 
                    <Mascota 
                        mascota={mascota} 
                        navigation={navigation}
                    />
                }
                keyExtractor={(item, index) => index.toString()}
            />
        ) : (
            isEmpty(search) ? (
                <Text style={styles.noFound}>
                    Ingrese como comienza el nombre de la Mascota.
                </Text>
            ) : (
                <Text style={styles.noFound}>
                    No hay mascotas que su nombre comience con su criterio de búsqueda.
                </Text>
            )
        )
    }
</View>
  )
}



function Mascota({mascota, navigation}) {

  const { id, name, images } = mascota.item

  return (
      <ListItem 
          style={styles.menuItem}
            onPress={() => 
              navigation.navigate("ir_mascotas", {id, name}
            )}
      >
          <Image
              resizeMode="cover"
              PlaceholderContent={<ActivityIndicator color="fff" />}
              source={
                  images[0]
                      ? { uri: images[0] }
                      : require("../assets/no-image.png")
              }
              style={styles.imageRestaurant}
          />
          <ListItem.Content>
              <ListItem.Title>{name}</ListItem.Title>
          </ListItem.Content>
          <Icon type="material-community" name="chevron-right"/>
      </ListItem>
  )
}


const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20
},
imageRestaurant: {
    width: 90,
    height: 90,
},
noFound: {
    alignSelf: "center", 
    width: "90%"    
}
})