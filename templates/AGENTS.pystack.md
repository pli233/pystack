# PyStack Agent Instructions

Use `pystack-workflow` for substantial feature work in large codebases.

Default flow:

```text
pystack-brainstorm
-> pystack-review
-> pystack-openspec-change
-> pystack-tdd
-> pystack-qa
-> pystack-ship
-> pystack-archive
```

Brainstorm may be skipped only when the user provides a mature document or an existing OpenSpec change and explicitly indicates it is ready for execution.

OpenSpec is the only spec/change/archive source of truth.

Ship is not complete until OpenSpec archive is complete.

