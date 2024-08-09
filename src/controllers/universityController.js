// universityController.js

import { fetchUniversities } from "../utils/api";
import {
  saveToLocalStorage,
  loadFromLocalStorage,
} from "../utils/localStorage";
import University from "../models/universityModel";

export const getUniversities = async () => {
  try {
    const data = await fetchUniversities();
    const universities = data.map(
      (uni) =>
        new University(uni.name, uni.country, uni.web_pages, uni.alpha_two_code)
    );
    saveToLocalStorage(universities);
    return universities;
  } catch (error) {
    const cachedData = loadFromLocalStorage();
    if (cachedData) {
      return cachedData;
    } else {
      throw error;
    }
  }
};
