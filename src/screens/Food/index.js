import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import DailyMeals from "../../components/DailyMeals";
import styles from "./styles";
import { foodData } from "../../constants/dummyData";
import AppLayout from "../../layouts/AppLayout";
import { COLORS } from "../../constants";
import {
  faMicrophone,
  faCamera,
  faAppleAlt,
  faHamburger,
  faBowlFood,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

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

const ActionButton = ({ icon, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <FontAwesomeIcon icon={icon} size={24} color="white" />
  </TouchableOpacity>
);

const FoodItem = (data) => {
  const { name, kcal, servingSize, imageUrl } = data.item;

  return (
    <View style={styles.foodItemContainer}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.foodImage} />
      ) : (
        <View style={styles.iconPlaceholder}>
          <FontAwesomeIcon icon={faBowlFood} size={40} color="orange" />
        </View>
      )}
      <View style={styles.textContainer}>
        <Text style={styles.foodName}>{name}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.foodDetail}>{kcal} kcal</Text>
          <Text style={styles.foodDetail}>{servingSize}</Text>
        </View>
      </View>
    </View>
  );
};

const Food = ({ aiScannedFoods, recentlyHadFoods }) => {
  return (
    <AppLayout statuBarColor={COLORS.white}>
      <View style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header title="Food" />
        </View>

        <View style={styles.container}>
          <FoodSearchBar />
          <View style={styles.iconContainer}>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesomeIcon
                icon={faMicrophone}
                size={20}
                color={styles.icon.color}
              />
              <Text style={styles.iconButtonText}>Voice Search</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <FontAwesomeIcon
                icon={faCamera}
                size={20}
                color={styles.icon.color}
              />
              <Text style={styles.iconButtonText}>Scan Food</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.listTitle}>Scanned</Text>
          <FlatList
            data={dummyAIScanData}
            renderItem={({ item }) => <FoodItem item={item} />}
            keyExtractor={(item) => item.id}
          />

          <Text style={styles.listTitle}>Recently Had</Text>
          <FlatList
            data={dummyRecentData}
            renderItem={({ item }) => <FoodItem item={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </AppLayout>
  );
};

export default Food;
