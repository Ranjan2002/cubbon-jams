"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import EventCard from "@/components/ui/EventCard";
import EventCarousel from "@/components/ui/EventCarousel";
import Button from "@/components/ui/Button";
import { useEvents } from "@/lib/EventsContext";

export default function UpcomingEvents() {
  const { events, isLoading } = useEvents();
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 5);
  const featuredEvents = upcomingEvents.slice(0, 3);
  const otherEvents = upcomingEvents.slice(3);

  if (isLoading) {
    return (
      <section className="section-padding bg-secondary-50 dark:bg-secondary-900/50">
        <div className="container-custom">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary-400">Loading events...</p>
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
            What&apos;s Coming Up
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Don&apos;t miss out on our exciting lineup of jam sessions, open mics, and
            community events. There&apos;s something for everyone!
          </p>
        </motion.div>

        {upcomingEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-secondary-400" />
            </div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              No upcoming events
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6">
              Stay tuned! New events will be announced soon.
            </p>
            <Link href="/join">
              <Button variant="primary">Join Community for Updates</Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Featured Events Carousel */}
            {featuredEvents.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mb-12"
              >
                <EventCarousel events={featuredEvents} autoPlay interval={6000} />
              </motion.div>
            )}

            {/* Other Events */}
            {otherEvents.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {otherEvents.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <EventCard event={event} />
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/events">
                <Button variant="outline" size="lg">
                  View All Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
