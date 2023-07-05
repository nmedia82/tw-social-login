// import config from "../config";
import httpService from "./http";
import pluginData from "./data.json";

const { siteurl } = pluginData;
const endpoint = `${siteurl}/wp-json/tokenwala/v1`;

export function getVendorCounters(user_id) {
  const url = `${endpoint}/get-vendor-counters?user_id=${user_id}`;
  return httpService.get(url);
}

export function getCounterByID(counter_id) {
  const url = `${endpoint}/get-counter?counter_id=${counter_id}`;
  return httpService.get(url);
}

export function openCounter(data) {
  const url = `${endpoint}/open-counter`;
  return httpService.post(url, data);
}

export function setTokenStatus(data) {
  const url = `${endpoint}/set-token-status`;
  return httpService.post(url, data);
}

export function setTokenStatusAndNext(data) {
  const url = `${endpoint}/set-token-status-serving-next`;
  return httpService.post(url, data);
}
