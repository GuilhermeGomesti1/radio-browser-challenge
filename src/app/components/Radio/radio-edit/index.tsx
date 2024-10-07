import React, { useState } from "react";
import { Station } from "@/app/types/types";

interface RadioEditProps {
  radio: Station;
  onSave: (updatedRadio: Station) => void;
  onCancel: () => void;
}

const RadioEdit: React.FC<RadioEditProps> = ({ radio, onSave, onCancel }) => {
  const [name, setName] = useState<string>(radio.name);
  const [country, setCountry] = useState<string>(radio.country);
  const [language, setLanguage] = useState<string | undefined>(radio.language);

  const handleSave = () => {
    const updatedRadio: Station = {
      ...radio,
      name,
      country,
      language,
    };
    onSave(updatedRadio);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded w-full min-w-[340px] sm:min-w-[400px] mb-4">
      <h2 className="text-lg font-bold mb-4">Editar Estação</h2>

      <div className="mb-4">
        <label className="block mb-2">Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 rounded w-full bg-gray-700 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">País:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 rounded w-full bg-gray-700 text-white"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Idioma:</label>
        <input
          type="text"
          value={language || ""}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 rounded w-full bg-gray-700 text-white"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Salvar
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RadioEdit;
