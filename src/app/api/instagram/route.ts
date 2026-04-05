import { NextResponse } from "next/server";
import { galleryItems } from "@/lib/data/mockData";

export const dynamic = "force-dynamic";

interface InstagramGraphNode {
  id: string;
  shortcode: string;
  display_url: string;
  thumbnail_src?: string;
  thumbnail_resources?: Array<{ src: string; config_width: number; config_height: number }>;
  is_video: boolean;
  taken_at_timestamp: number;
  edge_media_to_caption?: {
    edges: Array<{ node: { text: string } }>;
  };
  edge_liked_by?: { count: number };
  edge_media_preview_like?: { count: number };
  edge_media_to_comment?: { count: number };
}

function toJpgFriendlyUrl(rawUrl: string | undefined) {
  if (!rawUrl) return "";

  try {
    const parsed = new URL(rawUrl);
    const currentStp = parsed.searchParams.get("stp");
    if (currentStp && !currentStp.includes("dst-jpg")) {
      parsed.searchParams.set("stp", "dst-jpg_e35");
    }
    return parsed.toString();
  } catch {
    return rawUrl;
  }
}

interface GraphApiMediaItem {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  permalink?: string;
  timestamp?: string;
  like_count?: number;
  comments_count?: number;
}

function parsePostsFromProfilePayload(payload: unknown) {
  const root = payload as {
    data?: {
      user?: {
        edge_owner_to_timeline_media?: {
          edges?: Array<{ node: InstagramGraphNode }>;
        };
      };
    };
    user?: {
      edge_owner_to_timeline_media?: {
        edges?: Array<{ node: InstagramGraphNode }>;
      };
    };
  };

  const edges =
    root.data?.user?.edge_owner_to_timeline_media?.edges ??
    root.user?.edge_owner_to_timeline_media?.edges ??
    [];

  return edges
    .map((edge) => edge.node)
    .filter((node) => Boolean(node?.shortcode) && Boolean(node?.display_url))
    .slice(0, 12)
    .map((node) => {
      const caption = node.edge_media_to_caption?.edges?.[0]?.node?.text ?? "";
      const likes =
        node.edge_liked_by?.count ?? node.edge_media_preview_like?.count ?? 0;
      const comments = node.edge_media_to_comment?.count ?? 0;
      const thumbResources = node.thumbnail_resources ?? [];
      const largestThumb =
        thumbResources.length > 0
          ? thumbResources[thumbResources.length - 1]?.src
          : node.thumbnail_src;
      const thumbnailUrl = toJpgFriendlyUrl(largestThumb || node.display_url);
      const imageUrl = toJpgFriendlyUrl(node.display_url) || thumbnailUrl;

      return {
        id: node.id,
        shortcode: node.shortcode,
        caption,
        imageUrl,
        thumbnailUrl,
        isVideo: node.is_video,
        timestamp: node.taken_at_timestamp * 1000,
        likes,
        comments,
        permalink: `https://www.instagram.com/p/${node.shortcode}/`,
      };
    });
}

function fallbackPosts(username: string) {
  return galleryItems.slice(0, 8).map((item, index) => ({
    id: `fallback-gallery-${item.id}`,
    shortcode: `fallback-gallery-${item.id}`,
    caption: `${item.title}${item.event ? ` · ${item.event}` : ""}`,
    imageUrl: item.src,
    thumbnailUrl: item.thumbnail || item.src,
    isVideo: item.type === "video",
    timestamp: Date.parse(item.date) || Date.now() - index * 86400000,
    likes: 0,
    comments: 0,
    permalink: `https://www.instagram.com/${username}/`,
  }));
}

async function fetchPostsFromGraphApi(userId: string, token: string) {
  const fields =
    "id,caption,media_url,thumbnail_url,media_type,permalink,timestamp,like_count,comments_count";
  const endpoint = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${token}`;
  const response = await fetch(endpoint, { cache: "no-store" });
  if (!response.ok) return [];

  const payload = (await response.json()) as { data?: GraphApiMediaItem[] };
  const items = payload.data ?? [];

  return items
    .filter((item) => Boolean(item.media_url) && Boolean(item.permalink))
    .slice(0, 12)
    .map((item) => ({
      id: item.id,
      shortcode: item.id,
      caption: item.caption || "",
      imageUrl: item.media_url || item.thumbnail_url || "",
      thumbnailUrl: item.thumbnail_url || item.media_url || "",
      isVideo: item.media_type === "VIDEO",
      timestamp: item.timestamp ? new Date(item.timestamp).getTime() : Date.now(),
      likes: item.like_count || 0,
      comments: item.comments_count || 0,
      permalink: item.permalink || "",
    }));
}

async function fetchProfilePayload(username: string) {
  const urls = [
    `https://i.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
    `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
  ];

  for (const url of urls) {
    const response = await fetch(url, {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "x-ig-app-id": "936619743392459",
        "x-asbd-id": "129477",
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        referer: `https://www.instagram.com/${username}/`,
      },
      cache: "no-store",
    });

    if (!response.ok) continue;

    try {
      const payload = await response.json();
      return payload;
    } catch {
      continue;
    }
  }

  return null;
}

export async function GET() {
  const username = process.env.INSTAGRAM_USERNAME || "cubbon_jams";
  const graphUserId =
    process.env.INSTAGRAM_GRAPH_USER_ID || process.env.INSTAGRAM_USER_ID;
  const graphToken =
    process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || process.env.INSTAGRAM_ACCESS_TOKEN;

  try {
    if (graphUserId && graphToken) {
      const graphPosts = await fetchPostsFromGraphApi(graphUserId, graphToken);
      if (graphPosts.length) {
        return NextResponse.json({
          posts: graphPosts,
          profileUrl: `https://www.instagram.com/${username}/`,
          source: "instagram",
        }, { headers: { "cache-control": "no-store" } });
      }
    }

    const payload = await fetchProfilePayload(username);
    if (!payload) {
      return NextResponse.json(
        {
          posts: fallbackPosts(username),
          profileUrl: `https://www.instagram.com/${username}/`,
          source: "fallback",
        },
        { status: 200, headers: { "cache-control": "no-store" } }
      );
    }
    const posts = parsePostsFromProfilePayload(payload);

    return NextResponse.json({
      posts: posts.length ? posts : fallbackPosts(username),
      profileUrl: `https://www.instagram.com/${username}/`,
      source: posts.length ? "instagram" : "fallback",
    }, { headers: { "cache-control": "no-store" } });
  } catch {
    return NextResponse.json(
      {
        posts: fallbackPosts(username),
        profileUrl: `https://www.instagram.com/${username}/`,
        source: "fallback",
      },
      { status: 200, headers: { "cache-control": "no-store" } }
    );
  }
}
