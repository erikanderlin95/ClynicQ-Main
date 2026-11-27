export const MOCK_QUEUE_JOIN_COUNT = 1284;

export interface QueueJoinCountSnapshot {
  count: number;
  isMock: boolean;
}

/** Accept only the public aggregate shape used by the production endpoint. */
export function parseQueueJoinCountPayload(payload: unknown): number | null {
  if (!payload || typeof payload !== "object") return null;
  const count = (payload as { count?: unknown }).count;
  return typeof count === "number" && Number.isSafeInteger(count) && count >= 0
    ? count
    : null;
}

/**
 * Lovable serves the development preview as a production build from a host
 * prefixed with `id-preview--`; the published app runs on any other host.
 * Only the preview may fall back to the placeholder count.
 */
export function isPreviewHost(hostname: string): boolean {
  return hostname.startsWith("id-preview--") || hostname.includes("-preview--");
}

/**
 * Live data always wins. Mock figures are available only to the development
 * preview; an unavailable production response stays null so the UI can hide.
 */
export function resolveQueueJoinSnapshot(
  liveCount: number | null,
  isDevelopment: boolean,
  localSuccessfulJoins: number,
): QueueJoinCountSnapshot | null {
  if (liveCount !== null) return { count: liveCount, isMock: false };
  if (!isDevelopment) return null;
  return {
    count: MOCK_QUEUE_JOIN_COUNT + localSuccessfulJoins,
    isMock: true,
  };
}

/**
 * Motion is presentation-only: a transition runs only when a rendered count is
 * replaced by a different count. Mock and live figures behave identically so
 * the preview matches production; initial loading and unchanged refresh
 * responses never animate.
 */
export function shouldAnimateQueueJoinCount(
  previous: QueueJoinCountSnapshot | null,
  next: QueueJoinCountSnapshot | null,
): boolean {
  return Boolean(previous && next && previous.count !== next.count);
}

/**
 * One-time reveal value for the homepage counter: eases from 0 up to the real
 * total. It only ever shows numbers between 0 and the actual count, so the
 * animation never invents joins that did not happen.
 */
export function queueJoinCountUpValue(target: number, progress: number): number {
  if (!Number.isSafeInteger(target) || target <= 0) return 0;
  const clamped = Math.min(1, Math.max(0, progress));
  const eased = 1 - Math.pow(1 - clamped, 3);
  return Math.round(target * eased);
}

/** Session-only deduplication by queue entry ID; no patient data is retained. */
export function createQueueJoinDeduplicator() {
  const seenEntryIds = new Set<string>();

  return {
    register(entryId: unknown): boolean {
      if (typeof entryId !== "string" || !entryId.trim()) return false;
      const normalizedId = entryId.trim();
      if (seenEntryIds.has(normalizedId)) return false;
      seenEntryIds.add(normalizedId);
      return true;
    },
    get size(): number {
      return seenEntryIds.size;
    },
  };
}
