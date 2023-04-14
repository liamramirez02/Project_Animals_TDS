import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator, Text, ScrollView,Dimensions,TouchableOpacity} from 'react-native'
import { SearchBar, ListItem, Icon, Image } from 'react-native-elements'
import { isEmpty, size } from 'lodash'
import { searchMascotas } from '../utilidades/actions'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Buscar({navigation}) {

  const [search, setSearch] = useState("")
  const [mascotas, setMascotas] = useState([])

 

//   console.log(mascotas)
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
       <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../assets/pets.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.listContainer}>
      <SearchBar
        placeholder="Busca tu Mascota..."
        onChangeText={(e) => setSearch(e)}
        onClear={() => clearSearch()}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
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
</View>
  )
}



function Mascota({mascota, navigation}) {

  const { id, name, images } = mascota.item



  return (
    <TouchableOpacity style={styles.container} onPress={() => 
      navigation.navigate("ir_mascotas", {id, name}
    )}>
      <Image
        source={images[0] ? { uri: images[0] } : require('../assets/no-image.png')}
        style={styles.image}
        resizeMode="cover"
        PlaceholderContent={<ActivityIndicator color="fff" />}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{name}</Text>
        <Icon typae="material-community" name="chevron-right" size={24} color="#999" />
      </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 20,
},
listContainer: {
  position: "absolute",
  top: 10,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
},
imageRestaurant: {
    width: 90,
    height: 90,
},
noFound: {
    width: "90%",
    fontFamily: 'sans-serif', 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20     ,
    left:"7%",
},
searchBarContainer: {
    backgroundColor: '#0aabba',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    alignSelf: 'center',

  },
  searchBarInputContainer: {
    backgroundColor: '#f2f2f2',
    height: 36,
  },
  searchBarInput: {
    fontSize: 16,
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
    content: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      padding: 0,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0.5,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
})