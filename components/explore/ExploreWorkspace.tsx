"use client";

import { useEffect, useMemo, useState } from "react";
import { PostCard } from "@/components/feed/PostCard";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { Card } from "@/components/ui/Card";
import { SearchBar } from "@/components/ui/SearchBar";
import { ValidaLogo } from "@/components/ui/ValidaLogo";
import { getCommunityEngagements, saveCommunityEngagements } from "@/lib/community-storage";
import { emptyDiscoveryFilters, filterResearch, readDiscoveryFilters, type DiscoveryFilters } from "@/lib/discovery";
import { popularHashtags, posts as staticPosts, trendingResearch } from "@/lib/mock-data";
import { getCompletedPostIds, getLocalResponseCount, getParticipationHistory } from "@/lib/participation-storage";
import { researchGoals } from "@/lib/research-defaults";
import { getAvailableResearchPosts } from "@/lib/research-storage";
import type { CommunityEngagement, ParticipationRecord, ResearchPost } from "@/lib/types";

function filtersToSearch(filters: DiscoveryFilters): string {
  const params = new URLSearchParams();
  if (filters.query.trim()) params.set("q", filters.query.trim());
  if (filters.hashtag.trim()) params.set("hashtag", filters.hashtag.trim());
  if (filters.category.trim()) params.set("category", filters.category.trim());
  const value = params.toString();
  return value ? `?${value}` : window.location.pathname;
}

