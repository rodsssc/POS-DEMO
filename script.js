/* ═══════════════════════════════════════════════════════
   NEXAPOS — SCRIPT.JS
   All interactivity: auth, sidebar, cart, POS, charts,
   dark mode, modals, toasts, printing
═══════════════════════════════════════════════════════ */

'use strict';

/* ── Demo Data ── */
const USERS = [
    { email: 'admin@nexapos.com', password: 'admin123', role: 'admin', name: 'Alex Rivera' },
    { email: 'cashier@nexapos.com', password: 'cashier123', role: 'cashier', name: 'Maria Santos' }
];

const PRODUCTS = [
    { id: 1, name: 'Coca-Cola 330ml', sku: 'BEV-001', category: 'Beverages', price: 40, cost: 25, stock: 120, emoji: '🥤' },
    { id: 2, name: 'Royal Milk Tea', sku: 'BEV-002', category: 'Beverages', price: 65, cost: 40, stock: 85, emoji: '🧋' },
    { id: 3, name: 'Mineral Water 500ml', sku: 'BEV-003', category: 'Beverages', price: 25, cost: 12, stock: 200, emoji: '💧' },
    { id: 4, name: 'Orange Juice', sku: 'BEV-004', category: 'Beverages', price: 55, cost: 32, stock: 60, emoji: '🍊' },
    { id: 5, name: 'Iced Coffee', sku: 'BEV-005', category: 'Beverages', price: 75, cost: 45, stock: 8, emoji: '☕' },
    { id: 6, name: 'Lays Classic Chips', sku: 'SNK-001', category: 'Snacks', price: 55, cost: 35, stock: 90, emoji: '🍟' },
    { id: 7, name: 'Skyflakes Crackers', sku: 'SNK-002', category: 'Snacks', price: 25, cost: 14, stock: 150, emoji: '🍪' },
    { id: 8, name: 'Pringles Original', sku: 'SNK-003', category: 'Snacks', price: 120, cost: 80, stock: 4, emoji: '🥔' },
    { id: 9, name: 'Nova Country Chips', sku: 'SNK-004', category: 'Snacks', price: 45, cost: 28, stock: 75, emoji: '🌽' },
    { id: 10, name: 'Choco Mallows', sku: 'SNK-005', category: 'Snacks', price: 30, cost: 18, stock: 0, emoji: '🍫' },
    { id: 11, name: 'Fresh Milk 1L', sku: 'DAI-001', category: 'Dairy', price: 85, cost: 60, stock: 45, emoji: '🥛' },
    { id: 12, name: 'Cheddar Cheese', sku: 'DAI-002', category: 'Dairy', price: 150, cost: 100, stock: 30, emoji: '🧀' },
    { id: 13, name: 'Yogurt Cup', sku: 'DAI-003', category: 'Dairy', price: 65, cost: 40, stock: 5, emoji: '🫙' },
    { id: 14, name: 'Butter 200g', sku: 'DAI-004', category: 'Dairy', price: 120, cost: 85, stock: 20, emoji: '🧈' },
    { id: 15, name: 'Pan de Sal (6pcs)', sku: 'BAK-001', category: 'Bakery', price: 30, cost: 18, stock: 60, emoji: '🍞' },
    { id: 16, name: 'Ensaymada', sku: 'BAK-002', category: 'Bakery', price: 45, cost: 28, stock: 35, emoji: '🥐' },
    { id: 17, name: 'Mamon', sku: 'BAK-003', category: 'Bakery', price: 20, cost: 12, stock: 80, emoji: '🧁' },
    { id: 18, name: 'Hopia', sku: 'BAK-004', category: 'Bakery', price: 25, cost: 14, stock: 55, emoji: '🥮' },
    { id: 19, name: 'Safeguard Soap', sku: 'PC-001', category: 'Personal Care', price: 60, cost: 40, stock: 40, emoji: '🧼' },
    { id: 20, name: 'Colgate Toothpaste', sku: 'PC-002', category: 'Personal Care', price: 95, cost: 65, stock: 3, emoji: '🪥' },
    { id: 21, name: 'Shampoo Sachet', sku: 'PC-003', category: 'Personal Care', price: 12, cost: 7, stock: 200, emoji: '💆' },
    { id: 22, name: 'Dove Soap Bar', sku: 'PC-004', category: 'Personal Care', price: 75, cost: 50, stock: 25, emoji: '🧴' }
];

