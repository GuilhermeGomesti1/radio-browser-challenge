"use client";
import React, { useEffect, useState } from "react";
import { Station } from "@/app/types/types";
import FavoriteButton from "@/app/components/FavoriteButton";
import AudioPlayer from "../AudioPlayer";
import MobileAudioPlayer from "../MobileAudioPlayer";

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

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex items-center text-white mb-2">
      <div className="flex items-center w-[300px] relative">
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

        <button
          onClick={handleSelect}
          className="absolute left-0 -mt-1 -ml-2 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 text-[#FF6B00] hover:text-[#ffc800]"
          title="Mais informações"
          style={{ transform: "translateY(-50%)" }}
        >
          <span className="text-lg">ℹ️</span>
        </button>
      </div>

      <div className="flex items-center ml-auto">
        {isMobile ? (
          <MobileAudioPlayer
            src={radio.url_resolved}
            isAvailable={!!radio.url_resolved}
          />
        ) : (
          <AudioPlayer src={radio.url_resolved} onPause={handlePause} />
        )}
        <FavoriteButton radio={radio} />
      </div>
    </div>
  );
};

export default RadioItem;
