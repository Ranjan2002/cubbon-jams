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
  Eye,
  Users,
  Music,
  TrendingUp,
  LayoutDashboard,
  Lock,
  LogOut,
  User,
  AlertCircle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";
import ImageUpload from "@/components/ui/ImageUpload";
import BookMyShowImport from "@/components/ui/BookMyShowImport";
import { useEvents } from "@/lib/EventsContext";
import { Event, GalleryItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

type Tab = "dashboard" | "events" | "gallery";

const eventCategories = [
  { value: "jam", label: "Jam Session" },
  { value: "open-mic", label: "Open Mic" },
  { value: "concert", label: "Concert" },
  { value: "workshop", label: "Workshop" },
];

const galleryCategories = [
  { value: "acoustic", label: "Acoustic" },
  { value: "band", label: "Band" },
  { value: "open-mic", label: "Open Mic" },
  { value: "workshop", label: "Workshop" },
];

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
    deleteGalleryItem,
    isLoading: isLoadingData 
  } = useEvents();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [adminUsername, setAdminUsername] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  
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
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=600&fit=crop",
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
      // For now, delete and re-add since we don't have updateGalleryItem with proper typing
      deleteGalleryItem(editingGalleryItem.id);
      addGalleryItem(galleryData);
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
                    className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg"
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
                Manage Events
              </h2>
              <Button variant="primary" onClick={handleAddEvent}>
                <Plus className="w-5 h-5 mr-2" />
                Add Event
              </Button>
            </div>

            <div className="bg-white dark:bg-secondary-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary-50 dark:bg-secondary-700">
                    <tr>
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
                    {events.map((event) => (
                      <tr key={event.id} className="hover:bg-secondary-50 dark:hover:bg-secondary-700/50">
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
                              <p className="font-semibold text-secondary-900 dark:text-white">
                                {event.title}
                              </p>
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
                          <div className="flex justify-end gap-2">
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-secondary-900 dark:text-white">
                Manage Gallery
              </h2>
              <Button variant="primary" onClick={handleAddGalleryItem}>
                <Plus className="w-5 h-5 mr-2" />
                Add Image
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg group"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDeleteGalleryItem(item.id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-secondary-900 dark:text-white truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-secondary-500 dark:text-secondary-400 capitalize">
                      {item.category}
                    </p>
                  </div>
                </div>
              ))}
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
