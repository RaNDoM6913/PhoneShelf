# iPhone Atlas — design specification 0.3

**Date:** 23 October 2026. **Status:** editable design reference and synthetic interaction prototype. **Working name:** iPhone Atlas; no final public brand decision.

The deliverable is [PROTOTYPE.html](PROTOTYPE.html), one self-contained offline HTML file. Open it directly in a browser. It illustrates a native macOS information workspace; it is not the production application's technology choice or a device-management implementation. No personal data, installed-app inventory, real backup or device was accessed to produce it. All previews are rendered from deterministic code, not image-generated screenshots.

The approved v0.2 images remain historical design inputs. This additive iteration expands the information architecture to 16 routes and makes source inspection, search, selection, comparison and export review explorable. A feature card marked “Research” is a roadmap entry, never a claim of access.

## Product shape

The central object is a **device workspace** with several independent source types. A connected observation, a backup snapshot, an app account export and a manually recorded Settings value may be associated with the same workspace without being treated as the same dataset. Users can begin with a local backup or import while no phone is connected.

The application's working sequence is discover → inspect → preserve → verify. The expanded roadmap adds backup management, transfer preparation, application management, optional developer tools and other research tracks; their interfaces need their own evidence and admission gates before real operations become available.

Simple mode reduces technical detail. Advanced mode adds raw identifiers, field definitions and operation metadata. It never grants additional device access. A source inspector remains reachable in both modes.

## Visual direction

Use a calm macOS document-application structure: compact toolbar, permanent sidebar, clear route heading, restrained cards, readable tables and selected-item inspectors. The content should look like a useful workspace rather than a dashboard full of scores. Typography, layout and evidence labels carry hierarchy; decorative illustrations remain confined to the synthetic device and media fixtures.

The default reference theme is pale gray and white with a blue accent. Purple denotes a local backup source, amber an imported account/report or a coverage caveat, and green a positive availability state. Color is always paired with text. Dark mode is an actual token substitution, not a separate screenshot set.

| Element | Reference behavior | Native implementation |
| --- | --- | --- |
| Window shell | 52 px reference titlebar, 26 px status strip | Native window toolbar and system materials; do not copy browser traffic lights into the app |
| Sidebar | 216 px at the main reference width | `NavigationSplitView` with accessible labels and stable routes |
| Main toolbar | Breadcrumb, connection fixture, scoped search | Toolbar items; search scope visible |
| Content | 30 px horizontal reference inset, 16 px primary grid gap | Adaptive spacing, no fixed screenshot dimensions |
| Selected row | Blue-tinted background and semantic selected state | Native selection and keyboard navigation |
| Source chip | Source class plus capture date | Button opening a reusable source inspector |
| Inspector | 365 px overlay in the HTML reference | Adaptive inspector/sidebar or sheet according to width |
| Tables | 11–13 px reference text; metadata subordinate | Dynamic type/system text styles, resizable columns where useful |
| Application icons | Initial-letter fixture tokens | Licensed public metadata or native placeholders; no copied vendor asset pack |
| Data density | Reading and comparison first | Match native points after layout testing; screenshot pixels are not points |

`TOKENS.json` contains the exact reference palette, fonts, dimensions and semantics. The production app should map these references to system colors, materials and text styles where possible. Do not bundle a proprietary system font from the HTML reference.

## Route inventory

Each route is directly addressable with the file's hash, for example `PROTOTYPE.html#apps`. Query options precede the hash: `PROTOTYPE.html?theme=dark&mode=advanced#explorer`.

