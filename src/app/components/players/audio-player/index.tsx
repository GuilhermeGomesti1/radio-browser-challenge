"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAudioContext } from "@/app/context/audio-context";

interface AudioPlayerProps {
  src: string;
  onPause?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPause }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);
  const { currentAudio, setCurrentAudio } = useAudioContext();

  useEffect(() => {
    const audioElement = audioRef.current;

    const handlePause = () => {
      if (onPause) onPause();
      setCurrentAudio(null);
    };

    const handlePlay = async () => {
      if (currentAudio && currentAudio !== audioElement) {
        currentAudio.pause();
        await new Promise((resolve) => {
          currentAudio.onpause = resolve;
        });
      }

      setCurrentAudio(audioElement);
    };

    if (audioElement) {
      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("play", handlePlay);

      return () => {
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("play", handlePlay);
      };
    }
  }, [onPause, currentAudio, setCurrentAudio]);

  useEffect(() => {
    const isHLS = src.endsWith(".m3u8");

    const checkAvailability = async () => {
      try {
        const response = await fetch(src, { method: "HEAD" });
        setIsAvailable(response.ok);
      } catch (error) {
        setIsAvailable(false);
      }
    };

    if (!isHLS) {
      checkAvailability();
    } else {
      setIsAvailable(false);
    }
  }, [src]);

  return (
    <div className="flex items-center">
      {isAvailable ? (
        <audio
          ref={audioRef}
          controls
          className="ml-4"
          src={src}
          onPlay={() => audioRef.current?.play()}
        />
      ) : (
        <>
          <p className="mr-4">no signal</p>
          <div className="flex items-center justify-center p-2 bg-gray-800 rounded-full mr-2">
            <svg
              stroke="#FF6B00"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14 3l-4.986 2m-2.875 1.15l-1.51 .604a1 1 0 0 0 -.629 .928v11.323a1 1 0 0 0 1 1h14a1 1 0 0 0 .708 -.294m.292 -3.706v-8a1 1 0 0 0 -1 -1h-8m-4 0h-2.5"></path>
              <path d="M4 12h8m4 0h4"></path>
              <path d="M7 12v-2"></path>
              <path d="M13 16v.01"></path>
              <path d="M3 3l18 18"></path>
            </svg>
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;
