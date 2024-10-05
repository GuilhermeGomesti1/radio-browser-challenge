import axios from "axios";
import { Station } from "@/app/types/types";

const fetchStations = async (query: string): Promise<Station[]> => {
  try {
    const response = await axios.get(
      `https://de1.api.radio-browser.info/json/stations/search?limit=100&name=${query}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stations:", error);
    throw error;
  }
};

export { fetchStations };
