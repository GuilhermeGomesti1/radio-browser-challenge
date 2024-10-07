import React, { createContext, useContext, useEffect, useState } from "react";
import { Station } from "@/app/types/types";

interface EditContextType {
  editRadio: (updatedRadio: Station) => void;
  radios: Station[];
}

const EditRadioContext = createContext<EditContextType | undefined>(undefined);

export const EditRadioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [radios, setRadios] = useState<Station[]>([]);

  useEffect(() => {
    const cachedStations = localStorage.getItem("stations");
    if (cachedStations) {
      setRadios(JSON.parse(cachedStations));
    }
  }, []);
  const editRadio = (updatedRadio: Station) => {
    setRadios((prevRadios) =>
      prevRadios.map((radio) =>
        radio.stationuuid === updatedRadio.stationuuid ? updatedRadio : radio
      )
    );

    localStorage.setItem("stations", JSON.stringify(radios));
  };

  useEffect(() => {
    localStorage.setItem("stations", JSON.stringify(radios));
  }, [radios]);

  return (
    <EditRadioContext.Provider value={{ editRadio, radios }}>
      {children}
    </EditRadioContext.Provider>
  );
};

export const useEditRadio = () => {
  const context = useContext(EditRadioContext);
  if (!context) {
    throw new Error("useEditRadio must be used within an EditRadioProvider");
  }
  return context;
};