const TRANSACTIONS = [
    { id: 'TXN-00241', date: '2026-05-22 09:14', cashier: 'Maria S.', items: 5, subtotal: 425, discount: 0, total: 476, method: 'Cash', status: 'completed' },
    { id: 'TXN-00242', date: '2026-05-22 09:45', cashier: 'Juan D.', items: 3, subtotal: 195, discount: 10, total: 196.56, method: 'GCash', status: 'completed' },
    { id: 'TXN-00243', date: '2026-05-22 10:02', cashier: 'Maria S.', items: 8, subtotal: 820, discount: 0, total: 918.4, method: 'Card', status: 'completed' },
    { id: 'TXN-00244', date: '2026-05-22 10:30', cashier: 'Ana R.', items: 2, subtotal: 130, discount: 5, total: 138.32, method: 'Maya', status: 'completed' },
    { id: 'TXN-00245', date: '2026-05-22 11:05', cashier: 'Juan D.', items: 4, subtotal: 310, discount: 0, total: 347.2, method: 'Cash', status: 'pending' },
    { id: 'TXN-00246', date: '2026-05-22 11:22', cashier: 'Maria S.', items: 1, subtotal: 65, discount: 0, total: 72.8, method: 'GCash', status: 'voided' }
];

const EMPLOYEES = [
    { id: 1, name: 'Alex Rivera', role: 'admin', email: 'admin@nexapos.com', sales: 48, txns: 142, status: 'active', initial: 'A', color: '#f59e0b' },
    { id: 2, name: 'Maria Santos', role: 'cashier', email: 'cashier@nexapos.com', sales: 28, txns: 89, status: 'active', initial: 'M', color: '#10b981' },
    { id: 3, name: 'Juan Dela Cruz', role: 'cashier', email: 'juan@nexapos.com', sales: 22, txns: 67, status: 'active', initial: 'J', color: '#3b82f6' },
    { id: 4, name: 'Ana Reyes', role: 'supervisor', email: 'ana@nexapos.com', sales: 35, txns: 104, status: 'active', initial: 'A', color: '#8b5cf6' },
    { id: 5, name: 'Ben Torres', role: 'cashier', email: 'ben@nexapos.com', sales: 15, txns: 42, status: 'inactive', initial: 'B', color: '#ec4899' }
];

const TOP_PRODUCTS = [
    { name: 'Coca-Cola 330ml', qty: 284, amount: '₱11,360' },
    { name: 'Pan de Sal (6pcs)', qty: 210, amount: '₱6,300' },
    { name: 'Fresh Milk 1L', qty: 178, amount: '₱15,130' },
    { name: 'Lays Classic Chips', qty: 156, amount: '₱8,580' },
    { name: 'Royal Milk Tea', qty: 142, amount: '₱9,230' }
];

const INVENTORY_ALERTS = [
    { name: 'Choco Mallows', stock: 0, min: 30, type: 'critical' },
    { name: 'Colgate Toothpaste', stock: 3, min: 20, type: 'critical' },
    { name: 'Yogurt Cup', stock: 5, min: 20, type: 'low' },
    { name: 'Iced Coffee', stock: 8, min: 30, type: 'low' },
    { name: 'Pringles Original', stock: 4, min: 15, type: 'low' }
];

const NOTIFICATIONS = [
    { type: 'warn', icon: 'bi-exclamation-triangle', msg: '5 products are low on stock', time: '10 min ago' },
    { type: 'success', icon: 'bi-check-circle', msg: 'Daily backup completed', time: '1 hr ago' },
    { type: 'info', icon: 'bi-person-plus', msg: 'New employee Ben Torres added', time: '2 hrs ago' },
    { type: 'warn', icon: 'bi-receipt', msg: 'TXN-00246 was voided by Maria S.', time: '3 hrs ago' },
    { type: 'success', icon: 'bi-graph-up', msg: 'Revenue target 80% reached!', time: '5 hrs ago' }
];

/* ── App State ── */
let cart = [];
let discountPercent = 0;
let selectedPayMethod = 'Cash';
let currentUser = null;
let txnCounter = 247;
let chartInstances = {};

/* ══════════════════════════════════
   AUTH
══════════════════════════════════ */
function quickLogin(role) {
    if (role === 'admin') {
        document.getElementById('login-email').value = 'admin@nexapos.com';
        document.getElementById('login-password').value = 'admin123';
    } else {
        document.getElementById('login-email').value = 'cashier@nexapos.com';
        document.getElementById('login-password').value = 'cashier123';
    }
    setTimeout(handleLogin, 100);
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const err = document.getElementById('login-error');
    const user = USERS.find(u => u.email === email && u.password === password);
    if (!user) {
        err.classList.remove('d-none');
        setTimeout(() => err.classList.add('d-none'), 3000);
        return;
    }
    currentUser = user;
    err.classList.add('d-none');
    if (user.role === 'admin') {
        showAdminPanel();
    } else {
        showCashierPanel();
    }
}

function handleLogout() {
    currentUser = null;
    switchPage('login');
    resetAdminToDefault();
}

