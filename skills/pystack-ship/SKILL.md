---
name: pystack-ship
description: PyStack ship layer based on GStack ship, followed by OpenSpec archive.
---

# PyStack Ship

Use this after QA passes.

Reference upstream GStack:

```text
.pystack/skills/upstream/gstack/ship/SKILL.md
```

## Ship Rule

Ship prepares the release, PR, changelog, or publish step. It does not complete the PyStack workflow by itself.

After ship succeeds, immediately hand off to:

```text
pystack-archive
```

## Hard Rule

Ship without OpenSpec archive is incomplete.
