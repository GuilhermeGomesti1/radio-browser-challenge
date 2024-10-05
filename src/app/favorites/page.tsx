"use client";
import React, { useState } from "react";
import FavoriteRadios from "@/app/components/FavoriteRadios";
import { useFavorites } from "../favoriteContext";
import { Station } from "../types/types";
import RadioItem from "@/app/components/RadioItem";

const FavoritePage: React.FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  const { favorites } = useFavorites();
  const [selectedRadio, setSelectedRadio] = useState<Station | null>(null);

  const handleRadioSelect = (radio: Station) => {
    setSelectedRadio(radio);
  };

  const handleBack = () => {
    setSelectedRadio(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <h1 className="text-white text-2xl mb-4 text-center">Favorite Radios</h1>
      {selectedRadio ? (
        <>
          <RadioItem radio={selectedRadio} onSelect={setSelectedRadio} />
          <button
            onClick={handleBack}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            Voltar
          </button>
        </>
      ) : (
        <FavoriteRadios
          favorites={favorites}
          isLoading={isLoading}
          handleRadioSelect={handleRadioSelect}
        />
      )}
    </div>
  );
};

export default FavoritePage;