function togglePassword() {
    const input = document.getElementById('login-password');
    const eye = document.getElementById('pw-eye');
    if (input.type === 'password') {
        input.type = 'text';
        eye.className = 'bi bi-eye-slash';
    } else {
        input.type = 'password';
        eye.className = 'bi bi-eye';
    }
}

/* ══════════════════════════════════
   PAGE ROUTING
══════════════════════════════════ */
function switchPage(page) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active', 'd-block');
        p.classList.add('d-none');
    });
    const target = document.getElementById('page-' + page);
    if (target) {
        target.classList.remove('d-none');
        target.classList.add('active');
    }
}

function showAdminPanel() {
    switchPage('admin');
    initAdminData();
    initCharts();
    setInterval(periodicNotif, 25000);
}

function showCashierPanel() {
    switchPage('cashier');
    renderPosProducts('all');
    startPosClock();
    updateCartDisplay();
}

function switchToCashier() {
    switchPage('cashier');
    renderPosProducts('all');
    startPosClock();
    closeSidebar();
}

function switchToAdmin() {
    switchPage('admin');
    initAdminData();
}

function resetAdminToDefault() {
    switchAdminPage('dashboard', null);
}

/* ══════════════════════════════════
   ADMIN PAGES
══════════════════════════════════ */
function switchAdminPage(page, el) {
    document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('admin-' + page);
    if (target) target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (el) el.classList.add('active');
    else {
        const match = document.querySelector(`.nav-item[data-page="${page}"]`);
        if (match) match.classList.add('active');
    }

    const titles = {
        dashboard: 'Dashboard',
        reports: 'Sales Reports',
        products: 'Product Management',
        inventory: 'Inventory Management',
        transactions: 'Transaction History',
        employees: 'Employee Management',
        settings: 'Settings'
    };
    document.getElementById('topbar-title').textContent = titles[page] || page;
    closeSidebar();
    if (page === 'reports') initReportCharts();
}

/* ══════════════════════════════════
   SIDEBAR
══════════════════════════════════ */
function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebar-overlay');
    sb.classList.toggle('open');
    ov.classList.toggle('active');
}

function closeSidebar() {
    const sb = document.getElementById('sidebar');
    const ov = document.getElementById('sidebar-overlay');
    sb.classList.remove('open');
    ov.classList.remove('active');
}

/* ══════════════════════════════════
   THEME
══════════════════════════════════ */
function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const icon = document.getElementById('theme-icon');
    if (icon) icon.className = isDark ? 'bi bi-moon-stars' : 'bi bi-sun';
    if (Object.keys(chartInstances).length) {
        setTimeout(() => { destroyCharts();
            initCharts(); }, 100);
    }
    localStorage.setItem('nexapos-theme', isDark ? 'light' : 'dark');
}

