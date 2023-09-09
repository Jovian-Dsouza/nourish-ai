import React, { useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native";
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
import AppLayout from "../../layouts/AppLayout";
import { COLORS } from "../../constants";
import SlideUpMenu from "../../components/SlideUpMenu";

const Home = () => {
  const Stack = createStackNavigator();
  const [menuVisible, setMenuVisible] = useState(true);

  const handleDateChange = (newDate) => {
    console.log("Date change: ", newDate)
  }

  return (
    <AppLayout
      statuBarColor={menuVisible ? "rgba(0,0,0,0.7)" : COLORS.lightGreen}
    >
      {menuVisible && (
        // The overlay
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.65)", // semi-transparent black
            zIndex: 5, // ensure it's below the SlideUpMenu but above other content
          }}
          onPress={() => setMenuVisible(false)}
        />
      )}
      {menuVisible && (
        <SlideUpMenu
          isVisible={menuVisible}
          onClose={() => setMenuVisible(false)}
        />
      )}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Header title="Home" />
          <WeekDaySelector onDateChange={handleDateChange} />
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
      <MenuButtons onAdd={() => setMenuVisible(true)} />
    </AppLayout>
  );
};

export default Home;
