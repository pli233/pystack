# PyStack Workflow

## 主流程

1. `pystack-brainstorm`
2. `pystack-review`
3. `pystack-openspec-change`
4. `pystack-tdd`
5. `pystack-qa`
6. `pystack-ship`
7. `pystack-archive`

## 入口规则

如果用户输入的是一个想法：

```text
Use pystack-workflow.
```

Workflow 先判断是否需要 brainstorm。

如果用户输入的是成熟文档：

```text
Start with this document.
```

Workflow 可以跳过 brainstorm，直接进入 `pystack-review`。

## 成功标准

输入一个功能想法或成熟文档后，系统能完成：

```text
brainstorm or skip
-> review
-> OpenSpec change
-> TDD implementation
-> QA
-> ship
-> OpenSpec archive
```

