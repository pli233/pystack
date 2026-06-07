---
name: pystack-qa
description: PyStack QA layer based on GStack QA skills.
---

# PyStack QA

Use this after implementation passes its TDD checks.

Reference upstream GStack:

```text
.pystack/skills/upstream/gstack/qa/SKILL.md
.pystack/skills/upstream/gstack/qa-only/SKILL.md
```

## QA Scope

- Verify the user-facing acceptance criteria.
- Run browser checks for frontend work.
- Run CLI/API checks for non-frontend work.
- Capture evidence in the workflow notes or OpenSpec change.

## Handoff

If QA passes, hand off to:

```text
pystack-ship
```
