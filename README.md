# PyStack

PyStack 是培元自用的 AI coding workflow skills 仓库。它不是 Superpowers、OpenSpec、GStack 的二次打包，也不在项目里 vendored 这三套本体。

PyStack 的定位只有一个：在你已经安装并初始化好原生 Superpowers、GStack、OpenSpec 之后，把它们串成一个统一 workflow。

## 安装顺序

### 1. 安装 Superpowers

Superpowers 按 agent/harness 单独安装。

Codex CLI / Codex App：

```text
/plugins
```

然后搜索并安装 `superpowers`。

Claude Code：

```text
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

### 2. 安装 GStack

Codex 推荐：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/gstack
cd ~/gstack
./setup --host codex
```

Claude Code 推荐：

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

如果你要在当前仓库启用 GStack team mode，再按 GStack 原生说明运行它自己的 team setup。

### 3. 安装并初始化 OpenSpec

```bash
npm install -g @fission-ai/openspec@latest
openspec --version
openspec init
```

OpenSpec 是唯一的 spec/change/archive 真相源。PyStack 不创建第二套 archive。

### 4. 最后安装 PyStack skills

```bash
npx skills add pli233/pystack --skill '*'
```

只装入口 workflow 也可以：

```bash
npx skills add pli233/pystack --skill pystack-workflow
```

查看可安装 skills：

```bash
npx skills add pli233/pystack --list
```

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

## PyStack 不做什么

- 不复制 Superpowers 本体。
- 不复制 GStack 本体。
- 不复制 OpenSpec 本体。
- 不生成 `.pystack/` 工作区。
- 不替代 `openspec init`。
- 不发明 Stack archive。

## 本地开发

```bash
node ./bin/pystack.js doctor
node ./bin/pystack.js verify
```

`pystack init` 已废弃；新模型下没有项目内 `.pystack` 初始化步骤。

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
```

## 不走 npm publish

PyStack v0.1 不发布到 npm registry。`package.json` 只用于让 GitHub/npm tooling 能识别仓库里的 bin 和文件清单。
