"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/LanguageProvider";
import { ParticipationHistory } from "@/components/profile/ParticipationHistory";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { saveAuthUser } from "@/lib/auth-storage";
import { getCommunityEngagements } from "@/lib/community-storage";
import { getParticipationHistory } from "@/lib/participation-storage";
import { getSessionResearchPosts } from "@/lib/research-storage";
import type { AuthUser, ResearchPost } from "@/lib/types";

const profileSections = ["Overview", "My Research", "Participation", "Bookmarks", "Credits"] as const;
export type ProfileSection = typeof profileSections[number];

const sectionFromHash: Record<string, ProfileSection> = {
  "#created": "My Research",
  "#participated": "Participation",
  "#bookmarks": "Bookmarks",
  "#credits": "Credits",
};

export function ProfileOverview({ user, initialSection = "Overview" }: { user: AuthUser; initialSection?: ProfileSection }) {
  const { t } = useI18n();
  const [profileUser, setProfileUser] = useState(user);
  const [activeSection, setActiveSection] = useState<ProfileSection>(initialSection);
  const [createdResearch, setCreatedResearch] = useState<ResearchPost[]>([]);
  const [participationCount, setParticipationCount] = useState(0);
  const [interestedCount, setInterestedCount] = useState(0);
  const [editing, setEditing] = useState(false);
  const [draftDisplayName, setDraftDisplayName] = useState(user.displayName);
  const [draftBio, setDraftBio] = useState(user.bio ?? "");
  const [draftLanguage, setDraftLanguage] = useState(user.preferredLanguage);
  const [feedback, setFeedback] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setProfileUser(user);
    setDraftDisplayName(user.displayName);
    setDraftBio(user.bio ?? "");
    setDraftLanguage(user.preferredLanguage);
    setCreatedResearch(getSessionResearchPosts());
    setParticipationCount(getParticipationHistory().length);
    setInterestedCount(getCommunityEngagements().filter((item) => item.interested).length);
    setActiveSection(sectionFromHash[window.location.hash] ?? initialSection);
    setLoaded(true);
  }, [initialSection, user]);

  const selectSection = (section: ProfileSection) => {
    setActiveSection(section);
    const hash = section === "My Research" ? "created" : section === "Participation" ? "participated" : section.toLowerCase();
    window.history.replaceState(null, "", section === "Overview" ? window.location.pathname : `#${hash}`);
  };
  const sectionLabel = (section: ProfileSection) => t(section === "Overview" ? "profile.overview" : section === "My Research" ? "profile.myResearch" : section === "Participation" ? "profile.participation" : section === "Bookmarks" ? "profile.bookmarks" : "profile.credits");
  const joinDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(profileUser.createdAt));
  const saveProfile = () => {
    const nextUser = {
      ...profileUser,
      displayName: draftDisplayName.trim() || profileUser.displayName,
      bio: draftBio.trim(),
      preferredLanguage: draftLanguage,
    };
    if (!saveAuthUser(nextUser)) {
      setFeedback(t("profile.profileSaveFailed"));
      return;
    }
    setProfileUser(nextUser);
    setEditing(false);
    setFeedback(t("profile.profileSaved"));
  };
  const cancelEdit = () => {
    setDraftDisplayName(profileUser.displayName);
    setDraftBio(profileUser.bio ?? "");
    setDraftLanguage(profileUser.preferredLanguage);
    setEditing(false);
    setFeedback("");
  };

  return (
    <div className="pb-24 lg:pb-10">
      <Card className="overflow-hidden">
        <div className="h-24 bg-brand-gradient sm:h-28" />
        <div className="px-5 pb-5 sm:px-7 sm:pb-7">
          <div className="-mt-10 flex flex-col gap-4 sm:-mt-11 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4"><div className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border-4 border-surface bg-gradient-to-br from-blue-200 to-violet-300 text-xl font-black text-indigo-900 shadow-soft sm:h-24 sm:w-24">{profileUser.avatar}</div><div className="pb-1"><h1 className="text-2xl font-black tracking-tight text-ink">{profileUser.displayName}</h1><p className="mt-0.5 text-sm font-semibold text-slate-500">{profileUser.email}</p></div></div>
            <div className="flex flex-wrap items-center gap-2"><a href="/settings" className="inline-flex min-h-9 items-center rounded-xl bg-surface px-3 text-xs font-bold text-slate-600 shadow-sm hover:text-brand">{t("navigation.settings")}</a><span className="w-fit rounded-full bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand-dark">{profileUser.accountStatus ?? t("profile.signedInStatus")}</span></div>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600">{profileUser.bio || t("profile.bioFallback")}</p>
        </div>
      </Card>

      <div className="sticky top-16 z-10 -mx-4 mt-5 border-y border-slate-200/80 bg-canvas/95 px-4 py-2 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-2" role="tablist" aria-label="Profile sections">
        <div className="flex gap-1 overflow-x-auto">
          {profileSections.map((section) => <button key={section} type="button" role="tab" aria-selected={activeSection === section} onClick={() => selectSection(section)} className={`min-h-11 shrink-0 rounded-xl px-3.5 text-xs font-extrabold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15 ${activeSection === section ? "bg-brand-soft text-brand-dark" : "text-slate-500 hover:bg-surface hover:text-ink"}`}>{sectionLabel(section)}</button>)}
        </div>
      </div>

      <div className="mt-6" role="tabpanel" aria-label={activeSection}>
        {activeSection === "Overview" && (
          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-4">
              <Card className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">{t("profile.profileEyebrow")}</p><h2 className="mt-1 text-xl font-black text-ink">{t("profile.accountDetails")}</h2></div>{!editing && <Button type="button" variant="secondary" onClick={() => setEditing(true)} className="min-h-10 rounded-xl px-4 text-xs">{t("buttons.editProfile")}</Button>}</div>
                {editing ? (
                  <div className="mt-5 space-y-4">
                    <div><label htmlFor="profile-display-name" className="text-xs font-bold text-slate-600">{t("profile.displayName")}</label><input id="profile-display-name" value={draftDisplayName} onChange={(event) => setDraftDisplayName(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" /></div>
                    <div><label htmlFor="profile-bio" className="text-xs font-bold text-slate-600">{t("profile.bio")}</label><textarea id="profile-bio" value={draftBio} onChange={(event) => setDraftBio(event.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" placeholder={t("profile.bioPlaceholder")} /></div>
                    <div><label htmlFor="profile-language" className="text-xs font-bold text-slate-600">{t("profile.preferredLanguage")}</label><select id="profile-language" value={draftLanguage} onChange={(event) => setDraftLanguage(event.target.value)} className="mt-1 min-h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10"><option value="en">{t("language.en")}</option><option value="th">{t("language.th")}</option><option value="my">{t("language.my")}</option><option value="zh">{t("language.zh")}</option></select></div>
                    <div className="flex flex-wrap gap-2"><Button type="button" onClick={saveProfile} className="min-h-11 rounded-xl px-4 text-xs">{t("buttons.saveChanges")}</Button><Button type="button" variant="secondary" onClick={cancelEdit} className="min-h-11 rounded-xl px-4 text-xs">{t("buttons.cancel")}</Button></div>
                  </div>
                ) : (
                  <dl className="mt-4 grid gap-2 text-xs text-slate-500 sm:grid-cols-2">
                    <div className="rounded-xl bg-surface px-3 py-2"><dt className="font-bold text-slate-700">{t("profile.displayName")}</dt><dd className="mt-0.5">{profileUser.displayName}</dd></div>
                    <div className="rounded-xl bg-surface px-3 py-2"><dt className="font-bold text-slate-700">{t("profile.email")}</dt><dd className="mt-0.5 break-all">{profileUser.email}</dd></div>
                    <div className="rounded-xl bg-surface px-3 py-2"><dt className="font-bold text-slate-700">{t("profile.preferredLanguage")}</dt><dd className="mt-0.5">{profileUser.preferredLanguage.toUpperCase()}</dd></div>
                    <div className="rounded-xl bg-surface px-3 py-2"><dt className="font-bold text-slate-700">{t("profile.joinDate")}</dt><dd className="mt-0.5">{joinDate}</dd></div>
                    <div className="rounded-xl bg-surface px-3 py-2 sm:col-span-2"><dt className="font-bold text-slate-700">{t("profile.userId")}</dt><dd className="mt-0.5 break-all">{profileUser.userId}</dd></div>
                  </dl>
                )}
                <p className={`mt-3 min-h-5 text-xs font-semibold ${feedback.includes("Could") ? "text-amber-700" : "text-emerald-700"}`} aria-live="polite">{feedback}</p>
              </Card>
              <Card className="p-5 sm:p-6"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">{t("profile.workspaceEyebrow")}</p><h2 className="mt-1 text-xl font-black text-ink">{t("profile.workspaceTitle")}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{t("profile.workspaceDescription")}</p></Card>
            </div>
            <div className="grid grid-cols-3 gap-3 lg:grid-cols-1">
              {[{ label: t("profile.created"), value: createdResearch.length }, { label: t("profile.participated"), value: participationCount }, { label: t("profile.interested"), value: interestedCount }].map((stat) => <Card key={stat.label} className="grid min-h-24 place-items-center p-3 text-center"><div><p className="text-2xl font-black text-brand-dark">{loaded ? stat.value : "–"}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{stat.label}</p></div></Card>)}
            </div>
          </div>
        )}

        {activeSection === "My Research" && (
          <section id="created"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">Your work</p><h2 className="mt-1 text-xl font-black text-ink">{t("profile.myResearch")}</h2><p className="mt-1 text-sm text-slate-500">{t("profile.myResearchSubtitle")}</p></div><div className="mt-4 grid gap-3 sm:grid-cols-2">{!loaded && [0, 1].map((item) => <div key={item} className="h-28 animate-pulse rounded-card border border-slate-200 bg-surface/70" />)}{loaded && createdResearch.map((post) => <a key={post.id} href={`/research/${post.id}`} className="block"><Card className="h-full p-4 transition hover:border-brand/25 hover:shadow-soft"><span className="text-[10px] font-bold uppercase tracking-wide text-brand">{post.goal}</span><h3 className="mt-1.5 text-sm font-extrabold leading-5 text-ink">{post.title}</h3><p className="mt-2 text-xs text-slate-500">{post.responseCount} responses · {post.responseMethod === "native" ? "Valida survey" : "External form"}</p></Card></a>)}{loaded && createdResearch.length === 0 && <Card className="p-6 text-center sm:col-span-2"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">+</div><p className="mt-3 text-sm font-bold text-ink">{t("profile.noResearchTitle")}</p><p className="mt-1 text-xs leading-5 text-slate-500">{t("profile.noResearchDescription")}</p><a href="/?create=1" className="mt-4 inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-bold text-brand hover:bg-brand-soft">{t("buttons.createResearch")}</a></Card>}</div></section>
        )}

        {activeSection === "Participation" && <ParticipationHistory />}

        {activeSection === "Bookmarks" && <section id="bookmarks"><Card className="p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-lg font-black text-brand-dark">◇</div><h2 className="mt-3 text-lg font-black text-ink">{t("profile.noBookmarksTitle")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{t("profile.noBookmarksDescription")}</p><a href="/" className="mt-4 inline-flex min-h-10 items-center rounded-xl px-3 text-xs font-bold text-brand hover:bg-brand-soft">{t("app.community")}</a></Card></section>}

        {activeSection === "Credits" && <section id="credits"><Card className="p-8 text-center"><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-lg font-black text-slate-500">0</div><h2 className="mt-3 text-lg font-black text-ink">{t("profile.creditsTitle")}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{t("profile.creditsDescription")}</p></Card></section>}
      </div>
    </div>
  );
}
