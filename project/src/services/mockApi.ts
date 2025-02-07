import { SatisfactionData } from "../types";

const API_URL = "http://127.0.0.1:5000/api/satisfaction"; // Flask backend URL

export const fetchSatisfactionData = async (): Promise<SatisfactionData> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: SatisfactionData = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching satisfaction data:", error);
    throw error;
  }
};
