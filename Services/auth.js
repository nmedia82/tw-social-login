// import config from "../config";
import httpService from "./http";
import pluginData from "./data.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { siteurl } = pluginData;
const endpoint = `${siteurl}/wp-json/tokenwala/v1`;

export async function login(user_info) {
  const url = `${endpoint}/login`;
  const { data } = await httpService.post(url, user_info);
  // console.log(data);
  const { success, data: response } = data;

  if (success) {
    // login_user_locally(response);
    await storeData("user", response.user);
    await storeData("user_roles", response.user_roles);
    return response.user;
  }

  throw new Error("Username/password is invalid");
}

export function login_user_locally(user_data) {
  // AsyncStorage.setItem("@user", JSON.stringify(user_data.user));
  // AsyncStorage.setItem("@user_roles", JSON.stringify(user_data.user_roles));
}

export async function logout() {
  await AsyncStorage.removeItem("user");
}

export async function getUserID() {
  try {
    let user = await getData("user");
    user = JSON.parse(user);
    return user.ID;
  } catch (ex) {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    let user = await AsyncStorage.getItem("user");
    if (!user) return null;
    return JSON.parse(user);
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function storeData(key, value) {
  try {
    if (value) {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function getData(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    throw new Error(e.message);
  }
}

export function getUserRole() {
  try {
    let roles = AsyncStorage.getItem("user_roles");
    roles = JSON.parse(roles);

    if (roles.includes("administrator")) return "admin";
    if (roles.includes("trainer")) return "vendor";
    if (roles.includes("customer")) return "customer";
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
