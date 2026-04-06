"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { Event, GalleryItem } from "@/lib/types";
import { events as mockEvents, galleryItems as mockGallery } from "@/lib/data/mockData";

interface EventsContextType {
  events: Event[];
  gallery: GalleryItem[];
  addEvent: (event: Omit<Event, "id">) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;
  replaceEvents: (events: Event[]) => void;
  replaceGallery: (galleryItems: GalleryItem[]) => void;
  resetEvents: () => void;
  resetGallery: () => void;
  resetAllData: () => void;
  isLoading: boolean;
  refreshData: () => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const EVENTS_STORAGE_KEY = "cubbon_jams_events";
const GALLERY_STORAGE_KEY = "cubbon_jams_gallery";

function isLegacySeedEventsData(data: unknown): data is Event[] {
  if (!Array.isArray(data) || data.length === 0) return false;
  return data.some(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "title" in item &&
      (item as { id?: string; title?: string }).id === "1" &&
      (item as { id?: string; title?: string }).title === "Cubbon Sunday Jam"
  );
}

function isLegacySeedGalleryData(data: unknown): data is GalleryItem[] {
  if (!Array.isArray(data) || data.length === 0) return false;
  return data.some(
    (item) =>
      typeof item === "object" &&
      item !== null &&
      "id" in item &&
      "title" in item &&
      (item as { id?: string; title?: string }).id === "1" &&
      (item as { id?: string; title?: string }).title === "Sunday Morning Jam"
  );
}

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<Event[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isInitialized = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
        const storedGallery = localStorage.getItem(GALLERY_STORAGE_KEY);

        if (storedEvents) {
          const parsed = JSON.parse(storedEvents);
          if (isLegacySeedEventsData(parsed)) {
            setEvents([]);
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify([]));
          } else {
            setEvents(Array.isArray(parsed) ? parsed : mockEvents);
          }
        } else {
          // Initialize with mock data
          setEvents(mockEvents);
          localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(mockEvents));
        }

        if (storedGallery) {
          const parsed = JSON.parse(storedGallery);
          if (isLegacySeedGalleryData(parsed)) {
            setGallery([]);
            localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify([]));
          } else {
            setGallery(Array.isArray(parsed) ? parsed : mockGallery);
          }
        } else {
          // Initialize with mock data
          setGallery(mockGallery);
          localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(mockGallery));
        }
      } catch (error) {
        console.error("Error loading data from localStorage:", error);
        setEvents(mockEvents);
        setGallery(mockGallery);
      }
      isInitialized.current = true;
      setIsLoading(false);
    };

    loadData();
  }, []);

  // Save events to localStorage whenever they change (after initial load)
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    }
  }, [events]);

  // Save gallery to localStorage whenever it changes (after initial load)
  useEffect(() => {
    if (isInitialized.current) {
      localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(gallery));
    }
  }, [gallery]);

  const refreshData = useCallback(() => {
    try {
      const storedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);
      const storedGallery = localStorage.getItem(GALLERY_STORAGE_KEY);
      
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
      if (storedGallery) {
        setGallery(JSON.parse(storedGallery));
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  }, []);

  const addEvent = useCallback((eventData: Omit<Event, "id">) => {
    const newEvent: Event = {
      ...eventData,
      id: `event_${Date.now()}`,
    };
    setEvents((prev) => [newEvent, ...prev]);
  }, []);

  const updateEvent = useCallback((id: string, eventData: Partial<Event>) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id ? { ...event, ...eventData } : event
      )
    );
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== id));
  }, []);

  const addGalleryItem = useCallback((itemData: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...itemData,
      id: `gallery_${Date.now()}`,
    };
    setGallery((prev) => [newItem, ...prev]);
  }, []);

  const updateGalleryItem = useCallback((id: string, itemData: Partial<GalleryItem>) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...itemData } : item
      )
    );
  }, []);

  const deleteGalleryItem = useCallback((id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const replaceEvents = useCallback((nextEvents: Event[]) => {
    setEvents(nextEvents);
  }, []);

  const replaceGallery = useCallback((nextGallery: GalleryItem[]) => {
    setGallery(nextGallery);
  }, []);

  const resetEvents = useCallback(() => {
    setEvents(mockEvents);
  }, []);

  const resetGallery = useCallback(() => {
    setGallery(mockGallery);
  }, []);

  const resetAllData = useCallback(() => {
    setEvents(mockEvents);
    setGallery(mockGallery);
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(mockEvents));
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(mockGallery));
  }, []);

  return (
    <EventsContext.Provider
      value={{
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
        resetEvents,
        resetGallery,
        resetAllData,
        isLoading,
        refreshData,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEvents must be used within an EventsProvider");
  }
  return context;
}
