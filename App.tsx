import React, { useState } from "react";
import { Slider } from "./components/Slider.tsx";
import { SlideData } from "./types.ts";

const SLIDES_DATA: SlideData[] = [
  {
    id: "1",
    heading: "Celestial Watch",
    text: "Witness the ethereal dance of neon colors across the silent Arctic horizon.",
    image: "https://picsum.photos/seed/aurora-nexus/1600/1000",
  },
  {
    id: "2",
    heading: "Golden Horizon",
    text: "Navigate the endless shifting sands of the Sahara under a relentless desert sun.",
    image: "https://picsum.photos/seed/desert-nexus/1600/1000",
  },
  {
    id: "3",
    heading: "Oceanic Depth",
    text: "Plunge into the vibrant coral cathedrals of the Great Barrier Reef’s crystal waters.",
    image: "https://picsum.photos/seed/ocean-nexus/1600/1000",
  },
  {
    id: "4",
    heading: "Zen Sanctuary",
    text: "Discover profound tranquility among the ancient shrines and cherry groves of Kyoto.",
    image: "https://picsum.photos/seed/zen-nexus/1600/1000",
  },
  {
    id: "5",
    heading: "Jungle Rhythm",
    text: "Venture deep into the emerald canopy of the Amazon’s untamed wilderness.",
    image: "https://picsum.photos/seed/jungle-nexus/1600/1000",
  },
  {
    id: "6",
    heading: "Aegean Dream",
    text: "Perch above the sapphire tides of Santorini where architecture meets the infinite.",
    image: "https://picsum.photos/seed/greece-nexus/1600/1000",
  },
  {
    id: "7",
    heading: "Savanna Spirit",
    text: "Experience the raw majesty of nature’s great migration across the Serengeti.",
    image: "https://picsum.photos/seed/safari-nexus/1600/1000",
  },
  {
    id: "8",
    heading: "Alpine Majesty",
    text: "Scale the jagged, snow-capped cathedrals of the Swiss Alps’ pristine summits.",
    image: "https://picsum.photos/seed/alps-nexus/1600/1000",
  },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ffffff] text-white flex items-center justify-center p-6 md:p-12 overflow-hidden">
      <main className="w-full max-w-[1400px] mx-auto">
        <Slider slides={SLIDES_DATA} />
      </main>
    </div>
  );
};

export default App;
