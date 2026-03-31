"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Music,
  Sun,
  Moon,
  Calendar,
  Users,
  Image as ImageIcon,
  Info,
  Mail,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Music },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/gallery", label: "Gallery", icon: ImageIcon },
  { href: "/about", label: "About", icon: Info },
  { href: "https://docs.google.com/forms/d/e/1FAIpQLSeS17ZDXHgWMLrQDCjkqVrrk38vekQpKFaAzeKqK6TDjN0w8Q/viewform?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5PG3QDHSbKm4LMiiKaC-mwHvFjsQq2joaJ_Wc6VHYwVAZPItWPm1bUY126Q_aem_fqNsMZZi42vq6WLEk_1JhA", label: "Join", icon: Users },
  { href: "/contact", label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/90 dark:bg-secondary-900/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      )}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden shadow-lg shadow-primary-500/30">
                <Image
                  src="/images/logo/CARBON JAMS no bg.png"
                  alt="Cubbon Jams Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="ml-2 sm:ml-3">
                <h1 className="text-lg sm:text-xl font-bold text-secondary-900 dark:text-white leading-none">
                  CUBBON
                </h1>
                <p className="text-xs sm:text-sm font-semibold text-primary-500 leading-none">
                  JAMS
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                        : "text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                    )}
                  >
                    {link.label}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Right Side - Theme Toggle & Admin */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "light" ? (
                  <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                )
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </motion.button>

            {/* Admin Link (Desktop) */}
            <Link href="/admin" className="hidden sm:block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 text-sm font-medium hover:bg-secondary-800 dark:hover:bg-secondary-100 transition-colors"
              >
                Admin
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={link.href}>
                        <div
                          className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                            isActive
                              ? "bg-primary-500 text-white"
                              : "text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800"
                          )}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{link.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link href="/admin">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 font-medium">
                      <Users className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
