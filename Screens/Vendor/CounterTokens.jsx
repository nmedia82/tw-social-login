import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import CounterTokenItem from "../../Components/CounterTokenItem";
import Heading from "../../Components/Header";
import {
  addExtraTokens,
  closeCounter,
  getCounterByID,
  setTokenStatus,
  setTokenStatusAndNext,
} from "../../Services/model";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";

const HTTP_REQUEST_DELAY = 10000;

const CounterTokens = ({ navigation, route }) => {
  const [Counter, setCounter] = useState({});
  const [CounterTokens, setCounterTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefreshButtonDisabled, setIsRefreshButtonDisabled] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(HTTP_REQUEST_DELAY / 1000);
  const [ExtraTokens, setExtraTokens] = useState(1);

  const fetchData = async () => {
    setIsLoading(true);
    const { counterData } = route.params;
    const { data: counter } = await getCounterByID(counterData.id);
    // console.log(counter.data.counter);
    setCounter(counter.data.counter);
    setCounterTokens(counter.data.counter.tokens);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTokenStatusUpdate = async (token_no, curr_status, status) => {
    let tokenData = {
      counter_id: Counter.id,
      token_no,
      status,
    };
    // console.log(tokenData);
    const tokens = [...CounterTokens];
    try {
      let response = {};
      if ("served_next" === status) {
        tokenData = { ...tokenData, status: "served" };
        response = await setTokenStatusAndNext(tokenData);
        const { next_token } = response.data.data;
        if (next_token) {
          // updating token view
          const found = tokens.find((token) => token.token_no === next_token);
          const index = tokens.indexOf(found);
          tokens[index] = { ...found, token_status: "serving" };
        }
      } else {
        response = await setTokenStatus(tokenData);
      }

      const { data, success } = response.data;
      // console.log(data.token);
      if (!success) {
        return Alert.alert("Error", data.message);
      }

      // updating token view
      const found = tokens.find((token) => token.token_no === token_no);
      const index = tokens.indexOf(found);
      tokens[index] = data.token;
      setCounterTokens(tokens);
    } catch (e) {
      console.log("Error while update token status:" + e.message);
    }
  };

  const handleRefresh = async () => {
    if (isRefreshButtonDisabled) {
      return; // Exit if the button is disabled
    }

    setIsRefreshButtonDisabled(true);
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);

    setTimeout(() => {
      setIsRefreshButtonDisabled(false); // Enable the refresh button after the cooldown period
    }, HTTP_REQUEST_DELAY);
  };

  useEffect(() => {
    if (isRefreshButtonDisabled) {
      setCooldownTime(HTTP_REQUEST_DELAY / 1000); // Reset the cooldown time to its initial value

      const timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer); // Stop the timer when the countdown reaches 0
            setIsRefreshButtonDisabled(false); // Enable the refresh button
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isRefreshButtonDisabled]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleRefresh}
          disabled={isRefreshButtonDisabled}
          style={styles.refreshIcon}
        >
          {isRefreshButtonDisabled ? (
            <Text style={styles.cooldownText}>{cooldownTime}s</Text>
          ) : (
            <Icon name="refresh" size={24} color="black" />
          )}
        </TouchableOpacity>
      ),
      title: `Coutner# ${route.params.counterData.id}`,
    });
  }, [navigation, isRefreshButtonDisabled, cooldownTime]);

  const handleCloseCounter = async () => {
    Alert.alert(
      "Confirm",
      "Are you sure you want to close the counter?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Close",
          onPress: async () => {
            const postData = { counter_id: Counter.id };
            const { data: response } = await closeCounter(postData);
            if (!response.status) {
              return Alert.alert("Error", message);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleExtraTokens = async () => {
    const postData = { counter_id: Counter.id, increase: ExtraTokens };
    try {
      const { data: response } = await addExtraTokens(postData);
      const { new_tokens, message } = response.data;
      if (!response.status) {
        return Alert.alert("Error", message);
      }
      setCounterTokens(new_tokens);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.headContainer}>
          <Heading style={styles.headTitle}>{Counter.title}</Heading>
          <View style={styles.closeButton}>
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: "red" },
                Counter.status === "closed" && styles.disabledButton,
              ]}
              onPress={handleCloseCounter}
              disabled={Counter.status === "closed"}
            >
              <Text style={styles.buttonText}>
                {Counter.status === "closed" ? "Closed" : "Close"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="black"
            style={styles.loadingIndicator}
          />
        ) : (
          <>
            {CounterTokens.map((Token, index) => (
              <CounterTokenItem
                Token={Token}
                key={index}
                onTokenStatusUpdate={handleTokenStatusUpdate}
                onRefresh={handleRefresh}
              />
            ))}
            <View style={styles.addTokenContainer}>
              <View style={styles.tokenDropdown}>
                <Picker
                  selectedValue={ExtraTokens}
                  onValueChange={(itemValue) => setExtraTokens(itemValue)}
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <Picker.Item
                      key={index}
                      label={(index + 1).toString()}
                      value={index + 1}
                    />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleExtraTokens}
              >
                <Text style={styles.buttonText}>Add Extra Tokens</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  headContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  headTitle: {
    flex: 1, // Take up available space on the left
  },
  closeButton: {
    flex: 1, // Take up equal space
    alignItems: "flex-end", // Align the button to the right side
  },
  button: {
    backgroundColor: "red",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.5, // You can adjust the opacity value to your preference
  },
  value: {
    fontSize: 16,
    flex: 2,
  },
  refreshIcon: {
    marginRight: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  cooldownText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  addTokenContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  tokenDropdown: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "blue",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
  },
});

export default CounterTokens;
