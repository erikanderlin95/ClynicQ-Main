import { useEffect, useRef, useState } from "react";
import { UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQueueJoinCounter } from "@/hooks/useQueueJoinCounter";
import { queueJoinCountUpValue, shouldAnimateQueueJoinCount } from "@/lib/queueJoinCounterCore";
import "@/content/queueJoinCounterTranslations";

interface QueueJoinCounterProps {
  variant?: "hero" | "metric";
}

/** One-time reveal of the actual total; it never invents extra joins. */
const COUNT_UP_DURATION_MS = 900;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function QueueJoinCounter({ variant = "hero" }: QueueJoinCounterProps) {
  const { language, t } = useLanguage();
  const { snapshot, loading } = useQueueJoinCounter();
  const numberRef = useRef<HTMLElement>(null);
  const previousSnapshot = useRef(snapshot);
  const targetRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const runningRef = useRef(false);
  const firstRevealDoneRef = useRef(false);
  const [revealedCount, setRevealedCount] = useState<number | null>(null);

  // The first reveal counts up to the real total. The loop is owned by refs, not
  // by this effect, so a re-render while it runs cannot cut it short: it always
  // lands exactly on the latest total. Once that reveal is done, a later response
  // carrying a different total simply replaces the number.
  useEffect(() => {
    if (variant !== "hero" || !snapshot) return;
    const target = snapshot.count;
    targetRef.current = target;

    if (prefersReducedMotion() || firstRevealDoneRef.current) {
      setRevealedCount(target);
      return;
    }
    if (runningRef.current) return;
    runningRef.current = true;

    const startedAt = performance.now();
    frameRef.current = requestAnimationFrame(function tick(now: number) {
      const current = targetRef.current ?? target;
      const progress = Math.min(1, (now - startedAt) / COUNT_UP_DURATION_MS);
      setRevealedCount(queueJoinCountUpValue(current, progress));
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        runningRef.current = false;
        firstRevealDoneRef.current = true;
        frameRef.current = null;
      }
    });
  }, [snapshot, variant]);

  // Stop the reveal if the counter is removed from the page.
  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    runningRef.current = false;
    firstRevealDoneRef.current = false;
  }, []);

  useEffect(() => {
    const previous = previousSnapshot.current;
    previousSnapshot.current = snapshot;

    // Motion is presentation-only: it runs when a rendered count is replaced by
    // a different count, for mock and live figures alike. Initial loading and
    // unchanged refresh responses never animate.
    if (variant !== "hero" || !shouldAnimateQueueJoinCount(previous, snapshot) ||
        prefersReducedMotion()) return;

    // Reveal the exact new count rather than inventing intermediate totals.
    const numberAnimation = numberRef.current?.animate(
      [{ opacity: 0.55, transform: "translateY(2px)" }, { opacity: 1, transform: "translateY(0)" }],
      { duration: 320, easing: "ease-out" },
    );

    return () => numberAnimation?.cancel();
  }, [snapshot, variant]);

  if (variant === "metric") {
    return (
      <Card data-testid="admin-queue-join-counter">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <UsersRound className="h-4 w-4" />
            {t("queueJoinCounter.adminTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold tabular-nums" aria-live="polite">
            {loading ? "…" : snapshot ? snapshot.count.toLocaleString(language) : "—"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {snapshot ? t("queueJoinCounter.label") : t("queueJoinCounter.unavailable")}
          </p>
        </CardContent>
      </Card>
    );
  }

  // A missing production endpoint or invalid response must not leave an empty card.
  if (loading || !snapshot) return null;

  // The placeholder is never rendered in the interface: mock data is identified
  // in code and in the developer handover documentation only.
  const shownCount = revealedCount ?? (prefersReducedMotion() ? snapshot.count : 0);

  return (
    <div
      className="relative flex w-full max-w-full flex-col items-center text-center"
      data-testid="homepage-queue-join-counter"
      data-source={snapshot.isMock ? "preview-placeholder" : "live"}
    >
      <span className="mb-2 flex items-center gap-2.5 text-primary">
        <UsersRound className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden="true" />
        <strong ref={numberRef} className="inline-block text-4xl font-bold leading-none tabular-nums sm:text-5xl" aria-hidden="true">
          {shownCount.toLocaleString(language)}
        </strong>
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {snapshot.count.toLocaleString(language)}
        </span>
      </span>
      <span className="block text-sm font-medium leading-snug text-foreground/70 sm:text-base">
        {t("queueJoinCounter.label")}
      </span>
      <span className="mt-1 block text-xs font-normal leading-snug text-foreground/80 sm:text-sm">
        {t("queueJoinCounter.since")}
      </span>
    </div>
  );
}
