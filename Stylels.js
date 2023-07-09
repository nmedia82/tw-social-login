import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  scrollViewContent: {
    flex: 1,
  },
  iconContainer: {
    marginBottom: 20,
    borderBottomColor: "black",
    borderBottomWidth: 1, // Specify the desired border width
  },
  loginContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  forgotPassword: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    width: "100%",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  ticketIcon: {},

  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  businessInfo: {
    // marginVertical: 10,
    width: "100%",
  },
  recentCountersContainer: {
    width: "100%",
    alignItems: "center",
  },
  searchResults: {
    width: "100%",
  },
  searchResults: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
  },
});

export default styles;
