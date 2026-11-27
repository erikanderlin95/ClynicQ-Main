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
          <div className="text-3xl font-bold" aria-live="polite">
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

  return (
    <div
      className="flex max-w-full flex-col items-center gap-1.5 text-center"
      data-testid="homepage-queue-join-counter"
      data-source={snapshot.isMock ? "preview-placeholder" : "live"}
    >
      <span className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
        <span className="flex items-center gap-2 text-primary">
          <UsersRound className="h-5 w-5 shrink-0 opacity-75 sm:h-6 sm:w-6" aria-hidden="true" />
          <strong className="text-3xl font-bold leading-none tracking-tight tabular-nums sm:text-4xl" aria-live="polite">
            {snapshot.count.toLocaleString(language)}
          </strong>
        </span>
        {import.meta.env.DEV && snapshot.isMock && (
          <Badge variant="outline" className="px-1.5 py-0 text-[9px] font-medium">
            {t("queueJoinCounter.preview")}
          </Badge>
        )}
      </span>
      <span className="block text-xs font-medium leading-snug text-muted-foreground sm:text-sm">
        {t("queueJoinCounter.label")}
      </span>
    </div>
  );
}
