"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Wand2, Save, Images, Sparkles } from "lucide-react";
import { GalleryItem } from "@/lib/types";
import { Input, Select } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

interface BulkGalleryUploadProps {
  onSubmit: (items: Omit<GalleryItem, "id">[]) => void;
}

interface BulkUploadItem {
  localId: string;
  title: string;
  src: string;
  event: string;
  date: string;
  category: GalleryItem["category"];
}

const galleryCategoryOptions = [
  { value: "acoustic", label: "Acoustic" },
  { value: "band", label: "Band" },
  { value: "open-mic", label: "Open Mic" },
  { value: "workshop", label: "Workshop" },
];

function slugToTitle(value: string) {
  return value
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(file);
  });
}

export default function BulkGalleryUpload({ onSubmit }: BulkGalleryUploadProps) {
  const [items, setItems] = useState<BulkUploadItem[]>([]);
  const [defaultEventName, setDefaultEventName] = useState("");
  const [defaultDate, setDefaultDate] = useState(new Date().toISOString().slice(0, 10));
  const [defaultCategory, setDefaultCategory] = useState<GalleryItem["category"]>("acoustic");
  const [isProcessing, setIsProcessing] = useState(false);

  const totalItems = items.length;

  const isReadyToSubmit = useMemo(
    () =>
      totalItems > 0 &&
      items.every((item) => item.title.trim() && item.src && item.date),
    [items, totalItems]
  );

  const handleFilesSelected = async (fileList: FileList | null) => {
    if (!fileList?.length) return;

    const selected = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
    if (!selected.length) return;

    setIsProcessing(true);

    try {
      const mapped = await Promise.all(
        selected.map(async (file, index) => {
          const src = await fileToDataUrl(file);
          return {
            localId: `${Date.now()}-${index}-${Math.random().toString(36).slice(2, 8)}`,
            title: slugToTitle(file.name),
            src,
            event: defaultEventName,
            date: defaultDate,
            category: defaultCategory,
          } as BulkUploadItem;
        })
      );

      setItems((prev) => [...prev, ...mapped]);
    } finally {
      setIsProcessing(false);
    }
  };

  const updateItem = <K extends keyof BulkUploadItem>(
    localId: string,
    key: K,
    value: BulkUploadItem[K]
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.localId === localId
          ? {
              ...item,
              [key]: value,
            }
          : item
      )
    );
  };

  const removeItem = (localId: string) => {
    setItems((prev) => prev.filter((item) => item.localId !== localId));
  };

  const applyDefaultsToAll = () => {
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        event: defaultEventName,
        date: defaultDate,
        category: defaultCategory,
      }))
    );
  };

  const submitBulkUpload = () => {
    if (!isReadyToSubmit) return;

    const payload: Omit<GalleryItem, "id">[] = items.map((item) => ({
      type: "image",
      title: item.title.trim(),
      src: item.src,
      event: item.event.trim() || undefined,
      date: item.date,
      category: item.category,
    }));

    onSubmit(payload);
    setItems([]);
  };

  return (
    <div className="bg-white dark:bg-secondary-800 rounded-2xl p-5 shadow-lg border border-secondary-200/70 dark:border-secondary-700/70">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div>
          <h3 className="text-lg font-bold text-secondary-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" />
            Bulk Image Upload
          </h3>
          <p className="text-sm text-secondary-500 dark:text-secondary-400">
            Add many photos at once, apply event defaults, then fine-tune each image.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-500 text-white font-medium cursor-pointer hover:bg-primary-600 transition-colors">
          <Upload className="w-4 h-4" />
          {isProcessing ? "Processing..." : "Select Images"}
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              handleFilesSelected(e.target.files);
              e.target.value = "";
            }}
            disabled={isProcessing}
          />
        </label>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mb-4">
        <Input
          label="Default Event Name"
          value={defaultEventName}
          onChange={(e) => setDefaultEventName(e.target.value)}
          placeholder="Cubbon Sunday Jam"
        />
        <Input
          label="Default Date"
          type="date"
          value={defaultDate}
          onChange={(e) => setDefaultDate(e.target.value)}
        />
        <Select
          label="Default Category"
          value={defaultCategory}
          onChange={(e) =>
            setDefaultCategory(e.target.value as GalleryItem["category"])
          }
          options={galleryCategoryOptions}
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-4">
        <Button type="button" variant="outline" onClick={applyDefaultsToAll}>
          <Wand2 className="w-4 h-4 mr-2" />
          Apply Defaults to All
        </Button>
        <Button
          type="button"
          variant="primary"
          disabled={!isReadyToSubmit}
          onClick={submitBulkUpload}
        >
          <Save className="w-4 h-4 mr-2" />
          Save {totalItems} Images
        </Button>
        {totalItems > 0 && (
          <Button type="button" variant="ghost" onClick={() => setItems([])}>
            Clear Queue
          </Button>
        )}
      </div>

      <AnimatePresence>
        {totalItems > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {items.map((item) => (
              <motion.div
                key={item.localId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-secondary-200 dark:border-secondary-700 overflow-hidden"
              >
                <div className="relative aspect-video bg-secondary-100 dark:bg-secondary-700">
                  <Image
                    src={item.src}
                    alt={item.title || "Upload preview"}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => removeItem(item.localId)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-red-500 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 space-y-3">
                  <Input
                    label="Title"
                    value={item.title}
                    onChange={(e) => updateItem(item.localId, "title", e.target.value)}
                  />
                  <Input
                    label="Event"
                    value={item.event}
                    onChange={(e) => updateItem(item.localId, "event", e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="Date"
                      type="date"
                      value={item.date}
                      onChange={(e) => updateItem(item.localId, "date", e.target.value)}
                    />
                    <Select
                      label="Category"
                      value={item.category}
                      onChange={(e) =>
                        updateItem(
                          item.localId,
                          "category",
                          e.target.value as GalleryItem["category"]
                        )
                      }
                      options={galleryCategoryOptions}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="rounded-2xl border-2 border-dashed border-secondary-300 dark:border-secondary-600 p-8 text-center text-secondary-500">
            <Images className="w-10 h-10 mx-auto mb-3 opacity-60" />
            <p className="font-medium">No images queued yet</p>
            <p className="text-sm">Select multiple images to start bulk upload.</p>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