| Route | Purpose and content | Meaningful interaction | Initial production dependency |
| --- | --- | --- | --- |
| `overview` | Device passport, same-source used/free, latest sources and work entry points | Open a source; navigate to app, backup or timeline | Workspace identity and source model |
| `apps` | Inventory and selected app card with six tabs | Select app, search, filter File Sharing, change detail tabs | Inventory field interpretation and capability probe |
| `storage` | Comparable device totals, dated observations, explicit unknowns | Open app/document/media evidence and comparison | Units and service scope proven |
| `documents` | Exposed File Sharing files, not entire private containers | Filter by app, select exact files, build export plan | Read access for each selected scope |
| `media` | Available resources, cloud-only originals and asset groups | Filter availability, select available resources, review export | Resource identity and completeness rules |
| `backups` | Selected local snapshots, encrypted state, expected/available/missing payload counts | Open explorer; inspect password-required state | Envelope/manifest readers and known-password support |
| `explorer` | Domain/file catalog, generic table/properties/hex inspection | Select file, inspect generic views, retain missing-entry visibility | Backup catalog and bounded inspectors |
| `messages` | Saved conversation view with missing attachments | Switch backup/account source, select conversation, review export | Source-specific decoder contracts |
| `contacts` | Contact record and field-level provenance | Select contact, scoped search, vCard plan | Contact decoder and export field mapping |
| `privacy` | Imported NDJSON report, observation interval, domain/access records | Inspect source, open import explanation | Bounded parser and record-type handling |
| `timeline` | Source history plus matched live or backup comparison | Switch comparison type and inspect provenance | Comparable identity, schema and scope |
| `battery` | Charge, manual Battery Health evidence and diagnostic limitations | Inspect live/manual source; export observations plan | Field meaning and units; no inferred official health |
| `transfer` | Preservation inventory and future target compatibility checklist | Read explicitly unavailable restore state | Export evidence before any migration workflow |
| `toolbox` | Broad capability catalog and roadmap status | Scoped search and capability-stage explanation | Each module's independent admission decision |
| `operations` | Immutable exact selection, destination, item results and receipt design | Review → confirmation → simulated completion → reset | Operation model; actual writes not implemented here |
| `settings` | Theme, detail, retention defaults and synthetic connection-state controls | Change theme/mode/state, toggle temporary index setting, reset | Native preferences and storage policy |

There are 16 routes, not 16 implementations of device capabilities. “Design fixture,” “Planned,” “Research” and “Unavailable” are deliberately distinct from “implemented,” “tested” and “shipped.”

## Information architecture changes from v0.2

The existing overview expands into a concise device passport without creating a separate route for every category of hardware metadata. The application detail becomes the central place to connect live metadata, permitted documents, backup domains, imported activity and history. Storage gets its own route because explaining comparable sizes is different from reading an app inventory.

Privacy reports and saved-source timelines become primary destinations. Battery observations have a dedicated surface, while system repair, firmware, installation, offloading, migration and developer capabilities remain visible as staged work. These roadmap cards prevent feature requests from disappearing while avoiding enabled-looking operations whose access route has not been established.

Messages and Contacts demonstrate semantic viewers using the same source-aware model as the generic explorer. More decoders should reuse this shell when appropriate. Do not assume that a generic SQLite viewer makes every app schema supported.

## Synthetic data contract

