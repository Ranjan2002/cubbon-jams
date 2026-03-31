"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Upload, X, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  className = "",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadMode, setUploadMode] = useState<"url" | "upload">("url");
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        alert("Please upload an image file");
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setIsProcessing(true);

      try {
        // Convert to base64
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          onChange(result);
          setIsProcessing(false);
        };
        reader.onerror = () => {
          alert("Error reading file");
          setIsProcessing(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        alert("Error processing image");
        setIsProcessing(false);
      }
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        processFile(file);
      }
    },
    [processFile]
  );

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
          {label}
        </label>
      )}

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setUploadMode("url")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            uploadMode === "url"
              ? "bg-primary-500 text-white"
              : "bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-600"
          }`}
        >
          <LinkIcon className="w-4 h-4" />
          URL
        </button>
        <button
          type="button"
          onClick={() => setUploadMode("upload")}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            uploadMode === "upload"
              ? "bg-primary-500 text-white"
              : "bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400 hover:bg-secondary-200 dark:hover:bg-secondary-600"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload
        </button>
      </div>

      {uploadMode === "url" ? (
        <input
          type="url"
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className="w-full px-4 py-2.5 rounded-xl border-2 border-secondary-200 dark:border-secondary-700 bg-white dark:bg-secondary-800 text-secondary-900 dark:text-white placeholder:text-secondary-400 focus:border-primary-500 focus:outline-none transition-colors"
        />
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
              : "border-secondary-300 dark:border-secondary-600 hover:border-primary-400 dark:hover:border-primary-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <AnimatePresence mode="wait">
            {isProcessing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-4"
              >
                <div className="w-10 h-10 border-3 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mx-auto mb-2" />
                <p className="text-secondary-500 dark:text-secondary-400 text-sm">
                  Processing image...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Upload className="w-10 h-10 mx-auto text-secondary-400 mb-2" />
                <p className="text-secondary-600 dark:text-secondary-400 text-sm mb-1">
                  <span className="font-semibold text-primary-500">Click to upload</span> or
                  drag and drop
                </p>
                <p className="text-secondary-400 dark:text-secondary-500 text-xs">
                  PNG, JPG, GIF up to 5MB
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Preview */}
      {value && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 relative"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary-100 dark:bg-secondary-700">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized={value.startsWith("data:")}
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {value.startsWith("data:") && (
            <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-1 flex items-center gap-1">
              <ImageIcon className="w-3 h-3" />
              Local image (base64)
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
