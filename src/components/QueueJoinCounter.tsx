import { UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQueueJoinCounter } from "@/hooks/useQueueJoinCounter";
import "@/content/queueJoinCounterTranslations";

interface QueueJoinCounterProps {
  variant?: "hero" | "metric";
}

export function QueueJoinCounter({ variant = "hero" }: QueueJoinCounterProps) {
  const { language, t } = useLanguage();
  const { snapshot, loading } = useQueueJoinCounter();

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
  return (
    <div
      className="relative flex w-full max-w-full flex-col items-center gap-2 text-center"
      data-testid="homepage-queue-join-counter"
      data-source={snapshot.isMock ? "preview-placeholder" : "live"}
    >
      <span className="mb-1 flex items-center gap-2.5 text-primary">
        <UsersRound className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden="true" />
        <strong className="text-4xl font-bold leading-none tabular-nums sm:text-5xl" aria-live="polite">
          {snapshot.count.toLocaleString(language)}
        </strong>
      </span>
      <span className="block text-sm font-normal leading-snug text-muted-foreground sm:text-base">
        {t("queueJoinCounter.label")}
      </span>
      <span className="block text-xs font-normal leading-snug text-foreground/80 sm:text-sm">
        {t("queueJoinCounter.since")}
      </span>
    </div>
  );
}
