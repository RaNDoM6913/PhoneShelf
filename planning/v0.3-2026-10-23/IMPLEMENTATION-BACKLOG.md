# iPhone Atlas — implementation backlog v0.3

2026-10-23 · Planning and handoff. All tasks below begin **not implemented / not validated** unless a future checkpoint links concrete evidence. Feature breadth is tracked separately in `FEATURES.json` and `FEATURE-COVERAGE.md`; a row in either file is not a shipped capability.

## Delivery rules

Preserve the v0.2 source archive and the 2026-10-23 research. This revision expands the roadmap to a free all-in-one iPhone workspace while retaining the first beta's Backup Explorer and truthful live-device baseline. Planning version v0.3 is not an application release number.

Use one coordinator for domain contracts and integration, with at most two simultaneous implementation lanes initially: backup and live device. Independent design, documentation, and fixture work can run separately when they do not edit the same files. Prefer narrow handoffs and checkpoint files over re-reading the full research on every agent turn. The actual OrchKit executable, project IDs, run state, and commands must be discovered on the owner's Mac; do not copy a guessed orchestration command from this document.

Each task ends with a working scenario, relevant validation, changed-file list, remaining limitations, and next task. Mark `sourceDocumented`, `fixtureVerified`, `deviceLabVerified`, and `releaseVerified` separately. Only test devices/data and operations explicitly authorized for that task may be used. This planning request does not authorize real-device writes, cloud-account access, publication, or destruction of existing files.

## First Codex work package: a useful native vertical slice

Start with **A00 → A01 → A02 → B01a + O01a → A03**. This package should produce working Swift code and a demonstrable fixture workflow, not another architecture-only pass. Read the authoritative handoff and inspect existing implementation before creating files; if code appeared after this plan was written, adapt it rather than replacing it.

The 2026-10-23 coordinator probe found Swift 6.3.3 Command Line Tools; `xcodebuild` reported that the active `/Library/Developer/CommandLineTools` directory is not a full Xcode installation. Refresh the actual toolchain before coding. Start package/core builds and meaningful tests with CLT; attempt the minimal native shell where supported. If full UI/app-bundle validation needs Xcode, record that specific remaining gate and demonstrate the shared reader/exporter through a thin CLI. A passing CLI/core scenario does not mark native UI acceptance done. Do not silently install Xcode or change global developer-tool configuration.

| ID | Work | Dependencies | Completion evidence |
| --- | --- | --- | --- |
| A00 | Inventory current repository, local instructions, toolchain, active runs, and existing changes; register this expanded scope and open decisions | None | Exact inventory; no competing writer; supported build command determined from actual project; original files preserved. |
| A01 | AppDomain Swift package and minimal native shell target | A00 | Core builds with current CLT; source/capability/observation/outcome types shared by readers and UI. Shell source selection/sidebar/table/inspector/demo state is built and checked where toolchain supports it; otherwise the concrete Xcode/UI gate remains open. |
| A02 | Deterministic synthetic backup fixture generator | A01 | Small complete and partial backups; XML/binary plist, SQLite, text, unknown bytes, duplicate-looking names, missing payload, Unicode paths; generator and expected content hashes retained. |
| B01a | Read fixture envelope and manifest; resolve and enumerate payloads | A01, A02 | All manifest rows visible; selected source revision/time shown; missing payload and unsupported format are distinct; bounded text/hex preview. |
| O01a | Verified single/batch raw export with receipt | A01, B01a | Exact selected payloads exported; SHA-256 and byte counts verified; collision/cancel/failure surfaced per item; source unchanged. |
| A03 | Integrate and demonstrate the first complete path | B01a, O01a | Clean package/core build; open fixture → inspect → export → verify through shared modules; one meaningful source-preservation/cancellation check; exact native UI result or blocker, screenshot if available, and concise checkpoint. |

**Do not expand the first package** into live USB, all semantic decoders, app installation, personal backups, cloud logins, firmware, or a generic plugin platform. Do not create inert stubs for every future feature. It is acceptable for P0's native UI to expose only the implemented route and a clearly labeled roadmap.

