# PhoneShelf

A free, local-first macOS workspace for iPhone devices, apps, files, backups and hardware checks.

**Status: planning and research.** No native app or device collector has been implemented. The interactive prototype uses synthetic data.

PhoneShelf is the product name selected by the owner on 26 October 2026. Earlier documents use the working name **iPhone Atlas** and remain historical records.

## Start here

- [Current product plan and hardware-check roadmap](docs/PRODUCT-PLAN.md)
- [Hardware and diagnostics research, 26 October 2026](research/2026-10-26/HARDWARE-RESEARCH.md)
- [License recommendation and pending decision](docs/LICENSING.md)
- [Original implementation backlog](planning/v0.3-2026-10-23/IMPLEMENTATION-BACKLOG.md)
- [Interactive design reference: synthetic data](planning/v0.3-2026-10-23/design/PROTOTYPE.html)
- [Current checkpoint](docs/checkpoints/2026-10-26-phoneshelf-foundation.md)

The first implementation milestone remains a synthetic-backup workflow: open a source, inspect its catalogue and provenance, then export selected bytes with verification and a receipt. Hardware research expands the roadmap; it does not mark device support implemented.

## Hardware checks

The planned dossier combines separately identified evidence: values returned by a selected phone over supported USB services; dated model-reference specifications; optional companion/user functional tests; and user-provided Apple parts/service/diagnostic results.

A reported identifier or successful camera test does not certify every component as original. Missing fields remain unavailable and unperformed tests remain untested. No personal phone or backup was accessed for this research.

## Free software and ownership

All official local features are intended to remain free, without export, device-count or time paywalls. Local workflows require no cloud account or external AI service.

The proposed software license is **GPL-3.0-only**, pending the owner's decision. This proposal is not an active license grant. See [the comparison](docs/LICENSING.md) and [proposed unmodified GPL text](docs/licensing/GPL-3.0.proposed.txt). Third-party material retains its own terms.

## Historical material

The original README is preserved in [docs/history/README-2026-10-22.md](docs/history/README-2026-10-22.md) and the initial Git commit. The v0.2/v0.3 documents, research, images and checksum manifests retain their original contents. Historical hashes describe the original packages, including the original README, rather than this evolving root README.

Original input PDFs, generated PDF/ZIP deliveries and temporary research work remain preserved locally and excluded from Git. Git tracks editable planning/research sources and synthetic design assets; some historical delivery links refer to local-only files.

No application build, device compatibility, signing, notarization or release acceptance is claimed.
