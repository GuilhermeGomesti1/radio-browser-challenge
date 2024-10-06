"use client";
import React, { useState } from "react";
import FavoriteRadios from "@/app/components/FavoriteRadios";
import { useFavorites } from "../context/favoriteContext";
import { Station } from "../types/types";
import RadioItem from "@/app/components/RadioItem";
import favoritesImg from "../../../public/favoritesImg.png";
import Image from "next/image";
import BackButton from "../components/BackButton";

const FavoritePage: React.FC = () => {
  const { favorites, isLoading } = useFavorites();
  const [selectedRadio, setSelectedRadio] = useState<Station | null>(null);

  const handleRadioSelect = (radio: Station) => {
    setSelectedRadio(radio);
  };

  const handleBack = () => {
    setSelectedRadio(null);
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="flex justify-center mb-4 pt-4">
        <Image
          src={favoritesImg}
          alt="Favorites IMG"
          width={519}
          height={97}
          className="object-contain"
          loading="lazy"
          quality={100}
        />
      </div>{" "}
      {selectedRadio ? (
        <>
          <div className="max-w-[600px] mx-auto  ">
            <RadioItem radio={selectedRadio} onSelect={setSelectedRadio} />
            <div className="flex justify-center items-center mt-4 ">
              {" "}
              <div className="mt-4 text-center text-white">
                <h2 className="text-xl font-bold">{selectedRadio.name}</h2>
                <p>{selectedRadio.language} </p>
                <p>{selectedRadio.country}</p>
                <BackButton
                  setSelectedRadio={setSelectedRadio}
                  setQuery={() => {}}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="max-w-[600px] mx-auto flex flex-col gap-8">
          {" "}
          <FavoriteRadios
            favorites={favorites}
            isLoading={isLoading}
            handleRadioSelect={handleRadioSelect}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
