# iPhone Atlas — Applications, Activity, and User-Owned Data Research

Research date: 2026-10-23 (Europe/Minsk). Status: research recommendations, not implemented capabilities. No iPhone was connected, no personal backup was opened, and no mutation was tested during this research.

## 1. Relationship to the recovered plan

The recovered v0.2 plan describes a native SwiftUI/AppKit macOS application, an open-source direction, a libimobiledevice transport candidate, and two equal product cores: inspection of a connected device and a full offline Backup Explorer. Existing app scope covers inventory, sizes, growth, and exposed documents. App deletion, backup acquisition, Wi-Fi, and an iPhone companion remain future work. This note proposes extensions without silently changing those commitments.

The strongest expansion is an **Apps Explorer with several clearly identified evidence sources**: connected-device inventory; exposed File Sharing documents; app domains in a selected backup; user-imported app exports; App Privacy Report; and, later, regional consent-based Apple APIs. These sources answer different questions and must not be blended into one supposedly complete picture of the live phone.

## 2. Evidence classification

- **Apple documented:** supported behavior of an Apple feature or API; does not automatically provide a public Mac API for that behavior.
- **Upstream documented:** a community project's own CLI/source documents the operation; device/iOS compatibility still needs a pinned-version probe.
- **Vendor demonstrated:** a commercial developer describes its own workflow; useful proof of product feasibility, not an API contract available to Atlas.
- **Proposal:** product or engineering recommendation derived from the evidence; no claim that it already works in Atlas.
- **Unverified:** not established on the user's iPhone or on a controlled device corpus.

## 3. Capability matrix

| Capability | Realistic source / access plane | What Atlas can reasonably propose | Boundary and confidence |
| --- | --- | --- | --- |
| Installed app inventory | Paired-device installation service via libimobiledevice/ideviceinstaller | Name, bundle identifier, version, user/system scope; searchable/exportable catalog | Upstream documented; returned fields and scope need a current-device probe [A1] |
| App binary footprint versus user-data footprint | `StaticDiskUsage` / `DynamicDiskUsage` attributes | Separate numeric columns, raw metadata inspector, acquisition time | Upstream explicitly documents these attributes. User-data size is not a cache measurement [A1] |
| Additional app metadata | Installation-service attributes | Show supported fields with raw values; optional signing/path fields in advanced mode | A returned path is metadata, not permission to browse that path [A1, A3] |
| App growth history | Atlas-owned snapshots | Compare device-scoped observations with compatible source, filters, interpretation and installation/placeholder state | Proposal; retain measurement provenance and distinguish version changes from data growth |
| File Sharing documents | App-enabled document sharing over trusted connection | List, preview, export; later controlled import/rename/delete | Apple supports sharing only for participating apps. This is not access to every app's sandbox [A2] |
| App data in an existing backup | Backup Manifest domains and available payloads | Link an app to its included files; generic SQLite/plist/text/hex/media views | Existing core scope; backup exclusions and app-level encryption can leave important data absent [A4] |
| Per-app backup export | Selected local backup or future acquisition | Export an app's actually present backup files and an evidence manifest | Proposal; must be labelled a partial snapshot of included content, not a complete clone |
| Per-app restore | Vendor workflows demonstrate feasibility for some apps | Separate research gate, never an automatic continuation of export | iMazing's WhatsApp guide requires target app removal before its restore workflow. This illustrates destructive prerequisites, not a universal Atlas mechanism [A8] |
| Uninstall app | Installation service; Apple UI | Future explicit action after a precise impact preview | Upstream supports uninstall; deleting an app can remove local documents. Keep outside current read-only MVP [A1, A2, A5] |
| Install/reinstall/update | Properly provisioned/signed app packages and account/distribution constraints | Later controlled package library or handoff to Apple's UI | Tool support for installing a package does not grant access to arbitrary App Store binaries. iMazing's library uses Apple Account authentication [A1, A7] |
| Offload app | iPhone Storage UI | Explain and guide the owner through offloading, then remeasure | Apple documents preservation of documents/data. No public universal Mac offload API was established in this research [A5] |
| Universal app cache cleanup | No general supported cross-app mechanism established | App-specific recipes and before/after measurements | Do not equate all documents/data or unknown storage with disposable cache [A3, A5] |
| Telegram cleanup | Telegram's own Storage Usage controls | Guided cache review, limits/retention instructions, independent remeasurement | Vendor documented. Preserve the distinction between cloud chats and device-specific Secret Chats [A9, A10] |
| Instagram cleanup | Instagram and iOS user interfaces | Explain space usage and carefully guide supported actions | Instagram confirms that uninstalling loses drafts. Never describe reinstall as harmless cache clearing [A11] |
| Telegram account archive | Owner-exported Telegram Desktop JSON/HTML | Offline import, chat/media navigation, search, export | Vendor documents export. This is a separate archive, not the phone's live app container [A12] |
| Instagram account archive | Owner export from Meta Accounts Center | Future archive import and app/account data viewer | Meta documents data export. Confirm actual current archive schemas with synthetic fixtures; account data is not the device's cached bytes [A13] |
| App privacy activity | User-exported App Privacy Report NDJSON | Sensor/data-access timeline, app-to-domain view, changes between reports | Apple documents export and schema. Collection begins after activation and covers a bounded recent interval [A14, A15] |
| Screen Time data | Optional iPhone companion with Apple capabilities and user authorization | Research a regional app-usage/activity dashboard and user-directed transfer | New non-tokenized API exists; do not repeat outdated claims that all such data is always opaque. Customer access has EU account/location conditions [A16–A19] |
| Account-level app download/install activity | Apple Account Data Transfer API | Optional future portability module, or simpler manual archive import first | Apple approval, scoped user consent, regional eligibility, asynchronous requests; separate from USB inspection [A20, A21] |
| App catalog enrichment | Apple Search/Lookup API and App Store links | Optional store metadata alongside observed installed version | Store data is not local installed size, proof of ownership, or a guarantee a version can be installed [A22, A23] |
| App actions / Shortcuts | Intents explicitly exposed by the participating app | Publish Atlas's own useful actions and offer supported handoffs | App Intents exposes an app's declared operations; it is not arbitrary control of all other apps [A24] |
| Enterprise app management | Separately enrolled MDM environment | Explicitly separate future enterprise product, if ever wanted | Enrollment method limits inventory and management. MDM is not a shortcut to reading personal messages or app usage [A25] |

