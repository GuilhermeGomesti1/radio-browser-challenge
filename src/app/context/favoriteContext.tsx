import React, { createContext, useContext, useEffect, useState } from "react";
import { Station } from "@/app/types/types";

const FavoriteContext = createContext<{
  favorites: Station[];
  toggleFavorite: (radio: Station) => void;
  isLoading: boolean;
}>({
  favorites: [],
  toggleFavorite: () => {},
  isLoading: true,
});

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    setIsLoading(false);
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
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isLoading }}>
      {" "}
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  return useContext(FavoriteContext);
};
