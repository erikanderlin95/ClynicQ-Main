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
