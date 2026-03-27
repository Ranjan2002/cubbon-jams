"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
}

export function Skeleton({
  className,
  variant = "text",
  width,
  height,
  animation = "pulse",
}: SkeletonProps) {
  const baseClasses = "bg-secondary-200 dark:bg-secondary-700";
  
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-shimmer",
    none: "",
  };

  const variantClasses = {
    text: "rounded h-4",
    circular: "rounded-full",
    rectangular: "",
    rounded: "rounded-xl",
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className={cn(
        baseClasses,
        animationClasses[animation],
        variantClasses[variant],
        className
      )}
      style={style}
    />
  );
}

// Skeleton for Event Cards
export function EventCardSkeleton() {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-2xl overflow-hidden shadow-lg">
      <Skeleton variant="rectangular" className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton width="60%" height={24} />
        <Skeleton width="100%" />
        <Skeleton width="80%" />
        <div className="space-y-2 pt-2">
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton width="40%" height={14} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton width="30%" height={14} />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton variant="circular" width={16} height={16} />
            <Skeleton width="50%" height={14} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Skeleton for Gallery Items
export function GalleryItemSkeleton() {
  return (
    <Skeleton variant="rounded" className="aspect-square w-full" />
  );
}

// Skeleton for Stats Cards
export function StatsCardSkeleton() {
  return (
    <div className="bg-white dark:bg-secondary-800 rounded-2xl p-6 shadow-lg">
      <Skeleton variant="rounded" width={48} height={48} className="mb-4" />
      <Skeleton width="40%" height={32} className="mb-2" />
      <Skeleton width="60%" height={16} />
    </div>
  );
}

// Skeleton for Table Rows
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton width={i === 0 ? "70%" : "50%"} />
        </td>
      ))}
    </tr>
  );
}

// Full Page Loading Skeleton
export function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen pt-24 pb-16 animate-pulse">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <Skeleton variant="rounded" width={120} height={32} className="mx-auto mb-4" />
          <Skeleton width="40%" height={40} className="mx-auto mb-4" />
          <Skeleton width="60%" height={20} className="mx-auto" />
        </div>
        
        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Spinner Loading Component
export function Spinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div
      className={cn(
        "rounded-full border-primary-500/30 border-t-primary-500 animate-spin",
        sizeClasses[size],
        className
      )}
    />
  );
}

// Loading Overlay
export function LoadingOverlay({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-secondary-800 rounded-2xl p-8 text-center shadow-xl">
        <Spinner size="lg" className="mx-auto mb-4" />
        <p className="text-secondary-600 dark:text-secondary-400">{message}</p>
      </div>
    </div>
  );
}
