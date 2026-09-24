/* 前端逻辑：管理输入表达式、调用后端 API、渲染历史记录、支持键盘快捷键。 */

/* 部署后把这里改成你的 PythonAnywhere 后端地址（形如 https://你的用户名.pythonanywhere.com/api） */
const REMOTE_API = 'https://060725.pythonanywhere.com/api';

/* 本地开发用 localhost，部署后自动使用线上后端 */
const API_BASE_URL =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : REMOTE_API;

let expression = '';

const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error');
const historyList = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');

/* ---------- 显示 ---------- */
function render() {
  expressionEl.textContent = expression || '\u00a0';
}

function clearError() {
  errorEl.textContent = '';
}

/* ---------- 输入 ---------- */
function insert(ch) {
  clearError();
  expression += ch;
  resultEl.textContent = '0';
  render();
}

/* 正负号：对最后一个数字取反；若末尾是运算符则直接补负号 */
function toggleSign() {
  clearError();
  const m = expression.match(/(-?\d+(?:\.\d+)?)$/);
  if (m) {
    expression =
      expression.slice(0, expression.length - m[0].length) +
      (m[0].startsWith('-') ? m[0].slice(1) : '-' + m[0]);
  } else {
    expression += '-';
  }
  render();
}

function clearAllInput() {
  expression = '';
  resultEl.textContent = '0';
  clearError();
  render();
}

function backspace() {
  clearError();
  expression = expression.slice(0, -1);
  if (!expression) resultEl.textContent = '0';
  render();
}

/* ---------- 计算 ---------- */
async function evaluate() {
  if (!expression.trim()) return;
  clearError();
  try {
    const res = await fetch(`${API_BASE_URL}/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ expression }),
    });
    const data = await res.json();
    if (!res.ok) {
      resultEl.textContent = '0';
      errorEl.textContent = data.error || '计算失败';
      return;
    }
    resultEl.textContent = data.result;
    expression = '';
    expressionEl.textContent = '\u00a0';
    await loadHistory();
  } catch (err) {
    errorEl.textContent = '无法连接到后端服务';
  }
}

/* ---------- 历史记录 ---------- */
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = String(str);
  return div.innerHTML;
}

async function loadHistory() {
  try {
    const res = await fetch(`${API_BASE_URL}/history`);
    const data = await res.json();
    renderHistory(data.items || []);
  } catch (err) {
    /* 后端不可达时静默，界面仍可输入 */
  }
}

function renderHistory(items) {
  historyList.innerHTML = '';
  historyEmpty.style.display = items.length ? 'none' : 'flex';
  items.forEach((item) => {
    const record = document.createElement('div');
    record.className = 'record';

    const main = document.createElement('div');
    main.className = 'record-main';
    const exprSpan = document.createElement('span');
    exprSpan.className = 'record-expr';
    exprSpan.textContent = `${item.expression} =`;
    const resultSpan = document.createElement('span');
    resultSpan.className = 'record-result';
    resultSpan.textContent = item.result;
    main.appendChild(exprSpan);
    main.appendChild(resultSpan);

    const foot = document.createElement('div');
    foot.className = 'record-foot';
    const timeSpan = document.createElement('span');
    timeSpan.textContent = item.created_at;
    const delBtn = document.createElement('button');
    delBtn.className = 'record-del';
    delBtn.textContent = '\u00d7';
    delBtn.title = '删除该记录';
    delBtn.addEventListener('click', () => deleteRecord(item.id));
    foot.appendChild(timeSpan);
    foot.appendChild(delBtn);

    record.appendChild(main);
    record.appendChild(foot);
    historyList.appendChild(record);
  });
}

async function deleteRecord(id) {
  try {
    await fetch(`${API_BASE_URL}/history/${id}`, { method: 'DELETE' });
    await loadHistory();
  } catch (err) {
    /* ignore */
  }
}

async function clearHistory() {
  const ok = confirm('确定要清空所有历史记录吗？');
  if (!ok) return;
  try {
    await fetch(`${API_BASE_URL}/history`, { method: 'DELETE' });
    await loadHistory();
  } catch (err) {
    /* ignore */
  }
}

/* ---------- 事件绑定 ---------- */
document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.key;
    if (key === 'AC') clearAllInput();
    else if (key === '=') evaluate();
    else if (key === '\u00b1') toggleSign();
    else insert(key);
  });
});

document.getElementById('clearAll').addEventListener('click', clearHistory);

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (/[0-9]/.test(key)) {
    insert(key);
  } else if (key === '.') {
    insert('.');
  } else if (key === '(' || key === ')') {
    insert(key);
  } else if (key === '*') {
    insert('\u00d7');
  } else if (key === '/') {
    event.preventDefault();
    insert('\u00f7');
  } else if (key === '+' || key === '-') {
    insert(key);
  } else if (key === 'Enter') {
    event.preventDefault();
    evaluate();
  } else if (key === 'Backspace') {
    backspace();
  } else if (key === 'Escape') {
    clearAllInput();
  }
});

/* 页面加载即获取历史，验证持久化 */
loadHistory();