## P0 — feasibility and admission in parallel with the first slice

| ID | Work | Dependencies | Acceptance / decision |
| --- | --- | --- | --- |
| A04 | Dependency and distribution bill of materials | A00 | Pin proposed commits/versions and transitive dependencies; identify licenses/notices, binary origin and architecture; demonstrate candidate build/loading; no shipping decision from a README alone. |
| A05 | Native transport and helper feasibility spike | A01, A04; separately authorized test phone if used | Discovery/trust/readiness/one read-only observation demonstrated or exact blocker recorded; system usbmuxd retained; XPC/sandbox access assumptions tested. |
| A06 | Encrypted-backup and semantic-schema feasibility | A02 | Known-password fixture or explicitly permitted test corpus; cryptographic and schema support boundaries documented; unsupported paths fail clearly. |

P0 exit is an evidence decision, not the absence of TODO comments. If a transport route is blocked, the backup development preview can progress with that limitation stated.

## P1 — first complete read-only core

This phase retains the v0.2 full-beta requirements: supported unencrypted and known-password encrypted backups, generic file access, baseline Messages/Contacts, live inventory/storage, exposed documents, and supported media export. An earlier subset must be named a development preview rather than “full beta complete.”

| ID | Work | Dependencies | Acceptance / material negative cases |
| --- | --- | --- | --- |
| B01 | Harden supported real backup envelope, manifest and resolver | B01a, A04 | Stable source revision; incomplete backup recognized; all supported rows enumerated; malformed manifest, missing payload, traversal/symlink/Unicode collisions and changing source handled without source modification. |
| B02 | Known-password encrypted backup support | B01, A06 | Correct known password opens supported fixtures and exports expected bytes; wrong password/corruption/unknown scheme distinguished where possible; no password in logs/argv; bounded plaintext lifetime. |
| B03 | Generic inspectors and full catalogue search | B01, B02, O01 | Text/hex/plist/SQLite/media inspection; unknown format remains raw-exportable; consistent private DB/WAL handling; cancellation and memory bounds; parser has no unintended network/file access. |
| B04 | Baseline Messages and Contacts | B03, A06 | Supported schema probes; conversation/contact views; missing attachments explicit; searchable and exportable; unknown schema falls back; unencrypted/encrypted variants covered where applicable. |
| D01 | Production native session/capability foundation | A05 | Identity, USB disconnect/reconnect generations, trust and lock states, no ambiguous device selection; unavailable service does not block independent views. |
| D02 | Device Passport, app inventory and storage observations | D01 | Returned fields and missing reasons visible; raw values/units preserved; `StaticDiskUsage`/`DynamicDiskUsage` semantics tested with a controlled app; no app-group double counting or cache inference. |
| D03 | Participating app documents and bounded diagnostic export | D01, O01 | Correct File Sharing scope; verified export; private folders not implied; each diagnostic tool checked for mover/flush/delete behavior before being admitted. |
| D04 | Media catalogue and full resource-group export | D01, O01 | Selected camera-device identity proven; original/thumbnail/cloud gaps labeled; Live Photo resource grouping; cancellation/disconnect do not misreport completion. |
| O01 | Shared operation planner, journal and export engine | O01a | Immutable selection/source binding, preconditions, staged output, receipts, failure/cancel/resume behavior and per-item truth; P1 command allowlist is read/export only. |
| C01 | Snapshot catalogue and comparable basic differences | B01, D02 | Separate source kinds and dates; equal metric definitions only; missing ≠ zero/deleted; adapter-version changes invalidate or explain comparability. |
| R01 | Full-beta release admission | B01–B04, D01–D04, O01, C01, A04 | Actual bundle compatibility matrix; signed/notarized distribution procedure ready; RU/EN, keyboard/VoiceOver, privacy/offline checks, clean-environment launch, source preservation and large-source bounds. |

