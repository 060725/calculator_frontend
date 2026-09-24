# 计算器前端（HTML / CSS / JavaScript）

前后端分离计算器作业的前端部分。深色主题计算器界面，左侧为按键区，
右侧为历史记录面板；所有计算与历史持久化均由后端 API 完成，
前端不直接计算表达式结果。

## 技术栈

- 原生 HTML + CSS + JavaScript（无框架）
- Fetch API 调用后端接口
- 支持鼠标点击与键盘快捷键（扩展功能）

## 运行时环境

- 任意现代浏览器（Chrome / Edge / Firefox）
- 本地开发可用 `python -m http.server`，部署可用 Netlify / Vercel 等静态托管

## 安装与启动方法

```bash
python -m http.server 8080
```

浏览器访问 `http://localhost:8080`（后端需运行在 5000 端口，见后端 README）。

## 前后端连接方法（配置说明）

`app.js` 根据访问地址自动选择后端：

- 本机访问（`localhost` / `127.0.0.1`）→ 使用 `http://localhost:5000/api`
- 部署访问（线上域名）→ 使用 `REMOTE_API`（部署前改为你的后端公开地址，
  形如 `https://你的用户名.pythonanywhere.com/api`）

后端需开启 CORS（本项目后端已开启），前端才能跨域调用。

## 目录结构

```
calculator_frontend/
├── index.html   入口页面
├── style.css    深色主题样式
├── app.js       交互逻辑 + API 调用
├── README.md
└── codestyle.md
```

## 键盘快捷键

| 按键 | 功能 |
| --- | --- |
| 数字 / `.` | 输入数字/小数点 |
| `+ - * /` | 输入运算符 |
| `( )` | 输入括号 |
| `Enter` | 计算 |
| `Backspace` | 删除末尾 |
| `Escape` | 全部清空 |