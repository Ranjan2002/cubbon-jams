"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Facebook, Twitter, Linkedin, Link2, Mail, MessageCircle, Check, X } from "lucide-react";
import { useToast } from "./Toast";

interface SocialShareProps {
  url?: string;
  title: string;
  description?: string;
  image?: string;
  variant?: "button" | "icons" | "dropdown";
  size?: "sm" | "md" | "lg";
}

const shareOptions = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600 hover:bg-blue-700",
    getUrl: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500 hover:bg-sky-600",
    getUrl: (url: string, title: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "bg-blue-700 hover:bg-blue-800",
    getUrl: (url: string, title: string) =>
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "bg-green-500 hover:bg-green-600",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
  },
  {
    name: "Email",
    icon: Mail,
    color: "bg-secondary-600 hover:bg-secondary-700",
    getUrl: (url: string, title: string, description?: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${description || title}\n\n${url}`)}`,
  },
];

export default function SocialShare({
  url,
  title,
  description,
  variant = "dropdown",
  size = "md",
}: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleShare = (option: typeof shareOptions[0]) => {
    const shareLink = option.getUrl(shareUrl, title, description);
    window.open(shareLink, "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link Copied!", "Share link copied to clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Copy Failed", "Unable to copy link to clipboard.");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description || title,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      setIsOpen(true);
    }
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Icons variant - show all share icons inline
  if (variant === "icons") {
    return (
      <div className="flex items-center gap-2">
        {shareOptions.slice(0, 4).map((option) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare(option)}
              className={`${sizeClasses[size]} ${option.color} text-white rounded-full transition-colors`}
              title={`Share on ${option.name}`}
            >
              <Icon className={iconSizes[size]} />
            </motion.button>
          );
        })}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className={`${sizeClasses[size]} bg-secondary-600 hover:bg-secondary-700 text-white rounded-full transition-colors`}
          title="Copy Link"
        >
          {copied ? (
            <Check className={iconSizes[size]} />
          ) : (
            <Link2 className={iconSizes[size]} />
          )}
        </motion.button>
      </div>
    );
  }

  // Button variant - single share button
  if (variant === "button") {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleNativeShare}
        className={`flex items-center gap-2 ${sizeClasses[size]} px-4 bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-xl transition-colors`}
      >
        <Share2 className={iconSizes[size]} />
        <span className="font-medium">Share</span>
      </motion.button>
    );
  }

  // Dropdown variant (default)
  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${sizeClasses[size]} bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full transition-colors`}
        title="Share"
      >
        <Share2 className={iconSizes[size]} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-secondary-800 rounded-xl shadow-xl border border-secondary-200 dark:border-secondary-700 overflow-hidden z-50"
            >
              <div className="p-2">
                <p className="text-xs font-medium text-secondary-500 dark:text-secondary-400 px-3 py-2">
                  Share via
                </p>
                
                {shareOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.name}
                      onClick={() => handleShare(option)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{option.name}</span>
                    </button>
                  );
                })}

                <div className="border-t border-secondary-200 dark:border-secondary-700 my-2" />

                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700 rounded-lg transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Link2 className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium">
                    {copied ? "Copied!" : "Copy Link"}
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
