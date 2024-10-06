import React, { createContext, useContext, useEffect, useState } from "react";
import { Station } from "@/app/types/types";

const FavoriteContext = createContext<{
  favorites: Station[];
  toggleFavorite: (radio: Station) => void;
}>({
  favorites: [],
  toggleFavorite: () => {},
});

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Station[]>([]);
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (radio: Station) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorited = prevFavorites.some(
        (fav) => fav.stationuuid === radio.stationuuid
      );

      const updatedFavorites = isAlreadyFavorited
        ? prevFavorites.filter((fav) => fav.stationuuid !== radio.stationuuid)
        : [...prevFavorites, radio];

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};
export const useFavorites = () => {
  return useContext(FavoriteContext);
};
