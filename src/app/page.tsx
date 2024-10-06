"use client";
import React, { useEffect, useState } from "react";
import RadioList from "@/app/components/RadioList";
import RadioSearch from "@/app/components/RadioSearch";
import { Station } from "@/app/types/types";
import RadioItem from "./components/RadioItem";
import radioBrowserImg from "../../public/radioBrowserImg.png";
import Image from "next/image";
import BackButton from "./components/BackButton";
export default function Home() {
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [selectedRadio, setSelectedRadio] = useState<Station | null>(null);

  const handleNextPage = () => setPage((old) => old + 1);
  const handlePreviousPage = () => setPage((old) => Math.max(old - 1, 1));

  useEffect(() => {
    setPage(1);
    setSelectedRadio(null);
  }, [query]);

  return (
    <div className="p-4  min-h-screen">
      <div className="flex justify-center mb-4">
        <Image
          src={radioBrowserImg}
          alt="Radio Browser Logo"
          width={742}
          height={139}
          className="object-contain"
          loading="lazy"
          quality={100}
        />
      </div>{" "}
      <div className="flex justify-center items-start space-x-4">
        <div className="flex flex-col items-center">
          <RadioSearch setLocalQuery={setQuery} />
        </div>
        <div className="flex flex-col items-center">
          {selectedRadio ? (
            <>
              <RadioItem radio={selectedRadio} onSelect={setSelectedRadio} />
              <div className="mt-4 text-center text-white">
                <h2 className="text-xl font-bold">{selectedRadio.name}</h2>
                <p>{selectedRadio.language} </p>
                <p>{selectedRadio.country}</p>
                {/* Adicione mais informações conforme necessário */}
              </div>
              <BackButton
                setSelectedRadio={setSelectedRadio}
                setQuery={setQuery}
              />
            </>
          ) : (
            <>
              <RadioList
                localQuery={query}
                page={page}
                setSelectedRadio={setSelectedRadio}
              />
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="bg-[#FF6B00] rounded font-bold text-white transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103  px-4 py-2"
                >
                  Anterior
                </button>
                <button
                  onClick={handleNextPage}
                  className="bg-[#FF6B00] rounded font-bold text-white transition-all duration-250 ease-in-out hover:brightness-110 hover:scale-103  px-4 py-2"
                >
                  Próxima
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
