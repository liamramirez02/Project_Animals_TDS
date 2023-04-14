import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { formatPhone } from "./../../utilidades/helpers";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Listado_Macotas({
  mascotas,
  navigation,
  handleLoadMore,
}) {
  return (
    <View style={styles.container}>
      <FlatList
        data={mascotas}
        renderItem={(mascota) => (
          <Mascota mascota={mascota} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
        style={styles.flatlist}
      />
    </View>
  )
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
      <View style={styles.mascotaContainer}>
        <View style={styles.mascotaImageContainer}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#0000ff" />}
            source={
              imageMascota
                ? { uri: imageMascota }
                : require("../../assets/no-image.png")
            }
            style={styles.mascotaImage}
          />
        </View>
        <View style={styles.mascotaInfoContainer}>
          <Text style={styles.mascotaName}>{name}</Text>
          <Text style={styles.mascotaAddress}>{address}</Text>
          <Text style={styles.mascotaPhone}>{formatPhone(phone)}</Text>
          <Text style={styles.mascotaDescription}>
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
  mascotaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  mascotaImageContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#f2f2f2",
    margin: 15,
  },
  mascotaImage: {
    width: "100%",
    height: "100%",
  },
  mascotaInfoContainer: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  mascotaName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  mascotaAddress: {
    color: "grey",
    fontSize: 14,
    marginBottom: 2,
  },
  mascotaPhone: {
    color: "grey",
    fontSize: 14,
    marginBottom: 2,
  },
  mascotaDescription: {
    color: "grey",
    fontSize: 14,
    marginBottom: 2,
  },
  container: {
    flex: 1,
    backgroundColor: "gray", // aquí puedes cambiar el color de fondo de la vista
  },
  flatlist: {
    paddingTop: 15,
  },
});
