"use client";
import React from "react";
import { Station } from "@/app/types/types";
import Image from "next/image";
import carregandogif from "../../../../../public/carregandogif.gif";
import RadioItem from "../radio-item";

interface FavoriteRadiosProps {
  favorites: Station[];
  isLoading: boolean;
  handleRadioSelect: (radio: Station) => void;
}

const FavoriteRadios: React.FC<FavoriteRadiosProps> = ({
  favorites = [],
  isLoading,
  handleRadioSelect,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Image src={carregandogif} alt="Loading" width={258} height={310} />
      </div>
    );
  }

  return (
    <ul className="list-none p-0 ">
      {favorites.length > 0 ? (
        favorites.map((radio) => (
          <RadioItem
            key={radio.stationuuid}
            radio={radio}
            onSelect={handleRadioSelect}
          />
        ))
      ) : (
        <li className="text-white text-center">
          Nenhuma rádio favorita encontrada.
        </li>
      )}
    </ul>
  );
};

export default FavoriteRadios;
