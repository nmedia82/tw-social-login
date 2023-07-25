import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  View,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../../Stylels";
import {
  getCurrentUser,
  getData,
  logout,
  storeData,
} from "../../Services/auth";
import Heading from "../../Components/Header";
import { getUserTokens, getCounterByID } from "../../Services/model";
import TokenItem from "../../Components/TokenItem";
import CounterItemStatuses from "../../Components/CounterItemStatuses";

const MAX_TOKEN_DISPLAY = 5;
const TOKEN_EXPIRY_IN_DAYS = 1;

export default function Home({ navigation, route }) {
  const [UserName, setUserName] = useState([]);
  const [myTokens, setMyTokens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [counterDetails, setCounterDetails] = useState(null);

  useEffect(() => {
    const { new_token } = route.params || {};
    const refresh_data = new_token ? true : false;
    fetchData(refresh_data);
    if (new_token) {
      delete route.params.new_token;
    }
  }, [route.params]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("UserSettings")}>
          <Icon name="gear" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchData = async (freshData = false) => {
    try {
      const currentUser = await getCurrentUser();
      setUserName(currentUser.data.display_name);
      const existingTokens = await getData("user_tokens");

      let tokens;

      if (freshData || !existingTokens) {
        const { data: userTokens } = await getUserTokens(currentUser.ID);
        await storeData("user_tokens", userTokens.data.tokens);
        tokens = userTokens.data.tokens;
      } else {
        tokens = existingTokens;
      }

      const currentTime = new Date();
      const waitingTokens = tokens
        .filter(
          (token) =>
            token.token_status === "waiting" &&
            new Date(token.issued_date) <= currentTime &&
            currentTime - new Date(token.issued_date) <=
              TOKEN_EXPIRY_IN_DAYS * 24 * 60 * 60 * 1000
        )
        .sort((a, b) => new Date(b.issued_date) - new Date(a.issued_date)); // Sort by issued_date in descending order
      const slicedTokens = waitingTokens.slice(0, MAX_TOKEN_DISPLAY);
      setMyTokens(slicedTokens);
    } catch (error) {
      console.error(error);
    }
  };

  const handleIssueToken = () => {
    navigation.navigate("GetToken");
  };

  const handleTrackToken = async (counterData) => {
    setSelectedCounter(counterData);
    setModalVisible(true);

    try {
      const counterId = counterData.counter_id;
      const { data: counterDetailsData } = await getCounterByID(counterId);
      // console.log(counterDetailsData);
      setCounterDetails(counterDetailsData.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(true);
    setRefreshing(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCounter(null);
    setCounterDetails(null);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <SafeAreaView style={styles.screenContainer}>
        <TouchableOpacity style={styles.iconContainer}>
          <Icon
            name="plus-circle"
            size={98}
            color="orange"
            style={styles.ticketIcon}
          />
          <Text>Hi {UserName}</Text>
        </TouchableOpacity>

        {myTokens.length > 0 && (
          <View style={styles.MyTokensContainer}>
            <Heading>My Tokens</Heading>

            {myTokens.map((tokenData, index) => (
              <TokenItem
                tokenData={tokenData}
                onTrackToken={handleTrackToken}
                key={index}
              />
            ))}
          </View>
        )}

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {selectedCounter && (
                <View>
                  <Text style={styles.modalTitle}>
                    {selectedCounter.counter_title}
                  </Text>
                  {counterDetails ? (
                    <CounterItemStatuses
                      statuses_stats={counterDetails.counter.statuses_stats}
                      layout="list"
                    />
                  ) : (
                    <ActivityIndicator size="small" color="#888" />
                  )}
                </View>
              )}

              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}
