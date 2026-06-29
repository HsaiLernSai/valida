"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { posts as staticPosts } from "@/lib/mock-data";
import { createQrMatrix } from "@/lib/qr-code";
import type { ResearchPost } from "@/lib/types";

interface ShareResearchDialogProps {
  post: ResearchPost;
  onClose: () => void;
  onShared?: () => void;
}

async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy is unavailable");
}

function downloadQrPng(matrix: boolean[][], filename: string) {
  const moduleSize = 12;
  const quietZone = 4;
  const dimension = (matrix.length + quietZone * 2) * moduleSize;
  const canvas = document.createElement("canvas");
  canvas.width = dimension;
  canvas.height = dimension;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Image export is unavailable");
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, dimension, dimension);
  context.fillStyle = "#172033";
  matrix.forEach((row, y) => row.forEach((dark, x) => {
    if (dark) context.fillRect((x + quietZone) * moduleSize, (y + quietZone) * moduleSize, moduleSize, moduleSize);
  }));
  canvas.toBlob((blob) => {
    if (!blob) return;
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(objectUrl);
  }, "image/png");
}

export function ShareResearchDialog({ post, onClose, onShared }: ShareResearchDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [feedback, setFeedback] = useState("");
  const isPublic = staticPosts.some((item) => item.id === post.id);
  const shareUrl = typeof window === "undefined" ? "" : `${window.location.origin}/research/${post.id}`;
  const qrMatrix = useMemo(() => {
    if (!isPublic || !shareUrl) return null;
    try { return createQrMatrix(shareUrl); } catch { return null; }
  }, [isPublic, shareUrl]);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); return; }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex='-1'])"));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  const copyLink = async () => {
    try {
      await copyText(shareUrl);
      setFeedback("Research link copied to your clipboard.");
      onShared?.();
    } catch {
      setFeedback("Copy failed. Please copy the address from your browser.");
    }
  };

  const nativeShare = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title: post.title, text: post.description, url: shareUrl });
      setFeedback("Research shared successfully.");
      onShared?.();
    } catch {
      setFeedback("Sharing was cancelled.");
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/45 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={`share-title-${post.id}`} aria-describedby={`share-description-${post.id}`} className="safe-area-footer flex max-h-[94dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-3xl border border-slate-200/70 bg-surface shadow-floating sm:rounded-3xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div className="min-w-0"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-brand">Share research</p><h2 id={`share-title-${post.id}`} className="mt-1 truncate text-lg font-black text-ink">{post.title}</h2><p id={`share-description-${post.id}`} className="mt-1 text-xs text-slate-500">Help this research reach the right participants.</p></div>
          <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close share dialog" className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/15">×</button>
        </header>

        <div className="min-h-0 overflow-y-auto p-5 sm:p-6">
          {isPublic ? (
            <div className="grid gap-5 sm:grid-cols-[minmax(0,1fr)_190px]">
              <div>
                <label htmlFor={`share-url-${post.id}`} className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Public research link</label>
                <div className="mt-2 flex gap-2"><input id={`share-url-${post.id}`} readOnly value={shareUrl} className="min-h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-surface px-3 text-xs text-slate-600 outline-none focus:border-brand/50 focus:ring-4 focus:ring-brand/10" /><Button type="button" onClick={copyLink} className="min-h-11 shrink-0 rounded-xl px-4 text-xs">Copy Link</Button></div>
                <div className="mt-3 flex flex-wrap gap-2">{typeof navigator !== "undefined" && "share" in navigator && <Button type="button" variant="secondary" onClick={nativeShare} className="min-h-11 rounded-xl px-4 text-xs">Share from device</Button>}</div>
                <p className={`mt-3 min-h-5 text-xs font-semibold ${feedback.includes("failed") || feedback.includes("cancelled") ? "text-amber-700" : "text-emerald-700"}`} role="status" aria-live="polite">{feedback}</p>
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 px-3.5 py-3"><p className="text-xs font-extrabold text-brand-dark">Direct public access</p><p className="mt-1 text-[11px] leading-5 text-slate-500">Recipients open this research directly without navigating through the Community feed.</p></div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-surface p-3 text-center">
                {qrMatrix ? <svg viewBox={`0 0 ${qrMatrix.length + 8} ${qrMatrix.length + 8}`} role="img" aria-label={`QR code for ${post.title}`} className="mx-auto aspect-square w-full rounded-lg shadow-sm" shapeRendering="crispEdges"><rect width="100%" height="100%" fill="white" />{qrMatrix.map((row, y) => row.map((dark, x) => dark ? <rect key={`${x}-${y}`} x={x + 4} y={y + 4} width="1" height="1" fill="#172033" /> : null))}</svg> : <div className="grid aspect-square place-items-center rounded-lg bg-surface text-xs text-rose-600">QR unavailable</div>}
                <Button type="button" variant="secondary" disabled={!qrMatrix} onClick={() => { if (qrMatrix) { downloadQrPng(qrMatrix, `valida-${post.id}-qr.png`); setFeedback("QR code downloaded as a PNG image."); } }} className="mt-3 min-h-10 w-full rounded-xl px-3 text-xs">Download QR</Button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-6 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-surface text-lg font-black text-amber-700 shadow-sm">!</div><h3 className="mt-3 text-base font-black text-ink">Public sharing is not available yet</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">This research exists only in your current browser session. Public links and QR codes require future server persistence, which is outside this sprint.</p><Button type="button" variant="secondary" onClick={onClose} className="mt-4 min-h-11 rounded-xl px-4 text-xs">Close</Button></div>
          )}
        </div>
      </div>
    </div>
  );
}
