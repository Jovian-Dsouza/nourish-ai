import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMicrophone, faCamera } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import AppLayout from "../../layouts/AppLayout";
import FoodItem from "../../components/FoodItem";
import styles from "./styles";
import { COLORS } from "../../constants";
import { foodData } from "../../constants/dummyData";

const dummyAIScanData = [
  { id: "1", name: "Burger", kcal: "354", servingSize: "1 piece" },
];

const dummyRecentData = [
  { id: "1", name: "Salad", kcal: "150", servingSize: "1 bowl" },
  { id: "2", name: "Pasta", kcal: "200", servingSize: "1 plate" },
];

const FoodSearchBar = ({ onChange }) => (
  <TextInput
    style={styles.searchInput}
    placeholder="Search in food database"
    onChangeText={onChange}
  />
);

const ActionButton = ({ icon, label }) => (
  <TouchableOpacity style={styles.iconButton}>
    <FontAwesomeIcon icon={icon} size={20} color={styles.icon.color} />
    <Text style={styles.iconButtonText}>{label}</Text>
  </TouchableOpacity>
);

const FoodList = ({ title, data }) => (
  <>
    <Text style={styles.listTitle}>{title}</Text>
    <FlatList
      data={data}
      renderItem={({ item }) => <FoodItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  </>
);

const Food = ({ route }) => {
  const mealType = route.params?.mealType || "Default Meal";

  return (
    <AppLayout statuBarColor={COLORS.white}>
      <View style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header title="Food" />
        </View>

        <View style={styles.container}>
          <FoodSearchBar />
          <View style={styles.iconContainer}>
            <ActionButton icon={faMicrophone} label="Voice Search" />
            <ActionButton icon={faCamera} label="Scan Food" />
          </View>
          <FoodList title="Scanned" data={dummyAIScanData} />
          <FoodList title="Recently Had" data={dummyRecentData} />
        </View>
      </View>
    </AppLayout>
  );
};

export default Food;