`B03` may develop against unencrypted fixtures before B02 finishes, but full P1 acceptance includes the supported encrypted path. D04 supersedes the old plan's D03 media label; old D02 is split into D02/D03 to keep storage and document acquisition reviewable.

## P2 — depth, imports, history, and diagnosis

| ID | Work | Dependencies | Acceptance / useful outcome |
| --- | --- | --- | --- |
| B05 | Notes, Safari, calendar/reminders and calls, one decoder at a time | B03, B04 | Each schema/version has fixtures and raw provenance; locked/encrypted/absent values remain explicit; time-zone and account-origin semantics verified. |
| B06 | App domains, shared groups and selected app decoders | B03, D02 | Evidence-backed joins; shared bytes counted once; unknown app data remains accessible; no universal messenger support claim. |
| B07 | Media metadata and search across selected backups | B03, D04 | Originals versus derivatives, grouped resources, scoped search and duplicate evidence; duplicate discovery does not delete anything. |
| P01 | App Privacy Report import | A01, O01 | Bounded NDJSON; unknown record retention; correct interval and attribution; overlap handling; offline timeline/app-domain view without speculative threat scoring. |
| P02 | Telegram Desktop JSON archive import | A01, O01 | Account-source identity, version/schema detection, safe media paths, escaped text, missing media and chronology; no inference that archive equals local iPhone state. |
| P03 | Meta/other official export import adapters | P02 framework | Explicit supported formats and corpus; unknown layouts preserved/rejected with explanation; no promise to preserve app drafts or caches. |
| P04 | Optional App Store catalogue enrichment | D02 | Storefront/retrieval time, missing/unavailable results, offline continuity; remote version is not a guarantee of update eligibility or ownership. |
| C02 | Semantic comparison, app growth and evidence timeline | C01, relevant decoders/imports | Comparable keys and source intervals; reinstall/offload/placeholder states; app update correlation labeled as correlation; no overlapping totals. |
| D05 | Battery history and expanded Device Passport | D02 | Source-specific units, charge/capacity/cycles separated; official health/parts history may be manual evidence; no universal authenticity or replacement verdict. |
| D06 | Bounded diagnostics and troubleshooting reports | D03 | Reviewed acquisition side effects, redacted preview/export, no raw-secret logs; only demonstrated fields shown as device facts. |
| R02 | Rich-data free release | Completed selected P2 modules | Each included module meets its own gate; unfinished modules remain disabled/absent with honest scope; migration and source-compatibility checks for new schema. |

P2 is a sequence of useful releases, not a single giant gate requiring every decoder. Prioritize privacy import and app history alongside high-demand decoders, using actual user feedback.

## P3 — controlled management and automation

These tasks are research/design-authorized now; testing mutations on real devices requires a separately scoped user-approved test procedure. Do not treat a planning checkmark as that permission.

| ID | Work | Dependencies | Admission / acceptance |
| --- | --- | --- | --- |
| O02 | Mutation engine admission | O01, D01 | Exact plan digest, consent invalidation, per-item postconditions, cancellation semantics, crash journal, reconnect reconciliation, no blind retry; disposable-target tests first. |
| M01 | New local backups | B01, B02, O02 | Supported acquisition route, space estimation, progress/cancel, lock/disconnect behavior, complete-status verification, immutable snapshot/retention model; selected device only. |
| M02 | Wi-Fi discovery and background scheduling | D01, M01 | Explicit setup, pairing scope, reconnect behavior, no always-on claim for an unavailable phone; launch/sleep/network/partial-backup conditions; visible schedule and local history. |
| M03 | File Sharing upload/rename/delete | D03, O02 | Individual operations admitted separately; exact target scope; export prerequisite where appropriate; collision, partial write and disconnect verification. |
| M04 | Supported media management actions | D04, O02 | Source/resource-group semantics proven; cloud effects and album limitations understood; exact selection and post-action observation. |
| M05 | App uninstall and valid-package install/update | D02, O02 | App state/signature/install constraints demonstrated; drafts/data-loss explained; no promise that arbitrary IPA, old app version or backup payload is installable. |
| M06 | Music/ringtone/book/file transfer routes | O02, relevant adapters | Rights, destination support, metadata and format behavior verified; existing media is not silently replaced; no DRM bypass. |
| M07 | Host backup retention and removal | M01, O02 | Immutable backup IDs and exact host paths; in-use/export references checked; no removal outside reviewed set; deletion does not affect unrelated user files. |
| M08 | Shortcuts/CLI automation of admitted actions | O01, completed relevant modules | Same contracts/gates as UI; noninteractive destructive actions require an explicitly supported policy, never a hidden confirmation bypass; logs redact sensitive data. |
| R03 | Management release | Completed admitted P3 modules | Operation-specific device/build matrix and recovery evidence included; an unready delete/restore route cannot block safe read-only availability or silently become enabled. |

