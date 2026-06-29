import type { ResearchPost } from "@/lib/types";

export interface DiscoveryFilters {
  query: string;
  hashtag: string;
  category: string;
}

export const emptyDiscoveryFilters: DiscoveryFilters = { query: "", hashtag: "", category: "" };

function normalize(value: string): string {
  return value.trim().replace(/^#/, "").toLocaleLowerCase();
}

export function filterResearch(posts: ResearchPost[], filters: DiscoveryFilters): ResearchPost[] {
  const query = normalize(filters.query);
  const hashtag = normalize(filters.hashtag);
  const category = normalize(filters.category);

  return posts.filter((post) => {
    const searchable = [post.title, post.goal, post.author, ...post.hashtags, ...post.targetAudience].map(normalize);
    const matchesQuery = !query || searchable.some((value) => value.includes(query));
    const matchesHashtag = !hashtag || post.hashtags.some((value) => normalize(value) === hashtag);
    const matchesCategory = !category || normalize(post.goal) === category;
    return matchesQuery && matchesHashtag && matchesCategory;
  });
}

export function discoveryUrl(filters: Partial<DiscoveryFilters>): string {
  const params = new URLSearchParams();
  if (filters.query?.trim()) params.set("q", filters.query.trim());
  if (filters.hashtag?.trim()) params.set("hashtag", filters.hashtag.trim().replace(/^#/, ""));
  if (filters.category?.trim()) params.set("category", filters.category.trim());
  const query = params.toString();
  return query ? `/explore?${query}` : "/explore";
}

export function readDiscoveryFilters(search: string): DiscoveryFilters {
  const params = new URLSearchParams(search);
  return {
    query: params.get("q") ?? "",
    hashtag: params.get("hashtag") ?? "",
    category: params.get("category") ?? "",
  };
}
