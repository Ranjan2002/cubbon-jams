"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { useEvents } from "@/lib/EventsContext";

export default function GalleryPreview() {
  const { gallery: galleryItems, isLoading } = useEvents();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const previewItems = galleryItems.slice(0, 6);

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900/50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="h-6 w-24 bg-secondary-200 dark:bg-secondary-700 rounded-full mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-secondary-200 dark:bg-secondary-700 rounded-lg mx-auto mb-4 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`aspect-square bg-secondary-200 dark:bg-secondary-700 rounded-2xl animate-pulse ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-secondary-50 dark:bg-secondary-900/50">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            Memories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Community Gallery
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Captured moments from our jam sessions, open mics, and community gatherings.
            Every photo tells a story of music and friendship.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {previewItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group ${
                index === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              onClick={() => setSelectedImage(item.src)}
            >
              <div className={`relative ${index === 0 ? "aspect-square md:aspect-[4/3]" : "aspect-square"}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/80 text-xs">{item.event}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/gallery">
            <Button variant="outline" size="lg">
              View Full Gallery
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary-500 transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-4xl max-h-[80vh] w-full"
            >
              <Image
                src={selectedImage}
                alt="Gallery image"
                width={1200}
                height={800}
                className="rounded-2xl object-contain w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
