"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Music, Users, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const features = [
  {
    icon: Music,
    title: "Open Jam Sessions",
    description: "Join our weekly jam sessions at Cubbon Park. All instruments and skill levels welcome.",
  },
  {
    icon: Users,
    title: "Vibrant Community",
    description: "Connect with 5000+ musicians, singers, and music lovers from across Bangalore.",
  },
  {
    icon: Heart,
    title: "Supportive Environment",
    description: "A judgment-free zone where everyone is encouraged to express themselves.",
  },
  {
    icon: Sparkles,
    title: "Growth Opportunities",
    description: "Workshops, open mics, and mentorship to help you grow as a musician.",
  },
];

export default function AboutPreview() {
  return (
    <section className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop"
                alt="Cubbon Jams Community"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white dark:bg-secondary-800 rounded-2xl shadow-xl p-6 max-w-[200px]"
            >
              <p className="text-4xl font-bold text-primary-500 mb-1">2020</p>
              <p className="text-sm text-secondary-600 dark:text-secondary-400">
                Started with 3 friends and a guitar
              </p>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
              About Cubbon Jams
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 mb-6 leading-relaxed">
              What started as three friends jamming under the trees at Cubbon Park
              has grown into Bangalore&apos;s largest open music community. We believe
              music has the power to bring people together, heal souls, and create
              lasting friendships.
            </p>
            <p className="text-secondary-600 dark:text-secondary-400 mb-8 leading-relaxed">
              Every Sunday morning, musicians of all skill levels gather to share
              their love for music. No stages, no judgment—just pure, authentic
              musical connections.
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white text-sm mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link href="/about">
              <Button variant="primary">
                Learn More About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