## 4. The Apps Explorer product model

### 4.1 One app, multiple source-backed views

Suggested app detail navigation: **Overview / Documents / Backup Data / Activity / History / Actions**. Each view needs a source selector and capture time. An app could have a current inventory row, a week-old backup, and a separately exported account archive. The UI should state these times and origins before offering comparisons.

Proposed common identity is `(device identity, bundle identifier, source identity, capture time)`. A display name alone is unsafe as a join key. An app group may belong to several components; its files should not be duplicated into each app's totals. A missing field should remain `not returned`, `unsupported`, or `not collected`, rather than becoming zero.

Each data point should carry a raw value, normalized value and units, source adapter version, capture time, and interpretation confidence. For advanced users, **Show every returned field** is a useful way to approach the user's “everything possible” goal without guessing at unavailable data.

### 4.2 Specific, valuable questions

1. Which apps grew most since my previous measurement?
2. Did the growth coincide with an app update, or only with its user data?
3. Which apps expose files I can copy to the Mac now?
4. Which apps have files in the chosen backup, and which do not?
5. Which backup entries are missing their payloads or have an unsupported format?
6. Which app repeatedly contacts a particular domain, according to my imported privacy report?
7. Which apps accessed the camera or microphone in that report's coverage window?
8. What can I safely export before removing this app?
9. Which measurements actually changed after I followed an app's own cleanup procedure?

These are proposed product questions. Their answers must be limited to the selected evidence, with missing information visible.

### 4.3 Useful visuals

Use a sortable app table plus small growth sparklines; an app-to-domain matrix for privacy reports; and a three-column comparison of app binary footprint, user-data footprint, and included backup payload size. The three quantities should remain separate. A backup can exclude data or be older than the device measurement; it is not a second measurement of current local cache. Apple's filesystem guide excludes `Caches` and temporary files from ordinary backups and permits additional exclusions [A4].

## 5. App Privacy Report is an unusually good near-term extension

Apple documents a user-operated export via the report's Share button and an NDJSON format. Records distinguish resource access from network activity; network records include the app identifier, domain, timestamps and hit count [A15]. A native import module can work offline, without device communication or account login.

The product should show the selected report's dates, a timeline and app/domain relationships. It should retain unknown record types and fields so future Apple schema additions do not silently disappear. The source is limited: Apple describes the previous seven days, activation only from the time the user enables reporting, and exclusions for private browsing in browser apps [A14].