function loadTheme() {
    const saved = localStorage.getItem('nexapos-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
    const icon = document.getElementById('theme-icon');
    if (icon && saved === 'dark') icon.className = 'bi bi-sun';
}

/* ══════════════════════════════════
   DATA RENDERING
══════════════════════════════════ */
function initAdminData() {
    renderRecentTransactions();
    renderTopProducts();
    renderInventoryAlerts();
    renderProductsTable();
    renderInventoryTable();
    renderAllTransactions();
    renderEmployees();
    renderNotifList();
}

function renderRecentTransactions() {
    const tbody = document.getElementById('recent-transactions-body');
    if (!tbody) return;
    tbody.innerHTML = TRANSACTIONS.slice(0, 5).map(t => `
    <tr>
      <td><span style="font-family:monospace;font-size:.78rem">${t.id}</span></td>
      <td>${t.date}</td>
      <td>${t.items} items</td>
      <td><strong>₱${t.total.toFixed(2)}</strong></td>
      <td>${methodBadge(t.method)}</td>
      <td>${statusBadge(t.status)}</td>
    </tr>
  `).join('');
}

function renderTopProducts() {
    const el = document.getElementById('top-products-list');
    if (!el) return;
    el.innerHTML = TOP_PRODUCTS.map((p, i) => `
    <div class="top-product-item">
      <div class="tp-rank">${i + 1}</div>
      <div class="tp-info">
        <div class="tp-name">${p.name}</div>
        <div class="tp-qty">${p.qty} units sold</div>
      </div>
      <div class="tp-amount">${p.amount}</div>
    </div>
  `).join('');
}

function renderInventoryAlerts() {
    const el = document.getElementById('inventory-alerts-list');
    if (!el) return;
    el.innerHTML = INVENTORY_ALERTS.map(a => `
    <div class="alert-item">
      <div class="alert-dot ${a.type}"></div>
      <div class="alert-info">
        <div class="alert-name">${a.name}</div>
        <div class="alert-stock">${a.stock === 0 ? 'Out of stock' : `${a.stock} left (min: ${a.min})`}</div>
      </div>
      <button class="alert-action" onclick="showToast('Restock order placed for ${a.name}','success')">Restock</button>
    </div>
  `).join('');
}

function renderProductsTable() {
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  tbody.innerHTML = PRODUCTS.map(p => {
    const stockStatus = p.stock === 0 ? 'danger' : p.stock < 10 ? 'low' : 'ok';
    const statusHtml = stockStatus === 'ok'
      ? '<span class="status-badge status-completed">In Stock</span>'
      : stockStatus === 'low'
        ? '<span class="status-badge status-pending">Low Stock</span>'
        : '<span class="status-badge status-voided">Out of Stock</span>';
    return `
      <tr>
        <td>
          <div class="product-cell">
            <div class="product-thumb" style="background:${catColor(p.category)}">${p.emoji}</div>
            <div class="product-cell-info">
              <div class="pname">${p.name}</div>
            </div>
          </div>
        </td>
        <td><span style="font-family:monospace;font-size:.78rem">${p.sku}</span></td>
        <td><span class="status-badge" style="background:${catColor(p.category)};color:#333">${p.category}</span></td>
        <td><strong>₱${p.price.toFixed(2)}</strong></td>
        <td>${p.stock}</td>
        <td>${statusHtml}</td>
        <td>
          <button class="emp-btn" onclick="showToast('Editing ${p.name}','info')"><i class="bi bi-pencil"></i></button>
          <button class="emp-btn" onclick="showToast('${p.name} deleted','error')" style="color:var(--danger)"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderInventoryTable() {
  const tbody = document.getElementById('inventory-table-body');
  if (!tbody) return;
  tbody.innerHTML = PRODUCTS.map(p => {
    const pct = Math.min(100, Math.round((p.stock / 200) * 100));
    const level = pct > 50 ? 'high' : pct > 20 ? 'medium' : 'low';
    const dates = ['Jan 10', 'Feb 3', 'Mar 15', 'Apr 22', 'May 1', 'May 8', 'May 14'];
    const randDate = dates[Math.floor(Math.random() * dates.length)];
    return `
      <tr>
        <td>
          <div class="product-cell">
            <div class="product-thumb" style="background:${catColor(p.category)}">${p.emoji}</div>
            <div class="product-cell-info"><div class="pname">${p.name}</div></div>
          </div>
        </td>
        <td>${p.category}</td>
        <td><strong>${p.stock}</strong></td>
        <td>${Math.round(p.stock * 0.2 + 5)}</td>
        <td>
          <div class="stock-bar-wrap">
            <div class="stock-bar-track"><div class="stock-bar-fill ${level}" style="width:${pct}%"></div></div>
            <div class="stock-bar-label">${pct}%</div>
          </div>
        </td>
        <td>${randDate}</td>
        <td>
          <button class="emp-btn" onclick="showToast('Updating stock for ${p.name}','info')"><i class="bi bi-plus-circle"></i> Add Stock</button>
        </td>
      </tr>
    `;
  }).join('');
}

function renderAllTransactions() {
  const tbody = document.getElementById('transactions-table-body');
  if (!tbody) return;
  tbody.innerHTML = TRANSACTIONS.map(t => `
    <tr>
      <td><span style="font-family:monospace;font-size:.78rem">${t.id}</span></td>
      <td>${t.date}</td>
      <td>${t.cashier}</td>
      <td>${t.items} items</td>
      <td>₱${t.subtotal.toFixed(2)}</td>
      <td>${t.discount}%</td>
      <td><strong>₱${t.total.toFixed(2)}</strong></td>
      <td>${methodBadge(t.method)}</td>
      <td>${statusBadge(t.status)}</td>
    </tr>
  `).join('');
}

function renderEmployees() {
  const container = document.getElementById('employee-cards');
  if (!container) return;
  container.innerHTML = EMPLOYEES.map(e => `
    <div class="col-12 col-sm-6 col-xl-4">
      <div class="employee-card">
        <div class="emp-avatar" style="background:${e.color}20;color:${e.color}">${e.initial}</div>
        <div class="emp-name">${e.name}</div>
        <div class="mb-1">
          ${e.status === 'active' ? '<span class="emp-active-dot"></span>' : ''}
          <span class="emp-role role-${e.role}">${capitalize(e.role)}</span>
        </div>
        <div class="emp-stats">
          <div class="emp-stat"><div class="emp-stat-val">${e.txns}</div><div class="emp-stat-label">Transactions</div></div>
          <div class="emp-stat"><div class="emp-stat-val">₱${(e.sales * 1000).toLocaleString()}</div><div class="emp-stat-label">Sales</div></div>
        </div>
        <div class="emp-actions">
          <button class="emp-btn" onclick="showToast('Editing ${e.name}','info')"><i class="bi bi-pencil"></i> Edit</button>
          <button class="emp-btn" onclick="showToast('Viewing ${e.name} activity','info')"><i class="bi bi-clock-history"></i> Activity</button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderNotifList() {
  const list = document.getElementById('notif-list');
  if (!list) return;
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item notif-${n.type}">
      <div class="notif-icon"><i class="bi ${n.icon}"></i></div>
      <div>
        <div class="notif-msg">${n.msg}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

/* ── Filter ── */
function filterProducts() {
  const search = (document.getElementById('product-search')?.value || '').toLowerCase();
  const cat = document.getElementById('product-cat-filter')?.value || '';
  const tbody = document.getElementById('products-table-body');
  if (!tbody) return;
  const rows = tbody.querySelectorAll('tr');
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    const matchSearch = !search || text.includes(search);
    const matchCat = !cat || text.includes(cat.toLowerCase());
    row.style.display = matchSearch && matchCat ? '' : 'none';
  });
}

/* ── Helpers ── */
function statusBadge(s) {
  const map = { completed: 'status-completed', pending: 'status-pending', voided: 'status-voided' };
  return `<span class="status-badge ${map[s] || ''}">${capitalize(s)}</span>`;
}

function methodBadge(m) {
  const colors = { Cash: '#d1fae5', Card: '#dbeafe', GCash: '#fce7f3', Maya: '#fef3c7' };
  const textColors = { Cash: '#065f46', Card: '#1e40af', GCash: '#9d174d', Maya: '#92400e' };
  return `<span class="status-badge" style="background:${colors[m]||'#f3f4f6'};color:${textColors[m]||'#374151'}">${m}</span>`;
}

function catColor(cat) {
  const map = {
    Beverages: '#dbeafe', Snacks: '#fef9c3', Dairy: '#d1fae5',
    Bakery: '#fce7f3', 'Personal Care': '#ede9fe'
  };
  return map[cat] || '#f3f4f6';
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ══════════════════════════════════
   CHARTS
══════════════════════════════════ */
function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    gridColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)',
    textColor: isDark ? '#888' : '#9ca3af',
    accent: '#f59e0b'
  };
}

function destroyCharts() {
  Object.values(chartInstances).forEach(c => { try { c.destroy(); } catch(e) {} });
  chartInstances = {};
}

function initCharts() {
  destroyCharts();
  const cc = getChartColors();
  const defaults = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  // Revenue Chart
  const rCtx = document.getElementById('revenueChart');
  if (rCtx) {
    chartInstances.revenue = new Chart(rCtx, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue',
          data: [18200, 22400, 19800, 27600, 24100, 31500, 24580],
          backgroundColor: 'rgba(245,158,11,0.85)',
          borderRadius: 6,
          borderSkipped: false
        }, {
          label: 'Previous Week',
          data: [15800, 18900, 21200, 24100, 22300, 28700, 21900],
          backgroundColor: cc.gridColor,
          borderRadius: 6,
          borderSkipped: false
        }]
      },
      options: {
        ...defaults,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'transparent' }, ticks: { color: cc.textColor, font: { family: 'DM Sans', size: 11 } } },
          y: {
            grid: { color: cc.gridColor },
            ticks: {
              color: cc.textColor,
              font: { family: 'DM Sans', size: 11 },
              callback: v => '₱' + (v / 1000).toFixed(0) + 'k'
            }
          }
        }
      }
    });
  }

  // Category Donut
  const cCtx = document.getElementById('categoryChart');
  if (cCtx) {
    const catLabels = ['Beverages', 'Snacks', 'Dairy', 'Bakery', 'Personal Care'];
    const catColors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
    chartInstances.category = new Chart(cCtx, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: [34, 22, 18, 14, 12],
          backgroundColor: catColors,
          borderWidth: 2,
          borderColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#161616' : '#ffffff',
          hoverOffset: 6
        }]
      },
      options: {
        ...defaults,
        cutout: '65%',
        plugins: { legend: { display: false } }
      }
    });
    const legend = document.getElementById('donut-legend');
    if (legend) {
      legend.innerHTML = catLabels.map((l, i) =>
        `<div class="donut-leg-item"><div class="donut-leg-dot" style="background:${catColors[i]}"></div>${l}</div>`
      ).join('');
    }
  }
}

