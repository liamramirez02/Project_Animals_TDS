import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { formatPhone } from "./../../utilidades/helpers";

export default function Listado_Macotas({
  mascotas,
  navigation,
  handleLoadMore,
}) {
  return (
    <View>
      <FlatList
        data={mascotas}
        renderItem={(
          mascota //por cada mascota renderiza una lista
        ) => <Mascota mascota={mascota} navigation={navigation} />}
        keyExtractor={(item, index) => index.toString()} //cada elemento dentro del FlatList es unico
        onEndReachedThreshold={0.5} //limite para llegar al fondo
        onEndReached={handleLoadMore}
      />
    </View>
  );
}

//Funcion para ver y mostrar la informacion de todas las mascotas publicadas en dicho apartado
function Mascota({ mascota, navigation, handleLoadMore }) {
  const { id, images, name, address, description, phone, callindCode } =
    mascota.item;
  const imageMascota = images[0];

  const goMascotas = () => {
    navigation.navigate("ir_mascotas", { id, name });
  };

  return (
    <TouchableOpacity onPress={() => goMascotas()}>
      <View style={styles.vMascota}>
        <View style={styles.vImagenMascota}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#0000ff" />}
            source={
              imageMascota
                ? { uri: imageMascota }
                : require("../../assets/no-image.png")
            }
            style={styles.imagenesmascotas}
          />
        </View>
        <View>
          <Text style={styles.nombremascota}>{name}</Text>
          <Text style={styles.direccionmascota}>{address}</Text>
          <Text style={styles.direccionmascota}>{formatPhone(phone)}</Text>
          <Text style={styles.descripcionanimal}>
            {size(description) > 0
              ? `${description.substr(0, 60)}...`
              : description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  vMascota: {
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    flexDirection: 'row',
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  vImagenMascota: {
    marginRight: 15,
  },
  imagenesmascotas: {
    width: 90,
    height: 90,
  },
  nombremascota: {
    fontWeight: "bold",
  },
  direccionmascota: {
    paddingTop: 2,
    color: "grey",
  },
  descripcionanimal: {
    paddingTop: 2,
    color: "grey",
    width: "75%",
  },
});