## P4 — conditional research projects

| ID | Desired workflow | Proof needed before implementation admission |
| --- | --- | --- |
| X01 | Full-device restore and migration | Supported backup/target compatibility, current protocol, preconditions, destructive impact, setup/activation behavior, backup validation and recovery procedure on disposable devices. |
| X02 | Selected app/WhatsApp restore and application library | Valid current route, signing/account prerequisites, target-app data effects, schema/version compatibility and consent; legacy ideviceinstaller archive/restore is not accepted as proof. |
| X03 | Firmware download/update/recovery | Official image provenance, device/build/signing eligibility, update-versus-erase semantics, failure recovery, legal redistribution terms; no downgrade/activation-lock bypass promise. |
| X04 | Developer tools, location simulation, logs, screenshots | Exact developer prerequisites, permitted use, version-specific service/tunnel behavior and cleanup; separate from normal USB inventory and no automatic Developer Mode changes. |
| X05 | Mirroring and remote interaction | Documented supported acquisition/integration route and current regional/device limits; launching Apple's supported app is distinct from an Atlas reimplementation. |
| X06 | Optional iPhone companion / activity export | Current entitlement, customer-region eligibility, intended purpose, approval, distribution and revocation behavior; development success alone insufficient. |
| X07 | Account Data Transfer and optional cloud sources | Current approval/consent/region/scope requirements; provenance, asynchronous job model, retention, account-wide meaning; no private endpoint scraping assumed. |
| X08 | Managed-device fleet functionality | Separate enterprise product decision, explicit enrollment and admin scope, enrollment-type capability matrix; never consumer onboarding as a workaround. |
| X09 | Health, keychain, forensic remnants and advanced artifact families | Source availability, data-protection constraints, interpretation and privacy model, valid corpus; no password recovery/bypass or “recover everything deleted” claim. |
| X10 | Windows/Linux frontends | Proven portable core boundaries, equivalent safe transports, new distribution/UX/compatibility matrix; no promise from a cross-platform dependency alone. |

## Parked outcomes and honest alternatives

Universal private-container browsing, full phone/NAND/APFS extraction without an appropriate supported acquisition, arbitrary universal cache clearing, account/password/Activation Lock bypass, guaranteed recovery of deleted data, unsigned downgrade/install, automatic app offload through an unproven Mac API, and a device authenticity certificate from sparse metadata remain parked. Preserve the intent in the feature catalogue with the reason and any supported alternative: owner exports, in-app storage instructions, official restore/mirroring handoff, or a limited source-specific inspector.

## Acceptance evidence format

For each completed task, record: scope and task/feature IDs; exact source/adapter commits; host/toolchain; fixture or authorized device/build; command or UI scenario; observed result; meaningful failure cases; source/output hashes where relevant; screenshots when useful; unresolved limitations; next task. Keep evidence concise and redact user identifiers.

A final handoff states **implemented / verified / documented only / blocked** separately. It must not claim a library was tested because documentation was read, a mockup works because it looks plausible, or a feature shipped because a backlog row exists.
