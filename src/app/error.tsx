"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, RefreshCcw, AlertTriangle, Music } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-900 dark:to-secondary-950">
      <div className="text-center max-w-2xl mx-auto">
        {/* Animated Error Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          
          {/* Error Icon */}
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-red-100 dark:bg-red-900/30"
          >
            <AlertTriangle className="w-16 h-16 text-red-500" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Something went off-beat!
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400 text-lg mb-4">
            We hit a sour note and something unexpected happened.
            Our tech team has been notified.
          </p>
          <p className="text-secondary-500 dark:text-secondary-500 text-sm">
            Error: {error.message || "An unexpected error occurred"}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="primary" size="lg" onClick={reset}>
            <RefreshCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </motion.div>

        {/* Fun message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex items-center justify-center gap-2 text-sm text-secondary-500 dark:text-secondary-500"
        >
          <Music className="w-4 h-4" />
          <span>Even the best musicians make mistakes sometimes!</span>
          <Music className="w-4 h-4" />
        </motion.div>
      </div>
    </div>
  );
}
