import axios from "axios";
import { Station } from "@/app/types/types";

const fetchStations = async (query: string): Promise<Station[]> => {
  const response = await axios.get(
    `https://de1.api.radio-browser.info/json/stations/search?limit=10&name=${query}`
  );

  console.log(response.data);

  return response.data;
};

export { fetchStations };
