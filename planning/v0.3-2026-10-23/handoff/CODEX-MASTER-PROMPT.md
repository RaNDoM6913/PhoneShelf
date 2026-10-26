# Codex master prompt — iPhone Atlas v0.3

Copy the prompt below into a new Codex task, or ask Codex to read this entire file from the local project. It is a continuation specification, not a receipt that any product feature already works.

---

You are taking over **iPhone Atlas**, an existing planning-stage project on the owner's Mac. Work in `/Users/ivan/dev/iphone-atlas`. Talk to the owner in Russian; use clear English for code, engineering documentation, identifiers, and commits. Continue autonomously with the authorized work until the current useful milestone is complete or a concrete blocker prevents it. Do not answer with only a proposed plan.

## 1. Owner's goal and authorized work

Build a **fully free, open-source, native macOS iPhone workspace** covering as many useful workflows as feasible from iMazing, 3uTools, coconutBattery, iExplorer, AnyTrans, Reincubate iPhone Backup Extractor, and Finder/Apple Devices, with additional emphasis on app dossiers, provenance, source coverage, comparison, history, and verified exports.

All shipped product functionality should remain free: no limits on exports, records, devices, or time and no feature paywalls. Optional donations/sponsorship must not gate the core. No mandatory cloud account, external AI service, paid API, or analytics upload for local workflows. Maintainer signing/CI/testing costs are a separate concern.

The owner authorized rebuilding and improving the plan, architecture, design/mockups, local project, and development handoff. They want to continue implementation in Codex. You may inspect and edit the project, create isolated local development artifacts, implement the first coding milestone, run relevant local checks, and update working documentation/checkpoints. Preserve existing user work. Do not ask again for routine reversible implementation choices within this scope.

This instruction is not consent to access an arbitrary personal phone/backup, sign into accounts, install packages on a real iPhone, delete/restore/flash/migrate a device, change pairing/trust, buy services, publish a repository/site/release, or send messages to others. A requested feature in the roadmap is not authorization to execute it against the owner's device. Use deterministic synthetic data for this first milestone.

## 2. Inspect reality before changing it

Read applicable `AGENTS.md` instructions in the actual workspace and ancestors, the current Git status, root `START-HERE-V03.md`, and the latest local-state handoff. Do not assume this snapshot is still current; another developer may have added code since it was prepared. Keep uncommitted work and existing implementation. Do not reset, clean, stash, force push, replace project history, or mass-regenerate the tree.

The v0.3 planning package lives at:

`planning/v0.3-2026-10-23/`

Read, in this order:

1. `START-HERE-RU.md`, `MASTER-PLAN-RU.md`, `LOCAL-STATE.md`.
2. `ARCHITECTURE.md` and `IMPLEMENTATION-BACKLOG.md`.
3. `FREE-OPEN-SOURCE-POLICY.md`, `FEATURE-COVERAGE.md`, and the schema/required entries of `FEATURES.json`.
4. `design/DESIGN-SPEC.md`, `design/TOKENS.json`, and `design/PROTOTYPE.html`; inspect the rendered screens relevant to the first task.
5. `handoff/ORCHKIT-HANDOFF.md` and `handoff/ORCHKIT-TASKS.json`.
6. `validation/VALIDATION.md` for what was actually checked on the planning/prototype package.

Read older files selectively for history or technical evidence. The package also includes unchanged text copies under `research-baseline/` for portable handoff; prefer the original project research when present:

- Root `PROJECT-PLAN-RU.md`, `DEVELOPMENT-PLAN-RU.md`, `DESIGN-SPEC-RU.md`, original `mockups/` and `references/`.
- `research/2026-10-23/RESEARCH-REPORT-RU.md`.
- `research/2026-10-23/DEVICE-RESEARCH.md` and `APPLICATIONS-RESEARCH.md` for the specific source needed by your next task.
- `research/2026-10-23/MARKET-NAMING-RESEARCH.md` and v0.3 `SOURCES-COMPETITORS.md` when a competitive or naming decision matters.

The original checksums describe the original archive. Preserve historical files; write evolving implementation notes under `docs/` and checkpoints under `docs/checkpoints/`. A new assumption or scope change must be explicit rather than silently rewriting the historical record.

## 3. What is already decided

- Native macOS first: Swift, SwiftUI, AppKit as needed, Swift Concurrency and local storage.
- Two equal foundations: live-device information and independent offline Backup Explorer.
- A full accessible backup catalogue, generic SQLite/plist/text/hex/media inspectors, and raw exports remain useful without a semantic decoder.
- First full beta retains known-password encrypted backups and baseline Messages/Contacts. A smaller early build is a development preview, not a completed full beta.
- Pinned native libimobiledevice is the preferred initial transport candidate; pymobiledevice3 is research-only until separately admitted. Do not ship two backends by accident.
- RU/EN, keyboard accessibility, light/dark appearance and native layout; validate VoiceOver in an actual app later.
- Apple Silicon first. macOS 14 is a candidate floor requiring build/runtime verification, not an established compatibility promise.
- iPhone Atlas remains a working name. Phonolio/Foliodeck/Handsetry are un-cleared candidates; no automatic rebrand or domain purchase.
- All current mockup data is synthetic. A visual control is not evidence that its device operation exists.