| Field | Fixture value or rule |
| --- | --- |
| Device name | Atlas Demo |
| Device model | iPhone 15 Pro, 256 GB; synthetic profile |
| Software | iOS 26.4; illustrative fixture, no “latest” claim |
| Device identity | `device-demo-001` |
| Live observation | 23 Oct 2026, 10:42 UTC |
| Capacity / used / free | 256.0 / 198.4 / 57.6 GB; decimal units, same source |
| Prior comparable used value | 188.1 GB on 16 Oct 2026 |
| App inventory | 87 fixture entries conceptually; UI displays six explicitly labeled sample rows |
| Telegram | 0.4 GB reported app bytes + 15.8 GB reported data = 16.2 GB displayed total; data is not labeled cache |
| VLC | 0.3 GB + 8.3 GB = 8.6 GB |
| Signal | 0.3 GB + 3.9 GB = 4.2 GB |
| Pages | 0.7 GB + 1.0 GB = 1.7 GB |
| Maps and Notes sizes | Unavailable; displayed as `—`, never zero |
| Selected backup | 22 Oct 2026, 21:15 UTC; 64.8 GB on Mac, separate from live device used bytes |
| Backup payload coverage | 12,480 expected file payloads; 12,477 available + 3 missing |
| Other backup fixtures | 61.2 GB on 16 Oct; 59.1 GB on 3 Oct, password-required state |
| Charge | 78%, service fixture |
| Battery Health | 94%, explicitly manual Settings evidence |
| Report interval | 16–23 Oct 2026; synthetic NDJSON-derived records |
| Network sample | Three applications, four example-domain rows, 579 illustrative network hits; hits are not record count |
| Account archive | Selected Telegram account data, potentially spanning several devices |
| Media | Eight sample resources, six available and two cloud-only; a HEIC/MOV pair demonstrates a Live Photo group |
| Identifiers | Synthetic record IDs, example.invalid domains, fictional phone number |

All numbers are design fixtures, not measurements. Chart columns are illustrative renderings; the implementation must render exact measured series from a validated data contract. Do not copy decorative bar heights into production datasets.

## Source inspector contract

Every displayed fact that needs context should be able to reveal:

1. Source kind and a human-readable name.
2. Capture/observation date and the distinction from import date.
3. Device, snapshot, account or manual-evidence identity.
4. Actual scope, coverage, unavailable fields and missing payloads.
5. Transport/parser/decoder interpretation and version when implemented.
6. Units and original raw field/value when useful.
7. Evidence level: vendor documentation, upstream source, lab observation or shipped capability.

The prototype uses a reusable right-side drawer with a focus trap, an explicit close button, Escape dismissal and return to the invoking control. It does not put source metadata permanently beside every sentence. This keeps the main view readable while allowing questions to be answered precisely.

## Interaction contracts

### Applications

Selecting an inventory row updates the right-side detail. Tabs are Overview, Documents, Backup data, Activity, History and Actions. Available document exposure is distinguished from lack of permission. A device path string is never treated as browse authority.

The Overview shows raw-field interpretations without collapsing data into cache. The Backup tab explains snapshot boundaries and shared-group overlap. The Activity tab distinguishes account-level imports from live device activity. The Actions tab shows unsupported operations as unavailable or research entries, with reasons.

### Backups and file inspectors

The catalog remains useful when a file format lacks a decoder. Missing payloads remain visible as manifest entries; no preview or raw export is promised for absent bytes. Unsupported envelopes and keybags are handled before decrypted file access is offered.

A real SQLite inspector must open a read-only/isolated consistent copy with a deliberate WAL/SHM policy. “Export source” normally offers the DB with available sidecars and a manifest; the user should not mistake an incomplete set for an intact database. The prototype's viewer content is marked illustrative and does not parse actual SQLite files.

### Export review

Document/media selection creates a reviewable plan with exact items and origin. The destination shown in the prototype is illustrative and is never created. The next action opens an explicit simulation confirmation. The resulting receipt says no files were written, no deletion was performed and free device space was not remeasured.

Production behavior must handle destination conflicts, partial success, cancellation, disconnection and verification per item. An export receipt is neither permission for later deletion nor proof of restorability. The prototype does not enable deletion, restore, installation or private-data access.

### Search

The toolbar search is scoped to the current route's sample list. It filters application, file, media, conversation, contact, privacy and toolbox rows. Non-list overview and chart pages retain their explanatory context; no global search or hidden content indexing is implied. Empty results explicitly describe the view's scope.

Production search must say which sources and categories have been indexed. A missing field, missing payload, denied source or unscanned source cannot be silently represented as “no results.”

### Disconnection and partial results

