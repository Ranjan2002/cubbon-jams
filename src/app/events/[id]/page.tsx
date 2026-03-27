"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Share2,
  Heart,
  Music,
  Mic,
  Check,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { events } from "@/lib/data/mockData";
import { formatDate, formatTime } from "@/lib/utils";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
            Event not found
          </h1>
          <Link href="/events">
            <Button variant="primary">Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    setIsRegistered(true);
  };

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

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Image */}
      <div className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary-900 via-secondary-900/50 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </motion.button>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex gap-2">
          <span
            className={`${categoryColors[event.category]} text-white text-sm font-semibold px-4 py-2 rounded-full`}
          >
            {categoryLabels[event.category]}
          </span>
          {event.isPast && (
            <span className="bg-secondary-500 text-white text-sm font-semibold px-4 py-2 rounded-full">
              Past Event
            </span>
          )}
        </div>

        {/* Event Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container-custom">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            >
              {event.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-4 sm:gap-6 text-white/90"
            >
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(event.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {formatTime(event.time)}
                {event.endTime && ` - ${formatTime(event.endTime)}`}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {event.location}
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Countdown Timer */}
            {!event.isPast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg"
              >
                <CountdownTimer
                  targetDate={`${event.date}T${event.time}:00`}
                  label="Event starts in"
                />
              </motion.div>
            )}

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                About This Event
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed">
                {event.description}
              </p>
            </motion.div>

            {/* Performers */}
            {event.performers && event.performers.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg"
              >
                <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary-500" />
                  Performers
                </h2>
                <div className="flex flex-wrap gap-3">
                  {event.performers.map((performer, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-secondary-100 dark:bg-secondary-700 rounded-xl text-secondary-700 dark:text-secondary-300 text-sm font-medium"
                    >
                      {performer}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                Location
              </h2>
              <p className="text-secondary-600 dark:text-secondary-400 mb-4">
                {event.address}
              </p>
              <div className="aspect-video rounded-xl overflow-hidden bg-secondary-100 dark:bg-secondary-700">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(
                    event.address
                  )}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            {!event.isPast && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg sticky top-24"
              >
                {isRegistered ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                      You&apos;re Registered!
                    </h3>
                    <p className="text-secondary-600 dark:text-secondary-400">
                      We&apos;ve sent a confirmation to your email. See you at the event!
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                      Register for Event
                    </h3>

                    {/* Capacity */}
                    {event.capacity && (
                      <div className="mb-6">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-secondary-500 dark:text-secondary-400 flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {event.registered}/{event.capacity} registered
                          </span>
                          <span className="text-primary-500 font-semibold">
                            {Math.round(
                              ((event.registered || 0) / event.capacity) * 100
                            )}
                            % full
                          </span>
                        </div>
                        <div className="h-2 bg-secondary-100 dark:bg-secondary-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary-500 rounded-full"
                            style={{
                              width: `${
                                ((event.registered || 0) / event.capacity) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        label="Name"
                        placeholder="Your name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                      <Textarea
                        label="Message (Optional)"
                        placeholder="Any special requirements?"
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                      <Button type="submit" variant="primary" className="w-full">
                        Register Now
                      </Button>
                    </form>
                  </>
                )}
              </motion.div>
            )}

            {/* Share Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-4">
                Share Event
              </h3>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    navigator.share?.({
                      title: event.title,
                      text: event.description,
                      url: window.location.href,
                    });
                  }}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
