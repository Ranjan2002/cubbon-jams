"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getTimeUntil } from "@/lib/utils";

interface CountdownTimerProps {
  targetDate: string | Date;
  label?: string;
}

export default function CountdownTimer({
  targetDate,
  label = "Event starts in",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeUntil(targetDate));
    
    const timer = setInterval(() => {
      setTimeLeft(getTimeUntil(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  const isExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  if (!mounted) {
    return (
      <div className="text-center">
        {label && (
          <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
            {label}
          </p>
        )}
        <div className="flex justify-center gap-3 sm:gap-4">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                <span className="text-2xl sm:text-3xl font-bold text-white">00</span>
              </div>
              <span className="text-xs sm:text-sm text-secondary-500 dark:text-secondary-400 mt-2 font-medium">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="text-center">
        <p className="text-lg font-semibold text-primary-500">Event has started!</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      {label && (
        <p className="text-sm text-secondary-500 dark:text-secondary-400 mb-4">
          {label}
        </p>
      )}
      <div className="flex justify-center gap-3 sm:gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="text-xs sm:text-sm text-secondary-500 dark:text-secondary-400 mt-2 font-medium">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
