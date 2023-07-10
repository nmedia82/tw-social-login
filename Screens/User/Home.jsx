import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  View,
  Text,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../../Stylels";
import {
  getCurrentUser,
  getData,
  logout,
  storeData,
} from "../../Services/auth";
import CounterItem from "../../Components/CounterItem";
import Heading from "../../Components/Header";
import { getUserTokens } from "../../Services/model";
import TokenItem from "../../Components/TokenItem";

const MAX_TOKEN_DISPLAY = 5;
const TOKEN_EXPIRY_IN_DAYS = 1;

export default function Home({ navigation, route }) {
  const [myTokens, setMyTokens] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);

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

  const handleTrackToken = (counterData) => {
    console.log(counterData);
    setSelectedCounter(counterData);
    setModalVisible(true);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(true);
    setRefreshing(false);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCounter(null);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <SafeAreaView style={styles.screenContainer}>
        <TouchableOpacity
          onPress={handleIssueToken}
          style={styles.iconContainer}
        >
          <Icon
            name="plus-circle"
            size={98}
            color="orange"
            style={styles.ticketIcon}
          />
          <Text>Get Token</Text>
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
                  {/* Display Counter Info Here */}
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
