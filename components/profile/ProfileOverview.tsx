"use client";

import { useEffect, useState } from "react";
import { ParticipationHistory } from "@/components/profile/ParticipationHistory";
import { Card } from "@/components/ui/Card";
import { getCommunityEngagements } from "@/lib/community-storage";
import { getParticipationHistory } from "@/lib/participation-storage";
import { getSessionResearchPosts } from "@/lib/research-storage";
import type { ResearchPost } from "@/lib/types";

const profileSections = ["Overview", "My Research", "Participation", "Bookmarks", "Credits"] as const;
type ProfileSection = typeof profileSections[number];

const sectionFromHash: Record<string, ProfileSection> = {
  "#created": "My Research",
  "#participated": "Participation",
  "#bookmarks": "Bookmarks",
  "#credits": "Credits",
};

export function ProfileOverview() {
  const [activeSection, setActiveSection] = useState<ProfileSection>("Overview");
  const [createdResearch, setCreatedResearch] = useState<ResearchPost[]>([]);
  const [participationCount, setParticipationCount] = useState(0);
  const [interestedCount, setInterestedCount] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCreatedResearch(getSessionResearchPosts());
    setParticipationCount(getParticipationHistory().length);
    setInterestedCount(getCommunityEngagements().filter((item) => item.interested).length);
    setActiveSection(sectionFromHash[window.location.hash] ?? "Overview");
    setLoaded(true);
  }, []);

  const selectSection = (section: ProfileSection) => {
    setActiveSection(section);
    const hash = section === "My Research" ? "created" : section === "Participation" ? "participated" : section.toLowerCase();
    window.history.replaceState(null, "", section === "Overview" ? window.location.pathname : `#${hash}`);
  };

  return (
    <div className="pb-24 lg:pb-10">
      <Card className="overflow-hidden">
        <div className="h-24 bg-brand-gradient sm:h-28" />
        <div className="px-5 pb-5 sm:px-7 sm:pb-7">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border-4 border-white bg-gradient-to-br from-blue-200 to-violet-300 text-xl font-black text-indigo-900 shadow-soft sm:h-24 sm:w-24">YU</div><div className="pb-1"><h1 className="text-2xl font-black tracking-tight text-ink">Your profile</h1><p className="mt-0.5 text-sm font-semibold text-slate-500">Research creator · Community member</p></div></div>
            <span className="w-fit rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-dark">Browser-local profile</span>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">A lightweight summary of research activity saved in this browser.</p>
        </div>
      </Card>

      <div className="sticky top-16 z-10 -mx-4 mt-5 border-y border-slate-200/80 bg-canvas/95 px-4 py-2 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-2" role="tablist" aria-label="Profile sections">
        <div className="flex gap-1 overflow-x-auto">
          {profileSections.map((section) => <button key={section} type="button" role="tab" aria-selected={activeSection === section} onClick={() => selectSection(section)} className={`min-h-11 shrink-0 rounded-xl px-3.5 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 ${activeSection === section ? "bg-brand-soft text-brand-dark" : "text-slate-500 hover:bg-white hover:text-ink"}`}>{section}</button>)}
        </div>
      </div>

      <div className="mt-6" role="tabpanel" aria-label={activeSection}>
        {activeSection === "Overview" && (
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <Card className="p-5 sm:p-6"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Activity</p><h2 className="mt-1 text-xl font-black text-ink">Your Valida workspace</h2><p className="mt-2 text-sm leading-6 text-slate-600">Created research lasts for this tab session. Participation and community interactions remain in this browser until its storage is cleared.</p></Card>
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {[{ label: "Created", value: createdResearch.length }, { label: "Participated", value: participationCount }, { label: "Interested", value: interestedCount }].map((stat) => <Card key={stat.label} className="grid min-h-24 place-items-center p-3 text-center"><div><p className="text-2xl font-black text-brand-dark">{loaded ? stat.value : "–"}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{stat.label}</p></div></Card>)}
            </div>
          </div>
        )}

        {activeSection === "My Research" && (
          <section id="created"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Your work</p><h2 className="mt-1 text-xl font-black text-ink">My Research</h2><p className="mt-1 text-sm text-slate-500">Requests published in this browser tab session.</p></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{!loaded && [0, 1].map((item) => <div key={item} className="h-28 animate-pulse rounded-card border border-slate-200 bg-white/70" />)}{loaded && createdResearch.map((post) => <a key={post.id} href={`/research/${post.id}`} className="block"><Card className="h-full p-4 transition hover:border-brand/25 hover:shadow-soft"><span className="text-[10px] font-bold uppercase tracking-wide text-brand">{post.goal}</span><h3 className="mt-1.5 text-sm font-extrabold leading-5 text-ink">{post.title}</h3><p className="mt-2 text-xs text-slate-500">{post.responseCount} responses · {post.responseMethod === "native" ? "Valida survey" : "External form"}</p></Card></a>)}{loaded && createdResearch.length === 0 && <Card className="p-6 text-center sm:col-span-2"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">+</div><p className="mt-3 text-sm font-bold text-ink">No research created in this session</p><p className="mt-1 text-xs leading-5 text-slate-500">Start a focused request and it will appear here.</p><a href="/?create=1" className="mt-4 inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-bold text-brand hover:bg-brand-soft">Create research</a></Card>}</div></section>
        )}

        {activeSection === "Participation" && <ParticipationHistory />}

        {activeSection === "Bookmarks" && <section id="bookmarks"><Card className="p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">◇</div><h2 className="mt-3 text-lg font-black text-ink">No bookmarks yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Bookmark management is not active in this MVP. This section is reserved so saved research has a clear home when Product approves it.</p><a href="/" className="mt-4 inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-bold text-brand hover:bg-brand-soft">Explore community</a></Card></section>}

        {activeSection === "Credits" && <section id="credits"><Card className="p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-lg font-black text-slate-500">0</div><h2 className="mt-3 text-lg font-black text-ink">Credits are not active</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Valida does not track a balance or rewards in this frontend MVP. A credits system remains out of scope until separately approved.</p></Card></section>}
      </div>
    </div>
  );
}