export function ExploreWorkspace() {
  const [posts, setPosts] = useState<ResearchPost[]>([]);
  const [history, setHistory] = useState<ParticipationRecord[]>([]);
  const [engagements, setEngagements] = useState<CommunityEngagement[]>([]);
  const [filters, setFilters] = useState<DiscoveryFilters>(emptyDiscoveryFilters);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const syncFromLocation = () => setFilters(readDiscoveryFilters(window.location.search));
    setPosts(getAvailableResearchPosts(staticPosts));
    setHistory(getParticipationHistory());
    setEngagements(getCommunityEngagements());
    syncFromLocation();
    setLoaded(true);
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const updateFilters = (updates: Partial<DiscoveryFilters>) => {
    setFilters((current) => {
      const next = { ...current, ...updates };
      window.history.replaceState(null, "", filtersToSearch(next));
      return next;
    });
  };
  const clearFilters = () => updateFilters(emptyDiscoveryFilters);
  const updateEngagement = (engagement: CommunityEngagement) => setEngagements((current) => {
    const next = [engagement, ...current.filter((item) => item.postId !== engagement.postId)];
    saveCommunityEngagements(next);
    return next;
  });

  const results = useMemo(() => filterResearch(posts, filters), [filters, posts]);
  const featured = useMemo(() => [...results].sort((left, right) => right.interestedCount - left.interestedCount).slice(0, 2), [results]);
  const completedPostIds = getCompletedPostIds(history);
  const hasFilters = Boolean(filters.query || filters.hashtag || filters.category);

  return (
    <div className="min-h-screen bg-app-gradient">
      <div className="mx-auto flex min-h-screen max-w-[1480px]">
        <LeftSidebar />
        <div className="min-w-0 flex-1 pb-24 lg:pb-10">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-surface/90 backdrop-blur-xl lg:hidden"><div className="flex h-16 items-center justify-between px-4 sm:px-6"><ValidaLogo variant="compact" /><a href="/" className="text-xs font-bold text-slate-500 hover:text-brand">Community</a></div></header>
          <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-gradient-to-br from-surface via-surface to-blue-50 p-5 shadow-card sm:p-8">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand">Community discovery</p>
              <h1 className="mt-2 text-3xl font-black tracking-[-0.04em] text-ink sm:text-4xl">Explore research worth contributing to</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Search by title, author, audience, category, or hashtag across public and browser-local research.</p>
              <div className="mt-5"><SearchBar value={filters.query} onChange={(query) => updateFilters({ query })} resultCount={results.length} /></div>
              {hasFilters && <div className="mt-3 flex flex-wrap items-center gap-2">{filters.category && <button type="button" onClick={() => updateFilters({ category: "" })} className="min-h-9 rounded-full bg-brand-soft px-3 text-xs font-bold text-brand-dark">{filters.category} ×</button>}{filters.hashtag && <button type="button" onClick={() => updateFilters({ hashtag: "" })} className="min-h-9 rounded-full bg-brand-soft px-3 text-xs font-bold text-brand-dark">#{filters.hashtag} ×</button>}<button type="button" onClick={clearFilters} className="min-h-9 rounded-full px-3 text-xs font-bold text-slate-500 hover:bg-slate-100">Clear all</button></div>}
            </section>

            <section className="mt-7" aria-labelledby="categories-title"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Browse by goal</p><h2 id="categories-title" className="mt-1 text-xl font-black text-ink">Categories</h2></div></div><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{researchGoals.map((goal) => { const count = posts.filter((post) => post.goal === goal.value).length; const active = filters.category === goal.value; return <button type="button" key={goal.value} onClick={() => updateFilters({ category: active ? "" : goal.value })} className={`min-h-20 rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 ${active ? "border-brand/30 bg-brand-soft text-brand-dark" : "border-slate-200 bg-surface text-slate-600 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-soft"}`}><span className="block text-xs font-extrabold leading-4">{goal.value}</span><span className="mt-2 block text-[10px] font-semibold text-slate-400">{count} {count === 1 ? "request" : "requests"}</span></button>; })}</div></section>

            {!loaded ? <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="Loading research"><div className="h-56 animate-pulse rounded-card bg-surface/70" /><div className="h-56 animate-pulse rounded-card bg-surface/70" /></section> : results.length === 0 ? <Card className="mt-8 p-10 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-lg font-black text-slate-400">?</div><h2 className="mt-3 text-lg font-black text-ink">No matching research</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Try a broader search, remove a filter, or browse another category.</p><button type="button" onClick={clearFilters} className="mt-4 min-h-10 rounded-xl px-4 text-xs font-bold text-brand hover:bg-brand-soft">Clear filters</button></Card> : <>
              <section className="mt-8" aria-labelledby="featured-title"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Community picks</p><h2 id="featured-title" className="mt-1 text-xl font-black text-ink">Featured Research</h2><div className="mt-4 grid gap-3 md:grid-cols-2">{featured.map((post) => <a key={post.id} href={`/research/${post.id}`} className="group block"><Card className="h-full p-5 transition group-hover:-translate-y-0.5 group-hover:border-brand/25 group-hover:shadow-soft"><div className="flex items-center justify-between gap-3"><span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ring-1 ${post.goalStyle}`}>{post.goal}</span><span className="text-[10px] font-semibold text-slate-400">{post.interestedCount} interested</span></div><h3 className="mt-3 text-lg font-black leading-6 text-ink">{post.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{post.description}</p><span className="mt-4 inline-flex min-h-9 items-center text-xs font-extrabold text-brand">Open research →</span></Card></a>)}</div></section>
              <section className="mt-8" aria-labelledby="latest-title"><div className="flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Fresh opportunities</p><h2 id="latest-title" className="mt-1 text-xl font-black text-ink">Latest Research</h2></div><span className="text-xs font-semibold text-slate-400">{results.length} results</span></div><div className="mt-4 grid gap-3 xl:grid-cols-2">{results.map((post) => <PostCard key={post.id} post={{ ...post, responseCount: getLocalResponseCount(post, history) }} completed={completedPostIds.has(post.id)} engagement={engagements.find((item) => item.postId === post.id)} onEngagementChange={updateEngagement} />)}</div></section>
            </>}

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              <section aria-labelledby="popular-title"><Card className="h-full p-5"><h2 id="popular-title" className="text-base font-black text-ink">Popular Hashtags</h2><p className="mt-1 text-xs text-slate-500">Follow a topic into the local research catalog.</p><div className="mt-4 flex flex-wrap gap-2">{popularHashtags.map((tag) => <button type="button" key={tag} onClick={() => updateFilters({ hashtag: tag })} className={`min-h-10 rounded-xl px-3 text-xs font-bold transition ${filters.hashtag === tag ? "bg-brand text-white" : "bg-surface text-slate-600 hover:bg-brand-soft hover:text-brand-dark"}`}>#{tag}</button>)}</div></Card></section>
              <section aria-labelledby="trending-title"><Card className="h-full p-5"><h2 id="trending-title" className="text-base font-black text-ink">Trending Research</h2><p className="mt-1 text-xs text-slate-500">Topics getting attention across the community.</p><div className="mt-3 space-y-1">{trendingResearch.map((item, index) => <button type="button" key={item.title} onClick={() => updateFilters({ query: item.query, hashtag: "", category: "" })} className="flex min-h-12 w-full items-center gap-3 rounded-xl px-2 text-left transition hover:bg-surface"><span className="text-xs font-black text-slate-300">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 flex-1"><span className="block text-sm font-bold text-slate-700">{item.title}</span><span className="text-[10px] text-slate-400">{item.postCount} community posts</span></span></button>)}</div></Card></section>
            </div>
          </main>
          <MobileBottomNav />
        </div>
      </div>
    </div>
  );
}
