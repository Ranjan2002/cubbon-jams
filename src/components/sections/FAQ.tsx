"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is Cubbon Jams?",
    answer:
      "Cubbon Jams is a community-driven music initiative based in Bangalore. We organize open jam sessions, live music events, and community gatherings at Cubbon Park and other venues across the city.",
  },
  {
    question: "Do I need to be a professional musician to join?",
    answer:
      "Absolutely not! Cubbon Jams welcomes everyone, from beginners to professionals. Whether you want to play, sing, or just enjoy the music, you're welcome to join our community.",
  },
  {
    question: "What instruments can I bring?",
    answer:
      "Any acoustic instrument is welcome! Guitars, ukuleles, cajons, flutes, harmonicas, and more. We keep it acoustic-friendly to maintain the intimate vibe of our sessions.",
  },
  {
    question: "When and where are the jam sessions?",
    answer:
      "Our regular jam sessions are held every Sunday morning at Cubbon Park, starting at 8:30 AM. We also organize special events at various venues around Bangalore. Check our Events page for the latest schedule.",
  },
  {
    question: "Is there any fee to participate?",
    answer:
      "Most of our Sunday jam sessions are free and open to all. Special events may have a nominal registration fee to cover venue costs. All fee information is clearly mentioned in the event details.",
  },
  {
    question: "How can I perform at a Cubbon Jams event?",
    answer:
      "Join our community first, then attend a few sessions to get familiar with our format. You can sign up to perform during our open mic segments, or reach out to us for featured performance slots.",
  },
  {
    question: "Can I bring my own songs?",
    answer:
      "Yes! We encourage original music. Many of our members perform their own compositions. It's a great platform to share your creativity with a supportive audience.",
  },
  {
    question: "How do I stay updated about events?",
    answer:
      "Subscribe to our newsletter, follow us on Instagram (@cubbonjams), or join our WhatsApp community. You can also enable notifications on this website.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-secondary-50 dark:bg-secondary-900/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4 inline mr-2" />
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            Everything you need to know about joining our music community.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 bg-white dark:bg-secondary-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <span className="font-semibold text-secondary-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-secondary-500" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-secondary-50 dark:bg-secondary-800/50 rounded-b-2xl -mt-2 pt-6">
                      <p className="text-secondary-600 dark:text-secondary-400">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
