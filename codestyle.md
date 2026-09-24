# 代码规范（前端）

## 规范来源（Source of This Standard）

本仓库代码规范参照 **Google JavaScript Style Guide**
（https://google.github.io/styleguide/jsguide.html）与
**Airbnb JavaScript Style Guide**（https://github.com/airbnb/javascript）
制定，并针对本项目（原生 HTML/CSS/JS 前端）做了少量裁剪。

## HTML

- 使用 HTML5 语义化结构，`lang="zh-CN"`。
- 按钮统一使用 `data-key` 属性描述语义键值（如 `data-key="×"`），便于脚本统一处理。

## CSS

- 使用 CSS 变量定义配色（`:root` 中），保证主题统一、便于切换。
- 类名使用小写字母与连字符（如 `.btn-eq`、`.history-header`），符合 BEM 常见实践的简版。
- 深色主题配色：数字键深紫、运算符橙色、等于键绿色、删除/错误红色。

## JavaScript

- 常量使用 `UPPER_SNAKE_CASE`（如 `API_BASE_URL`），变量/函数使用 `camelCase`（Google JS Guide）。
- 与后端交互的函数均为 `async`，统一走 `fetch`，并对网络异常做兜底。
- DOM 文案通过 `textContent` 写入，不把用户输入直接拼进 `innerHTML`，防止 XSS（Airbnb 安全实践）。
- 键盘事件集中在 `keydown` 监听器中，与按钮 `data-key` 共用同一套输入逻辑，避免重复代码（DRY）。

## Git 提交

- 提交信息用英文，简明描述改动（示例：`Initial commit: calculator frontend with HTML/CSS/JS`）。