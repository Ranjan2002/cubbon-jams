"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Target,
  Eye,
  Music,
  Users,
  Star,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { teamMembers } from "@/lib/data/mockData";

const milestones = [
  { year: "2020", title: "The Beginning", description: "3 friends, 1 guitar, endless dreams" },
  { year: "2021", title: "Growing Community", description: "Crossed 500 members" },
  { year: "2022", title: "First Festival", description: "Hosted Winter Music Festival" },
  { year: "2023", title: "Going Big", description: "5000+ community members" },
  { year: "2024", title: "New Horizons", description: "Multiple city expansion" },
];

const values = [
  {
    icon: Heart,
    title: "Inclusivity",
    description: "Everyone is welcome, regardless of skill level or background.",
  },
  {
    icon: Music,
    title: "Passion",
    description: "We're driven by our love for music and community.",
  },
  {
    icon: Users,
    title: "Connection",
    description: "Building meaningful relationships through shared experiences.",
  },
  {
    icon: Star,
    title: "Growth",
    description: "Encouraging continuous learning and improvement.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="container-custom mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            About Cubbon Jams
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto text-lg">
            From three friends jamming under the trees to Bangalore&apos;s largest
            open music community.
          </p>
        </motion.div>

        {/* Story Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-12"
        >
          <Image
            src="https://images.unsplash.com/photo-1501612780327-45045538702b?w=1920&h=600&fit=crop"
            alt="Cubbon Jams Community"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-2xl sm:text-3xl font-bold italic">
              &ldquo;From the park, to your heart&rdquo;
            </p>
          </div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="bg-secondary-50 dark:bg-secondary-900/50 section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-6">
                How It All Started
              </h2>
              <div className="space-y-4 text-secondary-600 dark:text-secondary-400">
                <p>
                  In the quiet mornings of 2020, three friends—Vikram, Ananya, and
                  Karthik—would meet at Cubbon Park with their instruments. What
                  started as casual jam sessions under the trees soon attracted
                  curious passersby who wanted to join.
                </p>
                <p>
                  Week after week, the group grew. Musicians of all backgrounds came
                  together—some with years of experience, others who had never
                  performed before. The only requirement was a love for music.
                </p>
                <p>
                  Today, Cubbon Jams has grown into a community of over 5,000
                  musicians and music lovers. We host weekly jam sessions, monthly
                  open mics, workshops, and our annual Winter Music Festival.
                </p>
                <p className="font-semibold text-secondary-900 dark:text-white">
                  But our mission remains the same: to create a space where everyone
                  can experience the joy of music.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-primary-500/30" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 items-start"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                        <div className="w-3 h-3 rounded-full bg-white" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white dark:bg-secondary-800 rounded-2xl p-5 shadow-lg">
                      <span className="text-primary-500 font-bold text-lg">
                        {milestone.year}
                      </span>
                      <h3 className="font-semibold text-secondary-900 dark:text-white mt-1">
                        {milestone.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 text-white"
            >
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-white/90 leading-relaxed">
                To create inclusive spaces where musicians of all skill levels can
                come together, share their art, and grow. We believe music is a
                universal language that can heal, connect, and inspire.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-secondary-900 dark:bg-secondary-800 rounded-3xl p-8 text-white"
            >
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-white/90 leading-relaxed">
                To build India&apos;s largest grassroots music community—a network of
                musicians, venues, and music lovers united by their passion for
                authentic musical experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary-50 dark:bg-secondary-900/50 section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Cubbon Jams.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-secondary-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="font-bold text-secondary-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              Meet the Team
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
              The passionate individuals behind Cubbon Jams.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg group"
              >
                <div className="relative aspect-square">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-500 font-medium text-sm mb-3">
                    {member.role}
                  </p>
                  <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-4">
                    {member.bio}
                  </p>
                  {member.social && (
                    <div className="flex gap-3">
                      {member.social.instagram && (
                        <a
                          href={member.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                        >
                          <Instagram className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.twitter && (
                        <a
                          href={member.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                        >
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.social.linkedin && (
                        <a
                          href={member.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-lg bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-3xl p-8 sm:p-12 text-center text-white"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Want to Be Part of Our Story?
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Join our community and help us write the next chapter of Cubbon Jams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/join">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-500 hover:bg-secondary-100"
              >
                Join Community
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-500"
              >
                View Events
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
