"use client";
import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchStations } from "@/app/services/radioService";
import { Station } from "@/app/types/types";

const RadioList: React.FC<{
  localQuery: string;
  page: number;
  setSelectedRadio: (radio: Station) => void;
}> = ({ localQuery = "", page, setSelectedRadio }) => {
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const { data: allRadios = [], isLoading } = useQuery<Station[]>({
    queryKey: ["radios", localQuery, page],
    queryFn: () => fetchStations(localQuery),
  });

  const [selectedRadio, setSelectedRadioState] = useState<Station | null>(null);

  const handleRadioSelect = (radio: Station) => {
    setSelectedRadio(radio);
    setSelectedRadioState(radio);
  };

  const filteredRadios = allRadios.filter(
    (radio) =>
      radio.name && radio.name.toLowerCase().includes(localQuery.toLowerCase())
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
    return <div className="text-white">Carregando...</div>;
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
              <img src={radio.favicon} alt="" className="w-8 h-8 mr-2" />
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
