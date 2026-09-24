# 代码规范（前端）

本前端仓库遵循以下约定，便于助教与协作者阅读：

## HTML

- 使用 HTML5 语义化结构，`lang="zh-CN"`。
- 所有按钮使用 `data-key` 属性描述其语义键值（如 `data-key="×"`），便于脚本统一处理。

## CSS

- 使用 CSS 变量定义配色（`:root` 中），保持主题统一、便于切换。
- 类名使用小写字母与连字符（如 `.btn-eq`、`.history-header`）。
- 深色主题配色：数字键深紫、运算符橙色、等于键绿色、删除/错误红色。

## JavaScript

- 常量使用 `UPPER_SNAKE_CASE`（如 `API_BASE_URL`），变量/函数使用 `camelCase`。
- 齿轮：所有与后端交互的函数为 `async`，统一走 `fetch`，并对网络异常做兜底。
- DOM 文案通过 `textContent` 写入，防止 XSS；不直接拼接用户输入到 innerHTML。
- 键盘事件集中在 `keydown` 监听器中，与按钮 `data-key` 共用同一套输入逻辑。

## Git 提交

- 提交信息用英文，简明描述改动（如 `Initial commit: calculator frontend with HTML/CSS/JS`）。