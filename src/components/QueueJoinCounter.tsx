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
      className="inline-flex max-w-full items-center gap-3 rounded-xl border border-primary/20 bg-background/80 px-4 py-2.5 text-left shadow-sm"
      data-testid="homepage-queue-join-counter"
      data-source={snapshot.isMock ? "preview-placeholder" : "live"}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <UsersRound className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <strong className="text-2xl font-bold leading-none text-primary" aria-live="polite">
            {snapshot.count.toLocaleString(language)}
          </strong>
          {snapshot.isMock && (
            <Badge variant="outline" className="px-1.5 py-0 text-[9px] font-medium">
              {t("queueJoinCounter.preview")}
            </Badge>
          )}
        </span>
        <span className="mt-1 block text-xs font-medium leading-snug text-foreground/75">
          {t("queueJoinCounter.label")}
        </span>
      </span>
    </div>
  );
}