Interpretation must remain restrained. A contacted domain is not proof that an app stole data. Apple's network attribution can describe in-app content as well as an app's own requests; labels should use the original attribution when present [A15]. No speculative malware score is needed.

Proposed priority: immediately after the existing inventory and Backup Explorer foundations. It broadens “information about applications” with a well-defined import format while avoiding a new acquisition dependency.

## 6. Screen Time: an important 2026 correction

Apple's current documentation introduces `FamilyActivityData` and the `Family Controls App and Website Usage` entitlement on iOS/iPadOS 26.4 or later [A16, A18]. This is distinct from the older token-based privacy model. With `approvedWithDataAccess`, Apple describes access to actual installed-app bundle identifiers, website domains, and activity-category names, as well as `activityData(filteredBy:using:)` [A17].

This access has independent conditions: the appropriate capability and authorization; eligible customer region/account; and current authorization status. Apple's documentation says that customer devices must be in the EU and signed into an Apple Account with an EU country or region. Development testing is possible in other regions. Only one app at a time can hold this status; granting it elsewhere returns the previous app to an undetermined state [A17].

The device activity method is documented as an export route for another app/platform [A19]. That makes an optional Atlas companion worth investigating. It does **not** establish that a Mac-only Atlas can pull this data through USB, or that developer-build success proves production availability. Test both development and distribution, accepted and denied permission, revocation, regional unavailability, and interoperability with another authorized app.

The app's permitted purpose and actual data-transfer conditions still need a focused review against the applicable Apple terms before shipping. Until then this is a gated roadmap item, not the primary way to deliver app inventory.

## 7. App-specific work should use recipes, not a universal cleaner

### Telegram

Telegram documents cache management, per-category retention and a Storage Usage view [A9]. Its FAQ distinguishes cache clearing without logout from logout, which loses Secret Chats. It also says default system backups are disabled [A10]. Therefore an absent Telegram chat store in a Finder backup is not evidence of a broken Atlas reader. For richer account data, offer import of an owner-generated Telegram Desktop export [A12].

Proposed recipe: capture a device measurement; guide the owner to Telegram's own storage controls; let them choose their actions; capture a second measurement; display observed differences and timestamps. Do not promise that every byte of Telegram's footprint is disposable.

### Instagram

Instagram's help confirms that drafts are lost when the app is uninstalled [A11]. A reinstall workflow should therefore be a separate potentially destructive action, with draft preservation and account-access prerequisites. A user-directed Meta account export can preserve available account material, but should not be represented as a backup of all local drafts or cache [A13].

### File Sharing apps

Finder supports copying participating apps' documents in either direction and deleting shared files with confirmation. Apple specifically advises copying shared files to the computer before app deletion [A2]. Atlas can propose a more informative document workspace: large-file sorting, previews, verified exports, and later explicit actions. A File Sharing permission is not permission to access a sibling app's private `Library` or `Caches` directory [A3, A4].

## 8. Installation, libraries, and restore require a separate product gate

The upstream installation tool supports enumeration, package installation, upgrade, and uninstall [A1]. iMazing demonstrates a larger commercial workflow with a local IPA library, account authentication, downloads, updates and exports [A7]. These are different scopes. Reimplementing a complete App Store client would add account authentication, package/signature constraints, distribution compatibility, and ongoing protocol maintenance.

Recommended order: useful inventory first; supported File Sharing exports; existing-backup app exploration; only then controlled uninstall and properly supported installation. Do not promise that extracting an app's data creates a reinstallable IPA, that a purchased app is always still downloadable, or that a backup restores every local secret. Per-app restore remains a research candidate outside the adopted v0.2 implementation scope; changing that scope requires an explicit product decision. Legacy ideviceinstaller archive/restore commands are documented as non-functional on iOS 7 and later. Any future restore work needs its own test corpus and explicit data-loss analysis. The vendor's WhatsApp procedure illustrates that a restore may require removing the currently installed target app [A8].

## 9. Optional App Store and account enrichment

The Apple Search API supports software queries and country-specific storefronts; its Lookup documentation supports ID-based mapping [A22, A23]. Proposed enrichment includes a store link, publisher, observed store version, and release notes where returned. Keep retrieval optional: an offline user should still see the locally observed inventory. Record storefront and retrieval date, and avoid presenting a version mismatch as a guaranteed available update for that device.

