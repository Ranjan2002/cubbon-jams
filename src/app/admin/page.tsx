"use client";

import { useState } from "react";
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
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { events as initialEvents, galleryItems as initialGallery } from "@/lib/data/mockData";
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

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [events, setEvents] = useState(initialEvents);
  const [gallery, setGallery] = useState(initialGallery);
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
  });

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    src: "",
    event: "",
    date: "",
    category: "acoustic" as GalleryItem["category"],
  });

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
    });
    setIsModalOpen(true);
  };

  const handleSaveEvent = () => {
    if (editingEvent) {
      setEvents(
        events.map((e) =>
          e.id === editingEvent.id
            ? {
                ...e,
                ...eventForm,
                capacity: eventForm.capacity ? parseInt(eventForm.capacity) : undefined,
              }
            : e
        )
      );
    } else {
      const newEvent: Event = {
        id: Date.now().toString(),
        ...eventForm,
        capacity: eventForm.capacity ? parseInt(eventForm.capacity) : undefined,
        registered: 0,
      };
      setEvents([newEvent, ...events]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((e) => e.id !== id));
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
    if (editingGalleryItem) {
      setGallery(
        gallery.map((item) =>
          item.id === editingGalleryItem.id
            ? { ...item, ...galleryForm, type: "image" as const }
            : item
        )
      );
    } else {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        type: "image",
        ...galleryForm,
      };
      setGallery([newItem, ...gallery]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setGallery(gallery.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-secondary-50 dark:bg-secondary-900">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-400">
            Manage events, gallery, and community content
          </p>
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
                    <Input
                      label="Image URL"
                      value={eventForm.image}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, image: e.target.value })
                      }
                      required
                    />
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
                    <Input
                      label="Image URL"
                      value={galleryForm.src}
                      onChange={(e) =>
                        setGalleryForm({ ...galleryForm, src: e.target.value })
                      }
                      required
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
