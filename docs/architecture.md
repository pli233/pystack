# PyStack v0.1 Architecture

## 定位

PyStack 是一个 skills/plugin 仓库。它的目标用户是培元自己，目标场景是大型代码仓库中的 AI coding workflow。

它不是要重新发明 Superpowers、OpenSpec 或 GStack，而是先完整保留这三套能力，然后在外层抽象出 PyStack 自己的技能路由和 workflow。

## 能力抽象

```text
PyStackWorkflow        主流程
PyStackBrainstorm      包装原生 Superpowers Brainstorm
PyStackReview          包装 GStack review/autoplan
PyStackOpenSpecChange  包装 OpenSpec change/proposal/design/tasks
PyStackTDD             包装 Superpowers TDD
PyStackQA              包装 GStack QA
PyStackShip            包装 GStack ship
PyStackArchive         包装 OpenSpec archive
```

## 默认流程

```text
Idea or mature doc
-> Brainstorm decision
-> GStack-style review
-> OpenSpec change
-> Superpowers TDD
-> GStack QA
-> GStack ship
-> OpenSpec archive
```

## Brainstorm 策略

Brainstorm 默认要被考虑，但不强制每次都执行。

执行条件：

- 用户只有一个模糊功能想法。
- 新功能影响多个模块。
- 需求没有明确边界、风险或验收标准。

跳过条件：

- 用户提供了成熟文档，并明确说 `start with this`。
- 已经存在可执行 OpenSpec change。
- 当前任务只是继续执行既有计划。

## Review 先于 OpenSpec Change 的含义

这里的 `pystack-review` 不是代码 review，而是 GStack 风格的 plan/reality review。

它读取 Brainstorm 输出或用户成熟文档，模拟“别人是否会有意见”：

- 产品价值有没有问题。
- 工程边界有没有问题。
- 是否遗漏风险。
- 是否过度复杂。
- 是否适合进入正式 OpenSpec change。

只有 everyone is agreed，才生成正式 OpenSpec change。

## OpenSpec 保留范围

v0.1 保留全部 OpenSpec 本体，包括 CLI、command、spec/change/archive 结构。当前不做删减。

最终归档只使用 OpenSpec archive，不发明额外 Stack archive。

## Ship / Archive

`pystack-ship` 负责发布动作，来源是 GStack ship。

`pystack-archive` 是发布后的强制收口，来源是 OpenSpec archive。

发布成功但没有 OpenSpec archive，视为 workflow 未完成。

