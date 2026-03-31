"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Instagram, Music2, Play, ChevronLeft, ChevronRight } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  instrument: string;
  image: string;
  bio: string;
  instagram?: string;
  performances: number;
}

const artists: Artist[] = [
  {
    id: "1",
    name: "Priya Sharma",
    instrument: "Vocals & Guitar",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "A soulful singer who brings Cubbon Park alive every Sunday with her melodious voice.",
    instagram: "priyasharma_music",
    performances: 45,
  },
  {
    id: "2",
    name: "Arjun Menon",
    instrument: "Acoustic Guitar",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "One of the founding members, Arjun's fingerstyle guitar is the heartbeat of our jams.",
    instagram: "arjunmenon_guitar",
    performances: 52,
  },
  {
    id: "3",
    name: "Maya Reddy",
    instrument: "Cajon & Percussion",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Maya's rhythm keeps everyone on beat. A percussionist with an infectious energy.",
    instagram: "maya_beats",
    performances: 38,
  },
  {
    id: "4",
    name: "Karthik Iyer",
    instrument: "Flute & Keyboard",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "A multi-instrumentalist who adds classical Indian fusion to our sessions.",
    instagram: "karthik_flute",
    performances: 31,
  },
  {
    id: "5",
    name: "Sneha Das",
    instrument: "Bass & Ukulele",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    bio: "Sneha's groovy bass lines and cheerful ukulele bring a unique flavor to every jam.",
    instagram: "sneha_bass",
    performances: 27,
  },
];

export default function FeaturedArtists() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextArtist = () => {
    setActiveIndex((prev) => (prev + 1) % artists.length);
  };

  const prevArtist = () => {
    setActiveIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  return (
    <section className="section-padding bg-white dark:bg-secondary-900 overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            Our Community
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Featured Artists
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Meet the talented musicians who make Cubbon Jams special. These artists
            bring their passion and creativity to every session.
          </p>
        </motion.div>

        {/* Artists Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevArtist}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-secondary-800 rounded-full shadow-lg flex items-center justify-center text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors -ml-4 sm:ml-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextArtist}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-secondary-800 rounded-full shadow-lg flex items-center justify-center text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors -mr-4 sm:mr-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Artists Grid */}
          <div className="overflow-hidden px-4 sm:px-12">
            <motion.div
              className="flex gap-6"
              animate={{ x: `-${activeIndex * (100 / 3)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {artists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-secondary-50 dark:bg-secondary-800 rounded-2xl overflow-hidden group">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={artist.image}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Overlay Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm line-clamp-2">{artist.bio}</p>
                      </div>
                      
                      {/* Performance Count */}
                      <div className="absolute top-4 right-4 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {artist.performances} jams
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-1">
                        {artist.name}
                      </h3>
                      <p className="text-secondary-500 dark:text-secondary-400 text-sm flex items-center gap-2 mb-3">
                        <Music2 className="w-4 h-4" />
                        {artist.instrument}
                      </p>
                      
                      {artist.instagram && (
                        <a
                          href={`https://instagram.com/${artist.instagram}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-primary-500 hover:text-primary-600 transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                          @{artist.instagram}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {artists.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-primary-500 w-8"
                    : "bg-secondary-300 dark:bg-secondary-600 hover:bg-secondary-400 dark:hover:bg-secondary-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
