"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  HandHeart,
  Mic2,
  MessageSquareHeart,
  Sparkles,
  Ticket,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ExperienceKey = "attend" | "perform" | "volunteer" | "partner";

const experiences: Record<
  ExperienceKey,
  {
    title: string;
    eyebrow: string;
    description: string;
    icon: typeof CalendarDays;
    highlights: string[];
    stats: { label: string; value: string }[];
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  }
> = {
  attend: {
    title: "Attend the next jam",
    eyebrow: "Best for first-timers",
    description:
      "Get the essentials fast: upcoming dates, venue details, what to bring, and a simple path into the community.",
    icon: CalendarDays,
    highlights: ["Live schedule updates", "Weather and venue notes", "Friendly on-site welcome"],
    stats: [
      { label: "Avg. crowd", value: "120+" },
      { label: "RSVP window", value: "48 hrs" },
    ],
    primaryCta: { label: "Browse events", href: "/events" },
    secondaryCta: { label: "See the gallery", href: "/gallery" },
  },
  perform: {
    title: "Book a performance slot",
    eyebrow: "For musicians, poets, and hosts",
    description:
      "Show up with a set, original music, or a spoken-word piece and get a clear route to the stage.",
    icon: Mic2,
    highlights: ["Open mic sign-up", "Soundcheck guidance", "Spotlight opportunities"],
    stats: [
      { label: "Avg. slots", value: "15" },
      { label: "Stage time", value: "5 min" },
    ],
    primaryCta: { label: "Join the community", href: "/join" },
    secondaryCta: { label: "Contact us", href: "/contact" },
  },
  volunteer: {
    title: "Volunteer behind the scenes",
    eyebrow: "For setup, support, and logistics",
    description:
      "Help with registration, setup, crowd flow, and content capture. You get a closer look at how events run.",
    icon: HandHeart,
    highlights: ["Setup and check-in", "Community hosting", "Photo and video support"],
    stats: [
      { label: "Roles", value: "6+" },
      { label: "Perks", value: "Crew access" },
    ],
    primaryCta: { label: "Volunteer with us", href: "/contact" },
    secondaryCta: { label: "Meet the team", href: "/about" },
  },
  partner: {
    title: "Partner or sponsor an event",
    eyebrow: "For venues, brands, and collaborators",
    description:
      "Build a custom collaboration around music, community, or creative outreach with a clear point of contact.",
    icon: Sparkles,
    highlights: ["Brand collaborations", "Venue partnerships", "Community activations"],
    stats: [
      { label: "Formats", value: "Custom" },
      { label: "Response", value: "Fast" },
    ],
    primaryCta: { label: "Start a partnership", href: "/contact" },
    secondaryCta: { label: "Our story", href: "/about" },
  },
};

const quickAccess = [
  {
    title: "RSVP and tickets",
    description: "See what is coming up and lock in your spot.",
    href: "/events",
    icon: Ticket,
  },
  {
    title: "Community stories",
    description: "Browse recent moments, portraits, and live set highlights.",
    href: "/gallery",
    icon: MessageSquareHeart,
  },
  {
    title: "Join the circle",
    description: "Get updates, share your interest, and be part of the crew.",
    href: "/join",
    icon: Users,
  },
];

export default function ExperienceOptions() {
  const [activeExperience, setActiveExperience] = useState<ExperienceKey>("attend");

  const active = experiences[activeExperience];
  const ActiveIcon = active.icon;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-secondary-50 to-primary-50 dark:from-secondary-950 dark:via-secondary-900 dark:to-secondary-950" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            More ways to get involved
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Pick the path that fits you
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400">
            The site now gives you faster routes into events, performance slots,
            volunteer opportunities, and partnerships without digging through pages.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-4 sm:p-5 border border-white/40 dark:border-secondary-700/60"
          >
            <div className="space-y-3">
              {(Object.keys(experiences) as ExperienceKey[]).map((key) => {
                const item = experiences[key];
                const Icon = item.icon;
                const isActive = activeExperience === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveExperience(key)}
                    className={cn(
                      "w-full text-left rounded-2xl p-4 transition-all duration-200 border",
                      isActive
                        ? "bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20"
                        : "bg-white/70 dark:bg-secondary-900/70 border-secondary-200/70 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-500/50"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={cn(
                          "w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0",
                          isActive
                            ? "bg-white/15"
                            : "bg-primary-500/10 text-primary-500"
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={cn(
                            "text-xs font-semibold uppercase tracking-[0.2em] mb-1",
                            isActive
                              ? "text-white/80"
                              : "text-primary-500"
                          )}
                        >
                          {item.eyebrow}
                        </p>
                        <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                        <p
                          className={cn(
                            "text-sm leading-relaxed",
                            isActive
                              ? "text-white/80"
                              : "text-secondary-600 dark:text-secondary-400"
                          )}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExperience}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-6 sm:p-8 border border-white/40 dark:border-secondary-700/60 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm font-semibold tracking-[0.2em] uppercase text-primary-500 mb-2">
                    {active.eyebrow}
                  </p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-3">
                    {active.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 leading-relaxed max-w-2xl">
                    {active.description}
                  </p>
                </div>
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-primary-500/10 text-primary-500 items-center justify-center flex-shrink-0">
                  <ActiveIcon className="w-7 h-7" />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 mb-6">
                {active.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-2xl bg-secondary-50 dark:bg-secondary-900/70 border border-secondary-200/70 dark:border-secondary-700 px-4 py-3 text-sm text-secondary-700 dark:text-secondary-300"
                  >
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {active.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-white/80 dark:bg-secondary-900/70 border border-secondary-200/70 dark:border-secondary-700 p-4"
                  >
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-secondary-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex flex-col sm:flex-row gap-3">
                <Link href={active.primaryCta.href} className="flex-1">
                  <Button variant="primary" size="lg" className="w-full">
                    {active.primaryCta.label}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href={active.secondaryCta.href} className="flex-1">
                  <Button variant="outline" size="lg" className="w-full">
                    {active.secondaryCta.label}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickAccess.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={item.href}
                  className="group block rounded-2xl border border-secondary-200/80 dark:border-secondary-700 bg-white/80 dark:bg-secondary-900/80 p-5 shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="w-11 h-11 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-semibold text-secondary-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400 mb-4">
                    {item.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary-500">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}