"use client";

import { useState } from "react";
import { Link2, Loader2, CheckCircle, AlertCircle, Sparkles, Calendar, Clock, MapPin, Image } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";

interface EventData {
  title: string;
  description: string;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  address: string;
  image: string;
  bookingUrl: string;
  performers?: string[];
}

interface BookMyShowImportProps {
  onImport: (data: Partial<EventData>) => void;
  className?: string;
}

export default function BookMyShowImport({
  onImport,
  className = "",
}: BookMyShowImportProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "partial">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fetchedData, setFetchedData] = useState<Partial<EventData> | null>(null);

  const handleImport = async () => {
    if (!url.trim()) {
      setErrorMessage("Please enter a BookMyShow URL");
      setStatus("error");
      return;
    }

    if (!url.includes("bookmyshow.com")) {
      setErrorMessage("Please enter a valid BookMyShow URL");
      setStatus("error");
      return;
    }

    setIsLoading(true);
    setStatus("idle");
    setErrorMessage("");
    setFetchedData(null);

    console.log('[BookMyShow UI] Starting import for URL:', url);

    try {
      // Call our API to fetch full event details
      console.log('[BookMyShow UI] Sending PUT request to /api/events');
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      console.log('[BookMyShow UI] Response status:', response.status);
      const result = await response.json();
      console.log('[BookMyShow UI] Response data:', result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch event details");
      }

      if (result.success && result.data) {
        const data = result.data;
        const eventData: Partial<EventData> = {
          title: data.title || "",
          description: data.description || `Event imported from BookMyShow. Visit the booking link for more details.`,
          date: data.date || "",
          time: data.time || "",
          endTime: data.endTime || "",
          location: data.location || data.city || "",
          address: data.address || "",
          image: data.coverImage || "",
          bookingUrl: data.bookingUrl || url,
          performers: data.performers || [],
        };

        setFetchedData(eventData);
        onImport(eventData);
        setStatus(result.partial ? "partial" : "success");
        
        console.log('[BookMyShow UI] Import successful, setting fetched data');
        
        // Reset URL after success
        setTimeout(() => {
          setUrl("");
        }, 2000);
      } else {
        console.log('[BookMyShow UI] No data in result');
        throw new Error("No data returned from API");
      }
    } catch (error) {
      console.error('[BookMyShow UI] Import error:', error);
      // Fallback: parse from URL only
      try {
        const eventSlug = extractEventSlug(url);
        const cityMatch = url.match(/bookmyshow\.com\/([a-z-]+)\/events/i);
        const city = cityMatch
          ? cityMatch[1].charAt(0).toUpperCase() + cityMatch[1].slice(1)
          : "Bangalore";

        const fallbackData: Partial<EventData> = {
          title: eventSlug || "BookMyShow Event",
          location: city,
          bookingUrl: url,
          description: `Event imported from BookMyShow. Visit the booking link for more details.`,
        };

        setFetchedData(fallbackData);
        onImport(fallbackData);
        setStatus("partial");
      } catch {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to import event"
        );
        setStatus("error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const extractEventSlug = (url: string): string | null => {
    const patterns = [
      /bookmyshow\.com\/(?:[a-z-]+\/)?events\/([^\/]+)\/([A-Z]{2}\d+)/i,
      /bookmyshow\.com\/(?:[a-z-]+\/)?(?:activities|plays)\/([^\/]+)\/([A-Z]{2}\d+)/i,
      /bookmyshow\.com\/(?:[a-z-]+\/)?events\/([^\/]+)/i,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    }
    return null;
  };

  return (
    <div className={`bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-secondary-900 dark:text-white text-sm">
            Import from BookMyShow
          </h3>
          <p className="text-xs text-secondary-500 dark:text-secondary-400">
            Paste a BookMyShow event URL to auto-fill all details
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary-400" />
          <input
            type="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setStatus("idle");
              setErrorMessage("");
            }}
            placeholder="https://in.bookmyshow.com/events/..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-secondary-200 dark:border-secondary-600 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none transition-colors text-sm"
          />
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={handleImport}
          disabled={isLoading || !url.trim()}
          className="px-4"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Import"
          )}
        </Button>
      </div>

      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3"
          >
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm mb-2">
              <CheckCircle className="w-4 h-4" />
              All event details imported successfully!
            </div>
            {fetchedData && (
              <div className="bg-white/50 dark:bg-secondary-800/50 rounded-lg p-3 text-xs space-y-1">
                {fetchedData.title && <p className="font-semibold text-secondary-900 dark:text-white">{fetchedData.title}</p>}
                <div className="flex flex-wrap gap-3 text-secondary-600 dark:text-secondary-400">
                  {fetchedData.date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {fetchedData.date}
                    </span>
                  )}
                  {fetchedData.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {fetchedData.time}
                      {fetchedData.endTime && ` - ${fetchedData.endTime}`}
                    </span>
                  )}
                  {fetchedData.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {fetchedData.location}
                    </span>
                  )}
                  {fetchedData.image && (
                    <span className="flex items-center gap-1">
                      <Image className="w-3 h-3" /> Cover image found
                    </span>
                  )}
                </div>
                {fetchedData.address && (
                  <p className="text-secondary-500 dark:text-secondary-400 text-xs mt-2">
                    📍 {fetchedData.address}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
        {status === "partial" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 mt-2 text-amber-600 dark:text-amber-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            Partial import - some fields may need manual entry
          </motion.div>
        )}
        {status === "error" && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 mt-2 text-red-600 dark:text-red-400 text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {errorMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-secondary-400 dark:text-secondary-500 mt-2">
        Fetches: title, date, time, end time, location, address, description, cover image, and performers
      </p>
    </div>
  );
}
