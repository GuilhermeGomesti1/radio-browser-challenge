"use client";
import React, { useEffect, useRef } from "react";

interface AudioPlayerProps {
  src: string;
  onPause?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onPause }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement && onPause) {
      audioElement.addEventListener("pause", onPause);

      return () => {
        audioElement.removeEventListener("pause", onPause);
      };
    }
  }, [onPause]);

  return <audio ref={audioRef} controls className="ml-4" src={src} />;
};

export default AudioPlayer;
