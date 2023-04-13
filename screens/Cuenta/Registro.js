import { StyleSheet, Text, View, Image, Button,TouchableOpacity } from "react-native";
import React from "react";
import Registro_Form from "./../../Componentes/Cuenta/Registro_Form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; //nuevo scroll

export default function Registro({ navigation }) {
  return (
    <KeyboardAwareScrollView>
      {/* <Image
              source={require("../../assets/logo_v2.jpg")}
              resizeMode="contain"
              style={styles.image}
          />   */}
      {/* <Button
        styles={styles.btnregister}
        title=""
        onPress={() => navigation.goBack()}
      /> */}
      <Registro_Form />
    </KeyboardAwareScrollView>
  );
}

{/* <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
<Image
    source={require("../../assets/back.png")}
  />
   </TouchableOpacity> */}

const styles = StyleSheet.create({
  image: {
    height: 115,
    width: "100%",
    marginTop: 60,
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    // backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
});
