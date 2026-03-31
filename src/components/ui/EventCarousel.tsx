"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { Event } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";
import Button from "./Button";

interface EventCarouselProps {
  events: Event[];
  autoPlay?: boolean;
  interval?: number;
}

export default function EventCarousel({ 
  events, 
  autoPlay = true, 
  interval = 5000 
}: EventCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = events.length - 1;
      if (nextIndex >= events.length) nextIndex = 0;
      return nextIndex;
    });
  }, [events.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || events.length <= 1) return;

    const timer = setInterval(() => {
      paginate(1);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, isPaused, paginate, events.length]);

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];

  return (
    <div 
      className="relative w-full overflow-hidden rounded-3xl bg-secondary-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Carousel */}
      <div className="relative aspect-[16/9] md:aspect-[21/9]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <Image
              src={currentEvent.image}
              alt={currentEvent.title}
              fill
              className="object-cover"
              priority
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="max-w-2xl"
                >
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-primary-500 text-white text-xs font-semibold rounded-full mb-4 uppercase tracking-wide">
                    {currentEvent.category.replace("-", " ")}
                  </span>

                  {/* Title */}
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                    {currentEvent.title}
                  </h2>

                  {/* Description */}
                  <p className="text-white/80 text-sm sm:text-base mb-6 line-clamp-2 max-w-xl">
                    {currentEvent.description}
                  </p>

                  {/* Event Details */}
                  <div className="flex flex-wrap gap-4 text-white/90 text-sm mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(currentEvent.date)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {formatTime(currentEvent.time)}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {currentEvent.location}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/events/${currentEvent.id}`}>
                    <Button variant="primary" size="lg">
                      View Event
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {events.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(-1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {events.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-primary-500"
                  : "w-2 h-2 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && events.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <motion.div
            key={currentIndex}
            initial={{ width: "0%" }}
            animate={{ width: isPaused ? undefined : "100%" }}
            transition={{ duration: interval / 1000, ease: "linear" }}
            className="h-full bg-primary-500"
          />
        </div>
      )}
    </div>
  );
}
