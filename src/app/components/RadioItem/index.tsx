"use client";
import React from "react";
import { Station } from "@/app/types/types";
import FavoriteButton from "@/app/components/FavoriteButton";
import AudioPlayer from "../AudioPlayer";

interface RadioItemProps {
  radio: Station;
  onSelect: (radio: Station) => void;
}

const RadioItem: React.FC<RadioItemProps> = ({ radio, onSelect }) => {
  const handleSelect = () => {
    onSelect(radio);
  };

  const handlePause = () => {
    console.log(`Áudio pausado: ${radio.name}`);
  };

  return (
    <li
      className="flex items-center text-white mb-2 justify-center"
      onClick={handleSelect}
    >
      <div className="flex items-center w-[300px]">
        <div
          className={`w-8 h-8 mr-2 bg-cover ${
            radio.favicon ? "" : "bg-gray-400"
          }`}
          style={{
            backgroundImage: radio.favicon ? `url(${radio.favicon})` : "none",
          }}
        />
        <span className="text-white flex-1 min-w-[120px] text-left">
          {radio.name}
        </span>
      </div>

      <AudioPlayer src={radio.url_resolved} onPause={handlePause} />

      <FavoriteButton radio={radio} />
    </li>
  );
};

export default RadioItem;
