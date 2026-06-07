---
name: pystack-review
description: PyStack pre-OpenSpec review layer based on GStack plan/review capabilities.
---

# PyStack Review

Use this after PyStack Brainstorm or after the user provides a mature document.

This is not code review. It is a pre-OpenSpec readiness review.

Reference upstream GStack capabilities:

```text
upstream/gstack/autoplan/SKILL.md
upstream/gstack/plan-ceo-review/SKILL.md
upstream/gstack/plan-eng-review/SKILL.md
upstream/gstack/plan-design-review/SKILL.md
upstream/gstack/review/SKILL.md
```

## Review Questions

- Is the problem worth solving?
- Is the scope right for one OpenSpec change?
- Are engineering boundaries clear?
- Are risks and failure modes visible?
- Is this too complicated for the intended result?
- Is there enough agreement to formalize the OpenSpec change?

## Output

Produce a concise review decision:

```text
approved-for-openspec-change: yes/no
must-fix-before-openspec:
risks:
scope-notes:
testability-notes:
```

If approved, hand off to:

```text
pystack-openspec-change
```

