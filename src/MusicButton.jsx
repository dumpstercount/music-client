import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://music-server-ud3v.onrender.com/"); // Verbindung zum Server

const sounds = [
  "/sounds/sound1.mp3",
  "/sounds/sound2.mp3",
  "/sounds/sound3.mp3",
  "/sounds/sound4.mp3",
];

export default function MusicButton() {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    socket.on("assignSound", (soundIndex) => {
      setSound(sounds[soundIndex]);
    });

    return () => socket.off("assignSound");
  }, []);

  const playSound = () => {
    if (sound) {
      new Audio(sound).play();
      socket.emit("playSound", sound);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={playSound} disabled={!sound} className="px-6 py-3 text-xl bg-blue-500 text-white rounded-lg">
        Play Sound
      </button>
    </div>
  );
}
