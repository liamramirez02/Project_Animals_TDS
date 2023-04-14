import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Button, Input, Icon } from "react-native-elements";
import { validateEmail } from "../../utilidades/helpers";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../utilidades/actions";
import Account from "../../screens/Cuenta/Account";
import Loading from "./../Loading";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

//Formulario de registro

export default function Registro_Form() {
  const [mostrar_passw, setMostrar_passw] = useState(false);
  const [FData, setFData] = useState(defaultFormValues());
  const [errorE, setErrorEmail] = useState("");
  const [errorP, setErrorPassword] = useState("");
  const [errorC, setErrorConfirm] = useState("");
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  const onChange = (e, type) => {
    setFData({ ...FData, [type]: e.nativeEvent.text });
  };

  const RU = async () => {
    if (!validateData()) {
      return;
    }

    setloading(true);
    const R = await registerUser(FData.email, FData.password);
    setloading(false);

    if (!R.statusResponse) {
      //si hubo problemas (statusResponse) envia el error
      setErrorEmail(R.error);
      return;
    }

    navigation.navigate("C2"); // si logro crear el usuario envia al usuario a la vista de cuenta
  };

  //VALIDACIONES
  const validateData = () => {
    setErrorConfirm("");
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(FData.email)) {
      setErrorEmail("Ingresar un email válido");
      isValid = false;
    }

    if (size(FData.password) < 6) {
      setErrorPassword("Ingresar una contraseña con maximo 6 caracteres");
      isValid = false;
    }

    if (size(FData.confirm) < 6) {
      setErrorConfirm("Ingresar una confirmación con maximo 6 caracteres");
      isValid = false;
    }

    if (FData.password !== FData.confirm) {
      setErrorPassword("Las contraseñas no son compatibles");
      setErrorConfirm("Las contraseñas no son compatibles");
      isValid = false;
    }

    return isValid;
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../../assets/register.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/back.png")}
            style={styles.backButton}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomView}>
        {/* WELCOME VIEW */}
        <View style={{ padding: 40 }}>
          <Text style={{ color: "orange", fontSize: 34,fontWeight: 'bold' }}>Sign Up</Text>
          <View style={styles.container}>
            <Input //Email
              containerStyle={styles.input}
              placeholder="Ingresa tu Email"
              onChange={(e) => onChange(e, "email")}
              keyboardType="email-address" //Tipo de Teclado
              errorMessage={errorE}
              defaultValue={FData.email}
            />

            <Input //Contraseña
              containerStyle={styles.input}
              placeholder="Ingresa tu Contraseña"
              password={true}
              secureTextEntry={!mostrar_passw} //oculta los digitos
              onChange={(e) => onChange(e, "password")}
              errorMessage={errorP}
              defaultValue={FData.password}
              rightIcon={
                <Icon //icono del ojo
                  type="material-community"
                  name={mostrar_passw ? "eye-off-outline" : "eye-outline"} //si el pass se esta mostrando se cambia el icono
                  iconStyle={styles.icon}
                  onPress={() => setMostrar_passw(!mostrar_passw)} //muestra lo contrario a la hora de clickear
                />
              }
            />
            <Input //Confirmar Contraseña
              containerStyle={styles.input}
              placeholder="Confirma tu Contraseña"
              password={true}
              secureTextEntry={!mostrar_passw} //oculta los digitos
              onChange={(e) => onChange(e, "confirm")}
              errorMessage={errorC}
              defaultValue={FData.confirm}
              rightIcon={
                <Icon //icono del ojo
                  type="material-community"
                  name={mostrar_passw ? "eye-off-outline" : "eye-outline"}
                  iconStyle={styles.icon}
                  onPress={() => setMostrar_passw(!mostrar_passw)}
                />
              }
            />
            <Button
              containerStyle={styles.btnContainer}
              title="Registrar usuario"
              buttonStyle={styles.btn}
              onPress={() => RU()}
            />
            <Loading isVisible={loading} text="Creando Cuenta del Usuario" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    flexGrow: 1, // Agregar flexGrow: 1 para eliminar espacio sobrante al final de la vistas
  },
  input: {
    width: "100%",
    height: 60,
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 25,
    backgroundColor: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#0aabba",
    marginBottom: 25, // Agregar un margen inferior de 10 puntos
  },
  btnContainer: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#0aabba",
    borderRadius: 15,
  },
  icon: {
    color: "#c1c1c1",
  },
  brandview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  brandViewText: {
    color: "ffffff",
    fontSize: 40,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  bottomView: {
    position: "absolute",
    flex: 1.5,
    backgroundColor: "white",
    bottom: 30,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: 2,
    borderColor: "#0aabba",
    width: "90%",
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',

    left: "50%",
    transform: [{ translateX: -Dimensions.get("window").width / 2.2 }],
  },
  registro: {
    marginTop: 15,
    marginHorizontal: 10,
  },
  bton_registro: {
    color: "#318CE7",
    fontWeight: "bold",
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
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
  backButtonContainer: {
    position: "absolute",
    top: 30,
    left: 10,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderTopStartRadius: 70,
    borderTopEndRadius: 70,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  backButton: {
    width: 60,
    height: 60,
  },
});
