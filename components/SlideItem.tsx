import React from "react";
import { SlideData } from "../types";
import * as Icons from "lucide-react";

interface SlideItemProps {
  slide: SlideData;
  isActive: boolean;
  onClick: () => void;
  iconName?: string;
  style?: React.CSSProperties;
}

export const SlideItem: React.FC<SlideItemProps> = ({
  slide,
  isActive,
  onClick,
  iconName = "Compass",
  style,
}) => {
  // Dynamically get the icon from Lucide
  const IconComponent = (Icons as any)[iconName] || Icons.Compass;

  return (
    <div
      onClick={onClick}
      style={style}
      className={`relative h-[300px] md:h-[300px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer px-2 flex-shrink-0`}
    >
      <div
        className={`group relative w-full h-full overflow-hidden transition-all duration-700 ${
          isActive ? "border-l border-[#c7c7d6]" : "border-l border-[#c7c7d6]"
        }`}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 transition-transform duration-1000  bg-white" />

        {/* Overlays */}
        {/* <div
          className={`absolute inset-0 z-10 transition-opacity duration-700 ${
            isActive
              ? "bg-zinc-900/60 backdrop-blur-[2px]"
              : "bg-zinc-950/80 grayscale group-hover:grayscale-0"
          }`}
        /> */}

        {/* Content Section */}
        <div className="relative z-20 h-full p-8 md:p-8 flex flex-col">
          {/* Icon Header */}
          <div
            className={`mb-auto transition-all duration-500 bg-[#c2d4ff] rounded-lg w-[57px] p-2 ${
              isActive ? "text-[#1554e9] scale-110" : "text-[#1554e9]"
            }`}
          >
            <IconComponent size={isActive ? 40 : 40} strokeWidth={0.7} />
          </div>

          <div className="flex flex-col">
            <h3
              className={`font-extrabold tracking-[-0.9px] leading-tight transition-all duration-500 ${
                isActive
                  ? "text-base md:text-lg mb-4 text-[#1e1d28]"
                  : "text-base md:text-lg text-[#1e1d28]"
              }`}
            >
              {slide.heading}
            </h3>

            <div
              className={`overflow-hidden transition-all duration-700 ${
                isActive ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-[#1e1d28] text-sm md:text-base font-medium leading-relaxed">
                {slide.text}
              </p>
            </div>
          </div>

          {/* Active Indicator Line */}
          {/* {isActive && (
            <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          )} */}
        </div>
      </div>
    </div>
  );
};
