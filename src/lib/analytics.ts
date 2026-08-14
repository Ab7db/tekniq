import { supabase } from "@/integrations/supabase/client";

export type PageView = {
  id: string;
  path: string;
  referrer: string | null;
  session_id: string | null;
  created_at: string;
};

const SESSION_KEY = "tekniq_session_id";

function getSessionId() {
  if (typeof window === "undefined") return null;
  let id = window.sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export async function trackPageView(path: string) {
  if (typeof window === "undefined") return;
  try {
    await supabase.from("page_views").insert({
      path,
      referrer: document.referrer || null,
      session_id: getSessionId(),
    });
  } catch (err) {
    console.warn("page view tracking failed", err);
  }
}

export async function fetchPageViews(days = 30) {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("page_views")
    .select("id, path, referrer, session_id, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []) as PageView[];
}

export type Stats = {
  total: number;
  sessions: number;
  today: number;
  last7: number;
  daily: { day: string; label: string; views: number; sessions: number }[];
  pages: { path: string; views: number }[];
  sources: { name: string; value: number }[];
  hours: { hour: string; views: number }[];
};

export function buildStats(views: PageView[], days = 30): Stats {
  const dayKey = (d: Date) => d.toISOString().slice(0, 10);
  const daysMap = new Map<string, { views: number; sessions: Set<string> }>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    daysMap.set(dayKey(d), { views: 0, sessions: new Set() });
  }

  const pages = new Map<string, number>();
  const sources = new Map<string, number>();
  const hours = new Map<number, number>();
  const sessions = new Set<string>();
  const todayKey = dayKey(new Date());
  let today = 0;
  let last7 = 0;
  const sevenAgo = Date.now() - 7 * 86400000;

  for (const v of views) {
    const created = new Date(v.created_at);
    const key = dayKey(created);
    const bucket = daysMap.get(key);
    if (bucket) {
      bucket.views += 1;
      if (v.session_id) bucket.sessions.add(v.session_id);
    }
    if (key === todayKey) today += 1;
    if (created.getTime() >= sevenAgo) last7 += 1;
    if (v.session_id) sessions.add(v.session_id);

    pages.set(v.path, (pages.get(v.path) ?? 0) + 1);
    const src = !v.referrer
      ? "زيارة مباشرة"
      : (() => {
          try {
            return new URL(v.referrer).hostname.replace("www.", "");
          } catch {
            return "أخرى";
          }
        })();
    sources.set(src, (sources.get(src) ?? 0) + 1);
    hours.set(created.getHours(), (hours.get(created.getHours()) ?? 0) + 1);
  }

  return {
    total: views.length,
    sessions: sessions.size,
    today,
    last7,
    daily: [...daysMap.entries()].map(([day, v]) => ({
      day,
      label: new Intl.DateTimeFormat("ar", { day: "numeric", month: "short" }).format(new Date(day)),
      views: v.views,
      sessions: v.sessions.size,
    })),
    pages: [...pages.entries()]
      .map(([path, views]) => ({ path, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8),
    sources: [...sources.entries()]
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6),
    hours: Array.from({ length: 24 }, (_, h) => ({
      hour: `${h}`,
      views: hours.get(h) ?? 0,
    })),
  };
}
