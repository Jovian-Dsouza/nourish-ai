import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
  },

  content: {
    paddingHorizontal: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    height: 45,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  icon: {
    color: COLORS.orange,
  },
  iconButtonText: {
    marginLeft: 8,
    fontWeight: "bold",
    fontSize: 15,
  },
  iconButton: {
    flexDirection: "row",
    width: "48%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: COLORS.lightOrange,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  foodItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: 1,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { height: 2, width: 0 },
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
  },
  iconPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ebebeb",
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodDetail: {
    fontSize: 14,
    color: "#555",
  },
});

export default styles;
