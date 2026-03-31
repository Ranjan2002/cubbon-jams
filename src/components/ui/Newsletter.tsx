"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle, Music } from "lucide-react";
import Button from "./Button";
import { useToast } from "./Toast";

interface NewsletterProps {
  variant?: "default" | "minimal" | "card";
  className?: string;
}

export default function Newsletter({
  variant = "default",
  className = "",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubscribed(true);
    toast.success("Subscribed! 🎉", "You'll receive our latest updates.");
    setEmail("");
    
    // Reset success state after 5 seconds
    setTimeout(() => setIsSubscribed(false), 5000);
  };

  if (variant === "minimal") {
    return (
      <form onSubmit={handleSubmit} className={`flex gap-2 ${className}`}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-2 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none transition-colors"
        />
        <Button type="submit" variant="primary" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isSubscribed ? (
            <CheckCircle className="w-5 h-5" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </Button>
      </form>
    );
  }

  if (variant === "card") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 sm:p-8 shadow-xl ${className}`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Stay in the Loop</h3>
            <p className="text-white/80 text-sm">Get event updates in your inbox</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 focus:outline-none transition-colors"
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={isSubmitting}
            className="!bg-white !text-primary-500 hover:!bg-white/90"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            ) : isSubscribed ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
      </motion.div>
    );
  }

  // Default variant - full width section
  return (
    <section className={`section-padding bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 ${className}`}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Never Miss a Jam
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Subscribe to our newsletter and be the first to know about upcoming events,
              special performances, and community updates.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white text-secondary-900 placeholder:text-secondary-400 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all"
              />
            </div>
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              disabled={isSubmitting}
              className="!bg-secondary-900 !text-white hover:!bg-secondary-800 whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Subscribing...
                </>
              ) : isSubscribed ? (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-white/60 text-sm mt-6"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
