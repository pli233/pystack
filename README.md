# PyStack

PyStack 是培元自用的 AI coding skills 仓库雏形。它不是敏捷方法论，也不是通用项目模板；它是一个插件/skills 仓库，把 Superpowers、OpenSpec、GStack 里当前需要的能力先完整保留下来，再抽象成 PyStack 自己的 workflow。

## v0.1 原则

- 先保留三套本体：Superpowers、OpenSpec、GStack 当前都放在 `upstream/`。
- 原生 Superpowers Brainstorm 完整复制到 `skills/superpowers-brainstorming-native/`。
- PyStack 自己只做外层编排：`pystack-workflow` 是主能力，其它都是子能力。
- 当前不删减任何上游能力；先跑通完整 workflow，再做裁剪。

## 默认 Workflow

```text
pystack-brainstorm
-> pystack-review
-> pystack-openspec-change
-> pystack-tdd
-> pystack-qa
-> pystack-ship
-> pystack-archive
```

如果用户已经提供成熟文档，可以跳过 brainstorm，直接进入 review。

## npx 使用

```bash
npx @pli233/pystack init --target .
npx @pli233/pystack doctor
npx @pli233/pystack verify
```

本地开发时：

```bash
node ./bin/pystack.js doctor
node ./bin/pystack.js verify
node ./bin/pystack.js init --target /tmp/pystack-demo
```

## 关键目录

```text
skills/
  pystack-workflow/
  pystack-brainstorm/
  pystack-review/
  pystack-openspec-change/
  pystack-tdd/
  pystack-qa/
  pystack-ship/
  pystack-archive/
  superpowers-brainstorming-native/

upstream/
  superpowers/
  openspec/
  gstack/
```
