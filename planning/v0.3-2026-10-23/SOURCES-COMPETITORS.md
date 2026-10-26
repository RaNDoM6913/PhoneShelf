# Competitive and feasibility sources — v0.3

**Reviewed:** 2026-10-23. Primary vendor, Apple and upstream documentation only. New pages were opened in this pass; retained references come from the project's same-day research and are labelled. No vendor product was installed or independently benchmarked. These sources support documented/advertised capabilities and constraints, not a claim that Atlas can reproduce them. Branch URLs are moving references and must be pinned before implementation.

The main matrix abbreviates these IDs. Product feature pages generally mix platforms and versions; a listed operation must not become a Mac/iOS support promise without a corresponding compatibility record. Technical routes in the plan are engineering proposals unless the source and subsequent tests establish more.

| ID | Owner / page | Evidence | Retrieval and scope |
| --- | --- | --- | --- |
| C01 | iMazing — [Device overview](https://imazing.com/guides/device-overview-in-imazing) | vendor_documentation | Opened this pass; fields are vendor documented, not independently tested. |
| C02 | iMazing — [Backup features](https://imazing.com/backup-iphone-ipad) | vendor_claim | Opened this pass; scheduling, snapshots and location claims. Do not repeat its exclusivity claim. |
| C03 | iMazing — [Photos](https://imazing.com/iphone-photos-transfer) | vendor_claim | Opened this pass; export, metadata, resource groups, write/delete and conversion claims. |
| C04 | iMazing — [Music](https://imazing.com/iphone-music-transfer) | vendor_claim | Opened this pass; music transfer product page, not proof of an Atlas protocol. |
| C05 | iMazing — [App management guide](https://imazing.com/guides/how-to-manage-apps-without-itunes) | vendor_documentation | Guide updated 2026-06-17; local app library and install/update/uninstall workflows. |
| C06 | iMazing — [iOS management](https://imazing.com/ios-management) | vendor_documentation | Opened this pass; advanced operations, backups, raw data and developer/jailbreak qualifications. |
| C07 | iMazing — [Spyware Analyzer](https://imazing.com/spyware-analyzer) | vendor_documentation | Opened this pass; indicator analysis, false positives, no removal guarantee. |
| C08 | iMazing — [Product and category directory](https://imazing.com/) | vendor_claim | Opened this pass; named categories, CLI and managed-device product families. |
| C09 | 3uTools — [Product and toolbox directory](https://www.3u.com/productsWin) | vendor_claim | Opened this pass. Lists Mac Intel/Apple Silicon downloads. Per-platform feature equality was not established. |
| C10 | coconutBattery — [Product features and FAQ](https://www.coconut-flavour.com/coconutbattery/) | vendor_documentation | Opened this pass; available advanced details vary by device. Mac SSD claims do not establish iPhone SSD statistics. |
| C11 | iExplorer — [Product page](https://macroplant.com/iexplorer) | vendor_claim | Opened this pass; deeper AFC2 access expressly refers to jailbroken devices. |
| C12 | AnyTrans — [Product directory](https://www.imobie.com/anytrans/) | vendor_claim | Opened this pass; category and transfer claims, not a compatibility benchmark. |
| C13 | AnyTrans — [Screen mirroring, recording and capture](https://www.imobie.com/anytrans/mirror-record-capture-iphone-screen.htm) | vendor_claim | Opened this pass; later format/edit sections visibly say coming soon. Do not mark those shipped. |
| C14 | AnyTrans — [iPhone migration](https://www.imobie.com/anytrans/clone-iphone.htm) | vendor_claim | Opened this pass; selective transfer and preservation claims remain vendor assertions. |
| C15 | AnyTrans — [Android migration](https://www.imobie.com/anytrans/move-android-to-iphone.htm) | vendor_claim | Opened this pass; page contains an explicit iOS 13 call-log/reminder/Safari write limitation. Do not generalize broad headlines. |
| C16 | Reincubate — [iPhone Backup Extractor and FAQ](https://reincubate.com/iphone-backup-extractor/) | vendor_documentation | Opened this pass; encrypted extraction requires password; FAQ says iCloud backup download unavailable since May 2020, distinct from live iCloud content. |
| C17 | Finder / Apple Devices — [Locate and manage backups](https://support.apple.com/en-us/108809) | apple_documentation | Opened this pass; archive, locate and delete local backups. |
| C18 | Finder — [Content synchronization](https://support.apple.com/en-us/102471) | apple_documentation | Opened this pass; supported content synchronization, not a third-party integration API. |
| T01 | Apple — [File Sharing](https://support.apple.com/en-us/119585) | apple_documentation | Retained from the same-day APPLICATIONS-RESEARCH source register; eligible apps only. |
| T02 | Apple — [Backup methods and exclusions](https://support.apple.com/en-us/108771) | apple_documentation | Retained from the same-day research; a backup is not every byte of the device. |
| T03 | Apple — [Encrypted backups](https://support.apple.com/en-us/108353) | apple_documentation | Retained from the same-day research; distinguish backup encryption and app-internal encryption. |
| T04 | libimobiledevice — [ideviceinstaller manual](https://github.com/libimobiledevice/ideviceinstaller/blob/master/man/ideviceinstaller.1) | upstream_documentation | Opened this pass and prior research; commands and attributes. Legacy app archive/restore is not functional on iOS 7+. |
| T05 | libimobiledevice — [Lockdown API](https://libimobiledevice.org/docs/libimobiledevice/latest/lockdown_8h.html) | upstream_documentation | Retained from DEVICE-RESEARCH; field availability requires exact-device tests. |
| T06 | libimobiledevice — [Diagnostics Relay API](https://libimobiledevice.org/docs/libimobiledevice/latest/diagnostics__relay_8h.html) | upstream_documentation | Retained from DEVICE-RESEARCH; operations are not a universal set of battery semantics. |
| T07 | libimobiledevice — [idevicerestore README](https://github.com/libimobiledevice/idevicerestore) | upstream_documentation | Opened this pass; signed firmware constraints; update can become erase when the archive lacks an upgrade variant. |
| T08 | Apple — [Update and restore recovery guidance](https://support.apple.com/en-us/118106) | apple_documentation | Opened this pass; user-guided supported recovery route. |
| T09 | Apple — [QuickTime device screen capture](https://support.apple.com/guide/quicktime-player/record-a-movie-qtp356b55534/mac) | apple_documentation | Opened this pass; connected device display can be recorded. Not a control API. |
| T10 | Apple — [iPhone Mirroring](https://support.apple.com/en-us/120421) | apple_documentation | Retained from same-day research; account, hardware, OS and regional requirements; not an embeddable Atlas control API. |
| T11 | Apple — [App Privacy Report](https://support.apple.com/en-us/102188) | apple_documentation | Retained from APPLICATIONS-RESEARCH; recent enabled-report coverage and private-browser exclusions. |
| T12 | Apple — [Inspecting app activity data](https://developer.apple.com/documentation/Network/inspecting-app-activity-data?changes=_6_5) | apple_documentation | Retained from indexed official documentation in same-day research; NDJSON access/network records. |
| T13 | Apple — [Family Controls data access](https://developer.apple.com/documentation/FamilyControls/AuthorizationStatus/approvedWithDataAccess?changes=__3) | apple_documentation | Retained from same-day research; EU customer requirements, new entitlement and iOS 26.4+ path. Recheck at implementation. |
| T14 | Apple — [Account Data Transfer API access](https://developer.apple.com/support/account-data-transfer-api/) | apple_documentation | Retained from same-day research; approval, consent and region-specific scope, distinct from device-local collection. |
| T15 | Telegram — [Official account export](https://telegram.org/blog/export-and-more) | vendor_documentation | Retained from same-day research; account exports via Telegram Desktop, not a current iPhone cache clone. |
| T16 | Meta — [Information export via Accounts Center](https://about.fb.com/news/2023/10/manage-your-information-across-apps/) | vendor_documentation | Retained from same-day research; selected account data, not all local drafts or cache. |
| T17 | Apple — [Parts and Service History](https://support.apple.com/en-us/102658) | apple_documentation | Retained from DEVICE-RESEARCH; official UI is not proof of ordinary-USB access. |
| T18 | Apple — [Battery information](https://support.apple.com/en-us/106348) | apple_documentation | Retained from DEVICE-RESEARCH; official Battery Health must not be relabelled from undocumented raw ratios. |
| T19 | Apple — [Device information queries for management](https://support.apple.com/guide/deployment/device-information-queries-depa9e8e14a4/web) | apple_documentation | Retained from DEVICE-RESEARCH; enrollment-dependent channel, not ordinary consumer USB. |
| T20 | pymobiledevice3 — [iOS 17+ developer-service tunnels](https://doronz88.github.io/pymobiledevice3/guides/ios17-tunnels/) | upstream_documentation | Retained from DEVICE-RESEARCH; separate developer-service path, no blanket root/tunnel claim. |
| T21 | Apple — [ImageCaptureCore](https://developer.apple.com/documentation/imagecapturecore) | apple_documentation | Retained from DEVICE-RESEARCH; selected native media route still needs capability probes. |
| T22 | Apple — [iOS runtime process security](https://support.apple.com/guide/security/security-of-runtime-process-sec15bfe098e/web) | apple_documentation | Retained from DEVICE-RESEARCH; app sandbox boundaries. |
| T23 | Apple — [Storage categories](https://support.apple.com/en-us/108429) | apple_documentation | Retained from research; Settings and Finder can categorize storage differently. |
| T24 | iMazing — [WhatsApp transfer guide](https://imazing.com/guides/how-to-transfer-whatsapp-from-one-iphone-to-another) | vendor_documentation | Retained from APPLICATIONS-RESEARCH; target app removal appears in the vendor workflow; not a public universal restore API. |
| T25 | Apple — [Diagnostics mode](https://support.apple.com/en-us/101944) | apple_documentation | Retained from DEVICE-RESEARCH; user workflow, not an Atlas automation API. |

## Local research reused

- `research/2026-10-23/RESEARCH-REPORT-RU.md`: product scope, evidence model and source links.
- `research/2026-10-23/APPLICATIONS-RESEARCH.md`: app attributes, signing, per-app restore, official exports and 2026 companion/account APIs.
- `research/2026-10-23/DEVICE-RESEARCH.md`: ordinary pairing versus developer/MDM access, battery meaning, diagnostic side effects and proposed probes.
- `research/2026-10-23/MARKET-NAMING-RESEARCH.md`: seven-product landscape, naming and positioning caveats.

These existing files are context documents, not proof that any Atlas implementation exists. The broad comparison is intentionally a bounded feature-family inventory; secondary tools, minor UI controls and historical versions may expose additional items. Add them to this register when a current primary source and a useful user outcome justify the work.
