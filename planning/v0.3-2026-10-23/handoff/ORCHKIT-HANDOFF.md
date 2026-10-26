# OrchKit handoff — iPhone Atlas

Observed on 2026-10-23. This records actual local setup and a prepared implementation manifest. It does not claim an OrchKit worker attempt or application milestone completed.

## Verified local installation

| Item | Observed value |
| --- | --- |
| Project root | `/Users/ivan/dev/iphone-atlas` |
| Executable | `/Users/ivan/.orchkit/runtime-main-00468b52/bin/orch` |
| State home | `/Users/ivan/.orch` |
| Returned project ID | `iphone-atlas-ee42b7d2` |
| Project dispatcher | `/Users/ivan/.orch/dispatchers/iphone-atlas-ee42b7d2.txt` |
| Profile | `safe` |
| Review | Existing safe-profile default: `risk_based`, reviewer `codex`, pre-publication placement |
| Git policy | Commit/push/force-push/reset/clean/stash disabled in OrchKit project policy |
| Git workspace | Initialized local `main`; no commit, remote or publication created |
| Previous planning files | 41 files recorded as protected at registration |
| Registered executable checks | 0; application build system does not exist yet |
| Queued tasks / active writer / pending publication | 0 / 0 / 0 at verification |
| Project pause | None; there is no admitted queue |
| Readiness | `READY` after rendering the project-scoped dispatcher |

The installed README and `docs/workflow.md` describe a fresh ordinary ChatGPT/RDC worker for each attempt. Codex is an optional reviewer in that workflow. Direct owner-directed Codex development is a separate route and must not be mislabeled as an OrchKit run.

No review process, scheduled dispatcher, external model API, device operation, or worker was started. Other projects and global configuration were not changed.

## Read-only check before any continuation

Run each command separately. Copy the actual values above; do not infer another project ID.

```sh
/Users/ivan/.orchkit/runtime-main-00468b52/bin/orch --root /Users/ivan/.orch overview --project iphone-atlas-ee42b7d2
```

```sh
/Users/ivan/.orchkit/runtime-main-00468b52/bin/orch --root /Users/ivan/.orch queue list --project iphone-atlas-ee42b7d2
```

```sh
git -C /Users/ivan/dev/iphone-atlas status --short --branch
```

Read current project instructions and `LOCAL-STATE.md` as well. A pause prevents new claims; it does not stop an existing writer or prove process inactivity. If a writer exists, preserve its scope and reconcile it before starting another writer.

## Route A — owner continues in Codex

Use `CODEX-MASTER-PROMPT.md`. Confirm the queue is still empty and no writer is active. Leave automated work unstarted while the owner works in Codex. Preserve protected historical documents and write evolving implementation notes under new `docs/` paths.

Do not claim a task as an RDC worker from this Codex session, invent a run ID, import a fake receipt, or directly modify the ledger. After coding, write a normal project checkpoint describing the real changes and their relationship to the backlog. Before later automated work, inspect/re-admit the remaining task specification against the actual repository and executable checks.

## Route B — future ordinary ChatGPT/RDC worker

`ORCHKIT-TASKS.json` is a **prepared batch manifest**, with six sequential first-slice tasks and explicit file scopes. Its format was taken from the installed CLI and source (`read_batch_manifest` / `build_batch_plan`), not guessed from another tool. It is deliberately **not enqueued**: there is no application test command to register yet, and the owner intends to continue in Codex first.

The task goals include concrete acceptance and non-goals. The batch adapter itself compiles a generic `acceptance` entry and inherits project checks; it cannot carry arbitrary `checks`, `acceptance` or `non_goals` fields in each raw batch row. Do not add unsupported fields and assume they are enforced. Use current CLI help and full plan admission when real checks are available.

Before admission:

1. Reconcile the manifest with any work already completed in Codex. Never queue it blindly over changed code.
2. Determine the actual build/package paths and executable check commands. Pin the relevant check support files and executable authority using current OrchKit schema. A receipt saying tests passed is not independent verification.
3. Separate inspection/admission from implementation if that is needed to register checks safely. Keep acceptance and non-goals in the admitted full task contract, not solely prose elsewhere.
4. Inspect current project review/approval policy. Do not disable an existing gate to make a run pass. Optional Codex review must meet its configured preflight; no automatic paid fallback.
5. Only then load the reviewed plan or use the supported batch admission command. The following is a future command, not one executed by this handoff:

```sh
/Users/ivan/.orchkit/runtime-main-00468b52/bin/orch --root /Users/ivan/.orch queue enqueue-batch iphone-atlas-ee42b7d2 /Users/ivan/dev/iphone-atlas/planning/v0.3-2026-10-23/handoff/ORCHKIT-TASKS.json
```

Inspect queue readback after admission. Start one fresh worker with the actual dispatcher. Use its returned run context/capability file, then submit, quiesce and verify according to current CLI. `RESULT_SUBMITTED` is not completion; time/context budgets do not expire the writer.

## Recorded setup detail

The project was successfully registered after initializing local Git. `queue pause-project` returned `unknown_project_queue` because no task exists in the ledger for this project. The queue was then inspected: empty, no active writer. No pause is claimed. Rendering the dispatcher resolved the only readiness attention item. This is why handoff uses an empty unstarted queue rather than a fictitious paused queue.

No commit identity, hooks, remote or global Git configuration was changed. Review settings remain the selected safe profile's defaults. Registration is not a release review, test execution, or authorization to publish.

## Context-efficient task handoff

Each attempt reads its task contract, relevant project instructions, last checkpoint and only the source research needed for that task. End with changed files, exact validation outcomes, unresolved limitations and the next step. Keep telemetry `UNKNOWN` when not observed; do not invent model choice, token savings or automatic suspension behavior.
