import React, { useEffect, useRef, useState } from "react";
import { useAudioContext } from "@/app/context/audioContext";

interface MobileAudioPlayerProps {
  src: string;
  isAvailable: boolean;
}

const MobileAudioPlayer: React.FC<MobileAudioPlayerProps> = ({
  src,
  isAvailable,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { currentAudio, setCurrentAudio } = useAudioContext();

  const isHLS = (url: string) => url.endsWith(".m3u8");

  const togglePlay = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        if (currentAudio && currentAudio !== audioElement) {
          currentAudio.pause();
          setCurrentAudio(null);
        }
        audioElement.play();
        setCurrentAudio(audioElement);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handlePause = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);

      audioElement.addEventListener("pause", handlePause);
      audioElement.addEventListener("play", handlePlay);

      return () => {
        audioElement.removeEventListener("pause", handlePause);
        audioElement.removeEventListener("play", handlePlay);
      };
    }
  }, []);

  const isHlsStream = isHLS(src);

  return (
    <div className="flex justify-center items-center mt-0">
      <audio ref={audioRef} src={src} />
      {isAvailable && !isHlsStream ? (
        <button
          onClick={togglePlay}
          className={`bg-[#FF6B00] rounded-full text-white p-2 transition-all duration-250 ease-in-out flex items-center justify-center`}
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <rect width="12" height="12" x="6" y="6" fill="white" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <polygon points="5,3 5,21 19,12" fill="white" />
            </svg>
          )}
        </button>
      ) : (
        <div className="flex items-center justify-center p-2 bg-gray-600 rounded-full">
          <svg
            stroke="currentColor"
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
      )}
    </div>
  );
};

export default MobileAudioPlayer;
