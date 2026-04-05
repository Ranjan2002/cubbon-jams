"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Music, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
          
          {/* 404 Text */}
          <div className="relative">
            <motion.h1
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
              className="text-[150px] sm:text-[200px] font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-600 leading-none"
            >
              404
            </motion.h1>
            
            {/* Musical notes floating */}
            <motion.div
              animate={{ y: [-5, 5, -5], rotate: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute top-4 right-4 sm:right-12"
            >
              <Music className="w-8 h-8 text-primary-400" />
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5], rotate: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="absolute bottom-8 left-4 sm:left-12"
            >
              <Music className="w-6 h-6 text-primary-300" />
            </motion.div>
          </div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-white mb-4">
            Oops! This page hit a wrong note
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg">
            The page you&apos;re looking for seems to have wandered off to another jam session.
            Don&apos;t worry, let&apos;s get you back on track!
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/">
            <Button variant="primary" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="outline" size="lg">
              <Search className="w-5 h-5 mr-2" />
              Browse Events
            </Button>
          </Link>
        </motion.div>

        {/* Fun message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-sm text-secondary-500 dark:text-secondary-500"
        >
          &ldquo;From the park, to your heart&rdquo; - but not to this page! 🎸
        </motion.p>
      </div>
    </div>
  );
}
