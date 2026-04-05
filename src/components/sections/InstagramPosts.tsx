"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Heart, Instagram, MessageCircle, PlayCircle } from "lucide-react";

interface InstagramPost {
  id: string;
  shortcode: string;
  caption: string;
  imageUrl: string;
  thumbnailUrl: string;
  isVideo: boolean;
  timestamp: number;
  likes: number;
  comments: number;
  permalink: string;
}

interface InstagramApiResponse {
  posts: InstagramPost[];
  profileUrl: string;
  source: "instagram" | "fallback";
}

interface InstagramPostsProps {
  compact?: boolean;
}

export default function InstagramPosts({ compact = false }: InstagramPostsProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [profileUrl, setProfileUrl] = useState("https://www.instagram.com/cubbon_jams/");
  const [feedSource, setFeedSource] = useState<"instagram" | "fallback">("instagram");
  const [isLoading, setIsLoading] = useState(true);
  const [failedImageIds, setFailedImageIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;

    const loadPosts = async () => {
      try {
        const response = await fetch("/api/instagram", { cache: "no-store" });
        if (!response.ok) throw new Error("failed");
        const data = (await response.json()) as InstagramApiResponse;

        if (!active) return;
        setPosts((data.posts || []).slice(0, compact ? 4 : 8));
        setProfileUrl(data.profileUrl || "https://www.instagram.com/cubbon_jams/");
        setFeedSource(data.source || "instagram");
      } catch {
        if (!active) return;
        setPosts([]);
        setFeedSource("fallback");
      } finally {
        if (active) setIsLoading(false);
      }
    };

    loadPosts();
    return () => {
      active = false;
    };
  }, [compact]);

  return (
    <section className="section-padding bg-white dark:bg-secondary-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-4">
            <Instagram className="w-4 h-4" />
            Live from Instagram
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 dark:text-white mb-3">
            Latest Posts from @cubbon_jams
          </h2>
          <p className="text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            New posts are fetched automatically so your website stays fresh whenever your Instagram updates.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(compact ? 4 : 8)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-secondary-200 dark:bg-secondary-700 animate-pulse"
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {posts.map((post, index) => (
              <motion.a
                key={post.id + post.shortcode}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden border border-secondary-200/70 dark:border-secondary-700 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-secondary-100 dark:bg-secondary-800">
                  {failedImageIds[post.id] ? (
                    <div className="w-full h-full bg-gradient-to-br from-secondary-900 to-secondary-700 text-white flex flex-col items-center justify-center p-4 text-center">
                      <Instagram className="w-7 h-7 mb-2 opacity-90" />
                      <p className="text-xs opacity-90 line-clamp-3">
                        {post.caption || "Open this post on Instagram"}
                      </p>
                    </div>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={
                        feedSource === "fallback"
                          ? post.thumbnailUrl || post.imageUrl
                          : `/api/instagram/image?url=${encodeURIComponent(
                              post.thumbnailUrl || post.imageUrl
                            )}`
                      }
                      alt={post.caption?.slice(0, 100) || "Instagram post"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      onError={() =>
                        setFailedImageIds((prev) => ({ ...prev, [post.id]: true }))
                      }
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-x-0 bottom-0 p-3 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-between text-white text-xs">
                    <span className="inline-flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5" />
                      {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5" />
                      {post.comments}
                    </span>
                    {post.isVideo && <PlayCircle className="w-4 h-4" />}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-secondary-50 dark:bg-secondary-800 p-8 text-center">
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              Instagram feed is temporarily unavailable. You can still view all posts directly on Instagram.
            </p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center text-center"
        >
          {feedSource === "fallback" && posts.length > 0 && (
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-700 dark:text-amber-200">
              <Instagram className="w-4 h-4 shrink-0" />
              <span>Gallery preview mode while Instagram is temporarily unavailable.</span>
            </div>
          )}
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-900 dark:bg-white text-white dark:text-secondary-900 font-semibold hover:opacity-90 transition-opacity"
          >
            Visit Instagram Profile
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
