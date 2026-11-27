import { useEffect, useState } from "react";
import {
  fetchQueueJoinCount,
  QUEUE_JOIN_SUCCESS_EVENT,
  type QueueJoinCountSnapshot,
} from "@/lib/queueJoinCounter";

const REFRESH_INTERVAL_MS = 60_000;

export function useQueueJoinCounter() {
  const [snapshot, setSnapshot] = useState<QueueJoinCountSnapshot | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let refreshing = false;

    const refresh = async () => {
      if (refreshing) return;
      refreshing = true;
      const next = await fetchQueueJoinCount();
      if (active) {
        setSnapshot(next);
        setLoading(false);
      }
      refreshing = false;
    };

    const handleSuccessfulJoin = () => void refresh();
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") void refresh();
    };

    void refresh();
    const interval = window.setInterval(handleSuccessfulJoin, REFRESH_INTERVAL_MS);
    window.addEventListener(QUEUE_JOIN_SUCCESS_EVENT, handleSuccessfulJoin);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener(QUEUE_JOIN_SUCCESS_EVENT, handleSuccessfulJoin);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { snapshot, loading };
}
