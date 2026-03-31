"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Music, Users, Calendar, Heart } from "lucide-react";

interface Stat {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  color: string;
}

const stats: Stat[] = [
  {
    icon: <Calendar className="w-8 h-8" />,
    value: 150,
    suffix: "+",
    label: "Events Hosted",
    color: "bg-blue-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    value: 2500,
    suffix: "+",
    label: "Community Members",
    color: "bg-green-500",
  },
  {
    icon: <Music className="w-8 h-8" />,
    value: 500,
    suffix: "+",
    label: "Live Performances",
    color: "bg-purple-500",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    value: 50,
    suffix: "+",
    label: "Regular Artists",
    color: "bg-primary-500",
  },
];

function AnimatedCounter({
  value,
  suffix = "",
  duration = 2000,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary-900 via-secondary-800 to-secondary-900">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-secondary-400 text-sm sm:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
