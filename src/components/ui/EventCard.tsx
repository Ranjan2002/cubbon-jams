"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, ArrowRight, Ticket } from "lucide-react";
import { Event } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils";
import Button from "./Button";

interface EventCardProps {
  event: Event;
  variant?: "default" | "featured" | "compact";
}

export default function EventCard({
  event,
  variant = "default",
}: EventCardProps) {
  const categoryColors: Record<string, string> = {
    jam: "bg-green-500",
    "open-mic": "bg-purple-500",
    concert: "bg-primary-500",
    workshop: "bg-blue-500",
  };

  const categoryLabels: Record<string, string> = {
    jam: "Jam Session",
    "open-mic": "Open Mic",
    concert: "Concert",
    workshop: "Workshop",
  };

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        className="bg-white dark:bg-secondary-800 rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        <Link href={`/events/${event.id}`} className="flex gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary-500 mb-1">
              {formatDate(event.date)}
            </p>
            <h3 className="font-semibold text-secondary-900 dark:text-white truncate">
              {event.title}
            </h3>
            <p className="text-sm text-secondary-500 dark:text-secondary-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3" />
              {event.location}
            </p>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "featured") {
    return (
      <motion.div
        whileHover={{ y: -8 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
        <div className="relative bg-white dark:bg-secondary-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="relative h-64 sm:h-80">
            <Image
              src={event.image}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span
                className={`${categoryColors[event.category]} text-white text-xs font-semibold px-3 py-1 rounded-full`}
              >
                {categoryLabels[event.category]}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                {event.title}
              </h3>
              <div className="flex flex-wrap gap-4 text-white/90 text-sm">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(event.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(event.time)}
                </span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <p className="text-secondary-600 dark:text-secondary-400 line-clamp-2 mb-4">
              {event.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-secondary-500 dark:text-secondary-400">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{event.location}</span>
              </div>
              <Link href={`/events/${event.id}`}>
                <Button variant="primary" size="sm">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
    >
      <Link href={`/events/${event.id}`}>
        <div className="relative h-48">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute top-3 left-3">
            <span
              className={`${categoryColors[event.category]} text-white text-xs font-semibold px-2.5 py-1 rounded-full`}
            >
              {categoryLabels[event.category]}
            </span>
          </div>
          {event.isPast && (
            <div className="absolute top-3 right-3">
              <span className="bg-secondary-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Past Event
              </span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-secondary-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
            {event.title}
          </h3>
          <p className="text-secondary-600 dark:text-secondary-400 text-sm line-clamp-2 mb-4">
            {event.description}
          </p>
          <div className="space-y-2 text-sm text-secondary-500 dark:text-secondary-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary-500" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary-500" />
              <span>{formatTime(event.time)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-500" />
              <span>{event.location}</span>
            </div>
          </div>
          {event.capacity && !event.isPast && (
            <div className="mt-4 pt-4 border-t border-secondary-100 dark:border-secondary-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-secondary-500 dark:text-secondary-400 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {event.registered}/{event.capacity} registered
                </span>
                <span className="text-primary-500 font-semibold">
                  {Math.round(((event.registered || 0) / event.capacity) * 100)}%
                  full
                </span>
              </div>
              <div className="mt-2 h-2 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${((event.registered || 0) / event.capacity) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
          {event.bookingUrl && !event.isPast && (
            <div className="mt-4">
              <a
                href={event.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-gradient-to-r from-[#E53935] to-[#D32F2F] text-white text-sm font-semibold rounded-xl hover:from-[#D32F2F] hover:to-[#C62828] transition-all"
              >
                <Ticket className="w-4 h-4" />
                Book Tickets
              </a>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
