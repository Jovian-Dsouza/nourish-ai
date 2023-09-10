import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ScrollView } from "react-native";
import useDebounce from "../../hooks/useDebounce";
import { fetchFoodSuggestions } from "../../api/foodApi";
import styles from "./styles";

const DEBOUNCE_DELAY = 300; // Time in milliseconds

const FoodSuggestion = ({ item, handleSuggestionTap }) => {
  return (
    <TouchableOpacity onPress={() => handleSuggestionTap(item)}>
      <Text style={styles.suggestionItem}>{item.food.label}</Text>
    </TouchableOpacity>
  );
};

const FoodSearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedInputValue = useDebounce(inputValue, DEBOUNCE_DELAY);

  const handleSuggestionTap = (item) => {
    console.log("Item selected", item.food);
    setInputValue("");
  };

  useEffect(() => {
    if (debouncedInputValue.length > 2) {
      // For instance, start recommending after 3 characters
      fetchFoodSuggestions(debouncedInputValue)
        .then((data) => {
            setSuggestions(data)
        })
        .catch(() => Alert.alert("Error", "Failed to fetch food suggestions."));
    } else {
      setSuggestions([]);
    }
  }, [debouncedInputValue]);

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search in food database"
        onChangeText={(text) => {
          setInputValue(text);
        }}
        value={inputValue}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          renderItem={({ item, index }) => (
            <FoodSuggestion
              item={item}
              handleSuggestionTap={handleSuggestionTap}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          style={styles.suggestionsList}
        />
      )}
    </View>
  );
};

export default FoodSearchBar;
