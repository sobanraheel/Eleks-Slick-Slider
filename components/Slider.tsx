
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { SlideData } from '../types';
import { SlideItem } from './SlideItem.tsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SliderProps {
  slides: SlideData[];
}

const ICONS_MAP = ['Compass', 'Map', 'Wind', 'Sun', 'Mountain', 'Cloud', 'Waves', 'Globe'];

export const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const config = useMemo(() => {
    if (windowWidth >= 1280) { // Desktop: 1 Active + 4 Inactive
      return { active: 36.84, inactive: 15.79, totalVisible: 5 };
    } else if (windowWidth >= 1024) { // Laptop: 1 Active + 3 Inactive
      return { active: 43.75, inactive: 18.75, totalVisible: 4 };
    } else if (windowWidth >= 768) { // Tablet: 1 Active + 2 Inactive
      return { active: 53.85, inactive: 23.07, totalVisible: 3 };
    } else { // Mobile: 1 Active Only (Treat all as 100% to allow sliding between full screens)
      return { active: 100, inactive: 100, totalVisible: 1 };
    }
  }, [windowWidth]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (slides.length === 0) return null;

  const isMobile = windowWidth < 768;
  
  // Calculate translation based on current width settings
  let translateX = 0;
  if (isMobile) {
    // In mobile, each slide is 100% width. We just move by index.
    translateX = -activeIndex * 100;
  } else {
    // Desktop/Laptop/Tablet: Keep focus shifted one inactive slide to the left
    translateX = -Math.max(0, activeIndex - 1) * config.inactive;
    
    // Clamp to ensure we don't translate past the end
    const totalTrackWidth = config.active + (config.inactive * (slides.length - 1));
    const maxTranslate = totalTrackWidth - 100;
    translateX = Math.max(translateX, -maxTranslate);
  }

  return (
    <div className="relative w-full py-16 md:py-24 mb-16 md:mb-0">
      {/* Navigation Arrows */}
      <div className="absolute z-40 flex gap-4 
                      md:top-0 md:right-4 md:bottom-auto md:left-auto
                      bottom-[-5rem] left-1/2 -translate-x-1/2 md:translate-x-0">
        <button
          onClick={prevSlide}
          disabled={activeIndex === 0}
          className="p-5 rounded-full bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800 transition-all active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          disabled={activeIndex === slides.length - 1}
          className="p-5 rounded-full bg-zinc-900 border border-white/5 text-white hover:bg-zinc-800 transition-all active:scale-90 disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Main Track Section */}
      <div className="relative w-full overflow-hidden">
        <div 
          ref={containerRef}
          className="flex transition-transform duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            // On mobile, all items have 100% width so they don't peek
            const widthValue = isMobile ? 100 : (isActive ? config.active : config.inactive);
            const itemWidth = `${widthValue}%`;
            
            return (
              <SlideItem
                key={slide.id}
                slide={slide}
                isActive={isActive}
                onClick={() => setActiveIndex(index)}
                iconName={ICONS_MAP[index % ICONS_MAP.length]}
                style={{ width: itemWidth, minWidth: itemWidth, flex: `0 0 ${itemWidth}` }}
              />
            );
          })}
        </div>
      </div>
      
      {/* Background Text Decoration (Desktop Only for clarity) */}
      {!isMobile && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none">
          <h2 className="text-[12rem] md:text-[20rem] font-black tracking-tighter uppercase leading-none opacity-[0.02] whitespace-nowrap transition-all duration-700">
            {slides[activeIndex]?.heading?.split(' ')[0]}
          </h2>
        </div>
      )}
    </div>
  );
};
