"use client";
import React from "react";
import { Station } from "@/app/types/types";
import { useFavorites } from "@/app/favoriteContext";

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
      className={`ml-2 ${isFavorited ? "text-yellow-500" : "text-gray-500"}`}
    >
      {isFavorited ? "⭐" : "☆"}{" "}
    </button>
  );
};

export default FavoriteButton;
