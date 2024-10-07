"use client";
import React, { useEffect, useState } from "react";
import { Station } from "@/app/types/types";
import FavoriteButton from "../../Buttons/FavoriteButton";
import AudioPlayer from "../../players/AudioPlayer";
import MobileAudioPlayer from "../../players/MobileAudioPlayer";
import RadioEdit from "../RadioEdit";

interface RadioItemProps {
  radio: Station;
  onSelect: (radio: Station) => void;
}

const RadioItem: React.FC<RadioItemProps> = ({ radio, onSelect }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentRadio, setCurrentRadio] = useState<Station>(radio);
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

  useEffect(() => {
    const savedRadio = localStorage.getItem(`station_${radio.stationuuid}`);
    if (savedRadio) {
      setCurrentRadio(JSON.parse(savedRadio));
    }
  }, [radio.stationuuid]);

  const handleSelect = () => {
    onSelect(currentRadio);
  };

  const handlePause = () => {
    console.log(`Áudio pausado: ${currentRadio.name}`);
  };

  const handleSaveEdit = (updatedRadio: Station) => {
    setCurrentRadio(updatedRadio);
    localStorage.setItem(
      `station_${updatedRadio.stationuuid}`,
      JSON.stringify(updatedRadio)
    );
    setIsEditing(false);
  };

  return (
    <div className="flex items-center text-white mb-2">
      {isEditing ? (
        <RadioEdit
          radio={currentRadio}
          onSave={handleSaveEdit}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="flex items-center relative lg:w-[286px] ">
            <div
              className={`w-8 h-8 mr-2 bg-cover ${
                currentRadio.favicon ? "" : "bg-gray-400"
              }`}
              style={{
                backgroundImage: currentRadio.favicon
                  ? `url(${currentRadio.favicon})`
                  : "none",
              }}
            />
            <span className="text-white flex-1 min-w-[120px] text-left">
              {currentRadio.name}
            </span>

            <button
              onClick={handleSelect}
              className="absolute left-0 -mt-1 -ml-2 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-white bg-opacity-20 text-[#FF6B00] hover:text-[#ffc800]"
              title="Mais informações"
              style={{ transform: "translateY(-50%)" }}
            >
              <span className="text-lg  ">ℹ️</span>
            </button>
          </div>

          <div className="flex items-center ml-auto ">
            {isMobile ? (
              <MobileAudioPlayer
                src={currentRadio.url_resolved}
                isAvailable={!!currentRadio.url_resolved}
              />
            ) : (
              <AudioPlayer
                src={currentRadio.url_resolved}
                onPause={handlePause}
              />
            )}
            <FavoriteButton radio={currentRadio} />
            <button
              onClick={() => setIsEditing(true)}
              className="px-2 py-1 rounded ml-0"
            >
              ✏️
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RadioItem;
