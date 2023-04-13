import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import { useState } from "react";
import Modal from "../Modal";
import Cambiar_nombre_form from "./Cambiar_nombre_form";
import Cambiar_email_form from "./Cambiar_email_form";
import Cambiar_contra_form from "./Cambiar_contra_form";

export default function Opciones_Cuenta({ user, toastRef, setReloadUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(null); //para mandar al modal

  const generateOptions = () => {
    return [
      {
        title: "Cambio de Nombre y Apellidos",
        iconNameLeft: "account-circle",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("displayName"),
      },
      {
        title: "Cambio de Email",
        iconNameLeft: "at",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("editar_email"),
      },
      {
        title: "Cambio de Contraseña",
        iconNameLeft: "lock-reset",
        iconColorLeft: "#a7bfd3",
        iconNameRight: "chevron-right",
        iconColorRight: "#a7bfd3",
        onPress: () => selectedComponent("editar_password"),
      },
    ];
  };

  const selectedComponent = (key) => {
    //elegir opciones
    switch (key) {
      case "displayName":
        setRenderComponent(
          <Cambiar_nombre_form
            displayName={user.displayName}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;

      case "editar_email":
        setRenderComponent(
          <Cambiar_email_form
            email={user.email}
            setShowModal={setShowModal}
            toastRef={toastRef}
            setReloadUser={setReloadUser}
          />
        );
        break;

      case "editar_password":
        setRenderComponent(
          <Cambiar_contra_form
            setShowModal={setShowModal}
            toastRef={toastRef}
          />
        );
        break;

      default:
        setRenderComponent(null);
        break;
    }

    setShowModal(true);
  };

  const opciones_menu = generateOptions();

  return (
    <View>
      {opciones_menu.map((menu, index) => (
        <ListItem
          key={index}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        >
          <Icon
            type="material-community"
            name={menu.iconNameLeft}
            color={menu.iconColorLeft}
            size={25}
            style={styles.icon}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.title}>{menu.title}</ListItem.Title>
          </ListItem.Content>
          <Icon
            type="material-community"
            name={menu.iconNameRight}
            color={menu.iconColorRight}
            size={25}
            style={styles.icon}
          />
        </ListItem>
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#a7bfd3",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  icon: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
