"use client";
import React from "react";

interface BackButtonProps {
  setSelectedRadio: (radio: null) => void;
  setQuery: (query: string) => void;
}

const BackButton: React.FC<BackButtonProps> = ({
  setSelectedRadio,
  setQuery,
}) => {
  const handleBack = () => {
    setSelectedRadio(null);
    setQuery("");
  };

  return (
    <button
      onClick={handleBack}
      className="bg-red-500 text-white px-4 py-2 rounded mt-4"
    >
      Voltar
    </button>
  );
};

export default BackButton;