Apple now documents a broader **Account Data Transfer API** for user-authorized portability. The listed categories include App Store transactions/downloads and app-install/push-notification activity, with region-specific scopes for the EU, UK and Japan [A20]. Third-party access requires a request reviewed by Apple [A21]. It is a plausible future source for account-level app history, separate from both live installed inventory and Screen Time. Push-notification activity metadata does not imply access to every notification's private text. A manual import workflow is the simpler first research target.

## 10. Automation and managed-device boundaries

App Intents is a route for expressing an app's own actions and entities for system experiences such as Shortcuts [A24]. Proposed Atlas actions: compare two saved measurements, export an inventory, open a selected backup, or import a report. Keep arbitrary external-app control out of that promise. User handoff to an external app is also different from embedding or automating it.

MDM should not be part of normal consumer onboarding. Apple's enrollment matrix distinguishes what each management mode can query; User Enrollment cannot query the full app list, and the listed management modes do not provide app-use frequency or access to personal messages, mail, contacts, notes and Safari history [A25]. Treat enterprise enrollment as a separate product decision.

## 11. Concrete validation backlog

| Experiment | Read-only baseline / synthetic setup | Acceptance evidence |
| --- | --- | --- |
| APP-01: Inventory fields | Pin tool version; inspect its help; query user/system/all and selected attributes on an authorized test device | Raw responses, app counts, missing/error statuses, names/versions compared with visible device state |
| APP-02: Size semantics | Synthetic test app with known bundled files, Documents, caches and temporary data; measure at controlled stages | Explain each returned metric, units, timestamps and divergence from Settings; never infer cache as unexplained remainder |
| APP-03: File Sharing boundary | One test app with File Sharing enabled and one without | Supported documents readable/exportable; unsupported/private areas accurately marked, no privilege escalation |
| APP-04: Backup linkage | Existing synthetic backup with app, app-group and plug-in domains, excluded files and missing payloads | Correct domain relationships; no double-counting; visible partial coverage; originals unchanged |
| APP-05: Export provenance | Export selected synthetic files and compare hashes | Payload bytes match; clear source and capture date; no false claim of restorable full app clone |
| APP-06: Privacy import | Synthetic NDJSON covering access intervals, network hits, unknown fields, malformed lines | Stable source-backed views; unknown values retained; bounded parsing; no network fetch during import |
| APP-07: Official app archive imports | Synthetic Telegram-format export; later sanitized Instagram-format corpus | Format/version detection, safe media paths, correct chronology, no active HTML or remote fetches |
| APP-08: Companion feasibility | Separate iOS experiment with required capabilities; no change to Mac MVP | Development versus distribution matrix, regional/permission/revocation behavior and permitted export confirmed |
| APP-09: Store lookup | Public test app IDs only, several storefronts, unavailable result | Local inventory remains usable offline; lookup state separated from local state |
| APP-10: Any future mutations | Separate disposable-device procedure after review | Exact target list, protected export where relevant, known failure behavior, post-action measurement; no current MVP mutation |

The first two experiments should settle the most important unknown before the UI promises exact per-app storage accounting. APP-06 is particularly suitable for useful implementation in parallel with transport work because it requires only explicit user-supplied files.

## 12. Suggested sequencing without replacing v0.2

1. Preserve the two existing cores: read-only live inspection and full offline Backup Explorer.
2. Make Apps Explorer a first-class navigation area, initially using inventory, growth, exposed documents, and linked backup data.
3. Add App Privacy Report import and verified export of app-related content.
4. Add official app-archive import modules, beginning with Telegram JSON, with explicit source and completeness labels.
5. Research controlled app actions, installation library, and per-app restore as independent gated projects.
6. Evaluate iPhone companion/Screen Time and Account Data Transfer only when they add value beyond the Mac/offline workflow.

## Source register

All sources below are primary: Apple documentation, original upstream documentation, or the vendor describing its own product. Search-only extracts are identified where direct rendering was blocked.

