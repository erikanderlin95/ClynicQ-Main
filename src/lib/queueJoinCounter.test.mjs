import { expect, test } from "bun:test";
import {
  createQueueJoinDeduplicator,
  MOCK_QUEUE_JOIN_COUNT,
  parseQueueJoinCountPayload,
  resolveQueueJoinSnapshot,
} from "./queueJoinCounterCore.ts";

test("aggregate API accepts only non-negative integer counts", () => {
  expect(parseQueueJoinCountPayload({ count: 12847 })).toBe(12847);
  expect(parseQueueJoinCountPayload({ count: 0 })).toBe(0);
  for (const payload of [{ count: -1 }, { count: 1.5 }, { count: "12847" }, {}, null]) {
    expect(parseQueueJoinCountPayload(payload)).toBeNull();
  }
});

test("duplicate queue entry IDs never increment the preview count twice", () => {
  const joins = createQueueJoinDeduplicator();
  expect(joins.register("entry-1")).toBe(true);
  expect(joins.register("entry-1")).toBe(false);
  expect(joins.register(" entry-1 ")).toBe(false);
  expect(joins.register("entry-2")).toBe(true);
  expect(joins.register("")).toBe(false);
  expect(joins.size).toBe(2);
});

test("live data wins and production never falls back to mock figures", () => {
  expect(resolveQueueJoinSnapshot(42, true, 3)).toEqual({ count: 42, isMock: false });
  expect(resolveQueueJoinSnapshot(null, false, 3)).toBeNull();
  expect(resolveQueueJoinSnapshot(null, true, 2)).toEqual({
    count: MOCK_QUEUE_JOIN_COUNT + 2,
    isMock: true,
  });
});
