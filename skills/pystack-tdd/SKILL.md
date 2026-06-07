---
name: pystack-tdd
description: PyStack implementation discipline based on Superpowers test-driven-development.
---

# PyStack TDD

Use this after a formal OpenSpec change exists.

Reference upstream Superpowers:

```text
.pystack/skills/upstream/superpowers/skills/test-driven-development/SKILL.md
```

## Default Cycle

```text
write failing test
-> confirm failure
-> implement minimal code
-> confirm pass
-> refactor
```

## Large Codebase Rule

For large codebases, tests can be unit, integration, CLI, or e2e depending on the change. The point is not test format; the point is executable verification before claiming completion.

## Handoff

After implementation and verification, hand off to:

```text
pystack-qa
```
