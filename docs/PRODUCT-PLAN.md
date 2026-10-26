# PhoneShelf current product plan

2026-10-26. This working addendum supersedes the old working-name/open-naming statements and extends the hardware scope of the preserved [v0.3 plan](../planning/v0.3-2026-10-23/MASTER-PLAN-RU.md). It does not rewrite historical packages or claim implementation.

## Owner decisions and desired outcome

- Public product name: **PhoneShelf**.
- Public GitHub repository requested; **GPL-3.0-only** selected and applied. See [the ownership/license decision](LICENSING.md).
- Official shipped features remain fully free, local-first and open source.
- Collect as much supported information as possible about a specific iPhone, components, manufacturers and functional condition.

Retain the native Mac device/apps/files/media/backup workspace, adding **Hardware & Checks** inside Device. The dossier and guided check session retain sources/times for each result. Backup Explorer remains an equal foundation.

Cover board/SoC, RAM/storage, batteries, display/touch, each camera, biometrics, radios, audio, sensors and charge/ports. Distinguish device-reported data, model-reference specifications/potential suppliers, app-assisted functional observations, user confirmations and imported Apple service/diagnostic evidence.

Apple branding, component OEM, assembler, assembly country, model code, module serial and calibration/service status mean different things. An unexposed field remains unknown. Neither serial strings nor model catalogues certify the fitted part.

## Check-session flow

Select one source/device → inspect connection/trust readiness → choose an applicable model/OS/channel test profile → preview acquisition/tests and required participation → collect budgeted USB observations → optionally run companion/manual checks and import official evidence → review outcomes → export a versioned scoped report.

Keep passed, observed issue, inconclusive, skipped, unavailable and untested distinct. Coverage counts a named applicable set; it is not a universal phone-health percentage. A successful test establishes only its stated postcondition, not freedom from every repair, intermittent fault or physical damage.

## Hardware backlog extension

All entries are **planned / source researched only**. These extend old D05/D06 work and introduce a separately admitted companion lane.

| ID | Result | Depends on | Acceptance |
| --- | --- | --- | --- |
| H00 | Component-observation/check-result contracts | A01, research | Device-reported/reference/app/user/official evidence classes; source/session identity, raw property path, typed values/units, times, schema/adapter version and availability. Fixtures include missing/denied/conflicting values and multiple same-kind components. |
| H01 | Synthetic Hardware & Checks dossier/report | H00, A03 | Fixture-backed categories and source inspector; unknown vendor and unperformed tests explicit; export preserves distinctions. No original/genuine badge inferred from a serial. |
| H02 | Bounded USB acquisition feasibility | A04/A05/H00; selected test phone authorization | Pinned native adapter and exact target; read allowlist, timeout/size limits; compare supported power/storage/registry values with Settings/known evidence; locked/disconnected/unsupported/partial cases. No implicit pairing or mutating diagnostics actions. |
| H03 | Validated property catalogue/history | H02, C01/D05 | Model/build/property compatibility matrix; units and vendor mappings justified; reference facts distinct from actual device values; replacement breaks a component time series. |
| H04 | Optional iOS companion feasibility | H00/A04; separate platform/distribution decision | Public-API camera/sensor/permission probes; model/OS checks; consent/revocation and report transfer; authorized test-device evidence. No hidden jailbreak/private-entitlement requirement. |
| H05 | Interactive functional-check profiles | H00; H04 for app tests | Display/pixels/touch, each camera, audio, biometrics, motion/proximity, haptics, controls, connections and charge checks each define method, duration, pass condition, user role and inconclusive/unsupported behavior. Denied access is not broken hardware. |
| H06 | Apple history/diagnostics handoff | H00; current official requirements | Exact official status, model/OS/region and capture method; Unknown/Used/Unverified/Finish Repair remain distinct; no assumed automated Apple API or factory-originality verdict. |
| H07 | Integrated phone-condition report | H03; completed H05/H06 modules; O01 | Source/session scope, per-check outcomes, unavailable/untested coverage, private-data preview/redaction and verified export receipt; comparison only where justified. |

Coordinator-proposed H02 starting budgets: at most 12 allowlisted requests, 10 seconds/request and 60 seconds total; 8 MiB/response and 32 MiB aggregate; registry depth 32 and 50,000 visited nodes. These are engineering defaults, not measured performance. Limit hits are partial outcomes; evidence may justify a reviewed adjustment. No unbounded service/domain sweep.

The inventory adapter exposes only read operations. Pairing/trust changes, remote accounts, calibration, writes and diagnostics restart/sleep/shutdown/log removal are separate actions with their own authority. Interactive tests require participation and scoped permissions.

## Delivery order

The first code milestone remains **A00 → A01 → A02 → B01a + O01a → A03**: deterministic synthetic backup → catalogue/preview/provenance → verified export/receipt. It is an internal development preview; A03 does not close all P0 feasibility or P1 beta requirements.

Then run A04/A05 and H02 against an explicitly selected test phone. H00/H01 can progress with synthetic observations. Admit H03 fields individually as evidence arrives. H04/H05 are separate optional companion work and do not block useful Mac USB/backup capabilities.

The full beta retains known-password encrypted backups and baseline Messages/Contacts. Hardware ambitions do not silently replace them or expand the first fixture task into a device laboratory.

## Current evidence boundary

This milestone chooses the brand, renames/prepares the project, creates local Git history and adds hardware research/planning. No phone/backup was accessed, no field passed a device-lab check and no native feature was implemented. See the [research](../research/2026-10-26/HARDWARE-RESEARCH.md).
