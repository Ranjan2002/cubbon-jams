"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Music2, Users, Calendar, Play } from "lucide-react";
import Button from "@/components/ui/Button";

// Fixed positions to avoid hydration mismatch
const particlePositions = [
  { left: "10%", top: "20%", delay: 0, duration: 3.5 },
  { left: "25%", top: "45%", delay: 0.5, duration: 4 },
  { left: "40%", top: "15%", delay: 1, duration: 3.2 },
  { left: "55%", top: "60%", delay: 0.3, duration: 4.5 },
  { left: "70%", top: "30%", delay: 0.8, duration: 3.8 },
  { left: "85%", top: "50%", delay: 1.2, duration: 4.2 },
  { left: "15%", top: "70%", delay: 0.6, duration: 3.6 },
  { left: "35%", top: "80%", delay: 1.5, duration: 4.1 },
  { left: "60%", top: "10%", delay: 0.2, duration: 3.3 },
  { left: "80%", top: "75%", delay: 0.9, duration: 3.9 },
  { left: "5%", top: "40%", delay: 1.1, duration: 4.3 },
  { left: "50%", top: "35%", delay: 0.4, duration: 3.7 },
  { left: "90%", top: "25%", delay: 1.4, duration: 4.4 },
  { left: "20%", top: "55%", delay: 0.7, duration: 3.4 },
  { left: "75%", top: "65%", delay: 1.3, duration: 4.6 },
  { left: "30%", top: "5%", delay: 1.6, duration: 3.1 },
  { left: "65%", top: "85%", delay: 0.1, duration: 4.7 },
  { left: "45%", top: "25%", delay: 1.8, duration: 3.0 },
  { left: "95%", top: "55%", delay: 0.15, duration: 4.8 },
  { left: "8%", top: "90%", delay: 1.9, duration: 3.25 },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1920&h=1080&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary-900/95 via-secondary-900/80 to-primary-900/70" />
        {/* Animated Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {particlePositions.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-500/30 rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Every Sunday at Cubbon Park
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            <span className="text-primary-500">Cubbon Jams</span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Where Music Meets Community
            </span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl sm:text-2xl text-white/80 mb-8 font-light italic"
          >
            &ldquo;From the park, to your heart&rdquo;
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-base sm:text-lg text-white/70 mb-10 max-w-2xl mx-auto"
          >
            Join Bangalore&apos;s most vibrant music community. Open jam sessions, live
            performances, and unforgettable experiences await you every week.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/events">
              <Button variant="primary" size="lg">
                <Calendar className="w-5 h-5 mr-2" />
                View Events
              </Button>
            </Link>
            <Link href="/join">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-secondary-900">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-white/10"
          >
            {[
              { number: "200+", label: "Jam Sessions" },
              { number: "5000+", label: "Musicians" },
              { number: "50+", label: "Events Yearly" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl font-bold text-primary-500 mb-1">
                  {stat.number}
                </p>
                <p className="text-sm sm:text-base text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
