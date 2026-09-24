# 计算器前端（HTML / CSS / JavaScript）

前后端分离计算器作业的前端部分。深色主题计算器界面，左侧为按键区，
右侧为历史记录面板；所有计算与历史持久化均由后端 API 完成。

## 技术栈

- 原生 HTML + CSS + JavaScript（无框架）
- Fetch API 调用后端接口
- 支持鼠标点击与键盘快捷键

## 快速启动

```bash
cd src
python -m http.server 8080
```

浏览器访问 `http://localhost:8080`（后端需先在 `5000` 端口运行）。

`app.js` 中 `API_BASE_URL = 'http://localhost:5000/api'`。

## 键盘快捷键

| 按键         | 功能         |
| ------------ | ------------ |
| 数字 / `.`   | 输入数字/小数点 |
| `+ - * /`    | 输入运算符   |
| `( )`        | 输入括号     |
| `Enter`      | 计算         |
| `Backspace`  | 删除末尾     |
| `Escape`     | 全部清空     |