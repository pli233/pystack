---
name: pystack-archive
description: PyStack final archive layer based on OpenSpec archive.
---

# PyStack Archive

Use this immediately after `pystack-ship`.

Use installed native OpenSpec:

```text
openspec archive
openspec/changes/
openspec/specs/
```

## Archive Rule

Archive means OpenSpec archive. Do not invent a separate Stack archive.

Expected final state:

```text
openspec/changes/archive/YYYY-MM-DD-<change-id>/
openspec/specs/<capability>/
```

## Completion Rule

PyStack workflow is complete only when:

- ship has succeeded
- OpenSpec archive has succeeded
- the archive record points back to the implemented change
