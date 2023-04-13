import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Button, Input, Icon } from "react-native-elements";
import Loading from "./../Loading";
import { useNavigation } from "@react-navigation/native";
import { validateEmail } from "../../utilidades/helpers";
import { loginEmailandPass } from "./../../utilidades/actions";
import { isEmpty } from "lodash";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default function Login_Form() {
  const [mostrar_passw, setMostrar_passw] = useState(false);
  const [FData, setFData] = useState(defaultFormValues());
  const [errorE, setErrorEmail] = useState("");
  const [errorP, setErrorPassword] = useState("");
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  const dLogin = async () => {
    if (!validateData()) {
      return;
    }

    setloading(true);
    const R = await loginEmailandPass(FData.email, FData.password);
    setloading(false);

    if (!R.statusResponse) {
      //si hubo problemas (statusResponse) envia el error
      setErrorEmail(R.error);
      setErrorPassword(R.error);
      return;
    }

    navigation.navigate("C2"); // si logro iniciar sesion, envia al usuario a la vista de cuenta
  };

  //VALIDACIONES
  const validateData = () => {
    setErrorEmail("");
    setErrorPassword("");
    let isValid = true;

    if (!validateEmail(FData.email)) {
      setErrorEmail("Ingresar un email válido");
      isValid = false;
    }

    if (isEmpty(FData.password)) {
      setErrorPassword("Ingresar una Contraseña");
      isValid = false;
    }

    return isValid;
  };

  const onChange = (e, type) => {
    setFData({ ...FData, [type]: e.nativeEvent.text });
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#ffffff" }}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.backgroundImageContainer}>
        <Image
          source={require("../../assets/login.jpg")}
          resizeMode="cover"
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
      </View>
      <View style={styles.bottomView}>
        {/* WELCOME VIEW */}
        <View style={{ padding: 40 }}>
          <Text style={{ color: "#4632A1", fontSize: 34 }}>Login</Text>

          {/* form inputs views */}
          <View style={styles.container}>
            <Input //Email
              containerStyle={styles.input}
              placeholder="Ingresa tu email"
              onChange={(e) => onChange(e, "email")}
              keyboardType="email-address" //Tipo de Teclado
              errorMessage={errorE}
              defaultValue={FData.email}
              leftIcon={
                <Icon
                  type="material-community"
                  name={"email"}
                  iconStyle={styles.icon}
                />
              }
            />

            <Input //Contraseña
              containerStyle={styles.input}
              placeholder="Ingresa tu Contraseña"
              password={true}
              secureTextEntry={!mostrar_passw} //oculta los digitos
              onChange={(e) => onChange(e, "password")}
              errorMessage={errorP}
              defaultValue={FData.password}
              leftIcon={
                <Icon
                  type="material-community"
                  name={"lock-outline"}
                  iconStyle={styles.icon}
                />
              }
              rightIcon={
                <Icon //icono del ojo
                  type="material-community"
                  name={mostrar_passw ? "eye-off-outline" : "eye-outline"} //si el pass se esta mostrando se cambia el icono
                  iconStyle={styles.icon}
                  onPress={() => setMostrar_passw(!mostrar_passw)} //muestra lo contrario a la hora de clickear
                />
              }
            />
            <Button
              containerStyle={styles.btnContainer}
              title="Iniciar Sesion"
              buttonStyle={styles.btn}
              onPress={dLogin}
            />
            <Text
              style={styles.registro}
              onPress={() => navigation.navigate("registro")} //navegacion hacia registro
            >
              Aun no tienes cuenta?{" "}
              <Text style={styles.bton_registro}>Registrate</Text>
            </Text>
            <Loading isVisible={loading} text="Iniciando Sesion" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "" };
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
    borderColor: "blue",
    marginBottom: 25, // Agregar un margen inferior de 10 puntos
  },
  btnContainer: {
    marginTop: 20,
    width: "80%",
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "blue",
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
    position: 'absolute',
    flex: 1.5,
    backgroundColor: "white",
    bottom:30,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    borderWidth: 1,
    borderColor: "#0aabba",
    width: "90%",
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',

    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 2.2}]
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
});
