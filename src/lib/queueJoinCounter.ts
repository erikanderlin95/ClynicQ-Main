import {
  createQueueJoinDeduplicator,
  parseQueueJoinCountPayload,
  resolveQueueJoinSnapshot,
  type QueueJoinCountSnapshot,
} from "./queueJoinCounterCore";

export const QUEUE_JOIN_SUCCESS_EVENT = "clynicq:queue-join-success";
export type { QueueJoinCountSnapshot } from "./queueJoinCounterCore";

const successfulJoins = createQueueJoinDeduplicator();
const configuredEndpoint = import.meta.env.VITE_QUEUE_JOIN_COUNT_API_URL?.trim();

/** Call only after the backend confirms a newly created queue entry. */
export function notifySuccessfulQueueJoin(entryId: string): boolean {
  if (!successfulJoins.register(entryId)) return false;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(QUEUE_JOIN_SUCCESS_EVENT));
  }
  return true;
}

async function fetchLiveAggregateCount(): Promise<number | null> {
  if (!configuredEndpoint) return null;

  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(configuredEndpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return null;
    return parseQueueJoinCountPayload(await response.json());
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
  }
}

/**
 * Single data source for both the public counter and admin metric.
 * Production integrators set VITE_QUEUE_JOIN_COUNT_API_URL to a backend GET
 * endpoint returning { "count": number }. No patient records are requested.
 */
export async function fetchQueueJoinCount(): Promise<QueueJoinCountSnapshot | null> {
  const liveCount = await fetchLiveAggregateCount();
  return resolveQueueJoinSnapshot(liveCount, import.meta.env.DEV, successfulJoins.size);
}