The latest observed toolchain was Swift 6.3.3 with Command Line Tools active. `xcodebuild -version` reported that the selected developer directory was not full Xcode. Recheck this. Start useful package/core work with the available toolchain; do not silently install Xcode or switch system developer paths. If a native UI/bundle gate requires unavailable tools, finish the unaffected core work and report that specific remaining gate honestly.

## 4. Reconcile the expanded scope once, then implement

The owner asked for a broad free alternative, not a universal-access claim. Review the supplied roadmap and amend only concrete omissions, contradictions, or facts that need verification. Preserve desired difficult workflows in the catalogue with their gates. Do not spend the whole turn repeating general competitive research already supplied.

Use the common phases:

- **P0:** first fixture-based working vertical slice and feasibility proofs.
- **P1:** full read-only core with supported real/encrypted backups, generic viewers, Messages/Contacts, device/apps/storage, exposed documents and supported media export.
- **P2:** deeper decoders, official archives, privacy reports, history/comparison, battery and diagnostic interpretation.
- **P3:** admitted writes, backup creation, Wi-Fi/scheduling, media/app management and automation.
- **P4:** conditional restore/migration, firmware, mirroring, developer services, companion/account APIs, managed-device and other-platform work.
- **PARKED:** desired outcomes without a justified route, with explanation and supported alternatives where possible.

Do not move restore, arbitrary app control, firmware, or location simulation into an enabled first-release workflow because a competitor advertises it. Current technical sources, supported configurations and operation-specific tests are required.

## 5. First implementation milestone

Execute the bounded sequence in `IMPLEMENTATION-BACKLOG.md`: **A00 → A01 → A02 → B01a + O01a → A03**. Adapt to existing code if it appeared after handoff. Produce a working end-to-end development path:

1. A minimal buildable native shell (where the available toolchain supports it), source selector, catalogue/table, details and provenance inspector.
2. Shared AppDomain types for source identity/revision, observation/value status, capability/maturity, backup entry, operation plan and per-item result.
3. A deterministic synthetic unencrypted backup generator with a small valid manifest, metadata plist, text, binary/unknown entry, SQLite example, Unicode path and deliberately missing payload. Retain generation inputs and expected byte hashes.
4. Open that fixture; enumerate all manifest entries; distinguish file/directory/link and available/missing/unsupported. Show the selected source and snapshot date. Provide bounded text/hex preview.
5. Export one or several selected raw payloads to an explicitly chosen local output folder, handle collisions, verify actual output length/hash and write a useful JSON receipt.
6. Demonstrate cancellation/partial outcome and prove the source manifest and payloads were not modified.
7. Record exact build/check commands, results, useful screenshots, limitations and next task in `docs/checkpoints/`.

Avoid inert placeholders for every future package. Use the smallest module arrangement that preserves real boundaries and can grow into the proposed architecture. Keep domain logic independent of UI and transport. A Swift package can prove core behavior before a full Xcode app bundle is available.

If the native shell or app bundle cannot be built with the available toolchain, expose the same fixture → inspect → export → receipt path through a thin CLI using those shared modules. Provide its exact run command and leave native UI acceptance explicitly open; passing package tests alone does not demonstrate that complete user path.

Do not start live USB integration, real-user backup discovery, companion development, cloud login, app installation, all category decoders, or firmware within this first milestone. After it passes, recommend the concrete next backlog item based on evidence; if the current task explicitly includes further implementation, continue in bounded chunks with checkpoints.

## 6. Data and capability rules

Every displayed measurement needs source, capture/observation time, scope, raw and normalized units, value status and interpretation version. Keep these independent:

- feature maturity: planned / source documented or inspected / fixture verified / device lab verified / release verified;
- runtime availability: available / partial / requires user action / unavailable / unsupported / unknown / failed.

Unknown is not zero. Missing from one source is not deleted from the phone. App data size is not automatically cache. App-group bytes are shared and cannot be added in full to every app. A store download size is not live on-device usage. An account export is not the current phone. Exported bytes are not freed bytes.

Never promise all phone files, complete cloud originals, complete backup coverage, universal restore, universal cache cleaning, an originality certificate, or guaranteed deleted-data recovery. Do not infer causation from a version update and growth in the same period.

Preserve raw returned fields with suitable redaction; a returned path does not grant access to it. `Advanced` changes detail visibility, not permissions. Compare values only when source/metric/scope/interpretation/install-state semantics match. Maintain separate meanings for battery charge, raw capacity, cycles, and owner-recorded official health.

## 7. Source preservation and operation behavior

