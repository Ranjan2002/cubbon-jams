import { Music } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-secondary-900">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-secondary-200 dark:border-secondary-700" />
          <div className="absolute inset-0 rounded-full border-4 border-t-primary-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="w-8 h-8 text-primary-500" />
          </div>
        </div>
        <p className="text-secondary-600 dark:text-secondary-400 animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
