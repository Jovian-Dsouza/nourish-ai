import React from "react";
import { View, Text } from "react-native";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import styles from "./styles";

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

export default FoodItem;