Open selected sources read-only. Do not checkpoint/vacuum original SQLite files or mutate backup manifests. Handle DB/WAL/SHM consistently using a private working copy when needed; `immutable` does not turn a changing database into a stable snapshot.

Bound parsing, decompression, rows, nesting, memory and runtime. Reject path traversal, absolute-path escapes, symlink escapes, ambiguous Unicode/case collisions and unsafe preview content. Never run embedded code, SQLite extensions, arbitrary object deserialization, or network requests from imported content. Process separation alone is not a demonstrated sandbox.

Source directories are scoped, immutable inputs; exported output uses staging, collision policy and independently recorded outcomes. Error or cancellation in one item must not silently mark all items successful. Source and destination must not alias.

Passwords, pairing records and user content do not belong in logs, argv, environment, version control or screenshots. Known-password support has explicit lifetime/retention controls; no password bypass/recovery feature is implied.

Future mutations use immutable plan identity, exact target selection, current capability/session checks, concrete approval, per-item postconditions, and a journal. Reconnect changes session generation. Cancellation is not rollback; unknown mutation outcomes require reconciliation. Never blindly retry delete/install/restore/flash or invent a universal undo.

## 8. Design instructions

Use the supplied prototype as a visual and interaction reference, then implement native controls appropriate to macOS. Keep the app dense enough for real information work: sidebar, master/detail, tables, restrained cards, source badges and an optional inspector. Avoid a marketing dashboard that only repeats generic metrics.

Keep one coherent selected source/device context. Backup work remains available without a connected iPhone. Explain unavailable tools. A future feature can be hidden or shown with an honest capability explanation; it must not have a fake working action.

Preserve loading/partial/empty/error/access-denied/cancelled/stale states. Status is expressed with text, not color alone. Keyboard focus and actions must work without hover. The native application must eventually pass its own localization/accessibility checks; HTML screenshot success does not establish those results.

When revising plans/mockups, save source and updated rendered artifacts. Use original assets and permitted system symbols. Do not copy proprietary competitor source/UI assets or present generated logos as licensed app icons.

## 9. Development and verification discipline

Pin external dependency revisions when admitted, inspect licenses and transitive distribution requirements, and keep a bill of materials. A README-level license statement is insufficient for a shipping decision. Do not use a restrictive research dependency as an undeclared production backend.

Run meaningful checks for the current change: manifest parsing, missing payload, source immutability, path isolation, consistent source identity, exported-byte equality, cancellation and schema fallback. Cosmetic changes do not need a duplicate test suite. Broaden testing only for an unresolved risk or required release gate.

Do not invent test results, model/usage telemetry, screenshots, compatibility or a successful app build. If only a core package was tested, say exactly that. Record hardware/OS/adapter version for future device tests. A green mockup or vendor guide is not runtime evidence.

Parallelize independent bounded work if useful, initially no more than two implementation lanes plus a coordinator. Give each lane explicit file ownership and shared contracts; do not have multiple agents edit the same file. Reuse evidence and checkpoints. Do not repeatedly read every research file or claim a particular model/usage saving without observed metadata.

## 10. Codex and OrchKit handoff

You are running as **Codex doing an owner-directed local development task**. The installed OrchKit documents a different automated worker path: fresh ordinary ChatGPT via RDC, with Codex as an optional reviewer. Do not pretend this Codex session is that path or fabricate a claim, receipt, route record or completion.

Before writing, use the real paths and returned project ID from `LOCAL-STATE.md` / `ORCHKIT-HANDOFF.md` to inspect project overview, queue, active writer and pending publication. If the project is paused with no active writer, keep it paused while doing direct Codex work. A pause does not stop an already running worker. If another writer is active, preserve its work and coordinate rather than editing its scope concurrently.

Do not change global OrchKit configuration, other registered projects, protected baselines, review/approval policy, or ledger rows. Never edit the SQLite ledger directly. Keep capability-file contents private. Do not resume queued automation in parallel with manual Codex work.

After direct Codex work, update the working checkpoint with what changed and which planned task IDs it corresponds to. Do not mark OrchKit tasks completed from that assertion. Before future automated claims, the operator must reconcile/re-admit the remaining tasks against current code and authorized checks; consult current CLI help. If no project was registered, follow the prepared handoff rather than inventing an ID.

Do not start external model reviews or paid API jobs as a side effect of this prompt. Any future review must use the selected policy and its required preflight.

## 11. Deliverables and final report

At the end of the current milestone provide:

- what works now and the exact local command/path to run it;
- the implemented user path and how it was checked;
- changed files and any deliberately revised planning decisions;
- actual test/build outcomes and important limits;
- the latest checkpoint and the concrete next task;
- explicit separation of implemented, fixture-tested, device-tested and planned items.

Keep the Russian chat update readable and focused on the result. Preserve full evidence in project files. Ask only when missing authority, unavailable access, or a material product decision truly prevents the next step; first complete unaffected authorized work and make the remaining decision concrete.

Start by inspecting current state and identifying the first unmet item of the initial sequence. Then carry it through to a useful working result.
