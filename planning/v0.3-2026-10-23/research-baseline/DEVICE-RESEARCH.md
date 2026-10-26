# iPhone Atlas — Device Observability Research Addendum

**Research date:** 2026-10-23 (Europe/Minsk)
**Baseline:** planning package v0.2, dated 2026-10-22
**Status:** desk research and proposed validation work; no device probes or user-data acquisition performed.

## 1. Decision

Expand iPhone Atlas into a device-information workbench around its existing, equally important live-device and Backup Explorer foundations. The strongest additions are a **Device Passport**, **Connection Inspector**, **Battery History**, **Device Events**, and **Evidence Timeline**. These are product proposals, not claims that every underlying field is available on every iPhone.

Preserve the existing production direction: native SwiftUI/AppKit, a pinned libimobiledevice C adapter, and a separately bounded ImageCaptureCore adapter. Keep pymobiledevice3 as an independent P0 research/comparison tool. Its broader developer capabilities do not justify adding a second production backend or Developer Mode requirements to the ordinary consumer workflow.

The useful interpretation of “all possible information” is: collect every supported observation, explain the source and its limits, retain unknown fields for inspection, and distinguish unavailable information from a negative result. It is not a promise of unrestricted filesystem, all-app introspection, complete historical telemetry, or Apple-certified hardware diagnostics.

## 2. What changes beyond the existing plan

The recovered plan already handles backup domains, generic file viewers, storage ambiguity, app sizes, File Sharing, grouped media, crash-preserving export, and strict operation planning. This addendum does not reopen those decisions.

New proposals:

1. **Device Passport:** a human-readable identity and software dossier with expandable raw facts and a redacted shareable report.
2. **Connection Inspector:** show exactly where connection readiness fails instead of one generic “device not found” error.
3. **Battery History:** retain measurements with source, units and provenance; distinguish current charge, capacity estimate, cycles and manually recorded Apple battery-health information.
4. **Device Events:** group available crashes and diagnostic events by time, process/app and report type, while preserving the original evidence.
5. **User-provided official evidence:** accept optional user-entered repair/coverage information, explicitly marked as imported/manual rather than automatically discovered.
6. **Evidence Timeline:** join device snapshots, app changes, backups, media exports and diagnostic events by time without pretending they are one atomic scan.
7. **Capability history:** record that a metric stopped being observable after an iOS update, separately from the metric actually changing.

## 3. Access classes

Use access class and validation state as separate fields.

| Access class | Meaning | Suitable product placement |
|---|---|---|
| Apple public macOS API | A documented framework exposes the relevant operation, subject to device/OS behavior | Normal UI after physical validation |
| Community device protocol | An upstream project implements an Apple service, but this is not an Apple-supported third-party API contract | Normal UI only for validated combinations; retain raw responses and failures |
| Existing local backup | A logical snapshot already selected by the user | Backup Explorer with backup timestamp and coverage |
| User-assisted official view | The information is documented in Apple Settings or its official service website, but automated USB retrieval is unproven | Optional evidence/import workflow |
| Developer tooling | Separate developer services, transports or setup | Later expert module, separately specified |
| Managed-device API | MDM enrollment, access rights and sometimes supervision apply | Separate possible product direction, not the consumer beta |

Apple documents a trusted-host pairing relationship, unlock/passcode interaction and restrictions on when services can begin. MDM device-information queries are a different channel; their large field list is not evidence that ordinary USB software can retrieve the same fields. [S01, S15]

## 4. Capability matrix

**Evidence states used below:** “upstream” means that a relevant protocol operation is documented in a primary implementation; “official UI” means Apple documents the information for the user. Neither means the feature has passed iPhone Atlas physical tests.

