import { UsersRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
            {snapshot?.isMock
              ? t("queueJoinCounter.preview")
              : snapshot
                ? t("queueJoinCounter.label")
                : t("queueJoinCounter.unavailable")}
          </p>
        </CardContent>
      </Card>
    );
  }

  // A missing production endpoint or invalid response must not leave an empty card.
  if (loading || !snapshot) return null;

  // The placeholder badge is absolutely positioned so the counter stays centred
  // on its own axis regardless of the indicator's presence or width.
  return (
    <div
      className="relative flex w-full max-w-full flex-col items-center gap-1 text-center"
      data-testid="homepage-queue-join-counter"
      data-source={snapshot.isMock ? "preview-placeholder" : "live"}
    >
      <span className="flex items-center gap-2 text-primary">
        <UsersRound className="h-5 w-5 shrink-0 opacity-75 sm:h-6 sm:w-6" aria-hidden="true" />
        <strong className="text-3xl font-bold leading-none tracking-tight tabular-nums sm:text-4xl" aria-live="polite">
          {snapshot.count.toLocaleString(language)}
        </strong>
      </span>
      <span className="block text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
        {t("queueJoinCounter.label")}
      </span>
      <span className="block text-[10px] leading-snug text-muted-foreground opacity-75 sm:text-xs">
        {t("queueJoinCounter.since")}
      </span>
      {import.meta.env.DEV && snapshot.isMock && (
        <Badge
          variant="outline"
          className="pointer-events-none absolute right-0 top-0 px-1 py-0 text-[8px] font-medium"
        >
          {t("queueJoinCounter.preview")}
        </Badge>
      )}
    </div>
  );
}
