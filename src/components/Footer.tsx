"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Music,
  Instagram,
  Youtube,
  Mail,
  MapPin,
  Phone,
  Heart,
  ExternalLink,
} from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Join Community", href: "https://docs.google.com/forms/d/e/1FAIpQLSeS17ZDXHgWMLrQDCjkqVrrk38vekQpKFaAzeKqK6TDjN0w8Q/viewform?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn5PG3QDHSbKm4LMiiKaC-mwHvFjsQq2joaJ_Wc6VHYwVAZPItWPm1bUY126Q_aem_fqNsMZZi42vq6WLEk_1JhA" },
    { label: "Contact", href: "/contact" },
  ],
  events: [
    { label: "Sunday Jams", href: "/events" },
    { label: "Open Mic Nights", href: "/events" },
    { label: "Workshops", href: "/events" },
    { label: "Concerts", href: "/events" },
  ],
};

const socialLinks = [
  {
    icon: Instagram,
    href: "https://instagram.com/cubbon_jams/",
    label: "Instagram",
    color: "hover:bg-pink-500",
  },
  {
    icon: Youtube,
    href: "https://youtube.com/@cubbonjams",
    label: "YouTube",
    color: "hover:bg-red-500",
  },
  {
    icon: Mail,
    href: "mailto:hello@cubbonjams.com",
    label: "Email",
    color: "hover:bg-primary-500",
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 dark:bg-secondary-950 text-white">
      {/* Main Footer */}
      <div className="container-custom py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                <Image
                  src="/images/logo/CARBON JAMS no bg.png"
                  alt="Cubbon Jams Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold leading-none">CUBBON</h2>
                <p className="text-sm font-semibold text-primary-500 leading-none">
                  JAMS
                </p>
              </div>
            </Link>
            <p className="text-secondary-400 text-sm leading-relaxed mb-6">
              From the park, to your heart. Join Bangalore&apos;s most vibrant music
              community for unforgettable jam sessions and events.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-xl bg-secondary-800 flex items-center justify-center transition-colors ${social.color} hover:text-white`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-500 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Events</h3>
            <ul className="space-y-3">
              {footerLinks.events.map((link, index) => (
                <li key={link.href + index}>
                  <Link
                    href={link.href}
                    className="text-secondary-400 hover:text-primary-500 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-secondary-400 text-sm">
                  Cubbon Park, Kasturba Road,
                  <br />
                  Bangalore 560001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:hello@cubbonjams.com"
                  className="text-secondary-400 hover:text-primary-500 transition-colors text-sm"
                >
                  hello@cubbonjams.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-secondary-400 hover:text-primary-500 transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-800">
        <div className="container-custom py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-secondary-500 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Cubbon Jams. All rights reserved.
            </p>
            <p className="text-secondary-500 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-primary-500 fill-primary-500" /> in
              Bangalore
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
