"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import EventCard from "@/components/ui/EventCard";
import Button from "@/components/ui/Button";
import { events } from "@/lib/data/mockData";

export default function UpcomingEvents() {
  const upcomingEvents = events.filter((e) => !e.isPast).slice(0, 3);
  const featuredEvent = upcomingEvents[0];
  const otherEvents = upcomingEvents.slice(1);

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

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Featured Event */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <EventCard event={featuredEvent} variant="featured" />
            </motion.div>
          )}

          {/* Other Events */}
          <div className="space-y-4">
            {otherEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        </div>

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
      </div>
    </section>
  );
}
