---
name: pystack-brainstorm
description: PyStack wrapper around the full native Superpowers Brainstorm capability.
---

# PyStack Brainstorm

This skill wraps the full native Superpowers Brainstorm capability.

The native copy is preserved at:

```text
.pystack/skills/superpowers-brainstorming-native/
```

The upstream source is also preserved at:

```text
.pystack/skills/upstream/superpowers/skills/brainstorming/
```

## Use Native Brainstorm First

Read and follow:

```text
.pystack/skills/superpowers-brainstorming-native/SKILL.md
```

Do not rewrite its process in v0.1. PyStack may add routing notes around it, but the native brainstorm capability remains intact.

## PyStack Adaptation

The output should be shaped for the PyStack workflow:

```text
problem framing
scope boundary
acceptance intent
risk notes
review seed
```

After brainstorm is complete, hand off to:

```text
pystack-review
```

## Skip Rule

Brainstorm can be skipped only when the user provides a mature document or an existing approved OpenSpec change and explicitly indicates that execution can start from it.
