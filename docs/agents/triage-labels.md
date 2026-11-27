# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker | Meaning |
| -------------------------- | -------------------- | ------- |
| `needs-triage`             | `검토 대기`          | Maintainer needs to evaluate this issue |
| `needs-info`               | `정보 필요`          | Waiting on more information |
| `ready-for-agent`          | `Codex 구현`         | Fully specified, no Figma or hands-on testing needed. Codex implements, Claude reviews |
| `ready-for-human`          | `Claude 구현`        | Needs Figma designs or human judgement. A human-driven Claude session implements, Codex reviews |
| `wontfix`                  | `취소`               | Will not be actioned |

Issue type labels: `bug` → `버그`, `enhancement` → `기능`.

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.
