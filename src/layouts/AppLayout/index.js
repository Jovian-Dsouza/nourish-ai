import React from "react";
import { ScrollView, SafeAreaView, StatusBar } from "react-native";
import styles from "./styles";

const AppLayout = ({ children, statuBarColor }) => {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={statuBarColor} />
      {children}
    </SafeAreaView>
  );
};

export default AppLayout;
