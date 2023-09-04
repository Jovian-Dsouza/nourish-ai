import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import styles from "./styles";

const AppLayout = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={styles.container.backgroundColor} />
      {children}
    </SafeAreaView>
  );
};

export default AppLayout;
