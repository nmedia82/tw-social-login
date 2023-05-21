// import config from "../config";
import httpService from "./http";
import pluginData from "./data.json";
import { getUserID, getUserRole } from "./auth";
import { get_setting } from "./helper";

const { siteurl } = pluginData;
const endpoint = `${siteurl}/wp-json/nowa/v1`;

export function getAllCourses() {
  const url = `${endpoint}/get-all-courses`;
  return httpService.get(url);
}

export function getTrainerCourses() {
  const user_id = getUserID();
  const url = `${endpoint}/get-trainer-courses?user_id=${user_id}`;
  return httpService.get(url);
}

export function getStudentCourses() {
  const user_id = getUserID();
  const url = `${endpoint}/get-student-enrolled-courses?user_id=${user_id}`;
  return httpService.get(url);
}

export function setActiveSubtitle(course_id, subtitle_id) {
  const data = { course_id, subtitle_id };
  const url = `${endpoint}/set-active-subtitle`;
  return httpService.post(url, data);
}

export function setCompletedSubtitle(course_id, subtitle_id) {
  const data = { course_id, subtitle_id };
  const url = `${endpoint}/set-completed-subtitle`;
  return httpService.post(url, data);
}

export function createCourse(data) {
  const url = `${endpoint}/create-course`;
  return httpService.post(url, data);
}

export function getUserMediaFiles() {
  const user_id = getUserID();
  const url = `${endpoint}/get-user-media?user_id=${user_id}`;
  return httpService.get(url);
}

export function createAccount(data) {
  const url = `${endpoint}/create-account`;
  return httpService.post(url, data);
}

export function verifyEmailCode(data) {
  const url = `${endpoint}/verify-email-code`;
  return httpService.post(url, data);
}
