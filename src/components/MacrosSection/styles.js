import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const styles = StyleSheet.create({
  macrosSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  macrosCardSection: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  macrosCardSubText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "gray",
    marginTop: 10,
  },
  macrosCardText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
  macroBar: {
    width: 60,
    height: 5,
    borderRadius: 5,
    borderWidth: 0,
    unfilledColor: COLORS.inActiveStroke,
  },
});

export default styles;