- **[A1] ideviceinstaller upstream manual** — https://github.com/libimobiledevice/ideviceinstaller/blob/master/man/ideviceinstaller.1 — full source read. Documents `list`, attributes, install, uninstall. Also upstream README https://github.com/libimobiledevice/ideviceinstaller .
- **[A2] Apple File Sharing** — https://support.apple.com/en-us/119585 — full text read; published October 6, 2026.
- **[A3] Apple runtime sandbox security** — https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web — relevant section read.
- **[A4] Apple File System Programming Guide** — https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/FileSystemProgrammingGuide/FileSystemOverview/FileSystemOverview.html — archived documentation, full relevant section read. Treat as design guidance, then test current behavior.
- **[A5] Apple storage/offload guidance** — https://support.apple.com/en-us/108429 — full text read; published October 13, 2026.
- **[A7] iMazing Manage Apps** — https://imazing.com/guides/how-to-manage-apps-without-itunes — full vendor guide read; updated June 17, 2026. Vendor capability claim, not Atlas verification.
- **[A8] iMazing WhatsApp transfer** — https://imazing.com/guides/how-to-transfer-whatsapp-from-one-iphone-to-another — primary search extract; dated September 24, 2026.
- **[A9] Telegram storage controls** — https://telegram.org/blog/hidden-media-zero-storage-profile-pics — full relevant section read; older feature announcement used for the supported workflow, not a guarantee of current UI wording.
- **[A10] Telegram FAQ** — https://telegram.org/faq — full relevant sections read; FAQ itself notes that some material may be outdated. No device test performed.
- **[A11] Instagram drafts** — https://help.instagram.com/1188360274569019/ and https://help.instagram.com/639718330257952/ — official search extracts confirm uninstall loses drafts; , ; direct Help Center fetch returned 429.
- **[A12] Telegram export** — https://telegram.org/blog/export-and-more — full relevant text read; original feature announcement August 27, 2018. Current schema still needs fixtures.
- **[A13] Meta account data export** — https://about.fb.com/news/2023/10/manage-your-information-across-apps/ — full primary search text; October 17, 2023. Current exact archive format was not validated.
- **[A14] Apple App Privacy Report** — https://support.apple.com/en-us/102188 — full text read; published December 19, 2025.
- **[A15] Apple inspecting app activity data** — https://developer.apple.com/documentation/Network/inspecting-app-activity-data?changes=_6_5 — full relevant primary text obtained through search. Canonical URL: https://developer.apple.com/documentation/network/inspecting-app-activity-data .
- **[A16] Apple FamilyActivityData** — https://developer.apple.com/documentation/familycontrols/familyactivitydata?changes=__6_1&language=objc — primary full search text; canonical page also indexed in localized Apple docs as iOS/iPadOS 26.4+ (, ).
- **[A17] Apple approvedWithDataAccess** — https://developer.apple.com/documentation/FamilyControls/AuthorizationStatus/approvedWithDataAccess?changes=__3 — full primary search text; canonical https://developer.apple.com/documentation/familycontrols/authorizationstatus/approvedwithdataaccess .
- **[A18] Apple Family Controls App and Website Usage entitlement** — https://developer.apple.com/documentation/bundleresources/entitlements/com.apple.developer.family-controls.app-and-website-usage — official indexed text; , ; iOS/iPadOS 26.4+. Direct page exposes a JS shell and markdown endpoint unsupported by the web fetcher.
- **[A19] Apple device activity export method** — https://developer.apple.com/documentation/deviceactivity/deviceactivitydata/activitydata(filteredby:using:) — official indexed extract; says export for use in another app/platform and repeats EU customer conditions. Full current method contract should be read before implementation.
- **[A20] Apple Account Data Transfer** — https://developer.apple.com/documentation/accountdatatransfer — full primary search text; expanded current official text at https://developer.apple.com/documentation/AccountDataTransfer?language=o_8 .
- **[A21] Apple portability access process** — https://developer.apple.com/support/account-data-transfer-api/ — full primary search text.
- **[A22] Apple Search API** — https://performance-partners.apple.com/search-api — full relevant text read.
- **[A23] Apple Lookup API examples** — https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html — archived primary text; updated September 19, 2017. Verify current responses before implementation.
- **[A24] Apple first app intent** — https://developer.apple.com/documentation/appintents/creating-your-first-app-intent — official indexed text. Also https://developer.apple.com/documentation/AppIntents/AppIntent .
- **[A25] Apple enrollment comparison** — https://support.apple.com/guide/deployment/enrollment-methods-for-apple-devices-dep08f54fcf6/web — full relevant table read; published January 28, 2025.

## Research limitations

No claim here is a successful test on the user's device. No production Screen Time entitlement, Account Data Transfer approval, or associated distribution behavior was obtained or tested. Several Apple Developer pages returned JavaScript shells; primary indexed text supplied the material, with exact URLs retained. Instagram's Help Center rate-limited direct fetches. No fallback browser session, credentials, real backup, or device probe was used. Unsupported full-filesystem access, universal cache cleanup, arbitrary remote app control, and guaranteed per-app restore remain excluded from product promises.
