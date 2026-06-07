# PyStack

PyStack 是培元自用的 AI coding skills 仓库雏形。它不是敏捷方法论，也不是通用项目模板；它是一个插件/skills 仓库，把 Superpowers、OpenSpec、GStack 里当前需要的能力先完整保留下来，再抽象成 PyStack 自己的 workflow。

## v0.1 原则

- 先保留三套本体：Superpowers、OpenSpec、GStack 当前都放在 `.pystack/skills/upstream/`。
- 原生 Superpowers Brainstorm 完整复制到 `.pystack/skills/superpowers-brainstorming-native/`。
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

## 使用方式

### skills.sh 官方 CLI

PyStack v0.1 不发布到 npm registry。通过 skills.sh 官方 CLI 可以安装单个 skill 到 agent 的 skill 目录：

```bash
npx skills add pli233/pystack --skill pystack-workflow
```

如果你想安装 PyStack 的所有 wrapper skills：

```bash
npx skills add pli233/pystack --skill '*'
```

查看可安装的 PyStack skills：

```bash
npx skills add pli233/pystack --list
```

默认列表会显示 PyStack wrapper skills，以及原生 Superpowers `brainstorming`。不要使用 `--full-depth --skill '*'`，除非你明确想把 `upstream/` 里的 GStack/Superpowers 原生 skill 全部安装出来。

### 完整 `.pystack` 工作区安装

如果你想要项目里出现下面这种完整结构：

```text
.pystack/
  skills/
    pystack-archive/
    pystack-brainstorm/
    pystack-openspec-change/
    pystack-qa/
    pystack-review/
    pystack-ship/
    pystack-tdd/
    pystack-workflow/
    superpowers-brainstorming-native/
    upstream/
  pystack.config.json
```

使用 GitHub npx 运行 PyStack init：

```bash
npx github:pli233/pystack init --target .
```

`pystack-workflow` 启动时会先检查 `.pystack/pystack.config.json`。如果当前仓库还没有 `.pystack`，它会要求先运行上面的 init 命令，再继续 workflow。

验证安装：

```bash
npx github:pli233/pystack verify
```

### GitHub Clone fallback

```bash
git clone https://github.com/pli233/pystack.git
cd pystack
node ./bin/pystack.js init --target /path/to/your/repo
```

### 本地开发

```bash
node ./bin/pystack.js doctor
node ./bin/pystack.js verify
node ./bin/pystack.js init --target /tmp/pystack-demo
```

## 不走 npm publish

PyStack v0.1 不发布到 npm registry。`package.json` 只用于让 `npx github:pli233/pystack` 能识别 `pystack` bin。

## 关键目录

```text
.pystack/
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
  pystack.config.json
```
