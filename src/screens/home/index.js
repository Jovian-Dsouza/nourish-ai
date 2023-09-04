import React from "react";
import { View } from "react-native";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import WeekDaySelector from "@/components/WeekDaySelector";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../../components/Header";
import CaloriesSection from "../../components/CaloriesSection";
import MacrosSection from "../../components/MacrosSection";
import DailyMeals from "../../components/DailyMeals";
import MenuButtons from "../../components/MenuButtons";
import styles from "./styles";
import {
  consumedKcal,
  totalKcal,
  burnedKcal,
  macroData,
  foodData,
} from "../../constants/dummyData";

const Home = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={styles.container.backgroundColor} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header />
          <WeekDaySelector />
          <CaloriesSection
            consumedKcal={consumedKcal}
            totalKcal={totalKcal}
            burnedKcal={burnedKcal}
          />
          <MacrosSection macroData={macroData} />
        </View>

        {/* Daily meals */}
        <View style={styles.content}>
          <DailyMeals foodData={foodData} />
        </View>
      </ScrollView>
      <MenuButtons />
    </SafeAreaView>
  );
};

export default Home;