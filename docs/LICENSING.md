# PhoneShelf licensing decision

2026-10-26. **Status: recommendation awaiting owner selection.** This document does not apply a project license.

## Recommendation

Use **GNU GPL version 3 only**, SPDX identifier `GPL-3.0-only`, for original PhoneShelf software and accompanying original documentation. It matches the goal of a public free project whose distributed covered derivatives remain open and preserve copyright/license notices.

A license grants permissions; it does not itself transfer the rights the owner holds. The notice can identify the existing public author identity, `RaNDoM6913`. Contributors retain rights in their contributions unless separately agreed; no assignment or copyright registration is asserted.

## Comparison

| Question | GPL-3.0-only | MIT |
| --- | --- | --- |
| Preserve the rights and copyright notices you hold? | Yes. | Yes. |
| Permit use, modification and redistribution? | Yes, under its terms. | Yes, under its terms. |
| Require corresponding source when distributing a covered modified/combined work? | Yes, within GPL scope/distribution rules. Private changes need not be published merely because they exist. | No; downstream versions may be proprietary. |
| Permit commercial use and charging for copies? | Yes. | Yes. |
| Control every separate work, fork or use of an idea? | No. | No. |

Sources: [GNU GPL FAQ](https://www.gnu.org/licenses/gpl-faq.en.html), [GPLv3 text](https://choosealicense.com/licenses/gpl-3.0/), [MIT text](https://choosealicense.com/licenses/mit/).

The official PhoneShelf distribution can remain free under either license. Neither prevents others from charging for a permitted copy. A noncommercial-only restriction would change the open-source objective. Software licensing does not automatically grant rights in a product name/logo; copyright attribution, trademarks and endorsement remain separate. No PhoneShelf trademark registration or legal name clearance is asserted.

## Concrete proposed grant

[licensing/GPL-3.0.proposed.txt](licensing/GPL-3.0.proposed.txt) contains unmodified GPLv3 text retrieved through GitHub's `licenses/gpl-3.0` API. The project notice determines whether later GPL versions are allowed. This recommendation is **version 3 only**.

If selected, put that text in root `LICENSE` and accompany original material with:

```text
PhoneShelf
Copyright (C) 2026 RaNDoM6913 and contributors

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, version 3 only.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
```

The grant covers original material the author/contributors are entitled to license. It does not relicense Apple/upstream material, externally supplied PDFs, trademarks, standard license texts or unowned assets. Preserve third-party notices.

## Dependencies and distribution

No production dependency is admitted. libimobiledevice is the native transport candidate; different parts use GPL/LGPL terms. At A04 verify file-level licenses, pinned revisions, transitive dependencies, linking and bundled tools. This recommendation is not a completed distribution audit. [COPYING](https://github.com/libimobiledevice/libimobiledevice/blob/fa0f79190142bc309307967c058f89c1b36eb6b8/COPYING), [COPYING.LESSER](https://github.com/libimobiledevice/libimobiledevice/blob/fa0f79190142bc309307967c058f89c1b36eb6b8/COPYING.LESSER), [GNU compatibility FAQ](https://www.gnu.org/licenses/gpl-faq.en.html#WhatDoesCompatMean).

An optional iOS companion is a separate future deliverable. Review its distribution channel and license compatibility before adopting code or App Store terms. The Mac license decision does not automatically establish future App Store distribution rights.

## Publication

The owner requests a public GitHub repository. Prepare/review the contents, resolve the material license choice, then apply it and publish. A public repository without a selected license is not a completed open-source release. [GitHub licensing guidance](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository).
