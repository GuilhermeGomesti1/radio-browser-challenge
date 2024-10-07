import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "./api";
import { Station } from "@/app/types/types";

const useStations = (query: string) => {
  return useQuery<Station[], Error>({
    queryKey: ["stations", query],
    queryFn: async () => {
      const cachedData = localStorage.getItem(`stations_${query}`);
      if (cachedData) {
        return JSON.parse(cachedData);
      }

      const stations = await fetchStations(query);

      localStorage.setItem(`stations_${query}`, JSON.stringify(stations));

      return stations;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export { useStations };
