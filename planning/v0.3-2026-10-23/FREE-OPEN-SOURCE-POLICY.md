# iPhone Atlas — free and open-source product policy

2026-10-23 · Proposed policy for the expanded project. The product decision is a free local app; this file does not select a final public brand, publish a repository, apply a software license to third-party work, or authorize expenditure.

## 1. What users should receive free

Every released Atlas feature should be available without an Atlas subscription, activation server, trial timeout, export quota, device-count restriction, watermark, or paid “Pro” unlock. This includes deep backup inspection, supported decoders, exports, device/app information, history and admitted management operations. A capability unavailable because of iOS, permissions, region, missing data or unfinished engineering must say so; it must not look like an upsell.

The core app works locally and offline with user-selected sources. No mandatory Atlas account, cloud upload, advertising SDK, remote AI dependency, or collection of personal phone data is required. Optional public catalogues or separately approved integrations explain what they send and remain independently switchable. An online service's limits cannot disable an already available offline backup reader.

Publish source, build instructions, dependency versions, license notices, compatibility evidence, release notes, known limitations, and the code needed for the released features. Optional donations or sponsorship can support maintenance; feature access does not depend on them. A paid support service, if ever considered, is a separate business decision and cannot redefine this feature policy silently.

## 2. “Free to use” and maintenance costs

Free functionality does not mean zero development or distribution cost. The current Apple Developer Program page lists USD 99 per membership year, or local currency where offered [F1]. Apple's Developer ID documentation connects certificate generation to the Program's Account Holder and describes signing/hardened-runtime distribution steps [F2]. These are maintainer-side considerations; they do not justify adding an export paywall.

Other possible costs are build infrastructure, test hardware, storage/bandwidth, domain registration, and sustained compatibility work. Prefer local computation, static release assets, reproducible build instructions, and an optional sponsorship budget. Do not enroll, buy a domain, purchase a certificate, or commit to a paid service during planning. Eligible fee waivers or existing memberships can be investigated separately; none is assumed here.

## 3. First-party and dependency licensing

Retain the previous plan's **MIT candidate for original code**, subject to the actual repository license and a pinned dependency audit. If a valid license already exists, do not replace it without an explicit decision. Selecting an open-source license is separate from whether a release costs money. This policy is an engineering checklist, not a legal opinion about a particular combined distribution.

The libimobiledevice README currently identifies LGPL v2.1 [F3]. Audit the exact files, tools, linked libraries, bundled binaries and transitive components rather than applying one repository-level badge to everything. Preserve notices and license text, document modifications, and determine the actual obligations of the chosen linkage and distribution arrangement before a release.

pymobiledevice3's current project metadata declares `GPL-3.0-or-later` [F4]. It remains a research tool by default. Do not copy its code into MIT first-party files or assume that launching it in another process automatically removes distribution obligations. Bundling it needs a specific architecture/license decision and the corresponding materials. Research use does not itself commit the app to shipping a Python runtime.

For each dependency record: name, upstream URL, exact version/commit, license expression and file evidence, purpose, direct/transitive status, local modifications, build flags, binary origin, redistribution requirements, notices/source location, and update owner. Keep a bill of materials in the build output. Recheck when changing revisions or adding a codec, parser, signing component, cloud client or updater.

## 4. Reimplement workflows with independent assets

Use competitors' public feature descriptions to identify user needs. Create original UI, copy, icons, code, fixtures and documentation. Do not redistribute their application binaries, screenshots, databases, firmware caches, paid app packages, extracted proprietary code or other assets merely because Atlas is free. Preserve relevant upstream notices in legitimately reused open-source components.

Keep “iPhone Atlas” as the working name until naming and availability checks are completed. Use accurate compatibility descriptions and avoid suggesting Apple or competitor endorsement. A search that finds no similar name is not a trademark or domain clearance. The separate naming research remains the decision record.

## 5. Distribution and privacy defaults

The proposed initial distribution is a downloadable macOS application with source/build instructions. Developer ID signing, notarization and clean-machine launch verification are release tasks, not completed facts. Direct distribution does not remove license, platform or entitlement conditions. Decide Mac App Store distribution separately if its rules and the actual architecture fit.

Release artifacts include integrity hashes and a dependency manifest. Updates, if introduced, verify the delivered artifact and retain a visible version history. Do not recommend disabling Gatekeeper or other system protections as routine installation instructions. Local development builds are clearly distinguished from public signed releases.

Telemetry is off by default; preferably omit it from the initial implementation. Diagnostics are generated locally, redacted, previewed and exported only at the user's request. Real user backups, messages, secrets and pairing records never become test fixtures or committed research artifacts. Any future cloud/AI feature is opt-in with explicit scope and a useful offline alternative where possible.

## 6. Release promise and wording

Use: **“A free, open-source workspace for supported iPhone data, applications and backups, with clear sources and verified exports.”**

Describe each feature's exact supported source, configuration and limitations. Avoid “all data from any iPhone,” “recover everything,” “unlimited cache cleaning,” “guaranteed authenticity,” or “complete replacement for every competitor.” A feature catalogue can be ambitious while released behavior remains specific and demonstrable.

## Sources checked 2026-10-23

- **F1** Apple Developer Program membership details, pricing section: https://developer.apple.com/programs/whats-included/ .
- **F2** Apple, signing Mac software with Developer ID: https://developer.apple.com/developer-id/ .
- **F3** libimobiledevice README, license section: https://github.com/libimobiledevice/libimobiledevice/blob/master/README.md .
- **F4** pymobiledevice3 project metadata: https://github.com/doronz88/pymobiledevice3/blob/master/pyproject.toml .

Moving source URLs support the planning facts above; an actual release must pin the exact revisions and review the complete applicable texts.
