"use client";
import React, { useState } from "react";

const RadioSearch: React.FC<{
  setLocalQuery: (query: string) => void;
}> = ({ setLocalQuery }) => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = () => {
    setLocalQuery(query);
    setQuery("");
  };

  return (
    <div className="flex flex-col items-center ml-5 md:ml-0 md:mr-12 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar rádios"
        className="border p-2 mb-2 w-80 "
      />
      <button
        onClick={handleSearch}
        className="bg-[#FF6B00] p-2 mb-2 w-80 rounded font-bold text-white transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103  "
      >
        Pesquisar
      </button>
    </div>
  );
};

export default RadioSearch;