| Area / proposed feature | Candidate information and source | Evidence and boundary | Recommendation |
|---|---|---|---|
| Device identity | Lockdown base values; model identifier, software version/build, device name and any returned hardware identifiers | The native API supports querying values; field availability is a probe result. Apple separately documents serial/EID/IMEI/ICCID in Settings/Finder. Do not use a display name as identity. [S03, S04, S13] | Extend D01 with a typed identity map; mask unique identifiers in ordinary exports |
| Software dossier | OS/build and other returned version values; optional locally curated model specification | A queried value and a model-catalog fact have different provenance. A model’s advertised specification is not a measurement of this individual device. [S03, S04] | Show “reported by device” versus “model specification”; preserve unknown models |
| Connection readiness | USB discovery, selected device, trust state, locked/denied/pending state, service availability | libimobiledevice distinguishes missing pairing, denied pairing, pending dialog, protected device and service restrictions. Accessory approval and trust pairing are separate user interactions. [S02, S03] | First-class Connection Inspector; actionable retry without changing security settings automatically |
| Basic power | Battery domain values if returned | Native `ideviceinfo` lists the battery domain. A domain’s existence does not guarantee a particular key/value on a particular version. [S04] | Small initial card: only observed values, no invented health percentage |
| Rich battery | GasGauge and selected IORegistry responses; candidate cycle/capacity/temperature/voltage fields | Native diagnostics supports GasGauge and IORegistry queries. Per-field meaning, units, model support and reliability remain unverified. [S05, S06] | Bounded P0, then optional Battery History |
| Apple battery health | User-confirmed maximum capacity, service recommendation and, on supported models, cycles and dates | Apple documents these in Battery Health; iPhone 15 and later with iOS 17.4+ expose additional details. This does not establish a third-party USB API. [S12] | Manual/imported evidence lane until a matching live field is validated |
| Repair history | Parts/service status from the user's official Settings view | Apple documents model-dependent Parts and Service History. This research did not establish a supported ordinary-USB retrieval API. [S14] | Optional Repair Record; do not advertise an authenticity verdict |
| AppleCare/coverage | User-entered coverage and link to official coverage lookup | Apple's supported paths include Settings and its website. A serial number is not sufficient evidence that Atlas can query coverage through a public API. [S16] | Useful external link and manual record; no silent serial-number upload |
| Storage | Device-reported capacity/available values and existing source-specific observations | Apple explicitly documents classification differences between Settings and Finder. Unknown residual is not cache. [S07] | Preserve existing design; add comparable measurement history |
| Applications | Inventory, version and optional size fields | Upstream offers size-calculation and placeholder options. A reported data size is not a cache measurement; “Hidden”/placeholder filters are not a guarantee of complete app coverage. [S09] | Existing App Explorer plus version/size history; capture filter policy |
| File Sharing | Documents made available by an eligible app | HouseArrest implementation has separate Documents/container requests and propagates device refusal. Defaults must not broaden scope. [S10] | Preserve explicit Documents-only mode and existing export model |
| Media | Enumerated camera resources, metadata and grouped exports | The existing plan already uses Apple's ImageCaptureCore route. Cloud-optimized, unavailable originals and grouped resources must retain their distinct states. [S17, S18] | Extend metadata analysis only after native catalog validation |
| Diagnostics/crashes | Available report files; normalized event metadata and original files | Upstream exposes listing/pull and also explicitly destructive/flush operations; a “diagnostic” tool is not automatically read-only. [S11] | Device Events view; bounded list/read/export allowlist |
| Profiles / management | Available profile inventory and supervision/management hints | Community implementations can query profile information. MDM's official queries depend on a managed-device relationship. [S10, S15] | Read-only “Management information” with scope; never “all settings/security verified” |
| Privacy activity | A report deliberately supplied by the user | Apple reports recent sensor/data access and contacted domains only after reporting is enabled; browser private sessions have exclusions. [S19] | Future imported-report viewer; no always-on monitoring claim |
| Hardware tests | User-assisted access to Apple's diagnostics workflow | Apple documents guided display, audio, touch, Face ID and camera tests. This is not a reusable Atlas automation API. [S20] | Guided service checklist and user-recorded results later |
| App/process performance | Developer tools or the app developer's instrumentation | MetricKit concerns the developer's own app, not universal inspection of all installed apps. iOS developer services have a separate transport story. [S21, S22] | Later developer module; exclude universal CPU/RAM/energy dashboard claims from beta |
| Wi-Fi connection | Previously established trust and supported network service path | Apple distinguishes physical pairing and subsequent Wi-Fi communication; some diagnostic services are USB-only. [S01] | Keep as independent compatibility work after USB reliability |
| Entire filesystem / all app containers | No justified ordinary consumer access route | iOS runtime security uses app sandboxing. Backup exclusions and selectively exposed services remain relevant even with trust pairing. [S18, S23] | Do not promise or simulate this capability |

