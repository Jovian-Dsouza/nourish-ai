import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  PanResponder,
  StyleSheet,
} from "react-native";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { COLORS } from "../../constants";
import styles from "./styles";

const SlideUpMenu = ({ isVisible, onClose }) => {
  const position = useRef(new Animated.Value(isVisible ? 0 : 350)).current;
  const panResponder = useSlideResponder(position, closeMenu);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: position }] }]}
      {...panResponder.panHandlers}
    >
      <MenuHeader />
      <MealsList />
    </Animated.View>
  );

  function closeMenu() {
    Animated.timing(position, {
      toValue: 350,
      duration: 200,
      useNativeDriver: true,
    }).start(onClose);
  }
};

function useSlideResponder(position, closeMenuCallback) {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesture) => {
      if (
        gesture.dy > 0 &&
        position.__getValue() >= -350 &&
        position.__getValue() <= 0
      ) {
        position.setValue(gesture.dy);
      }
    },
    onPanResponderRelease: (event, gesture) => {
      if (gesture.dy > 50) {
        closeMenuCallback();
      } else {
        Animated.spring(position, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
}

const MenuHeader = () => (
  <View style={styles.headerContainer}>
    <View style={styles.grabber} />
    <Text style={styles.title}>Log</Text>
  </View>
);

const MealsList = () => {
  const meals = [
    { name: "Breakfast", caloriesLeft: 500 },
    { name: "Snack", caloriesLeft: 200 },
    { name: "Lunch", caloriesLeft: 600 },
    { name: "Dinner", caloriesLeft: 400 },
  ];

  return (
    <View style={styles.grid}>
      {meals.map((meal, index) => (
        <MealCard key={index} meal={meal} />
      ))}
    </View>
  );
};

const MealCard = ({ meal }) => (
  <View style={styles.card}>
    <TouchableOpacity style={styles.addButton}>
      <FontAwesomeIcon icon={faPlus} size={20} color={COLORS.white} />
    </TouchableOpacity>
    <Text style={styles.mealName}>{meal.name}</Text>
    <Text style={styles.calories}>{meal.caloriesLeft} Calories left</Text>
  </View>
);


export default SlideUpMenu;
