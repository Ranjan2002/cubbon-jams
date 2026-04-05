"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Megaphone } from "lucide-react";
import {
  SITE_ANNOUNCEMENT_KEY,
  defaultSiteAnnouncement,
} from "@/lib/siteAnnouncement";
import type { SiteAnnouncement } from "@/lib/siteAnnouncement";

export default function SiteAnnouncement() {
  const [announcement, setAnnouncement] =
    useState<SiteAnnouncement>(defaultSiteAnnouncement);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SITE_ANNOUNCEMENT_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<SiteAnnouncement>;
      setAnnouncement((prev) => ({ ...prev, ...parsed }));
    } catch {
      // Keep defaults on malformed storage.
    }
  }, []);

  if (!announcement.enabled || dismissed || !announcement.text.trim()) {
    return null;
  }

  return (
    <div className="sticky top-0 z-[60] px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto py-2.5 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <Megaphone className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm font-medium truncate">{announcement.text}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {announcement.ctaLabel.trim() && (
            <Link
              href={announcement.ctaHref || "/events"}
              className="text-xs sm:text-sm font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-lg transition-colors"
            >
              {announcement.ctaLabel}
            </Link>
          )}
          {announcement.dismissible && (
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="p-1 rounded-md hover:bg-white/20 transition-colors"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