## 5. Device Passport details

The proposed Passport should answer “What phone is connected, what state was observed, and how do we know?” without forcing users through raw plist keys.

Suggested sections:

- **Identity:** model label, raw model identifier, user-defined alias, software/build, capacity class and observation time. Unique IDs can be copied deliberately but remain masked in shared summaries.
- **Connection:** USB/Wi-Fi, device/session generation, current readiness, successful source checks and last refresh.
- **Power:** charge, charging state and battery measurements actually returned. Unknown values remain unknown.
- **Data coverage:** current live sources, last selected backup, accessible document providers, media catalog state and stale/missing sources.
- **History:** software/build changes, selected battery metrics, storage trends and app inventory changes.
- **Service records:** user-provided repair and coverage facts with date and source.

This is a product organization proposal. It does not require new private APIs; implement sections progressively as each source becomes validated.

Integrate these sections into the existing overview/device, application, history and diagnostics routes from v0.2. “Passport” and “Connection Inspector” describe coherent panels and tasks, not a requirement to add new top-level navigation destinations. The existing ten-screen design should not expand merely to mirror backend services.

## 6. Battery: valuable but easy to misrepresent

Separate at least four concepts in the domain model:

1. **State of charge:** a measurement of current charge.
2. **Capacity estimate:** a value produced by a particular device subsystem.
3. **Cycle count:** a counter with a source and component identity.
4. **Apple Battery Health UI value:** official user-facing assessment, possibly supplied manually until its automated source is established.

Do not silently derive an “Apple battery health” percentage by dividing two undocumented raw fields. A computed ratio can be retained as an explicitly named estimate only after its meanings and units are validated. Temperature, current and voltage also need field-specific unit/range checks; plausible numbers alone are insufficient.

Apple describes capacity as one part of battery aging and performance, affected by usage, charge state and other factors. A single raw metric should not drive a hardware-failure diagnosis. [S12, S24]

Proposed P0 evidence: repeat a snapshot across charging/unplugged states, compare against the user's own Settings view, retain the original response and backend revision, and identify unsupported fields. Treat a replaced battery or a changed component identifier as a break in the time series, not an improvement in the same battery. Keep the schema able to represent multiple battery components without asserting support for any untested device.

## 7. Important compatibility correction

Do not reuse an old statement that every iOS 17+ interaction requires a privileged tunnel. Current pymobiledevice3 documentation distinguishes ordinary lockdown services from developer services and describes automatic in-process no-root tunnels, with model/version/transport qualifications and fallback paths. Its native macOS tunnel path can contend with Apple's own `remoted` connection. [S22]

Conversely, this improvement does not justify adding developer services to Atlas's ordinary read-only workflow. Keep the native locked-down production adapter, and classify developer experiments separately.

Another explicit incompatibility: the current pymobiledevice3 diagnostics implementation treats a `MobileGestaltDeprecated` response as deprecation on iOS 17.4 and later. An old list of MobileGestalt keys is therefore not a viable promise of a current hardware inventory. [S25]

## 8. Proposed P0 probes — not executed

These are engineering experiments for a later authorized device session. They extend existing D01/D02 instead of replacing them. Native adapter calls should be preferred; CLI forms illustrate request semantics and need validation against a pinned build.

