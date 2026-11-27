# ClynicQ roadmap

## Live counter refinement
- [x] Add a subtle indicator and exact-number transition only for changed live aggregates, respecting reduced motion and leaving mock figures static.
- [x] Verify mobile/desktop display and changed, unchanged, mock and reduced-motion states without touching backend data or creating users.
- [x] Make the live indicator and number transition active for mock counts too, so the preview behaves like production.
- [x] Increase the hero description text slightly and re-check mobile/desktop wrapping.

## Reference-led hero proportions
- [x] Refine only hero typography, counter proportions, button styling and spacing; retain the original gradient and abstract background unchanged.
- [x] Verify mobile/desktop alignment and existing hero actions without touching queue logic or backend integration.

## Spacious hero spacing
- [x] Open up the gaps between headline, description, counter and the two actions, and add hero top/bottom padding.
- [x] Remove the visible preview placeholder from the interface; keep the mock count identified in code and handover docs only.
- [x] Raise the contrast of "Since September 2026" and keep mobile and desktop alignment balanced.

## Less crowded mobile hero
- [x] Replace the hero description with the approved single-line wording in all four languages.
- [x] Keep the counter centred with the teal icon, add "Since September 2026", and keep the placeholder indicator development-only and clear of the count.
- [x] Turn List Your Clinic into a small teal text link while both hero actions still work.
- [x] Tighten hero spacing and set the Browse Clinics line to the approved wording, still one row on phones in all four languages.
- [x] Flag the counter start date for developer verification during UAT.

## Premium hero refinement
- [x] Integrate the counter directly into the hero with compact, centred, tabular-number styling.
- [x] Put Explore Clinics above List Your Clinic while preserving both actions.
- [x] Verify mobile and desktop spacing, development-only placeholder display, and existing counter tests.

## Cumulative queue join counter
- [x] Add a compact four-language homepage counter below the hero description.
- [x] Add the same shared count to the admin analytics dashboard.
- [x] Instrument confirmed joins without counting duplicates or changing queue integration.
- [x] Document the production aggregate API, privacy rules and UAT handover; keep mock data development-only.
- [x] Leave actual admin and backend integration checks to the developer's UAT; create no test users and change no auth, permissions or backend data.
- [x] Test counter rules and verify homepage behavior without publishing.

## Healthcare at Home
- [x] Replace only the 24-hour entry section with two home healthcare cards.
- [x] Add house-call and home-care listing pages with labelled placeholders and expandable provider data.
- [x] Verify both cards and pages on mobile and desktop, including four languages.

## Subheader size and Nirvana card layout
- [x] Make the Browse Clinics subheader a bit bigger while keeping it on one row in all four languages.
- [x] Give the Nirvana card the same layout as the other Afterlife cards, logo on the left and slightly bigger.


## Nirvana post placement
- [x] Move the Nirvana article off the Afterlife page into the ClynicQ Blog under a new Afterlife category.
- [x] Verify the category filter, outbound link, four languages and the Afterlife page; do not publish.


## Blank route transitions
- [x] Replace blank lazy-route fallback and retain the existing page during navigation.
- [x] Keep scroll reset aligned with the destination page becoming ready.
- [x] Test delayed lazy-page navigation and direct loading on mobile and desktop.

## Safe mobile and desktop performance
- [x] Remove unused per-card account checks and redundant listing renders.
- [x] Reduce partner-logo downloads without changing appearance or proportions.
- [x] Verify refresh, filters, intake and detail/back navigation on mobile and desktop.

## Refresh speed only
- [x] Measure shared page downloads and check query timings without changing data or functionality.
- [x] Defer article dictionaries to the pages that use them, preserving all four languages.
- [x] Verify refreshes, blog translations and existing navigation; do not publish.

## Page loading and refresh performance
- [x] Identify page-loading and refresh bottlenecks without changing queue behaviour.
- [x] Reduce unnecessary initial downloads and repeated requests while preserving navigation and translations.
- [x] Verify page opening, refreshes and clinic browsing; leave production unchanged.

## Dr Chung knee osteoarthritis draft
- [x] Extract and inspect original cover, knee diagram, exercise illustrations, clinic photo and identified doctor portrait.
- [x] Add the supplied article, author, references, category and four-language content using the existing blog layout.
- [x] Keep the article unpublished and verify category filtering, clinic links, images and mobile reading.

## Dark mode compatibility
- [x] Stop phone dark mode from auto-inverting the UI (declare light color-scheme in HTML and CSS).
- [x] Verify homepage renders white/dark-text with an emulated dark-mode phone.

## Clinic listing scroll restore
- [x] Fix scroll save overwriting real position during route change (removed unmount flush).
- [x] Anchor restore to the top visible clinic card; keep re-applying while layout settles; stop on user touch.
- [x] Verify back navigation returns to the same clinic card at two scroll depths on mobile viewport.

## Clinic details opening position
- [x] Reproduce browser-history clinic details reopening at the bottom.
- [x] Reset every clinic detail entry to the top without overriding listing restoration; verify mobile tap, in-app back and browser history.

## 24-hour clinic listing placement
- [x] Keep 24-hour directory clinic listings exclusively on the dedicated 24-hour clinics page; verify old caches are excluded and all 11 directory cards remain.

## Counter visible in the hosted preview
- [x] Show the placeholder count in the hosted development preview (`id-preview--` host) as well as local development, so the queue count and its two subtext lines are visible there.
- [x] Keep the published app free of mock figures: it still renders nothing until the real aggregate endpoint is connected.
- [x] Cover the host rule with a test and note it in the handover document.
