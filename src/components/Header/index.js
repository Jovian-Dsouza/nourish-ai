import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEllipsis,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ProfileLogo = () => (
  <TouchableOpacity>
    <FontAwesomeIcon icon={faUser} />
  </TouchableOpacity>
);

const SettingsLogo = () => (
  <TouchableOpacity>
    <FontAwesomeIcon icon={faEllipsis} />
  </TouchableOpacity>
);

const Header = () => (
  <View style={styles.header}>
    <ProfileLogo />
    <Text style={styles.headerTitle}>Home</Text>
    <SettingsLogo />
  </View>
);

export default Header;