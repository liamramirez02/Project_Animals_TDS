import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useState, useCallback, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getFavoritelist, removeFavorites } from "./../utilidades/actions";
import { Image, Icon, Button } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Loading from "./../Componentes/Loading";
import firebase from "firebase/app";
import "firebase/firestore";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function Favoritos({ navigation }) {
  const toastRef = useRef();

  const [mascotas, setMascotas] = useState(null);
  const [userLogged, setUserLogged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      if (userLogged) {
        async function getData() {
          setLoading(true);
          const response = await getFavoritelist();
          setMascotas(response.favorites);
          setLoading(false);
        }
        getData();
      }
      setReloadData(false);
    }, [userLogged, reloadData])
  );

  if (!userLogged) {
    return <UserNoLogged navigation={navigation} />;
  }

  if (!mascotas) {
    //si no hay valor, aun siguen cargando las mascotas.  Si no hay mascotas favoritas llama a "NotFoundRestaurants"
    return <Loading isVisible={true} text="Cargando Mascotas..." />;
  } else if (mascotas?.length === 0) {
    return <NotFoundMascotas />;
  }

  return (
    <View style={styles.viewBody}>
      {mascotas ? ( //si tiene elementos pinta los favoritos
        <FlatList
          data={mascotas}
          renderItem={(mascota) => (
            <Mascota
              mascota={mascota}
              setLoading={setLoading}
              toastRef={toastRef}
              navigation={navigation}
              setReloadData={setReloadData}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loaderRestaurant}>
          <ActivityIndicator size="large" />
          <Text style={{ textAlign: "center" }}>Cargando Mascotas..</Text>
        </View>
      )}
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading text="Eliminando mascota..." isVisible={Loading} />
    </View>
  );
}

function Mascota({ mascota, setLoading, toastRef, navigation, setReloadData }) {
  const { id, name, images } = mascota.item;

  const confirmRemoveFavorite = () => {
    Alert.alert(
      "Eliminar mascota de favoritos",
      "¿Está seguro de que quieres borrar la mascota de favoritos?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Sí",
          onPress: removeFavorite,
        },
      ],
      { cancelable: false }
    );
  };

  const removeFavorite = async () => {
    setLoading(true);
    const response = await removeFavorites(id);
    if (response.statusResponse) {
      setReloadData(true);
      setLoading(false);
      toastRef.current.show("Mascota eliminada de favoritos.", 3000);
    } else {
      setLoading(false);
      toastRef.current.show("Error al eliminar la Mascota de favoritos.", 3000);
    }
  };

  return (
    <View style={styles.mascota}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ir_mascotas", { id, name })}
      >
        <Image
          resizeMode="cover"
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="#fff" />}
          source={
            images[0] ? { uri: images[0] } : require("../assets/no-image.png")
          }
        />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            containerStyle={styles.favorite}
            onPress={confirmRemoveFavorite}
            underlayColor="transparent"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function NotFoundMascotas() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Aún no tienes Mascotas favoritas
      </Text>
    </View>
  );
}

function UserNoLogged({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Icon type="material-community" name="alert-outline" size={50} />
      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center" }}>
        Necesitas estar logueado para ver los favoritos
      </Text>
      <Button
        title="Ir al Login"
        containerStyle={{ marginTop: 20, width: "80%" }}
        buttonStyle={{ backgroundColor: "#442484" }}
        onPress={() => navigation.navigate("C2", { screen: "login" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  loaderRestaurant: {
    marginTop: 10,
    marginBottom: 10,
  },
  mascota: {
    margin: 10,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginTop: -30,
    backgroundColor: "#fff",
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  favorite: {
    marginTop: -35,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 100,
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
  content: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
});
