# Queue join counter — developer handover

## Frontend integration point

`src/lib/queueJoinCounter.ts` is the single data-fetching module used by both:

- `src/components/QueueJoinCounter.tsx` on the homepage hero (`variant="hero"`)
- the same component on `/analytics` (`variant="metric"`)

No additional counter table, duplicate queue record, production database, or queue-integration change is included. No temporary users, authentication settings, admin permissions, or backend data are created or modified. Actual admin access and live backend aggregation are left for developer UAT after GitHub handover.

## Production API contract

Set the public Vite environment variable `VITE_QUEUE_JOIN_COUNT_API_URL` to a same-origin or CORS-enabled backend endpoint. The frontend sends an unauthenticated `GET` with `Accept: application/json` and `Cache-Control: no-store` semantics.

Expected `200 OK` JSON response:

```json
{
  "count": 12847
}
```

`count` must be one non-negative safe integer. Any missing endpoint, network error, non-200 response, timeout (8 seconds), or invalid payload returns `null`; the public component then renders nothing and the admin metric shows that the live count is unavailable. The endpoint must return only the aggregate number—never queue entry rows, mobile numbers, NRIC/FIN, names, clinic-level breakdowns, or other patient-identifiable data.

## Backend aggregation requirements

Implement the endpoint against the existing backend's authoritative successful-join history. The query must:

- include historical joins and all integrated clinic entry points, including clinic QR journeys;
- count each successfully created join once using its existing unique join/entry identifier or idempotency key;
- exclude failed submissions, explicitly marked test transactions, and duplicate/replayed requests;
- remain cumulative across days and retain joins if a clinic is later removed;
- avoid depending on a patient's current queue status, since a successful join is still historical after serving or cancellation.

If the existing queue table is pruned or rows are deleted, use the backend's existing immutable join/audit history rather than counting only currently retained rows. This prototype does not add such a store or duplicate existing queue records.

## Update logic

`JoinQueueIntakeDialog` and the direct `/queue` join handler call `notifySuccessfulQueueJoin(createdEntry.id)` only after a confirmed new entry. Existing active-entry responses (`ALREADY_IN_QUEUE`), validation failures, rate limits, and failed inserts do not emit the event.

The browser event triggers an immediate aggregate refetch. A 60-second refresh and a refresh when the page becomes visible pick up joins made by other visitors. Session-only entry-ID deduplication prevents repeated success notifications from incrementing the development preview twice. Production always trusts the backend aggregate rather than adding browser increments.

## Live display motion

The homepage shows a small teal live indicator only when an authoritative API aggregate is available (`isMock: false`). It pulses gently twice when a subsequent live response changes the count; the exact new number fades and moves into place over 320 ms, without counting through invented intermediate totals. Initial loading, unchanged refresh responses and mock figures do not animate. Reduced-motion preferences disable both animations. The admin metric, fetching, refresh schedule and backend integration are unchanged; this indicator does not imply a new realtime subscription.

During developer UAT, verify a changed aggregate triggers one transition, an unchanged aggregate triggers none, unavailable data hides the counter, mock data never claims live status, and reduced-motion settings suppress all counter motion.

## Mock data: code and documentation only

Development mode and the hosted development preview use the clearly labelled placeholder `MOCK_QUEUE_JOIN_COUNT = 1284` in `queueJoinCounterCore.ts` when no live endpoint is available. `isPreviewHost` in the same file recognises the preview by its `id-preview--` hostname prefix, so the counter stays visible for review while the preview is still a production build.

Mock data is never used as a fallback on the published app: `resolveQueueJoinSnapshot` returns `null` there, so the public counter renders nothing rather than a mock figure.

No mock indicator is rendered in the interface — not on the homepage and not in the development preview. The placeholder is identified only in code (`MOCK_QUEUE_JOIN_COUNT`, the `isMock` flag, and the invisible `data-source="preview-placeholder"` attribute on the counter element) and in this document.

UAT should verify:

1. Homepage and `/analytics` show the same API count, and no mock indicator is visible anywhere in the interface.
2. One new join increases the backend aggregate once; retrying the same request does not.
3. Failed, duplicate, and test-marked submissions do not increase it.
4. A join through a clinic QR entry point is included.
5. The count survives a day boundary and clinic removal.
6. On the published app, removing the endpoint or returning invalid JSON hides the public counter without showing a mock number; the `id-preview--` preview host keeps showing the placeholder until the endpoint is connected.
7. API responses and browser rendering expose no patient-identifiable information.
8. The public "Since September 2026" line (`queueJoinCounter.since`) still matches the earliest successful join actually included in the aggregate. If the counted history starts earlier or later, update that label in all four languages in `src/content/queueJoinCounterTranslations.ts` — the label is display text only and is not derived from the API response.
