"use client";
import React from "react";
import { Station } from "@/app/types/types";
import { useFavorites } from "@/app/context/favoriteContext";

const FavoriteButton: React.FC<{
  radio: Station;
}> = ({ radio }) => {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorited = favorites.some(
    (fav) => fav.stationuuid === radio.stationuuid
  );

  const handleToggleFavorite = () => {
    toggleFavorite(radio);
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleToggleFavorite();
      }}
      className={`flex items-center justify-center w-12 h-12 text-2xl ${
        isFavorited ? "text-yellow-500" : "text-gray-500"
      } transition-colors duration-200`}
    >
      {isFavorited ? "⭐" : "☆"}
    </button>
  );
};

export default FavoriteButton;
