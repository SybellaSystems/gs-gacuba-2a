import { createClient } from "@supabase/supabase-js";
import type { SchoolConfig, HeroSlide, AcademicProgram, StatItem, GalleryItem, NewsItem } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

const safeString = (value: unknown, fallback = ""): string =>
  typeof value === "string" && value.trim() ? value : fallback;

const safeArray = <T>(value: unknown, fallback: T[] = []): T[] =>
  Array.isArray(value) ? value : fallback;

const safeStringArray = (value: unknown): string[] => {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.map((item) => String(item));
  return [];
};

const toGalleryItem = (row: any): GalleryItem => ({
  src: safeString(row.src || row.image_url || row.image || ""),
  title: safeString(row.title || row.caption || ""),
  category: safeString(row.category || row.tag || ""),
  description: safeString(row.description || row.summary || ""),
});

const toNewsItem = (row: any): NewsItem => ({
  id: safeString(row.id || row.news_id || row.slug || row.title || ""),
  title: safeString(row.title || ""),
  date: safeString(row.date || row.published_at || ""),
  category: safeString(row.category || row.section || ""),
  summary: safeString(row.summary || row.excerpt || row.description || ""),
  content: safeStringArray(row.content || row.body || row.details || row.article || []),
  author: safeString(row.author || row.author_name || ""),
  readTime: safeString(row.read_time || row.readTime || ""),
  image: safeString(row.image_url || row.image || row.hero_image || ""),
});

export async function fetchSchoolConfig(fallbackConfig: SchoolConfig): Promise<SchoolConfig> {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("fetchSchoolConfig: missing Supabase env vars, returning fallback config");
    return fallbackConfig;
  }

  try {
    const [galleryRes, newsRes] = await Promise.all([
      supabase.from("gallery_items").select("*").eq("status", "Published").order("order", { ascending: true }),
      supabase.from("news_items").select("*").eq("status", "Published").order("published_at", { ascending: false }),
    ]);

    if (galleryRes.error) console.warn("Supabase gallery_items error:", galleryRes.error.message);
    if (newsRes.error) console.warn("Supabase news_items error:", newsRes.error.message);

    const galleryItems = galleryRes.data?.map(toGalleryItem) ?? [];
    const news = newsRes.data?.map(toNewsItem) ?? [];

    // Debug info to help diagnose empty results in the client console
    console.debug(`Supabase fetch: gallery=${galleryItems.length}, news=${news.length}`);
    if ((galleryRes.data?.length ?? 0) === 0 && (newsRes.data?.length ?? 0) === 0) {
      console.info("fetchSchoolConfig: Supabase returned zero rows for both gallery_items and news_items");
    }

    return {
      ...fallbackConfig,
      galleryItems,
      news,
    };
  } catch (error) {
    console.warn("Supabase fetch error", error);
    return fallbackConfig;
  }
}

export async function submitInquiry(inquiry: {
  name: string;
  email: string;
  phone: string;
  academicStream: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { success: false, error: "Missing Supabase environment variables." };
  }

  const { error } = await supabase.from("school_inquiries").insert([
    {
      name: inquiry.name,
      // Some existing Supabase setups expect `visitor_name` column.
      // Ensure we populate it as well to avoid NOT NULL constraint errors.
      visitor_name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      academic_stream: inquiry.academicStream,
      message: inquiry.message,
      status: "New",
    },
  ]);

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}