function initReportCharts() {
  const cc = getChartColors();
  const monthCtx = document.getElementById('monthlyChart');
  if (monthCtx && !chartInstances.monthly) {
    chartInstances.monthly = new Chart(monthCtx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          data: [620000, 715000, 680000, 740000, 892450, 0, 0, 0, 0, 0, 0, 0],
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#f59e0b',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'transparent' }, ticks: { color: cc.textColor, font: { family: 'DM Sans', size: 11 } } },
          y: {
            grid: { color: cc.gridColor },
            ticks: { color: cc.textColor, font: { family: 'DM Sans', size: 11 }, callback: v => '₱' + (v / 1000).toFixed(0) + 'k' }
          }
        }
      }
    });
  }

  const payCtx = document.getElementById('paymentChart');
  if (payCtx && !chartInstances.payment) {
    chartInstances.payment = new Chart(payCtx, {
      type: 'doughnut',
      data: {
        labels: ['Cash', 'Card', 'GCash', 'Maya'],
        datasets: [{
          data: [45, 25, 20, 10],
          backgroundColor: ['#f59e0b', '#3b82f6', '#ec4899', '#8b5cf6'],
          borderWidth: 2,
          borderColor: document.documentElement.getAttribute('data-theme') === 'dark' ? '#0d0d0d' : '#fff'
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: { display: true, position: 'right', labels: { color: cc.textColor, font: { family: 'DM Sans', size: 11 }, boxWidth: 12, padding: 12 } }
        }
      }
    });
  }

  const hourCtx = document.getElementById('hourlyChart');
  if (hourCtx && !chartInstances.hourly) {
    chartInstances.hourly = new Chart(hourCtx, {
      type: 'bar',
      data: {
        labels: ['6am','7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'],
        datasets: [{
          data: [5, 12, 28, 45, 62, 78, 95, 88, 72, 55, 68, 82, 76, 60, 35],
          backgroundColor: 'rgba(245,158,11,0.75)',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { color: 'transparent' }, ticks: { color: cc.textColor, font: { family: 'DM Sans', size: 10 } } },
          y: { grid: { color: cc.gridColor }, ticks: { color: cc.textColor, font: { family: 'DM Sans', size: 11 } } }
        }
      }
    });
  }
}