Settings provides ready, partial, locked and disconnected fixture states. Live routes retain their dated observation and show a local explanatory banner. Device export review buttons disable when the source is not ready; backups and imports stay independently accessible. Source freshness must be rechecked before any real operation. No automatic destructive retry is implied.

## Required production states

| State | Required information and available path |
| --- | --- |
| Loading | Scope being read; cancellation if supported; no fabricated completion percentage |
| Ready | Observation time, source identity and available actions |
| Empty | Checked scope and actual empty result |
| Partial | Known results, missing subsets and per-item status |
| Locked / trust required | Specific needed user action; preserve completed work |
| Access denied | Which source denied access; never convert to zero count |
| Disconnected | Last observation time; stop new device reads; keep offline sources usable |
| Stale | Observation age and inability to assume current target identity |
| Password required | Selected backup identity; no plaintext password in logs |
| Unsupported format | Exact envelope/parser/decoder limit and available fallback |
| Missing payload | Manifest entry retained; raw export disabled for absent bytes |
| Cancelled | Completed, skipped and interrupted items distinguished |
| Destination conflict | Explicit preserve/rename/replace policy before write |
| Verification failure | Item-level failure, source retained, no deletion eligibility |
| Schema change | Raw fallback if available; prior decoder claim withdrawn |

Only a representative subset is interactive in this file. The full table is a production acceptance contract; it does not mean every state is implemented in the prototype.

## Accessibility and layout

Use semantic buttons, headings, table headers and input labels. Every color state has a textual label. Keyboard users can reach navigation, row-selection buttons, source chips and dialogs. The prototype supports Tab, Enter, Escape and Cmd/Ctrl+K for scoped search, plus arrow/Home/End navigation inside tab lists. Critical functions do not require hover. Reduced-motion users receive no decorative animation.

Reference viewport: 1440 × 1000 or 1536 × 1024. The sidebar compresses to labeled-title icon buttons below 1020 px. Multi-column work areas stack below 790 px. The native app should set a practical minimum window size after real SwiftUI testing; this responsive HTML is not a claim of iPhone app support.

The status strip always says the data is synthetic. No personal serial number, UDID, email, real filesystem path or conversation is included. Phone and media drawings are simple original CSS fixtures, not screenshots taken from a user's device.

## Native component mapping

| Reference component | Proposed native building block |
| --- | --- |
| Shell and sidebar | `NavigationSplitView`, route enum, toolbar |
| Data table | `Table`, stable row identity, sort/filter model |
| App card | Selected-app view model with separate source sections |
| Source drawer | Shared `SourceInspector` with field provenance |
| Generic inspector | Isolated read result with table/plist/text/hex/media renderers |
| Source badges | Semantic source kind, capture time and accessible label |
| Capability card | Shared capability state, reason and evidence link |
| Operation review | Immutable operation plan; explicit confirmation identity |
| Receipt | Per-item results, hashes, source metadata and limitations |
| Preferences | Explicit retention controls; Keychain opt-in when implemented |

The interface should consume typed source/capability/operation models. Do not infer capability from a visible button or manufacture ready data in the native app to match screenshots.

## Rendering and validation

The file exposes `window.atlasPrototype.routes`, `navigate(route)` and `getState()` for local screenshot automation. State is transient in JavaScript; nothing is written to browser storage. Query options are `theme=dark`, `mode=advanced` and `state=ready|partial|locked|disconnected`.

`validate-prototype.cjs` is an optional Playwright-based scenario check. It accepts a Chromium executable path as its first argument and an output directory as its second. It checks route rendering, absence of script failures and external network requests, app selection/filtering, source-drawer dismissal, export review/receipt simulation, connection states, theme switching and an unknown-size display. It also captures representative screens if requested. Its success is evidence about this static prototype only.

Before native acceptance, additionally verify VoiceOver, native focus/selection behavior, localized strings, dynamic sizing, real parser outputs and actual operation postconditions on permitted test fixtures. These are follow-up implementation gates, not completed work.
