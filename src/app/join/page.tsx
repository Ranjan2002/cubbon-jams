"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Music, Check, Guitar, Mic2, Drum, Piano } from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";

const instruments = [
  { value: "", label: "Select your instrument" },
  { value: "guitar", label: "Guitar" },
  { value: "vocals", label: "Vocals" },
  { value: "piano", label: "Piano/Keyboard" },
  { value: "drums", label: "Drums/Percussion" },
  { value: "bass", label: "Bass" },
  { value: "violin", label: "Violin" },
  { value: "flute", label: "Flute" },
  { value: "ukulele", label: "Ukulele" },
  { value: "other", label: "Other" },
];

const experienceLevels = [
  { value: "", label: "Select your experience" },
  { value: "beginner", label: "Beginner (0-1 years)" },
  { value: "intermediate", label: "Intermediate (1-3 years)" },
  { value: "advanced", label: "Advanced (3-5 years)" },
  { value: "professional", label: "Professional (5+ years)" },
];

const benefits = [
  {
    icon: Music,
    title: "Weekly Jam Sessions",
    description: "Join our Sunday morning jams at Cubbon Park",
  },
  {
    icon: Mic2,
    title: "Open Mic Nights",
    description: "Get stage time at our monthly open mic events",
  },
  {
    icon: Users,
    title: "Connect with Musicians",
    description: "Network with 5000+ musicians in Bangalore",
  },
  {
    icon: Guitar,
    title: "Free Workshops",
    description: "Learn from experienced musicians in our workshops",
  },
];

export default function JoinPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    instrument: "",
    experience: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Join Our Community
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-secondary-900 dark:text-white mb-4">
            Become a Jammer
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Join Bangalore&apos;s most vibrant music community. Whether you&apos;re a
            beginner or a pro, there&apos;s a place for you at Cubbon Jams.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
              Why Join Cubbon Jams?
            </h2>
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex gap-4 p-4 bg-white dark:bg-secondary-800 rounded-2xl shadow-lg"
                  >
                    <div className="w-12 h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Community Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-3xl font-bold">5000+</p>
                  <p className="text-white/80 text-sm">Musicians</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">200+</p>
                  <p className="text-white/80 text-sm">Jam Sessions</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-white/80 text-sm">Events/Year</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">4.9</p>
                  <p className="text-white/80 text-sm">Rating</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 sm:p-8 shadow-xl">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                    Welcome to Cubbon Jams!
                  </h3>
                  <p className="text-secondary-600 dark:text-secondary-400 mb-6">
                    You&apos;re now part of our community. Check your email for next
                    steps and details about our upcoming jam sessions.
                  </p>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        instrument: "",
                        experience: "",
                        message: "",
                      });
                    }}
                  >
                    Register Another Person
                  </Button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                    Join the Community
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <Input
                      label="Full Name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Select
                      label="Primary Instrument"
                      name="instrument"
                      options={instruments}
                      required
                      value={formData.instrument}
                      onChange={handleChange}
                    />
                    <Select
                      label="Experience Level"
                      name="experience"
                      options={experienceLevels}
                      required
                      value={formData.experience}
                      onChange={handleChange}
                    />
                    <Textarea
                      label="Tell us about yourself (Optional)"
                      name="message"
                      placeholder="What brings you to Cubbon Jams? What do you hope to gain from the community?"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                    />
                    <Button type="submit" variant="primary" className="w-full">
                      <Users className="w-5 h-5 mr-2" />
                      Join Now
                    </Button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
