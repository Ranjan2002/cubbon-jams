"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Calendar,
  Image as ImageIcon,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Users,
  Music,
  TrendingUp,
  LayoutDashboard,
  Lock,
  LogOut,
  User,
  AlertCircle,
  ExternalLink,
  Search,
  Download,
  RefreshCw,
  Copy,
  Star,
  StarOff,
  CheckSquare,
  Square,
  ArrowUpDown,
  BarChart3,
  Sparkles,
  Database,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import ImageUpload from "@/components/ui/ImageUpload";
import BookMyShowImport from "@/components/ui/BookMyShowImport";
import BulkGalleryUpload from "@/components/ui/BulkGalleryUpload";
import { useEvents } from "@/lib/EventsContext";
import { Event, GalleryItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import {
  SITE_SETTINGS_KEY,
  SiteSettings,
  defaultSiteSettings,
} from "@/lib/siteSettings";
import {
  SITE_ANNOUNCEMENT_KEY,
  SiteAnnouncement,
  defaultSiteAnnouncement,
} from "@/lib/siteAnnouncement";

type Tab = "dashboard" | "events" | "gallery" | "site";

type EventSort = "newest" | "oldest" | "title" | "capacity";
type GallerySort = "newest" | "oldest" | "title";

const eventCategories = [
  { value: "jam", label: "Jam Session" },
  { value: "open-mic", label: "Open Mic" },
  { value: "concert", label: "Concert" },
  { value: "workshop", label: "Workshop" },
];

const galleryCategories = [
  { value: "all", label: "All Media" },
  { value: "acoustic", label: "Acoustic" },
  { value: "band", label: "Band" },
  { value: "open-mic", label: "Open Mic" },
  { value: "workshop", label: "Workshop" },
];

const defaultEventImage =
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop";

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

// Admin credentials - in production use environment variables
const ADMIN_CREDENTIALS = {
  username: "Ranjan",
  password: "Ranjan@123",
};

// Login Component
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      // Store auth in localStorage with expiry
      const authData = {
        isAuthenticated: true,
        username: username,
        expiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };
      localStorage.setItem("admin_auth", JSON.stringify(authData));
      onLogin();
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-primary-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary-500/30"
          >
            <Music className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-secondary-400">Cubbon Jams Dashboard</p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-secondary-800 rounded-2xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Username Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary-50 dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 rounded-xl text-secondary-900 dark:text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter username"
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-secondary-50 dark:bg-secondary-700 border border-secondary-200 dark:border-secondary-600 rounded-xl text-secondary-900 dark:text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter password"
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/30 transition-colors flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-secondary-500 dark:text-secondary-400">
              Protected admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <a
            href="/"
            className="text-secondary-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const toast = useToast();
  const { 
    events, 
    gallery, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    addGalleryItem, 
    updateGalleryItem,
    deleteGalleryItem,
    replaceEvents,
    replaceGallery,
    resetAllData,
    isLoading: isLoadingData 
  } = useEvents();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminUsername, setAdminUsername] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [eventQuery, setEventQuery] = useState("");
  const [galleryQuery, setGalleryQuery] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState("all");
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState("all");
  const [eventSort, setEventSort] = useState<EventSort>("newest");
  const [gallerySort, setGallerySort] = useState<GallerySort>("newest");
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [selectedGalleryIds, setSelectedGalleryIds] = useState<string[]>([]);
  const [siteSettings, setSiteSettings] =
    useState<SiteSettings>(defaultSiteSettings);
  const [announcement, setAnnouncement] =
    useState<SiteAnnouncement>(defaultSiteAnnouncement);
  const [isSavingSiteSettings, setIsSavingSiteSettings] = useState(false);
  
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    endTime: "",
    location: "",
    address: "",
    image: "",
    category: "jam" as Event["category"],
    capacity: "",
    bookingUrl: "",
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    src: "",
    event: "",
    date: "",
    category: "acoustic" as GalleryItem["category"],
  });

  const filteredEvents = events
    .filter((event) => {
      const query = eventQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query) ||
        event.address.toLowerCase().includes(query);
      const matchesCategory =
        eventCategoryFilter === "all" || event.category === eventCategoryFilter;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (eventSort === "title") return a.title.localeCompare(b.title);
      if (eventSort === "capacity") return (b.capacity || 0) - (a.capacity || 0);
      if (eventSort === "oldest") return +new Date(a.date) - +new Date(b.date);
      return +new Date(b.date) - +new Date(a.date);
    });

  const filteredGallery = gallery
    .filter((item) => {
      const query = galleryQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        item.title.toLowerCase().includes(query) ||
        (item.event || "").toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
      const matchesCategory =
        galleryCategoryFilter === "all" || item.category === galleryCategoryFilter;
      return matchesQuery && matchesCategory;
    })
    .sort((a, b) => {
      if (gallerySort === "title") return a.title.localeCompare(b.title);
      if (gallerySort === "oldest") return +new Date(a.date) - +new Date(b.date);
      return +new Date(b.date) - +new Date(a.date);
    });

  const featuredEvents = events.filter((event) => event.featured).length;
  const upcomingEvents = events.filter((event) => !event.isPast).length;
  const averageFillRate =
    events.length === 0
      ? 0
      : Math.round(
          (events.reduce((sum, event) => {
            if (!event.capacity) return sum;
            return sum + Math.min((event.registered || 0) / event.capacity, 1);
          }, 0) /
            events.filter((event) => event.capacity).length || 0) *
            100
        ) || 0;

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const authData = localStorage.getItem("admin_auth");
        if (authData) {
          const parsed = JSON.parse(authData);
          if (parsed.isAuthenticated && parsed.expiry > Date.now()) {
            setIsAuthenticated(true);
            setAdminUsername(parsed.username);
          } else {
            localStorage.removeItem("admin_auth");
          }
        }
      } catch {
        localStorage.removeItem("admin_auth");
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SITE_ANNOUNCEMENT_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<SiteAnnouncement>;
      setAnnouncement((prev) => ({ ...prev, ...parsed }));
    } catch {
      // keep defaults
    }
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SITE_SETTINGS_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<SiteSettings>;
      setSiteSettings((prev) => ({ ...prev, ...parsed }));
    } catch {
      // ignore malformed settings and keep defaults
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setAdminUsername("");
    toast.info("Logged Out", "You have been signed out successfully.");
  };

  // Handle successful login
  const handleLogin = () => {
    const authData = localStorage.getItem("admin_auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      setAdminUsername(parsed.username);
    }
    setIsAuthenticated(true);
    toast.success("Welcome Back!", "You have signed in successfully.");
  };

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Stats
  const stats = [
    {
      icon: Calendar,
      label: "Total Events",
      value: events.length,
      color: "bg-blue-500",
    },
    {
      icon: Users,
      label: "Total Registrations",
      value: events.reduce((acc, e) => acc + (e.registered || 0), 0),
      color: "bg-green-500",
    },
    {
      icon: ImageIcon,
      label: "Gallery Items",
      value: gallery.length,
      color: "bg-purple-500",
    },
    {
      icon: TrendingUp,
      label: "Upcoming Events",
      value: events.filter((e) => !e.isPast).length,
      color: "bg-primary-500",
    },
  ];

  // Event handlers
  const handleAddEvent = () => {
    setEditingEvent(null);
    setEventForm({
      title: "",
      description: "",
      date: "",
      time: "",
      endTime: "",
      location: "",
      address: "",
      image: defaultEventImage,
      category: "jam",
      capacity: "",
      bookingUrl: "",
    });
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      endTime: event.endTime || "",
      location: event.location,
      address: event.address,
      image: event.image,
      category: event.category,
      capacity: event.capacity?.toString() || "",
      bookingUrl: (event as Event & { bookingUrl?: string }).bookingUrl || "",
    });
    setIsModalOpen(true);
  };

  const handleDuplicateEvent = (event: Event) => {
    const duplicatedEvent = {
      ...event,
      title: `${event.title} Copy`,
      featured: false,
      registered: 0,
      isPast: false,
      bookingUrl: event.bookingUrl,
    };
    addEvent({
      title: duplicatedEvent.title,
      description: duplicatedEvent.description,
      date: duplicatedEvent.date,
      time: duplicatedEvent.time,
      endTime: duplicatedEvent.endTime,
      location: duplicatedEvent.location,
      address: duplicatedEvent.address,
      image: duplicatedEvent.image,
      category: duplicatedEvent.category,
      performers: duplicatedEvent.performers,
      capacity: duplicatedEvent.capacity,
      registered: 0,
      isPast: false,
      featured: false,
      bookingUrl: duplicatedEvent.bookingUrl,
    });
    toast.success("Event Duplicated", `A copy of "${event.title}" was created.`);
  };

  const toggleEventFeatured = (event: Event) => {
    updateEvent(event.id, { featured: !event.featured });
    toast.info(
      event.featured ? "Featured removed" : "Featured enabled",
      `"${event.title}" was ${event.featured ? "removed from" : "added to"} the spotlight.`
    );
  };

  const toggleEventStatus = (event: Event) => {
    updateEvent(event.id, { isPast: !event.isPast });
    toast.info(
      event.isPast ? "Marked upcoming" : "Marked past",
      `"${event.title}" moved to ${event.isPast ? "upcoming" : "past"}.`
    );
  };

  const handleEditGalleryItem = (item: GalleryItem) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      title: item.title,
      src: item.src,
      event: item.event || "",
      date: item.date,
      category: item.category === "all" ? "acoustic" : item.category,
    });
    setActiveTab("gallery");
    setIsModalOpen(true);
  };

  const handleDuplicateGalleryItem = (item: GalleryItem) => {
    addGalleryItem({
      type: item.type,
      title: `${item.title} Copy`,
      src: item.src,
      thumbnail: item.thumbnail,
      event: item.event,
      date: item.date,
      category: item.category,
    });
    toast.success("Image Duplicated", `A copy of "${item.title}" was created.`);
  };

  const toggleGallerySelection = (id: string) => {
    setSelectedGalleryIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const toggleEventSelection = (id: string) => {
    setSelectedEventIds((prev) =>
      prev.includes(id) ? prev.filter((eventId) => eventId !== id) : [...prev, id]
    );
  };

  const clearSelections = () => {
    setSelectedEventIds([]);
    setSelectedGalleryIds([]);
  };

  const handleBulkDeleteEvents = () => {
    if (!selectedEventIds.length) return;
    if (!confirm(`Delete ${selectedEventIds.length} selected event(s)?`)) return;
    selectedEventIds.forEach((id) => deleteEvent(id));
    toast.success("Events deleted", `${selectedEventIds.length} event(s) removed.`);
    setSelectedEventIds([]);
  };

  const handleBulkFeatureEvents = (featured: boolean) => {
    selectedEventIds.forEach((id) => updateEvent(id, { featured }));
    toast.success(
      featured ? "Events featured" : "Events unfeatured",
      `${selectedEventIds.length} event(s) updated.`
    );
    setSelectedEventIds([]);
  };

  const handleBulkDeleteGallery = () => {
    if (!selectedGalleryIds.length) return;
    if (!confirm(`Delete ${selectedGalleryIds.length} selected image(s)?`)) return;
    selectedGalleryIds.forEach((id) => deleteGalleryItem(id));
    toast.success("Gallery cleaned", `${selectedGalleryIds.length} image(s) removed.`);
    setSelectedGalleryIds([]);
  };

  const handleExportBackup = () => {
    downloadJson(`cubbon-jams-backup-${new Date().toISOString().slice(0, 10)}.json`, {
      events,
      gallery,
      siteSettings,
      announcement,
      exportedAt: new Date().toISOString(),
    });
    toast.success("Backup exported", "Your website content backup has been downloaded.");
  };

  const handleBackupUpload = async (file: File) => {
    const text = await file.text();
    const parsed = JSON.parse(text) as {
      events?: Event[];
      gallery?: GalleryItem[];
      siteSettings?: SiteSettings;
      announcement?: SiteAnnouncement;
    };
    if (Array.isArray(parsed.events)) {
      replaceEvents(parsed.events);
    }
    if (Array.isArray(parsed.gallery)) {
      replaceGallery(parsed.gallery);
    }
    if (parsed.siteSettings) {
      setSiteSettings((prev) => ({ ...prev, ...parsed.siteSettings }));
      localStorage.setItem(
        SITE_SETTINGS_KEY,
        JSON.stringify({ ...siteSettings, ...parsed.siteSettings })
      );
    }
    if (parsed.announcement) {
      setAnnouncement((prev) => ({ ...prev, ...parsed.announcement }));
      localStorage.setItem(
        SITE_ANNOUNCEMENT_KEY,
        JSON.stringify({ ...announcement, ...parsed.announcement })
      );
    }
    toast.success("Backup restored", "Website content was imported successfully.");
  };

  const handleBulkGallerySubmit = (items: Omit<GalleryItem, "id">[]) => {
    items.forEach((item) => addGalleryItem(item));
    toast.success("Bulk upload complete", `${items.length} image(s) added to gallery.`);
  };

  const handleSaveSiteSettings = async () => {
    setIsSavingSiteSettings(true);
    try {
      localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(siteSettings));
      toast.success("Website updated", "Homepage content settings were saved.");
    } finally {
      setIsSavingSiteSettings(false);
    }
  };

  const handleResetSiteSettings = () => {
    setSiteSettings(defaultSiteSettings);
    localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(defaultSiteSettings));
    toast.info("Settings reset", "Hero content was restored to defaults.");
  };

  const handleSaveAnnouncement = () => {
    localStorage.setItem(SITE_ANNOUNCEMENT_KEY, JSON.stringify(announcement));
    toast.success("Announcement updated", "Global announcement settings were saved.");
  };

  const handleResetAnnouncement = () => {
    setAnnouncement(defaultSiteAnnouncement);
    localStorage.setItem(
      SITE_ANNOUNCEMENT_KEY,
      JSON.stringify(defaultSiteAnnouncement)
    );
    toast.info("Announcement cleared", "Global announcement was reset.");
  };

  const handleAutoMarkPastEvents = () => {
    const today = new Date();
    const updated = events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate < today && !event.isPast;
    });

    updated.forEach((event) => updateEvent(event.id, { isPast: true }));
    toast.success(
      "Past events updated",
      `${updated.length} event(s) marked as past based on date.`
    );
  };

  const handleCreateNextSundayJam = () => {
    const base = new Date();
    const day = base.getDay();
    const daysUntilSunday = day === 0 ? 7 : 7 - day;
    base.setDate(base.getDate() + daysUntilSunday);
    const nextSunday = base.toISOString().slice(0, 10);

    addEvent({
      title: "Cubbon Sunday Jam",
      description:
        "Our weekly community jam. Bring your instrument, your voice, or just your vibe.",
      date: nextSunday,
      time: "08:30",
      endTime: "11:30",
      location: "Cubbon Park",
      address: "Kasturba Road, Cubbon Park, Bangalore 560001",
      image: defaultEventImage,
      category: "jam",
      performers: ["Open to all"],
      capacity: 80,
      registered: 0,
      isPast: false,
      featured: true,
      bookingUrl: undefined,
    });
    toast.success("Weekly jam created", `New Sunday jam scheduled for ${nextSunday}.`);
  };

  const handleResetDemoData = () => {
    if (!confirm("Reset all events and gallery content back to the demo set?")) return;
    resetAllData();
    clearSelections();
    toast.warning("Demo data restored", "All local content was reset to the default state.");
  };

  // Handle BookMyShow import
  const handleBookMyShowImport = (data: {
    title?: string;
    description?: string;
    location?: string;
    address?: string;
    bookingUrl?: string;
    date?: string;
    time?: string;
    endTime?: string;
    image?: string;
    performers?: string[];
  }) => {
    setEventForm((prev) => ({
      ...prev,
      title: data.title || prev.title,
      description: data.description || prev.description,
      location: data.location || prev.location,
      address: data.address || prev.address,
      bookingUrl: data.bookingUrl || prev.bookingUrl,
      date: data.date || prev.date,
      time: data.time || prev.time,
      endTime: data.endTime || prev.endTime,
      image: data.image || prev.image,
    }));
    toast.success("Imported!", "Event details have been filled from BookMyShow.");
  };

  const handleSaveEvent = () => {
    const eventData = {
      title: eventForm.title,
      description: eventForm.description,
      date: eventForm.date,
      time: eventForm.time,
      endTime: eventForm.endTime || undefined,
      location: eventForm.location,
      address: eventForm.address,
      image: eventForm.image,
      category: eventForm.category,
      capacity: eventForm.capacity ? parseInt(eventForm.capacity) : undefined,
      bookingUrl: eventForm.bookingUrl || undefined,
      registered: 0,
    };

    if (editingEvent) {
      updateEvent(editingEvent.id, eventData);
      toast.success("Event Updated", `"${eventForm.title}" has been updated successfully.`);
    } else {
      addEvent(eventData);
      toast.success("Event Created", `"${eventForm.title}" has been added to events.`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    const eventToDelete = events.find(e => e.id === id);
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(id);
      toast.success("Event Deleted", `"${eventToDelete?.title}" has been removed.`);
    }
  };

  // Gallery handlers
  const handleAddGalleryItem = () => {
    setEditingGalleryItem(null);
    setGalleryForm({
      title: "",
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
      event: "",
      date: "",
      category: "acoustic",
    });
    setIsModalOpen(true);
  };

  const handleSaveGalleryItem = () => {
    const galleryData = {
      type: "image" as const,
      title: galleryForm.title,
      src: galleryForm.src,
      event: galleryForm.event || undefined,
      date: galleryForm.date,
      category: galleryForm.category,
    };

    if (editingGalleryItem) {
      updateGalleryItem(editingGalleryItem.id, galleryData);
      toast.success("Image Updated", `"${galleryForm.title}" has been updated.`);
    } else {
      addGalleryItem(galleryData);
      toast.success("Image Added", `"${galleryForm.title}" has been added to gallery.`);
    }
    setIsModalOpen(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    const itemToDelete = gallery.find(item => item.id === id);
    if (confirm("Are you sure you want to delete this image?")) {
      deleteGalleryItem(id);
      toast.success("Image Deleted", `"${itemToDelete?.title}" has been removed.`);
    }
  };

  // Show loading while data loads
  if (isLoadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary-400">Loading data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-secondary-50 dark:bg-secondary-900">
      <div className="container-custom">
        {/* Header with Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-secondary-600 dark:text-secondary-400">
                Welcome back, <span className="font-semibold text-primary-500">{adminUsername}</span>
              </p>
            </div>
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2.5 bg-secondary-200 dark:bg-secondary-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-secondary-700 dark:text-secondary-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl font-medium transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-2"
        >
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "events", label: "Events", icon: Calendar },
            { id: "gallery", label: "Gallery", icon: ImageIcon },
            { id: "site", label: "Site Editor", icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                    : "bg-white dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
              <div className="bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 rounded-3xl p-6 sm:p-8 shadow-2xl text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,57,53,0.18),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.12),transparent_30%)]" />
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="max-w-2xl">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold uppercase tracking-[0.2em] mb-4">
                      <Sparkles className="w-3.5 h-3.5" />
                      Command Center
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                      One place to run the whole website.
                    </h2>
                    <p className="text-white/75 max-w-2xl leading-relaxed">
                      Manage events, gallery content, backups, and spotlight states from a single glassmorphic cockpit built for fast edits.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 min-w-[240px]">
                    <button
                      type="button"
                      onClick={handleExportBackup}
                      className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-left hover:bg-white/15 transition-colors"
                    >
                      <Download className="w-5 h-5 mb-2" />
                      <p className="font-semibold">Export backup</p>
                      <p className="text-xs text-white/70">Download JSON</p>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetDemoData}
                      className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-left hover:bg-white/15 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5 mb-2" />
                      <p className="font-semibold">Reset demo</p>
                      <p className="text-xs text-white/70">Restore defaults</p>
                    </button>
                    <label className="rounded-2xl bg-white/10 border border-white/15 px-4 py-3 text-left hover:bg-white/15 transition-colors cursor-pointer col-span-2">
                      <Database className="w-5 h-5 mb-2" />
                      <p className="font-semibold">Import backup</p>
                      <p className="text-xs text-white/70">JSON file restore</p>
                      <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            await handleBackupUpload(file);
                            e.target.value = "";
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-3xl p-6 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary-900 dark:text-white">Live snapshot</h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400">Current website health</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-secondary-50 dark:bg-secondary-700 p-4">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">{featuredEvents}</p>
                    <p className="text-xs text-secondary-500 mt-1">Featured events</p>
                  </div>
                  <div className="rounded-2xl bg-secondary-50 dark:bg-secondary-700 p-4">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">{averageFillRate}%</p>
                    <p className="text-xs text-secondary-500 mt-1">Fill rate</p>
                  </div>
                  <div className="rounded-2xl bg-secondary-50 dark:bg-secondary-700 p-4">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">{upcomingEvents}</p>
                    <p className="text-xs text-secondary-500 mt-1">Upcoming events</p>
                  </div>
                  <div className="rounded-2xl bg-secondary-50 dark:bg-secondary-700 p-4">
                    <p className="text-2xl font-bold text-secondary-900 dark:text-white">{gallery.length}</p>
                    <p className="text-xs text-secondary-500 mt-1">Gallery assets</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70"
                  >
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-3xl font-bold text-secondary-900 dark:text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                Advanced Event Operations
              </h2>
              <p className="text-secondary-500 dark:text-secondary-400 text-sm mb-4">
                Run quick automations to maintain event health without manual edits.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="outline" onClick={handleAutoMarkPastEvents}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Auto-Mark Past Events
                </Button>
                <Button type="button" variant="primary" onClick={handleCreateNextSundayJam}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Next Sunday Jam
                </Button>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Recent Events
              </h2>
              <div className="space-y-3">
                {events.slice(0, 5).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-4 p-3 bg-secondary-50 dark:bg-secondary-700 rounded-xl"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-secondary-900 dark:text-white truncate">
                        {event.title}
                      </h3>
                      <p className="text-sm text-secondary-500 dark:text-secondary-400">
                        {formatDate(event.date)}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.isPast
                          ? "bg-secondary-200 text-secondary-600 dark:bg-secondary-600 dark:text-secondary-300"
                          : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                      }`}
                    >
                      {event.isPast ? "Past" : "Upcoming"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Events Tab */}
        {activeTab === "events" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                    Manage Events
                  </h2>
                  <p className="text-secondary-500 dark:text-secondary-400 text-sm">
                    Search, duplicate, feature, or bulk update events.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => setSelectedEventIds(filteredEvents.map((event) => event.id))}>
                    <CheckSquare className="w-5 h-5 mr-2" />
                    Select Visible
                  </Button>
                  <Button variant="primary" onClick={handleAddEvent}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Event
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-2xl p-4 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70 grid gap-4 lg:grid-cols-[1.1fr_0.6fr_0.5fr_0.5fr]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    value={eventQuery}
                    onChange={(e) => setEventQuery(e.target.value)}
                    placeholder="Search event title, venue, address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
                <select
                  value={eventCategoryFilter}
                  onChange={(e) => setEventCategoryFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Categories</option>
                  {eventCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <select
                  value={eventSort}
                  onChange={(e) => setEventSort(e.target.value as EventSort)}
                  className="px-4 py-3 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title</option>
                  <option value="capacity">Capacity</option>
                </select>
                <div className="flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={clearSelections} className="w-full justify-center">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {selectedEventIds.length > 0 && (
                <div className="bg-secondary-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <p className="font-medium">
                    {selectedEventIds.length} event(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={() => handleBulkFeatureEvents(true)}>
                      <Star className="w-4 h-4 mr-2" />
                      Feature
                    </Button>
                    <Button variant="secondary" onClick={() => handleBulkFeatureEvents(false)}>
                      <StarOff className="w-4 h-4 mr-2" />
                      Unfeature
                    </Button>
                    <Button variant="secondary" onClick={handleBulkDeleteEvents}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg overflow-hidden border border-secondary-200/70 dark:border-secondary-700/70">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50 dark:bg-secondary-700">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white w-12">
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedEventIds.length === filteredEvents.length) {
                              setSelectedEventIds([]);
                            } else {
                              setSelectedEventIds(filteredEvents.map((event) => event.id));
                            }
                          }}
                        >
                          {selectedEventIds.length === filteredEvents.length && filteredEvents.length > 0 ? (
                            <CheckSquare className="w-5 h-5" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                        Event
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                        Location
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-secondary-900 dark:text-white">
                        Registrations
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-secondary-900 dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary-100 dark:divide-secondary-700">
                    {filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50">
                        <td className="px-4 py-4 align-top">
                          <button type="button" onClick={() => toggleEventSelection(event.id)}>
                            {selectedEventIds.includes(event.id) ? (
                              <CheckSquare className="w-5 h-5 text-primary-500" />
                            ) : (
                              <Square className="w-5 h-5 text-secondary-400" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={event.image}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-semibold text-secondary-900 dark:text-white">
                                  {event.title}
                                </p>
                                {event.featured && (
                                  <span className="inline-flex items-center rounded-full bg-primary-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-500">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-secondary-500 dark:text-secondary-400 capitalize">
                                {event.category.replace("-", " ")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">
                          {formatDate(event.date)}
                        </td>
                        <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">
                          {event.location}
                        </td>
                        <td className="px-6 py-4 text-secondary-600 dark:text-secondary-400">
                          {event.registered || 0}/{event.capacity || "∞"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end flex-wrap gap-2">
                            <button
                              onClick={() => toggleEventFeatured(event)}
                              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                              aria-label="Toggle featured"
                            >
                              {event.featured ? <StarOff className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => toggleEventStatus(event)}
                              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                              aria-label="Toggle status"
                            >
                              <ArrowUpDown className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDuplicateEvent(event)}
                              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                              aria-label="Duplicate"
                            >
                              <Copy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditEvent(event)}
                              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-primary-500 hover:text-white transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-6">
              <BulkGalleryUpload onSubmit={handleBulkGallerySubmit} />
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-secondary-900 dark:text-white">
                    Manage Gallery
                  </h2>
                  <p className="text-secondary-500 dark:text-secondary-400 text-sm">
                    Curate, duplicate, and bulk tidy gallery assets.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" onClick={() => setSelectedGalleryIds(filteredGallery.map((item) => item.id))}>
                    <CheckSquare className="w-5 h-5 mr-2" />
                    Select Visible
                  </Button>
                  <Button variant="primary" onClick={handleAddGalleryItem}>
                    <Plus className="w-5 h-5 mr-2" />
                    Add Image
                  </Button>
                </div>
              </div>

              <div className="bg-white dark:bg-secondary-800 rounded-2xl p-4 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70 grid gap-4 lg:grid-cols-[1.1fr_0.6fr_0.5fr_0.5fr]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-400" />
                  <input
                    type="text"
                    value={galleryQuery}
                    onChange={(e) => setGalleryQuery(e.target.value)}
                    placeholder="Search title, event, category..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
                <select
                  value={galleryCategoryFilter}
                  onChange={(e) => setGalleryCategoryFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                >
                  {galleryCategories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <select
                  value={gallerySort}
                  onChange={(e) => setGallerySort(e.target.value as GallerySort)}
                  className="px-4 py-3 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white focus:border-primary-500 focus:outline-none transition-colors"
                >
                  <option value="newest">Newest first</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title</option>
                </select>
                <div className="flex items-center justify-between gap-3">
                  <Button variant="ghost" onClick={clearSelections} className="w-full justify-center">
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Clear
                  </Button>
                </div>
              </div>

              {selectedGalleryIds.length > 0 && (
                <div className="bg-secondary-900 text-white rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <p className="font-medium">
                    {selectedGalleryIds.length} image(s) selected
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={handleBulkDeleteGallery}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredGallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg group border border-secondary-200/70 dark:border-secondary-700/70"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <button
                        type="button"
                        onClick={() => toggleGallerySelection(item.id)}
                        className="self-start p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        {selectedGalleryIds.includes(item.id) ? (
                          <CheckSquare className="w-4 h-4" />
                        ) : (
                          <Square className="w-4 h-4" />
                        )}
                      </button>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleDuplicateGalleryItem(item)}
                          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleEditGalleryItem(item)}
                          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-secondary-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 capitalize">
                      {item.category}
                    </p>
                    {item.event && (
                      <p className="text-xs text-secondary-400 mt-1 truncate">
                        {item.event}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Site Settings Tab */}
        {activeTab === "site" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70 mb-6">
              <h2 className="text-2xl font-bold text-secondary-900 dark:text-white mb-2">
                Website Content Editor
              </h2>
              <p className="text-secondary-500 dark:text-secondary-400 text-sm">
                Control homepage hero copy, badge text, and main CTA links directly from admin.
              </p>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70">
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  label="Hero Badge"
                  value={siteSettings.heroBadge}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroBadge: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Hero Primary Title"
                  value={siteSettings.heroTitlePrimary}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroTitlePrimary: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Hero Secondary Title"
                  value={siteSettings.heroTitleSecondary}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroTitleSecondary: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                <Input
                  label="Hero Tagline"
                  value={siteSettings.heroTagline}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroTagline: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-4">
                <Textarea
                  label="Hero Description"
                  value={siteSettings.heroDescription}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroDescription: e.target.value,
                    }))
                  }
                  rows={4}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Primary CTA Label"
                  value={siteSettings.heroPrimaryCtaLabel}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroPrimaryCtaLabel: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Primary CTA Link"
                  value={siteSettings.heroPrimaryCtaHref}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroPrimaryCtaHref: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Secondary CTA Label"
                  value={siteSettings.heroSecondaryCtaLabel}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroSecondaryCtaLabel: e.target.value,
                    }))
                  }
                />
                <Input
                  label="Secondary CTA Link"
                  value={siteSettings.heroSecondaryCtaHref}
                  onChange={(e) =>
                    setSiteSettings((prev) => ({
                      ...prev,
                      heroSecondaryCtaHref: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mt-8 border-t border-secondary-200 dark:border-secondary-700 pt-6">
                <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                  Global Announcement Bar
                </h3>
                <p className="text-secondary-500 dark:text-secondary-400 text-sm mb-4">
                  Configure the top announcement bar shown across the website.
                </p>

                <div className="flex items-center gap-3 mb-4">
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={announcement.enabled}
                      onChange={(e) =>
                        setAnnouncement((prev) => ({
                          ...prev,
                          enabled: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                      Enable announcement
                    </span>
                  </label>
                  <label className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={announcement.dismissible}
                      onChange={(e) =>
                        setAnnouncement((prev) => ({
                          ...prev,
                          dismissible: e.target.checked,
                        }))
                      }
                      className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">
                      Allow dismiss
                    </span>
                  </label>
                </div>

                <div className="space-y-4">
                  <Textarea
                    label="Announcement Text"
                    value={announcement.text}
                    onChange={(e) =>
                      setAnnouncement((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Announcement CTA Label"
                      value={announcement.ctaLabel}
                      onChange={(e) =>
                        setAnnouncement((prev) => ({
                          ...prev,
                          ctaLabel: e.target.value,
                        }))
                      }
                    />
                    <Input
                      label="Announcement CTA Link"
                      value={announcement.ctaHref}
                      onChange={(e) =>
                        setAnnouncement((prev) => ({
                          ...prev,
                          ctaHref: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSaveSiteSettings}
                  disabled={isSavingSiteSettings}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSavingSiteSettings ? "Saving..." : "Save Website Settings"}
                </Button>
                <Button type="button" variant="outline" onClick={handleResetSiteSettings}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Defaults
                </Button>
                <Button type="button" variant="secondary" onClick={handleSaveAnnouncement}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Announcement
                </Button>
                <Button type="button" variant="ghost" onClick={handleResetAnnouncement}>
                  Reset Announcement
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white dark:bg-secondary-800 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
                    {activeTab === "events"
                      ? editingEvent
                        ? "Edit Event"
                        : "Add Event"
                      : editingGalleryItem
                      ? "Edit Image"
                      : "Add Image"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {activeTab === "events" ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveEvent();
                    }}
                    className="space-y-4"
                  >
                    {/* BookMyShow Import */}
                    {!editingEvent && (
                      <BookMyShowImport onImport={handleBookMyShowImport} />
                    )}

                    <Input
                      label="Event Title"
                      value={eventForm.title}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, title: e.target.value })
                      }
                      required
                    />
                    <Textarea
                      label="Description"
                      value={eventForm.description}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, description: e.target.value })
                      }
                      rows={3}
                      required
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Date"
                        type="date"
                        value={eventForm.date}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, date: e.target.value })
                        }
                        required
                      />
                      <Input
                        label="Start Time"
                        type="time"
                        value={eventForm.time}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, time: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="End Time"
                        type="time"
                        value={eventForm.endTime}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, endTime: e.target.value })
                        }
                      />
                      <Input
                        label="Capacity"
                        type="number"
                        value={eventForm.capacity}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, capacity: e.target.value })
                        }
                        placeholder="Leave empty for unlimited"
                      />
                    </div>
                    <Input
                      label="Location"
                      value={eventForm.location}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, location: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Full Address"
                      value={eventForm.address}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, address: e.target.value })
                      }
                      required
                    />
                    
                    {/* Image Upload */}
                    <ImageUpload
                      label="Event Image"
                      value={eventForm.image}
                      onChange={(value) =>
                        setEventForm({ ...eventForm, image: value })
                      }
                    />

                    {/* Booking URL */}
                    <div>
                      <Input
                        label="Booking URL (optional)"
                        value={eventForm.bookingUrl}
                        onChange={(e) =>
                          setEventForm({ ...eventForm, bookingUrl: e.target.value })
                        }
                        placeholder="https://in.bookmyshow.com/..."
                      />
                      {eventForm.bookingUrl && (
                        <a
                          href={eventForm.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 mt-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Open booking page
                        </a>
                      )}
                    </div>

                    <Select
                      label="Category"
                      value={eventForm.category}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          category: e.target.value as Event["category"],
                        })
                      }
                      options={eventCategories}
                    />
                    <Button type="submit" variant="primary" className="w-full">
                      <Save className="w-5 h-5 mr-2" />
                      {editingEvent ? "Update Event" : "Create Event"}
                    </Button>
                  </form>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveGalleryItem();
                    }}
                    className="space-y-4"
                  >
                    <Input
                      label="Title"
                      value={galleryForm.title}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, title: e.target.value })
                      }
                      required
                    />
                    
                    {/* Image Upload */}
                    <ImageUpload
                      label="Photo"
                      value={galleryForm.src}
                      onChange={(value) =>
                        setGalleryForm({ ...galleryForm, src: value })
                      }
                    />

                    <Input
                      label="Event Name"
                      value={galleryForm.event}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, event: e.target.value })
                      }
                    />
                    <Input
                      label="Date"
                      type="date"
                      value={galleryForm.date}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, date: e.target.value })
                      }
                      required
                    />
                    <Select
                      label="Category"
                      value={galleryForm.category}
                      onChange={(e) =>
                        setGalleryForm({
                          ...galleryForm,
                          category: e.target.value as GalleryItem["category"],
                        })
                      }
                      options={galleryCategories}
                    />
                    <Button type="submit" variant="primary" className="w-full">
                      <Save className="w-5 h-5 mr-2" />
                      {editingGalleryItem ? "Update Image" : "Add Image"}
                    </Button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
