"use client";
import React, { useRef, useState } from "react";
import { useStations } from "@/app/services/radioService";
import { Station } from "@/app/types/types";
import Image from "next/image";
import carregandogif from "../../../../public/carregandogif.gif";
const RadioList: React.FC<{
  localQuery: string;
  page: number;
  setSelectedRadio: (radio: Station) => void;
}> = ({ localQuery = "", page, setSelectedRadio }) => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});
  const { data: allRadios = [], isLoading } = useStations(localQuery);
  const [selectedRadio, setSelectedRadioState] = useState<Station | null>(null);

  const handleRadioSelect = (radio: Station) => {
    setSelectedRadio(radio);
    setSelectedRadioState(radio);
  };

  const filteredRadios = allRadios.filter((radio) =>
    radio.name?.toLowerCase().includes(localQuery.toLowerCase())
  );

  const radiosToDisplay = selectedRadio
    ? [selectedRadio]
    : localQuery === ""
    ? allRadios.slice((page - 1) * 10, page * 10)
    : filteredRadios.slice(0, 10);

  const handlePause = (url: string) => {
    if (audioRefs.current[url]) {
      audioRefs.current[url]?.pause();
      audioRefs.current[url].currentTime = 0;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Image src={carregandogif} alt="Loading" width={258} height={310} />
      </div>
    );
  }

  return (
    <ul className="list-none p-0">
      {radiosToDisplay.length > 0 ? (
        radiosToDisplay.map((radio) => (
          <li
            key={radio.stationuuid}
            className="flex items-center text-white mb-2 justify-center"
            onClick={() => handleRadioSelect(radio)}
          >
            <div className="flex items-center w-[300px]">
              <div
                className={`w-8 h-8 mr-2 bg-cover ${
                  radio.favicon ? "" : "bg-gray-400"
                }`}
                style={{
                  backgroundImage: radio.favicon
                    ? `url(${radio.favicon})`
                    : "none",
                }}
              />
              <span className="text-white flex-1 min-w-[120px] text-left">
                {radio.name}
              </span>
            </div>
            <audio
              ref={(el) => {
                audioRefs.current[radio.url_resolved] = el;
              }}
              controls
              className="ml-4"
              src={radio.url_resolved}
              onPause={() => handlePause(radio.url_resolved)}
            />
          </li>
        ))
      ) : (
        <li className="text-white">Nenhuma rádio encontrada.</li>
      )}
    </ul>
  );
};

export default RadioList;
