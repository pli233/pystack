---
name: pystack-openspec-change
description: PyStack wrapper for creating formal OpenSpec change artifacts after brainstorm and review.
---

# PyStack OpenSpec Change

Use this only after `pystack-review` approves the idea or mature document.

Reference upstream OpenSpec:

```text
upstream/openspec/
upstream/openspec/docs/cli.md
upstream/openspec/docs/concepts.md
upstream/openspec/bin/openspec.js
```

## Required Artifacts

Create or update:

```text
openspec/changes/<change-id>/proposal.md
openspec/changes/<change-id>/design.md
openspec/changes/<change-id>/tasks.md
openspec/changes/<change-id>/specs/<capability>/spec.md
```

## Source of Truth

OpenSpec owns:

- specs
- changes
- design
- tasks
- archive

Do not create another spec source under PyStack.

## Handoff

After the OpenSpec change exists and is coherent, hand off to:

```text
pystack-tdd
```