| Probe | Request / method | Required output and pass condition |
|---|---|---|
| P0-ID | Device discovery; explicit target selection; bounded base-value query | Raw response, normalized identity fields, unknown keys; no accidental selection of the first of multiple devices |
| P0-READY | Existing trusted session; locked/unlocked, denied/pending trust and disconnect cases | Distinct readiness causes; stale generation cannot publish data; first-time pairing is an explicit user action |
| P0-STORAGE | `ideviceinfo -u <selected-udid> -q com.apple.disk_usage -x` and existing AFC info path | Source/units preserved; omissions do not become zero; observations compared without forcing reconciliation |
| P0-BASIC-POWER | `ideviceinfo -u <selected-udid> -q com.apple.mobile.battery -x` | Returned keys cataloged; no universal key assumption |
| P0-BATTERY | `idevicediagnostics -u <selected-udid> diagnostics GasGauge`; selected IORegistry request only if justified | Per-field availability, unit candidates, repeated behavior and Settings comparison; explicit unsupported results |
| P0-APP-SIZES | Existing native installation-proxy inventory; separate optional size request | Duration, fields, placeholders, errors, partial results and comparability policy |
| P0-CRASH-LIST | Explicit bounded listing and keep-preserving export | Device reports retained; every expected host file accounted for; no flush/clear/erase side effects |
| P0-PROFILES | Profile list only when service permits | Inventory scope and access denial represented without enrollment or profile mutation |
| P0-SOURCE-CHANGE | Repeated snapshots around ordinary user-driven app/version/storage changes | Delta is computed only over compatible scopes; absent app is not automatically “uninstalled” |

The native tool documents `--simple` to avoid automatic pairing; read-only acquisition must explicitly distinguish a query from setup that creates a new trust relationship. Do not run unrestricted all-domain or all-service sweeps merely to fill a dashboard. The query allowlist and time/size limits are part of the probe design. [S04]

Preserve the prior crash-report cautions: native CLI behavior must be checked against the pinned source, `--keep` used when appropriate, and “no deletion” must not be confused with “no device-side change” when services flush pending reports. This research did not rerun those existing validations.

## 9. Architecture additions that fit v0.2

The following are design recommendations, not claims from external documentation.

Extend the existing `Observation` contract with:

- `sourceClass`: nativeProtocol, publicFramework, backup, userEvidence, modelCatalog.
- `semanticVersion`: version of the field interpretation, separate from the adapter's version.
- `rawKey`, `rawValueRef`, `unit`, `sizeKind` and optional component identity.
- `status`: observed, absent, denied, unsupported, malformed, stale, notRequested.
- `reportedAt` and `collectedAt` when different.
- `scopeFingerprint`: source filters and conditions relevant to comparison.
- `interpretation`: measured, reported, derived, userProvided, catalogFact.

Store redacted diagnostic metadata separately from payloads with personal data. Keep user evidence editable as a personal note, with an audit entry; it must not overwrite a live protocol result. A disagreement should remain visible.

Implement a bounded raw-information viewer for unknown keys. It should show their source and time without inventing a translation or attempting to upload them for interpretation. New decoders can promote known keys into normal UI later.

The timeline should support source-specific “before and after” views. Examples: a software update changes availability of a service; an app update coincides with growth in reported data; a backup contains an older app database than the live device. These are observations and correlations, not proof that the update caused the growth or crash.

## 10. Recommended ordering

1. **D01 expansion:** identity, connection/readiness explanations and capability provenance.
2. **D02 expansion:** source-comparable storage and application history.
3. **Battery research slice:** basic domain, then selected diagnostics; graduate only validated metrics.
4. **Device Events:** bounded crash catalog, grouping and safe export using existing acquisition rules.
5. **Passport/report UI:** compose accepted observations and redact identifiers by default.
6. **Later optional imports:** privacy reports, repair evidence and coverage notes.
7. **Independent future lanes:** Wi-Fi, companion app, developer observability, managed-device deployment and active hardware tests.

