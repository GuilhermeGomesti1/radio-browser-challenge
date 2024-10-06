"use client";
import React, { useRef, useEffect } from "react";
import { Station } from "@/app/types/types";
import FavoriteButton from "@/app/components/FavoriteButton";

interface RadioItemProps {
  radio: Station;
  onSelect: (radio: Station) => void;
}

const RadioItem: React.FC<RadioItemProps> = ({ radio, onSelect }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSelect = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    onSelect(radio);
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handlePause = () => {
        audioElement.currentTime = 0;
      };

      audioElement.addEventListener("pause", handlePause);

      return () => {
        audioElement.removeEventListener("pause", handlePause);
      };
    }
  }, [audioRef]);

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
      <audio
        ref={audioRef}
        controls
        className="ml-4"
        src={radio.url_resolved}
      />
      <FavoriteButton radio={radio} />
    </li>
  );
};

export default RadioItem;
