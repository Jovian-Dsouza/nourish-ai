import React, { useState } from "react";
import { View, Text, Animated, Image } from "react-native";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity } from "react-native-gesture-handler";
import styles from "./styles";

const FoodItem = ({ item, onPress }) => {
  const { name, kcal, servingSize, imageUrl } = item;
  const [selected, setSelected] = useState(false);
  const [scale] = useState(new Animated.Value(1)); // Scale for animation

  const handlePress = () => {
    Animated.spring(scale, {
      toValue: selected ? 1 : 1.05,
      friction: 3,
      useNativeDriver: true,
    }).start();
    setSelected(!selected);
    onPress(item);
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <Animated.View
        style={[
          styles.foodItemContainer,
          {
            transform: [{ scale: scale }],
            backgroundColor: selected ? "#ffdbcc" : "#f7f7f7",
          },
        ]}
      >
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
      </Animated.View>
    </TouchableOpacity>
  );
};

export default FoodItem;
