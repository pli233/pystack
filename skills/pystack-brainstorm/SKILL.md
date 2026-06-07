---
name: pystack-brainstorm
description: PyStack wrapper around the full native Superpowers Brainstorm capability.
---

# PyStack Brainstorm

This skill wraps the full native Superpowers Brainstorm capability.

## Use Native Brainstorm First

Use the installed native Superpowers brainstorming skill/process. Do not use a PyStack-bundled copy; PyStack does not vendor Superpowers.

Do not rewrite the native brainstorming process. PyStack may add routing notes around it, but the native brainstorm capability remains intact.

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
