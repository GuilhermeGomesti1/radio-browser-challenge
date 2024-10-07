"use client";
import React, { useState } from "react";
import { useStations } from "@/app/services/radioService";
import { Station } from "@/app/types/types";
import Image from "next/image";
import carregandogif from "../../../../../public/carregandogif.gif";
import RadioItem from "../RadioItem";

const RadioList: React.FC<{
  localQuery: string;
  page: number;
  setSelectedRadio: (radio: Station) => void;
}> = ({ localQuery = "", page, setSelectedRadio }) => {
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full lg:w-[690px]">
        <Image src={carregandogif} alt="Loading" width={258} height={310} />
      </div>
    );
  }

  return (
    <ul className="list-none p-0">
      {radiosToDisplay.length > 0 ? (
        radiosToDisplay.map((radio) => (
          <>
            {" "}
            <div className="mb-4">
              <RadioItem
                key={radio.stationuuid}
                radio={radio}
                onSelect={handleRadioSelect}
              />
            </div>
          </>
        ))
      ) : (
        <li className="text-white">Nenhuma rádio encontrada.</li>
      )}
    </ul>
  );
};

export default RadioList;
