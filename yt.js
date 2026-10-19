const B = "https://www.googleapis.com/youtube/v3/";
export const num = (n) => Number(n || 0);
export async function yt(path, params) {
  const u = new URL(B + path);
  Object.entries({ ...params, key: process.env.YOUTUBE_API_KEY }).forEach(
    ([k, v]) => v != null && u.searchParams.set(k, v)
  );
  const r = await fetch(u, { next: { revalidate: 1800 } });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error?.message || "YouTube API error");
  return j;
}
export async function videoStats(ids) {
  if (!ids.length) return [];
  const j = await yt("videos", { part: "snippet,statistics", id: ids.join(",") });
  return j.items.map((v) => ({
    id: v.id, title: v.snippet.title, channel: v.snippet.channelTitle,
    channelId: v.snippet.channelId, published: v.snippet.publishedAt,
    thumb: v.snippet.thumbnails?.medium?.url, tags: v.snippet.tags || [],
    views: num(v.statistics.viewCount), likes: num(v.statistics.likeCount),
    comments: num(v.statistics.commentCount),
  }));
}
export const median = (a) => {
  const s = [...a].sort((x, y) => x - y);
  return s.length ? s[Math.floor(s.length / 2)] : 0;
};
