import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const IconInfo = () => {
  return (
    <View style={styles.statusInfoContainer}>
      <View style={styles.statusInfoItem}>
        <Icon name="check" size={18} color="green" style={styles.ticketIcon} />
        <Text style={styles.statusInfoText}>Served</Text>
      </View>
      <View style={styles.statusInfoItem}>
        <Icon
          name="clock-o"
          size={18}
          color="orange"
          style={styles.ticketIcon}
        />
        <Text style={styles.statusInfoText}>Waiting</Text>
      </View>
      <View style={styles.statusInfoItem}>
        <Icon
          name="bookmark"
          size={18}
          color="blue"
          style={styles.ticketIcon}
        />
        <Text style={styles.statusInfoText}>Reserved</Text>
      </View>
      <View style={styles.statusInfoItem}>
        <Icon name="play" size={18} color="purple" style={styles.ticketIcon} />
        <Text style={styles.statusInfoText}>Serving</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  statusInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusInfoText: {
    fontSize: 12,
    color: "#888",
    marginLeft: 3,
  },
});

export default IconInfo;
