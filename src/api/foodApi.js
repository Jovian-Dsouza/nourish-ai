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

export { fetchFoodSuggestions };