A polished Passport plus existing Backup Explorer has substantial utility without universal access claims. No source found in this research justifies “100% scanned,” automatic clearance of all caches, automatic hardware-authenticity certification, complete per-app permission inventory, or recovery of all absent/deleted data.

## 11. Source register

Sources were retrieved on 2026-10-23. GitHub branch and generated documentation URLs are moving references; engineering adoption still requires pinned commits. Statements of non-discovery mean this research did not establish an API; they are not proofs that no private/commercial method exists.

| ID | Primary source |
|---|---|
| S01 | [Apple: Physical pairing model security](https://support.apple.com/guide/security/physical-pairing-model-security-secadb5b6434/web) |
| S02 | [Apple: Wired accessories](https://support.apple.com/en-us/111806) |
| S03 | [libimobiledevice: Lockdown API](https://libimobiledevice.org/docs/libimobiledevice/latest/lockdown_8h.html) |
| S04 | [libimobiledevice: ideviceinfo source](https://github.com/libimobiledevice/libimobiledevice/blob/master/tools/ideviceinfo.c) |
| S05 | [libimobiledevice: Diagnostics Relay API](https://libimobiledevice.org/docs/libimobiledevice/latest/diagnostics__relay_8h.html) |
| S06 | [libimobiledevice: idevicediagnostics source](https://github.com/libimobiledevice/libimobiledevice/blob/master/tools/idevicediagnostics.c) |
| S07 | [Apple: iPhone storage categories](https://support.apple.com/en-us/108429) |
| S08 | [pymobiledevice3: machine-readable output](https://doronz88.github.io/pymobiledevice3/guides/machine-readable-output/) |
| S09 | [pymobiledevice3: apps CLI](https://doronz88.github.io/pymobiledevice3/cli/apps/) |
| S10 | [pymobiledevice3: app/file/profile API](https://doronz88.github.io/pymobiledevice3/api/apps-files/) |
| S11 | [pymobiledevice3: crash CLI](https://doronz88.github.io/pymobiledevice3/cli/crash/) |
| S12 | [Apple: battery information for iPhone 11 and later](https://support.apple.com/en-us/106348) |
| S13 | [Apple: serial, EID and cellular identifiers](https://support.apple.com/en-us/108037) |
| S14 | [Apple: Parts and Service History](https://support.apple.com/en-us/102658) |
| S15 | [Apple: managed-device information queries](https://support.apple.com/guide/deployment/device-information-queries-depa9e8e14a4/web) |
| S16 | [Apple: AppleCare information](https://support.apple.com/en-us/102607) |
| S17 | [Apple Developer: ImageCaptureCore](https://developer.apple.com/documentation/imagecapturecore) |
| S18 | [Apple: Backup methods and exclusions](https://support.apple.com/en-us/108771) |
| S19 | [Apple: App Privacy Report](https://support.apple.com/en-us/102188) |
| S20 | [Apple: diagnostics mode](https://support.apple.com/en-us/101944) |
| S21 | [Apple Developer: MetricKit](https://developer.apple.com/documentation/metrickit) |
| S22 | [pymobiledevice3: iOS 17+ developer-service tunnels](https://doronz88.github.io/pymobiledevice3/guides/ios17-tunnels/) |
| S23 | [Apple: runtime process security](https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web) |
| S24 | [Apple: battery and performance](https://support.apple.com/en-us/101575) |
| S25 | [pymobiledevice3: diagnostics implementation](https://github.com/doronz88/pymobiledevice3/blob/master/pymobiledevice3/services/diagnostics.py) |
| S26 | [Apple: encrypted-backup contents](https://support.apple.com/en-us/108353) |

### Retrieval limits

Some Apple Developer article bodies were JavaScript-only in the retrieval interface; their indexed primary-source descriptions support only the narrow statements attributed to them here. Raw GitHub URL retrieval failed; browsable repository source and generated upstream API documentation were used instead. No unavailable source is treated as inspected code. None of the proposed live fields, read-only operations, UI integrations or hardware claims has been physically validated during this research.
