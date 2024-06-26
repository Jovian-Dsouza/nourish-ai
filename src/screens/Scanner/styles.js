import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    //marginBottom: 16,
  },
  imagePreview: {
    flex: 1,
    resizeMode: "cover",
  },
  rescanContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  rescanButton: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  rescanText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  captureButton: {
    width: 70,
    height: 70,
    backgroundColor: "orange",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 50,
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
  },
  iconButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  resultContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 100, // This makes it circular
    marginBottom: 20,
  },

  foodName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  confidence: {
    fontSize: 18,
    color: "grey",
    marginBottom: 20,
  },

  nutritionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default styles;
