# DSA 学习 HTML —— 配色与排版速查表

所有数值固定，生成页面时**不得偏离**。模板已用 CSS 变量集中管理，改色只改 `:root`。

## 页面主题（深色 / 科技感）
| 用途 | 变量 | 颜色 |
|---|---|---|
| 页面背景 | `--bg` | `#0b0f1a` |
| 面板/卡片背景 | `--panel` | `#0f1626` |
| 卡片边框 | `--border` | `#1e3a5f` |
| 科技强调色（标题线/按钮） | `--accent` | `#22d3ee` (cyan) |
| 次级强调 | `--accent2` | `#3b82f6` (blue) |
| 正文文字 | `--text` | `#e6edf3` |
| 次级文字 | `--text-dim` | `#9fb0c3` |
| 代码块背景 | `--code-bg` | `#0a0e17` |
| 代码块内边框 | `--code-border` | `#1f2a3a` |

## 代码语法高亮配色（IDE 风格）
| 元素 | 类 | 颜色 | 示例 |
|---|---|---|---|
| 关键字 | `.c-kw` | `#58a6ff` (蓝) | `template` `class` `if` `for` `return` |
| 函数 | `.c-fn` | `#d2a8ff` (紫) | `quickSort(` `swap(` |
| 类型/类/模板参数 | `.c-type` | `#7ee787` (绿) | `int` `vector` `T` `Node` |
| 字符串 | `.c-str` | `#a5d6ff` (浅蓝) | `"hello"` |
| 数字 | `.c-num` | `#ffa657` (橙) | `42` `3.14` |
| 注释 | `.c-com` | `#8b949e` (灰, 斜体) | `// 交换` |
| 预处理/宏 | `.c-pre` | `#ff7b72` (红) | `#include` |
| 标点/运算符 | `.c-pun` | `#c9d1d9` (浅灰) | `{}` `()` `=` |
| 变量/标识符 | `.c-var` | `#e6edf3` (近白) | `arr` `i` `tmp` |

## 字体
- 代码：`Consolas, 'Courier New', 'Microsoft YaHei', 'PingFang SC', monospace`（用户口述为 consolaus，实为 Consolas；中文注释走雅黑回退）
- 正文：`'Segoe UI', system-ui, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Source Han Sans SC', 'Noto Sans CJK SC', sans-serif`
- **【强制】禁止宋体**：绝不出现 `'SimSun'`、`'宋体'` 或 `serif` 中文兜底。代码内中文注释也用无衬线回退。
- 标题可用 Consolas 增强科技感（小号、大写、加 letter-spacing）

## 排版
- 正文容器最大宽度 `920px`，居中。
- 每个主题用 `<section class="card">` 卡片，左侧青色竖线 + 顶部细边框 + 轻微外发光。
- 各级标题：H1 大号带渐变下划线；H2 带 `//` 伪前缀（科技感）；H3 常规。
- 代码块顶部加一个「mac 风格」小条（三个圆点 + 文件名），强化 IDE 观感。
- 复杂度/公式单独用 `.formula` 区块居中显示。
- **行内代码**：用 `<code>`（无 `cpp` 类），渲染为小药丸（青底蓝字）；
  高亮脚本只处理块级 `<pre><code class="cpp">`，不要把行内代码当代码块分行。
- **动画布局（强制并排）**：`.anim-flex` 容器，左列 `.code`（代码面板），
  右列 `.anim-side`（测试数据输入框 + canvas + 说明 + 按钮）；窄屏（≤680px）自动上下堆叠。
  - **代码面板可缩放**：`.anim-flex > .code` 用 `resize:horizontal; overflow:auto`，
    并设 `min-width`/`max-width`；窄屏时 `resize:none`。
  - **可输入测试数据**：`.anim-input`（`<input>` + 「加载」按钮）+ `.anim-msg`（提示）；
    打开页面 `input.value` 即示例数据，脚本把 `steps` 抽到 `buildSteps(arr)`，
    点「加载」/回车重新生成动画。
  - canvas 深色底 + 圆角 + 边框；控制按钮统一 `.btn` 样式（青色描边）。
  - **动画步进每步都高亮当前执行行（`.cl.active`），高亮随语句移动；页面不得滚动**，
    当前行不可见时仅调整代码面板内部 `pre.scrollTop`。
  - 新样式：`.src`（例题出处 = **可点击的直达链接**：青蓝色 + hover 下划线；写法
    `<a class="src" href="题目URL" target="_blank" rel="noopener">出处 ↗</a>`）、
    `.tag-optional`（「可选」标签，灰）。
- 内容结构（强制）：概念 → 底层结构/原地思想 → 核心思想(直觉) → 复杂度 → 数学原理(LaTeX)
  → 算法实现(自由函数) → 动画(左代码右画布) → **例题讲解(带出处) → 常见陷阱(可选)
  → 总结 → 拓展练习**。每节都要有讲解文字，不只代码。

## LaTeX
- 由 KaTeX CDN 渲染：`$...$` 行内，`$$...$$` 独立块。
- 公式颜色默认 `--text`，可加 `.math` 类微调。