/* ══════════════════════════════════
   POS PRODUCTS
══════════════════════════════════ */
let currentPosCategory = 'all';
let posSearchQuery = '';

function renderPosProducts(category) {
  currentPosCategory = category;
  const grid = document.getElementById('pos-product-grid');
  if (!grid) return;

  let filtered = PRODUCTS.filter(p => {
    const matchCat = category === 'all' || p.category === category;
    const matchSearch = !posSearchQuery || p.name.toLowerCase().includes(posSearchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)"><i class="bi bi-search" style="font-size:2rem;display:block;margin-bottom:.5rem"></i>No products found</div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="pos-product-card ${p.stock === 0 ? 'out-of-stock' : ''}" onclick="addToCart(${p.id})" id="ppc-${p.id}">
      <div class="ppc-emoji">${p.emoji}</div>
      <div class="ppc-name">${p.name}</div>
      <div class="ppc-price">₱${p.price.toFixed(2)}</div>
      <div class="ppc-stock">${p.stock === 0 ? 'Out of stock' : `${p.stock} left`}</div>
      <div class="ppc-added-indicator"><i class="bi bi-plus-circle-fill" style="color:var(--accent);font-size:1.5rem"></i></div>
    </div>
  `).join('');
}

function setPosCategory(cat, el) {
  posSearchQuery = '';
  document.getElementById('pos-search').value = '';

  document.querySelectorAll('.pos-nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));

  if (el && el.classList.contains('pos-nav-btn')) el.classList.add('active');
  if (el && el.classList.contains('cat-chip')) el.classList.add('active');
  if (!el || el.classList.contains('pos-nav-btn')) {
    document.querySelectorAll('.cat-chip').forEach(c => {
      if (c.textContent.trim() === (cat === 'all' ? 'All' : cat)) c.classList.add('active');
    });
  }

  renderPosProducts(cat);
}

function filterPosProducts() {
  posSearchQuery = document.getElementById('pos-search')?.value || '';
  renderPosProducts(currentPosCategory);
}

/* ══════════════════════════════════
   CART
══════════════════════════════════ */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product || product.stock === 0) return;

  const existing = cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartDisplay();
  flashCard(productId);
  showToast(`${product.name} added`, 'success');
}

function flashCard(id) {
  const card = document.getElementById('ppc-' + id);
  if (!card) return;
  card.classList.add('just-added');
  setTimeout(() => card.classList.remove('just-added'), 400);
}

function updateCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartDisplay();
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartDisplay();
}

function clearCart() {
  cart = [];
  discountPercent = 0;
  document.getElementById('custom-discount').value = '';
  document.querySelectorAll('.disc-btn').forEach(b => b.classList.remove('active'));
  updateCartDisplay();
}

function updateCartDisplay() {
  const listEl = document.getElementById('cart-items-list');
  const emptyEl = document.getElementById('cart-empty');
  const badge = document.getElementById('cart-count-badge');
  const totalCount = cart.reduce((s, i) => s + i.qty, 0);
  if (badge) badge.textContent = totalCount;

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (listEl) listEl.innerHTML = '';
  } else {
    if (emptyEl) emptyEl.style.display = 'none';
    if (listEl) {
      listEl.innerHTML = cart.map(item => `
        <div class="cart-item" id="ci-${item.id}">
          <div class="cart-item-emoji">${item.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">₱${item.price.toFixed(2)} each</div>
          </div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateCartQty(${item.id}, -1)"><i class="bi bi-dash"></i></button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateCartQty(${item.id}, 1)"><i class="bi bi-plus"></i></button>
          </div>
          <div class="cart-item-total">₱${(item.price * item.qty).toFixed(2)}</div>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="bi bi-x"></i></button>
        </div>
      `).join('');
    }
  }

  recalcTotals();
}

function recalcTotals() {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discAmt = subtotal * (discountPercent / 100);
  const afterDisc = subtotal - discAmt;
  const vat = afterDisc * 0.12;
  const total = afterDisc + vat;

  setText('cart-subtotal', fmt(subtotal));
  setText('disc-pct', discountPercent);
  setText('cart-discount', '-' + fmt(discAmt));
  setText('cart-vat', fmt(vat));
  setText('cart-total', fmt(total));
  setText('checkout-total', fmt(total));

  calcChange();
}

function applyDiscount(pct) {
  discountPercent = parseFloat(pct) || 0;
  if (discountPercent > 100) discountPercent = 100;
  document.querySelectorAll('.disc-btn').forEach(b => {
    b.classList.toggle('active', parseFloat(b.textContent) === discountPercent);
  });
  updateCartDisplay();
}

function selectPayMethod(method, el) {
  selectedPayMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  const cashWrap = document.getElementById('cash-tendered-wrap');
  if (cashWrap) cashWrap.style.display = method === 'Cash' ? 'block' : 'none';
  if (method !== 'Cash') {
    setText('change-display', 'Change: ₱0.00');
  }
}

function calcChange() {
  const tendered = parseFloat(document.getElementById('cash-tendered')?.value) || 0;
  const totalStr = document.getElementById('cart-total')?.textContent || '₱0.00';
  const total = parseFloat(totalStr.replace('₱', '')) || 0;
  const change = tendered - total;
  const el = document.getElementById('change-display');
  if (el) {
    el.textContent = `Change: ₱${Math.max(0, change).toFixed(2)}`;
    el.style.color = change >= 0 ? 'var(--success)' : 'var(--danger)';
  }
}

function setTendered(val) {
  const total = parseFloat((document.getElementById('cart-total')?.textContent || '₱0').replace('₱', '')) || 0;
  const input = document.getElementById('cash-tendered');
  if (!input) return;
  if (val === 'exact') {
    input.value = total.toFixed(2);
  } else {
    const bills = [20, 50, 100, 200, 500, 1000];
    let amount = val;
    for (const b of bills) {
      if (b >= total) { amount = b; break; }
    }
    input.value = amount;
  }
  calcChange();
}

function processPayment() {
  if (cart.length === 0) { showToast('Cart is empty!', 'error'); return; }
  if (selectedPayMethod === 'Cash') {
    const tendered = parseFloat(document.getElementById('cash-tendered')?.value) || 0;
    const totalEl = document.getElementById('cart-total');
    const total = parseFloat((totalEl?.textContent || '₱0').replace('₱', '')) || 0;
    if (tendered < total) { showToast('Insufficient cash amount', 'error'); return; }
  }
  showReceiptModal();
}

/* ══════════════════════════════════
   RECEIPT
══════════════════════════════════ */
function showReceiptModal() {
  const subtotalStr = document.getElementById('cart-subtotal')?.textContent || '₱0.00';
  const totalStr = document.getElementById('cart-total')?.textContent || '₱0.00';
  const vatStr = document.getElementById('cart-vat')?.textContent || '₱0.00';
  const discStr = document.getElementById('cart-discount')?.textContent || '-₱0.00';
  const tendered = selectedPayMethod === 'Cash'
    ? (parseFloat(document.getElementById('cash-tendered')?.value) || 0)
    : parseFloat(totalStr.replace('₱', '')) || 0;
  const total = parseFloat(totalStr.replace('₱', '')) || 0;
  const change = Math.max(0, tendered - total);

  const txnId = 'TXN-' + String(txnCounter++).padStart(5, '0');
  const now = new Date();
  const dateStr = now.toLocaleString('en-PH', { dateStyle: 'short', timeStyle: 'short' });

  setText('r-txn', txnId);
  setText('r-date', dateStr);
  setText('r-method', selectedPayMethod);
  setText('r-subtotal', subtotalStr);
  setText('r-discount', discStr);
  setText('r-vat', vatStr);
  setText('r-total', totalStr);
  setText('r-tendered', '₱' + tendered.toFixed(2));
  setText('r-change', '₱' + change.toFixed(2));

  const itemsEl = document.getElementById('receipt-items');
  if (itemsEl) {
    itemsEl.innerHTML = cart.map(i => `
      <div class="receipt-item-row">
        <div class="receipt-item-name">${i.name}</div>
        <div class="receipt-item-qty">x${i.qty}</div>
        <div class="receipt-item-amt">₱${(i.price * i.qty).toFixed(2)}</div>
      </div>
    `).join('');
  }

  new bootstrap.Modal(document.getElementById('receiptModal')).show();

  document.getElementById('receiptModal').addEventListener('hidden.bs.modal', () => {
    clearCart();
    document.getElementById('cart-txn-id').textContent = String(txnCounter).padStart(5, '0');
    document.getElementById('cash-tendered').value = '';
  }, { once: true });
}

function printReceipt() {
  window.print();
  showToast('Printing receipt...', 'info');
}

/* ══════════════════════════════════
   MOBILE CART TOGGLE
══════════════════════════════════ */
function toggleMobileCart() {
  const panel = document.getElementById('pos-cart-panel');
  if (panel) panel.classList.toggle('mobile-open');
}

/* ══════════════════════════════════
   SETTINGS TABS
══════════════════════════════════ */
function switchSettings(tab, el) {
  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.settings-tab').forEach(t => t.classList.remove('active'));
  const panel = document.getElementById('settings-' + tab);
  if (panel) panel.classList.add('active');
  if (el) el.classList.add('active');
}

/* ══════════════════════════════════
   MODALS
══════════════════════════════════ */
function openProductModal() {
  new bootstrap.Modal(document.getElementById('productModal')).show();
}

function saveProduct() {
  showToast('Product saved successfully!', 'success');
  bootstrap.Modal.getInstance(document.getElementById('productModal'))?.hide();
}

function openEmployeeModal() {
  new bootstrap.Modal(document.getElementById('employeeModal')).show();
}

function saveEmployee() {
  showToast('Employee added successfully!', 'success');
  bootstrap.Modal.getInstance(document.getElementById('employeeModal'))?.hide();
}

/* ══════════════════════════════════
   NOTIFICATIONS
══════════════════════════════════ */
function showNotifications() {
  document.getElementById('notif-panel').classList.add('open');
  document.getElementById('notif-overlay').classList.add('active');
}
function hideNotifications() {
  document.getElementById('notif-panel').classList.remove('open');
  document.getElementById('notif-overlay').classList.remove('active');
}

function periodicNotif() {
  const msgs = [
    'New order placed on Register 01',
    'Low stock alert: Iced Coffee',
    'Shift ending in 30 minutes',
    'Daily revenue target 75% achieved'
  ];
  const types = ['info', 'warn', 'info', 'success'];
  const idx = Math.floor(Math.random() * msgs.length);
  showToast(msgs[idx], types[idx]);
}

/* ══════════════════════════════════
   TOAST
══════════════════════════════════ */
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', info: 'bi-info-circle-fill', warn: 'bi-exclamation-triangle-fill' };
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `<i class="bi ${icons[type] || icons.info} toast-icon"></i>${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* ══════════════════════════════════
   POS CLOCK
══════════════════════════════════ */
function startPosClock() {
  function tick() {
    const el = document.getElementById('pos-time');
    if (el) el.textContent = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
  tick();
  setInterval(tick, 1000);
}

/* ══════════════════════════════════
   MOBILE BOTTOM NAV ACTIVE STATE
══════════════════════════════════ */
function setMobileActive(el) {
  document.querySelectorAll('#admin-bottom-nav .mobile-nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
}

/* ══════════════════════════════════
   UTILS
══════════════════════════════════ */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function fmt(num) {
  return '₱' + (parseFloat(num) || 0).toFixed(2);
}

/* ══════════════════════════════════
   PERIOD TABS (CHART)
══════════════════════════════════ */
document.addEventListener('click', function (e) {
  if (e.target.classList.contains('period-btn')) {
    e.target.closest('.chart-period-tabs')?.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    showToast('Chart updated', 'info');
  }
});

/* ══════════════════════════════════
   KEYBOARD SHORTCUTS
══════════════════════════════════ */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    hideNotifications();
    closeSidebar();
  }
  if (e.ctrlKey && e.key === 'k') {
    e.preventDefault();
    const posSearch = document.getElementById('pos-search');
    if (posSearch && document.getElementById('page-cashier')?.classList.contains('active')) {
      posSearch.focus();
    }
  }
});

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {
  loadTheme();
  switchPage('login');
});