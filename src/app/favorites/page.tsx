"use client";
import React, { useState } from "react";
import FavoriteRadios from "../components/Radio/FavoriteRadios";
import { useFavorites } from "../context/favoriteContext";
import { Station } from "../types/types";
import RadioItem from "../components/Radio/RadioItem";
import favoritesImg from "../../../public/favoritesImg.png";
import Image from "next/image";
import BackButton from "../components/Buttons/BackButton";

const ITEMS_PER_PAGE = 10;

const FavoritePage: React.FC = () => {
  const { favorites, isLoading } = useFavorites();
  const [selectedRadio, setSelectedRadio] = useState<Station | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleRadioSelect = (radio: Station) => {
    setSelectedRadio(radio);
  };

  const handleBack = () => {
    setSelectedRadio(null);
  };

  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
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
        <div className="max-w-[600px] mx-auto">
          <RadioItem radio={selectedRadio} onSelect={setSelectedRadio} />
          <div className="flex justify-center items-center mt-4">
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
      ) : (
        <div className="max-w-[670px] mx-auto flex flex-col gap-8">
          <FavoriteRadios
            favorites={currentFavorites}
            isLoading={isLoading}
            handleRadioSelect={handleRadioSelect}
          />
          <div className="flex justify-center mt-4 mb-16 gap-2 items-center">
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className={`bg-[#FF6B00] rounded font-bold text-white transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103 px-4 py-2 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Anterior
            </button>{" "}
            <span className="text-[#FF6B00] "> {currentPage}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`bg-[#FF6B00] rounded font-bold text-white transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103 px-4 py-2 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {" "}
              Próxima
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
