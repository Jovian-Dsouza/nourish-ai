const API_ENDPOINT = "https://api.edamam.com/api/food-database/v2/parser";
const APP_ID = "67f8b0cf";
const APP_KEY = "2acae21e1b73429e6aa9d7267ac45e1c";

const fetchFoodSuggestions = async (query) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}?ingr=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    return data.hints ? data.hints : [];
  } catch (error) {
    console.error("Failed to fetch suggestions:", error);
    throw error;
  }
};

const extractUsefulData = (item) => {
  console.log(item)
  return {
    id: item.food.foodId,
    name: item.food.label,
    image: item.food.image,
    calories: item.food.nutrients.ENERC_KCAL,
    fats: item.food.nutrients.FAT,
    proteins: item.food.nutrients.PROCNT,
    carbs: item.food.nutrients.CHOCDF,
    servingSize: "1 unit",
  };
};

export { fetchFoodSuggestions, extractUsefulData };
