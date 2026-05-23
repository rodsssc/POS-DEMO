/* ============================================================
   MotorTrack POS — script.js
   Motor Parts Point of Sale System
   ============================================================ */

// ─── AUTH ────────────────────────────────────────────────────

const USERS = {
    'admin@motortrack.com': { password: 'admin123', role: 'admin' },
    'cashier@motortrack.com': { password: 'cashier123', role: 'cashier' },
};

function quickLogin(role) {
    if (role === 'admin') {
        document.getElementById('login-email').value = 'admin@motortrack.com';
        document.getElementById('login-password').value = 'admin123';
    } else {
        document.getElementById('login-email').value = 'cashier@motortrack.com';
        document.getElementById('login-password').value = 'cashier123';
    }
    handleLogin();
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value.trim();
    const user = USERS[email];
    if (user && user.password === pass) {
        showPage(user.role === 'admin' ? 'page-admin' : 'page-cashier');
        if (user.role === 'admin') initAdminPage();
        else initCashierPage();
    } else {
        document.getElementById('login-error').classList.remove('d-none');
    }
}

function handleLogout() {
    showPage('page-login');
}

function togglePassword() {
    const input = document.getElementById('login-password');
    const eye = document.getElementById('pw-eye');
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    eye.className = isHidden ? 'bi bi-eye-slash' : 'bi bi-eye';
}

// ─── PAGE ROUTING ─────────────────────────────────────────────

function showPage(id) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.classList.add('d-none');
    });
    const target = document.getElementById(id);
    target.classList.remove('d-none');
    target.classList.add('active');
}

function switchToCashier() {
    showPage('page-cashier');
    initCashierPage();
}

function switchToAdmin() {
    showPage('page-admin');
    initAdminPage();
}

// ─── MOTOR PARTS DATA ─────────────────────────────────────────

const PARTS = [
    // Engine Parts
    { id: 1, name: 'Spark Plug — NGK CR7HSA', sku: 'SP-NGK-CR7', category: 'Engine Parts', brand: 'NGK', price: 85, cost: 50, stock: 120, minStock: 30, supplier: 'Motortrade', compatibility: 'Honda, Yamaha' },
    { id: 2, name: 'Air Filter — Universal', sku: 'AF-UNI-001', category: 'Engine Parts', brand: 'Ferrox', price: 320, cost: 190, stock: 45, minStock: 15, supplier: 'Parts Hub', compatibility: 'Universal' },
    { id: 3, name: 'Engine Oil — 10W40 1L', sku: 'LUB-CAST-10W', category: 'Lubricants', brand: 'Castrol', price: 380, cost: 230, stock: 200, minStock: 50, supplier: 'Motortrade', compatibility: '4-stroke engines' },
    { id: 4, name: 'Piston Ring Set', sku: 'PR-HND-150', category: 'Engine Parts', brand: 'Honda OEM', price: 1200, cost: 800, stock: 20, minStock: 5, supplier: 'Honda PH', compatibility: 'Honda Wave 125/150' },
    { id: 5, name: 'Valve Clearance Shim Set', sku: 'VC-YAM-MIO', category: 'Engine Parts', brand: 'Yamaha OEM', price: 650, cost: 420, stock: 12, minStock: 5, supplier: 'Yamaha PH', compatibility: 'Yamaha Mio' },

    // Brake System
    { id: 6, name: 'Brake Pads — Disc (Front)', sku: 'BP-FRT-HON', category: 'Brake System', brand: 'Bendix', price: 450, cost: 280, stock: 60, minStock: 15, supplier: 'Parts Hub', compatibility: 'Honda, Kawasaki' },
    { id: 7, name: 'Brake Shoes — Drum Set', sku: 'BS-DRM-001', category: 'Brake System', brand: 'TRW', price: 280, cost: 170, stock: 55, minStock: 20, supplier: 'Parts Hub', compatibility: 'Honda Wave, Yamaha Sniper' },
    { id: 8, name: 'Brake Fluid DOT4 500ml', sku: 'BF-DOT4-500', category: 'Brake System', brand: 'Motul', price: 190, cost: 110, stock: 80, minStock: 20, supplier: 'Motortrade', compatibility: 'All disc brake systems' },
    { id: 9, name: 'Brake Cable — Rear', sku: 'BC-RR-UNI', category: 'Brake System', brand: 'Generic', price: 95, cost: 55, stock: 40, minStock: 10, supplier: 'Parts Hub', compatibility: 'Universal' },

    // Suspension
    { id: 10, name: 'Shock Absorber — Rear (Pair)', sku: 'SA-RR-YAM', category: 'Suspension', brand: 'YSS', price: 2800, cost: 1800, stock: 18, minStock: 5, supplier: 'YSS PH', compatibility: 'Yamaha series' },
    { id: 11, name: 'Fork Oil — 10W 500ml', sku: 'FO-10W-500', category: 'Suspension', brand: 'Fuchs', price: 240, cost: 140, stock: 35, minStock: 10, supplier: 'Parts Hub', compatibility: 'All telescopic forks' },
    { id: 12, name: 'Front Fork Seal Kit', sku: 'FS-KIT-UNI', category: 'Suspension', brand: 'All Balls', price: 480, cost: 300, stock: 22, minStock: 8, supplier: 'Parts Hub', compatibility: 'Universal 33mm-41mm' },

    // Electrical
    { id: 13, name: 'Motorcycle Battery 12V 5Ah', sku: 'BAT-12V-5A', category: 'Electrical', brand: 'Yuasa', price: 1400, cost: 900, stock: 25, minStock: 8, supplier: 'Yuasa PH', compatibility: 'Universal 12V' },
    { id: 14, name: 'Headlight Bulb H4 35/35W', sku: 'HB-H4-35W', category: 'Electrical', brand: 'Osram', price: 160, cost: 90, stock: 70, minStock: 20, supplier: 'Parts Hub', compatibility: 'Universal H4 fitting' },
    { id: 15, name: 'CDI Unit — Honda Wave', sku: 'CDI-HND-WV', category: 'Electrical', brand: 'Honda OEM', price: 1800, cost: 1200, stock: 10, minStock: 3, supplier: 'Honda PH', compatibility: 'Honda Wave 100/110/125' },
    { id: 16, name: 'Rectifier Regulator', sku: 'RR-UNI-001', category: 'Electrical', brand: 'Generic', price: 350, cost: 200, stock: 28, minStock: 8, supplier: 'Parts Hub', compatibility: 'Universal 12V AC/DC' },

    // Tires & Wheels
    { id: 17, name: 'Motorcycle Tire — 70/90-17 F', sku: 'TF-7090-17', category: 'Tires & Wheels', brand: 'IRC', price: 680, cost: 450, stock: 30, minStock: 10, supplier: 'IRC PH', compatibility: 'Underbone front 17"' },
    { id: 18, name: 'Motorcycle Tire — 80/90-17 R', sku: 'TR-8090-17', category: 'Tires & Wheels', brand: 'IRC', price: 750, cost: 500, stock: 28, minStock: 10, supplier: 'IRC PH', compatibility: 'Underbone rear 17"' },
    { id: 19, name: 'Tubeless Tire Sealant 500ml', sku: 'TS-SEA-500', category: 'Tires & Wheels', brand: 'Slime', price: 220, cost: 130, stock: 50, minStock: 15, supplier: 'Parts Hub', compatibility: 'Tubeless tires' },

    // Lubricants
    { id: 20, name: 'Gear Oil SAE90 140ml', sku: 'GO-SAE90-140', category: 'Lubricants', brand: 'Petron', price: 65, cost: 40, stock: 180, minStock: 40, supplier: 'Petron', compatibility: 'Manual transmission' },
    { id: 21, name: 'Chain Lube Spray 400ml', sku: 'CL-SPR-400', category: 'Lubricants', brand: 'Motul', price: 280, cost: 165, stock: 60, minStock: 15, supplier: 'Motortrade', compatibility: 'All drive chains' },
    { id: 22, name: 'Grease Multi-Purpose 200g', sku: 'GR-MP-200', category: 'Lubricants', brand: 'Shell', price: 120, cost: 70, stock: 90, minStock: 20, supplier: 'Parts Hub', compatibility: 'Universal' },

    // Motorcycle Parts
    { id: 23, name: 'Clutch Cable Assembly', sku: 'CC-HND-WV', category: 'Motorcycle Parts', brand: 'Honda OEM', price: 180, cost: 110, stock: 35, minStock: 10, supplier: 'Honda PH', compatibility: 'Honda Wave series' },
    { id: 24, name: 'Drive Chain 428H x 120L', sku: 'DC-428H-120', category: 'Motorcycle Parts', brand: 'DID', price: 620, cost: 400, stock: 22, minStock: 8, supplier: 'DID PH', compatibility: 'Underbone 428 pitch' },
    { id: 25, name: 'Sprocket Set (Front + Rear)', sku: 'SS-428-1415', category: 'Motorcycle Parts', brand: 'Rk Excel', price: 480, cost: 300, stock: 18, minStock: 6, supplier: 'Parts Hub', compatibility: '14T/41T 428 pitch' },
    { id: 26, name: 'Throttle Cable', sku: 'TC-UNI-001', category: 'Motorcycle Parts', brand: 'Generic', price: 120, cost: 70, stock: 40, minStock: 10, supplier: 'Parts Hub', compatibility: 'Universal' },

    // Accessories
    { id: 27, name: 'Side Mirror — Round Chrome', sku: 'SM-RND-CHR', category: 'Accessories', brand: 'Generic', price: 150, cost: 85, stock: 55, minStock: 10, supplier: 'Parts Hub', compatibility: 'Universal 8mm thread' },
    { id: 28, name: 'Handlebar Grips — Rubber', sku: 'HG-RBR-001', category: 'Accessories', brand: 'ProGrip', price: 180, cost: 100, stock: 48, minStock: 12, supplier: 'Parts Hub', compatibility: 'Universal 7/8"' },
    { id: 29, name: 'Phone Mount — Handlebar', sku: 'PM-HB-001', category: 'Accessories', brand: 'Generic', price: 220, cost: 120, stock: 30, minStock: 8, supplier: 'Parts Hub', compatibility: 'Universal' },
    { id: 30, name: 'Engine Guard / Crash Bar', sku: 'EG-CB-UNI', category: 'Accessories', brand: 'Generic', price: 1200, cost: 750, stock: 8, minStock: 3, supplier: 'Parts Hub', compatibility: 'Universal bolt-on' },
];

const TRANSACTIONS_DATA = [
    { id: 'TXN-00241', date: '2025-05-22 08:14', cashier: 'Maria Santos', items: 3, subtotal: 1230, discount: 0, vat: 132.43, total: 1362, method: 'Cash', status: 'Completed', customer: 'Walk-in Mechanic' },
    { id: 'TXN-00242', date: '2025-05-22 09:32', cashier: 'Maria Santos', items: 1, subtotal: 2800, discount: 280, vat: 273.60, total: 2793, method: 'GCash', status: 'Completed', customer: 'JM Repair Shop' },
    { id: 'TXN-00243', date: '2025-05-22 10:05', cashier: 'Carlo Reyes', items: 5, subtotal: 3560, discount: 0, vat: 383.57, total: 3943, method: 'Card', status: 'Completed', customer: 'Walk-in' },
    { id: 'TXN-00244', date: '2025-05-22 11:20', cashier: 'Maria Santos', items: 2, subtotal: 750, discount: 75, vat: 72.86, total: 747, method: 'Cash', status: 'Completed', customer: 'Walk-in Mechanic' },
    { id: 'TXN-00245', date: '2025-05-22 13:00', cashier: 'Carlo Reyes', items: 8, subtotal: 12400, discount: 1240, vat: 1209.64, total: 12369, method: 'Card', status: 'Completed', customer: 'RD Auto Supply (Bulk)' },
    { id: 'TXN-00246', date: '2025-05-22 14:48', cashier: 'Maria Santos', items: 2, subtotal: 1960, discount: 0, vat: 211.07, total: 2171, method: 'Maya', status: 'Completed', customer: 'Walk-in' },
    { id: 'TXN-00247', date: '2025-05-22 16:30', cashier: 'Maria Santos', items: 4, subtotal: 4250, discount: 425, vat: 414.64, total: 4239, method: 'Cash', status: 'Pending', customer: 'Bong Motorshop' },
];

const EMPLOYEES_DATA = [
    { name: 'Alex Rivera', role: 'Admin', email: 'admin@motortrack.com', avatar: 'A', status: 'Active', shift: 'Full-time', sales: '₱48,220' },
    { name: 'Maria Santos', role: 'Cashier', email: 'cashier@motortrack.com', avatar: 'M', status: 'Active', shift: 'Morning', sales: '₱38,450' },
    { name: 'Carlo Reyes', role: 'Parts Advisor', email: 'carlo@motortrack.com', avatar: 'C', status: 'Active', shift: 'Afternoon', sales: '₱29,780' },
    { name: 'Dana Cruz', role: 'Supervisor', email: 'dana@motortrack.com', avatar: 'D', status: 'On Leave', shift: 'Full-time', sales: '₱15,240' },
];

const NOTIFICATIONS_DATA = [
    { icon: 'bi-exclamation-triangle-fill', color: 'warn', title: 'Low Stock: Piston Ring Set', desc: 'Only 20 units left — below minimum 5', time: '10 min ago' },
    { icon: 'bi-exclamation-triangle-fill', color: 'warn', title: 'Low Stock: CDI Unit Honda Wave', desc: 'Only 10 units left — below minimum 3', time: '32 min ago' },
    { icon: 'bi-bag-check-fill', color: 'ok', title: 'Bulk Order Completed', desc: 'RD Auto Supply — ₱12,400 (TXN-00245)', time: '2 hr ago' },
    { icon: 'bi-truck', color: 'info', title: 'Restock Arriving Tomorrow', desc: 'Motortrade delivery: 48 SKUs expected', time: '4 hr ago' },
    { icon: 'bi-person-plus-fill', color: 'ok', title: 'New Employee Added', desc: 'Carlo Reyes — Parts Advisor', time: 'Yesterday' },
];

const TOP_PARTS = [
    { name: 'Spark Plug NGK CR7HSA', sales: 58, revenue: '₱4,930' },
    { name: 'Engine Oil Castrol 10W40', sales: 44, revenue: '₱16,720' },
    { name: 'Brake Pads — Disc Front', sales: 38, revenue: '₱17,100' },
    { name: 'Drive Chain DID 428H', sales: 31, revenue: '₱19,220' },
    { name: 'Motorcycle Tire IRC 80/90', sales: 27, revenue: '₱20,250' },
];

const LOW_STOCK_ALERTS = [
    { name: 'Piston Ring Set', stock: 20, min: 5 },
    { name: 'CDI Unit Honda Wave', stock: 10, min: 3 },
    { name: 'Engine Guard Crash Bar', stock: 8, min: 3 },
    { name: 'Valve Clearance Shim', stock: 12, min: 5 },
];

// ─── ADMIN INIT ───────────────────────────────────────────────

function initAdminPage() {
    renderRecentTransactions();
    renderTopParts();
    renderLowStockAlerts();
    renderProductsTable(PARTS);
    renderInventoryTable();
    renderTransactionsTable();
    renderEmployeeCards();
    renderNotifications();
    initCharts();
}

// ─── ADMIN PAGE SWITCHING ─────────────────────────────────────

function switchAdminPage(page, clickedLink) {
    document.querySelectorAll('.admin-page').forEach(s => s.classList.remove('active'));
    document.getElementById(`admin-${page}`).classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if (clickedLink) clickedLink.classList.add('active');

    const titles = {
        dashboard: 'Dashboard',
        reports: 'Sales Reports',
        products: 'Parts Catalog',
        inventory: 'Parts Inventory',
        transactions: 'Transactions',
        employees: 'Employees',
        settings: 'Settings'
    };
    document.getElementById('topbar-title').textContent = titles[page] || page;

    if (page === 'reports') initReportCharts();
}

function setMobileActive(el) {
    document.querySelectorAll('.mobile-nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
}

// ─── DASHBOARD RENDERS ────────────────────────────────────────

function renderRecentTransactions() {
    const tbody = document.getElementById('recent-transactions-body');
    if (!tbody) return;
    tbody.innerHTML = TRANSACTIONS_DATA.slice(0, 5).map(t => `
    <tr>
      <td><span class="txn-id">${t.id}</span></td>
      <td>${t.customer}</td>
      <td>${t.items} part${t.items !== 1 ? 's' : ''}</td>
      <td><strong>₱${t.total.toLocaleString()}</strong></td>
      <td><span class="method-badge">${t.method}</span></td>
      <td><span class="status-badge ${t.status === 'Completed' ? 'status-ok' : 'status-pending'}">${t.status}</span></td>
    </tr>
  `).join('');
}

function renderTopParts() {
    const el = document.getElementById('top-products-list');
    if (!el) return;
    el.innerHTML = TOP_PARTS.map((p, i) => `
    <div class="top-product-item">
      <div class="tp-rank">${i + 1}</div>
      <div class="tp-info">
        <div class="tp-name">${p.name}</div>
        <div class="tp-sales">${p.sales} sold</div>
      </div>
      <div class="tp-revenue">${p.revenue}</div>
    </div>
  `).join('');
}

function renderLowStockAlerts() {
    const el = document.getElementById('inventory-alerts-list');
    if (!el) return;
    el.innerHTML = LOW_STOCK_ALERTS.map(a => `
    <div class="inv-alert-item">
      <div class="inv-alert-name">${a.name}</div>
      <div class="inv-alert-stock">Stock: <strong>${a.stock}</strong> / Min: ${a.min}</div>
    </div>
  `).join('');
}

// ─── PRODUCTS / PARTS TABLE ───────────────────────────────────

function renderProductsTable(parts) {
    const tbody = document.getElementById('products-table-body');
    if (!tbody) return;
    tbody.innerHTML = parts.map(p => {
        const status = p.stock === 0 ? 'Out of Stock' : p.stock <= p.minStock ? 'Low Stock' : 'In Stock';
        const statusClass = p.stock === 0 ? 'status-out' : p.stock <= p.minStock ? 'status-low' : 'status-ok';
        return `
      <tr>
        <td>
          <div class="product-name-cell">
            <div class="product-cat-dot cat-${p.category.replace(/\s+/g,'').replace('&','').toLowerCase()}"></div>
            <div>
              <div class="fw-600">${p.name}</div>
              <div class="text-muted small">${p.compatibility}</div>
            </div>
          </div>
        </td>
        <td><code>${p.sku}</code></td>
        <td>${p.category}</td>
        <td><span class="fw-600">${p.brand}</span></td>
        <td>₱${p.price.toLocaleString()}</td>
        <td>${p.stock}</td>
        <td><span class="status-badge ${statusClass}">${status}</span></td>
        <td>
          <button class="tbl-action-btn" onclick="showToast('Editing ${p.name}','info')"><i class="bi bi-pencil"></i></button>
          <button class="tbl-action-btn danger" onclick="showToast('Part removed','error')"><i class="bi bi-trash3"></i></button>
        </td>
      </tr>
    `;
    }).join('');
}

function filterProducts() {
    const q = document.getElementById('product-search').value.toLowerCase();
    const cat = document.getElementById('product-cat-filter').value;
    const filtered = PARTS.filter(p => {
        const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
        const matchCat = !cat || p.category === cat;
        return matchQ && matchCat;
    });
    renderProductsTable(filtered);
}

// ─── INVENTORY TABLE ──────────────────────────────────────────

function renderInventoryTable() {
    const tbody = document.getElementById('inventory-table-body');
    if (!tbody) return;
    tbody.innerHTML = PARTS.map(p => {
        const pct = Math.min(100, Math.round((p.stock / (p.minStock * 4)) * 100));
        const barClass = pct < 25 ? 'bar-danger' : pct < 60 ? 'bar-warn' : 'bar-ok';
        const lastRestocked = `May ${Math.floor(Math.random() * 20) + 1}, 2025`;
        return `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.category}</td>
        <td>${p.stock}</td>
        <td>${p.minStock}</td>
        <td>
          <div class="stock-bar-wrap">
            <div class="stock-bar ${barClass}" style="width:${pct}%"></div>
          </div>
          <small class="text-muted">${pct}%</small>
        </td>
        <td>${lastRestocked}</td>
        <td>
          <button class="tbl-action-btn" onclick="showToast('Restock order created for ${p.name}','success')"><i class="bi bi-plus-circle"></i> Restock</button>
        </td>
      </tr>
    `;
    }).join('');
}

// ─── TRANSACTIONS TABLE ───────────────────────────────────────

function renderTransactionsTable() {
    const tbody = document.getElementById('transactions-table-body');
    if (!tbody) return;
    tbody.innerHTML = TRANSACTIONS_DATA.map(t => `
    <tr>
      <td><span class="txn-id">${t.id}</span></td>
      <td>${t.date}</td>
      <td>${t.cashier}</td>
      <td>${t.items}</td>
      <td>₱${t.subtotal.toLocaleString()}</td>
      <td>₱${t.discount.toLocaleString()}</td>
      <td><strong>₱${t.total.toLocaleString()}</strong></td>
      <td><span class="method-badge">${t.method}</span></td>
      <td><span class="status-badge ${t.status === 'Completed' ? 'status-ok' : 'status-pending'}">${t.status}</span></td>
    </tr>
  `).join('');
}

// ─── EMPLOYEE CARDS ───────────────────────────────────────────

function renderEmployeeCards() {
    const container = document.getElementById('employee-cards');
    if (!container) return;
    container.innerHTML = EMPLOYEES_DATA.map(e => `
    <div class="col-12 col-md-6 col-lg-3">
      <div class="employee-card">
        <div class="emp-avatar">${e.avatar}</div>
        <div class="emp-name">${e.name}</div>
        <div class="emp-role">${e.role}</div>
        <div class="emp-email">${e.email}</div>
        <div class="emp-stats">
          <div><span class="stat-label">Status</span><span class="status-badge ${e.status === 'Active' ? 'status-ok' : 'status-pending'}">${e.status}</span></div>
          <div><span class="stat-label">Shift</span> ${e.shift}</div>
          <div><span class="stat-label">Sales</span> <strong>${e.sales}</strong></div>
        </div>
        <div class="emp-actions">
          <button class="tbl-action-btn" onclick="showToast('Editing ${e.name}','info')"><i class="bi bi-pencil"></i> Edit</button>
        </div>
      </div>
    </div>
  `).join('');
}

// ─── NOTIFICATIONS ────────────────────────────────────────────

function renderNotifications() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    list.innerHTML = NOTIFICATIONS_DATA.map(n => `
    <div class="notif-item">
      <div class="notif-icon ${n.color}"><i class="bi ${n.icon}"></i></div>
      <div class="notif-content">
        <div class="notif-item-title">${n.title}</div>
        <div class="notif-item-desc">${n.desc}</div>
        <div class="notif-item-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function showNotifications() {
    document.getElementById('notif-panel').classList.add('open');
    document.getElementById('notif-overlay').classList.add('open');
}

function hideNotifications() {
    document.getElementById('notif-panel').classList.remove('open');
    document.getElementById('notif-overlay').classList.remove('open');
}

// ─── MODALS ───────────────────────────────────────────────────

function openProductModal() {
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

function saveProduct() {
    bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
    showToast('Part added to catalog!', 'success');
}

function openEmployeeModal() {
    const modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
}

function saveEmployee() {
    bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
    showToast('Employee added!', 'success');
}

// ─── SETTINGS ─────────────────────────────────────────────────

function switchSettings(panel, btn) {
    document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.settings-tab').forEach(b => b.classList.remove('active'));
    document.getElementById(`settings-${panel}`).classList.add('active');
    btn.classList.add('active');
}

// ─── CHARTS ───────────────────────────────────────────────────

let chartsInitialized = false;

function initCharts() {
    if (chartsInitialized) return;
    chartsInitialized = true;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridCol = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const textCol = isDark ? '#adb5bd' : '#6c757d';

    // Revenue line chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Revenue (₱)',
                    data: [28400, 32100, 29800, 41200, 38600, 52400, 38450],
                    borderColor: '#e63946',
                    backgroundColor: 'rgba(230,57,70,0.10)',
                    borderWidth: 2.5,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#e63946',
                    pointRadius: 4,
                }]
            },
            options: chartOptions(gridCol, textCol, '₱')
        });
    }

    // Category donut
    const catCtx = document.getElementById('categoryChart');
    const catLabels = ['Engine Parts', 'Brake System', 'Lubricants', 'Electrical', 'Tires & Wheels', 'Moto Parts', 'Accessories'];
    const catColors = ['#e63946', '#457b9d', '#f4a261', '#2a9d8f', '#264653', '#e9c46a', '#a8dadc'];
    const catData = [32, 18, 15, 12, 10, 8, 5];
    if (catCtx) {
        new Chart(catCtx, {
            type: 'doughnut',
            data: { labels: catLabels, datasets: [{ data: catData, backgroundColor: catColors, borderWidth: 2 }] },
            options: { cutout: '70%', plugins: { legend: { display: false } } }
        });
        const legend = document.getElementById('donut-legend');
        if (legend) {
            legend.innerHTML = catLabels.map((l, i) =>
                `<div class="legend-item"><span class="legend-dot" style="background:${catColors[i]}"></span>${l} <strong>${catData[i]}%</strong></div>`
            ).join('');
        }
    }
}

function initReportCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridCol = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
    const textCol = isDark ? '#adb5bd' : '#6c757d';

    const monthlyCtx = document.getElementById('monthlyChart');
    if (monthlyCtx && !monthlyCtx._chartInitialized) {
        monthlyCtx._chartInitialized = true;
        new Chart(monthlyCtx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [820000, 940000, 870000, 1010000, 1240000, 980000, 1050000, 1120000, 990000, 1080000, 1160000, 1300000],
                    backgroundColor: '#e63946',
                    borderRadius: 6
                }]
            },
            options: chartOptions(gridCol, textCol, '₱')
        });
    }

    const payCtx = document.getElementById('paymentChart');
    if (payCtx && !payCtx._chartInitialized) {
        payCtx._chartInitialized = true;
        new Chart(payCtx, {
            type: 'doughnut',
            data: {
                labels: ['Cash', 'Card', 'GCash', 'Maya'],
                datasets: [{ data: [45, 25, 20, 10], backgroundColor: ['#e63946', '#457b9d', '#2a9d8f', '#f4a261'], borderWidth: 2 }]
            },
            options: { cutout: '60%', plugins: { legend: { position: 'bottom', labels: { color: textCol } } } }
        });
    }

    const hourlyCtx = document.getElementById('hourlyChart');
    if (hourlyCtx && !hourlyCtx._chartInitialized) {
        hourlyCtx._chartInitialized = true;
        new Chart(hourlyCtx, {
            type: 'line',
            data: {
                labels: ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm'],
                datasets: [{
                    label: 'Sales',
                    data: [5, 12, 18, 24, 20, 16, 22, 28, 30, 25, 15],
                    borderColor: '#457b9d',
                    backgroundColor: 'rgba(69,123,157,0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    pointRadius: 3
                }]
            },
            options: chartOptions(gridCol, textCol, '')
        });
    }
}

function chartOptions(gridCol, textCol, prefix) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: { grid: { color: gridCol }, ticks: { color: textCol } },
            y: { grid: { color: gridCol }, ticks: { color: textCol, callback: v => prefix + (v >= 1000 ? (v / 1000) + 'k' : v) } }
        }
    };
}

// ─── POS / CASHIER ────────────────────────────────────────────

let cart = [];
let discountPct = 0;
let payMethod = 'Cash';
let posCategory = 'all';
let txnCounter = 248;

function initCashierPage() {
    renderPosGrid();
    startClock();
}

function startClock() {
    const el = document.getElementById('pos-time');
    if (!el) return;
    const tick = () => { el.textContent = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }); };
    tick();
    setInterval(tick, 1000);
}

function setPosCategory(cat, btn) {
    posCategory = cat;
    // Sync both sidebar and chip strip
    document.querySelectorAll('.pos-nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.cat-chip').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    filterPosProducts();
}

function filterPosProducts() {
    const q = (document.getElementById('pos-search').value || '').toLowerCase();
    const filtered = PARTS.filter(p => {
        const matchCat = posCategory === 'all' || p.category === posCategory;
        const matchQ = !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
        return matchCat && matchQ;
    });
    renderPosGrid(filtered);
}

function renderPosGrid(parts) {
    const list = parts || PARTS;
    const grid = document.getElementById('pos-product-grid');
    if (!grid) return;

    if (list.length === 0) {
        grid.innerHTML = `<div class="pos-empty"><i class="bi bi-search"></i><p>No parts found</p></div>`;
        return;
    }

    grid.innerHTML = list.map(p => {
                const outOfStock = p.stock === 0;
                return `
      <div class="pos-product-card ${outOfStock ? 'out-of-stock' : ''}" onclick="${outOfStock ? "showToast('Out of stock','error')" : `addToCart(${p.id})`}">
        <div class="pos-prod-icon"><i class="bi ${getCatIcon(p.category)}"></i></div>
        <div class="pos-prod-name">${p.name}</div>
        <div class="pos-prod-brand">${p.brand}</div>
        <div class="pos-prod-sku">${p.sku}</div>
        <div class="pos-prod-footer">
          <div class="pos-prod-price">₱${p.price.toLocaleString()}</div>
          <div class="pos-prod-stock ${p.stock <= p.minStock ? 'low' : ''}">${outOfStock ? 'OUT' : p.stock + ' left'}</div>
        </div>
      </div>
    `;
  }).join('');
}

function getCatIcon(cat) {
  const icons = {
    'Engine Parts':    'bi-cpu',
    'Brake System':    'bi-stop-circle',
    'Suspension':      'bi-arrows-vertical',
    'Electrical':      'bi-lightning-charge',
    'Tires & Wheels':  'bi-circle',
    'Lubricants':      'bi-droplet-half',
    'Motorcycle Parts':'bi-bicycle',
    'Accessories':     'bi-wrench',
  };
  return icons[cat] || 'bi-tools';
}

// ─── CART ─────────────────────────────────────────────────────

function addToCart(partId) {
  const part = PARTS.find(p => p.id === partId);
  if (!part) return;
  const existing = cart.find(i => i.id === partId);
  if (existing) {
    if (existing.qty < part.stock) existing.qty++;
    else { showToast('Max stock reached', 'error'); return; }
  } else {
    cart.push({ id: part.id, name: part.name, price: part.price, qty: 1 });
  }
  renderCart();
  showToast(`${part.name} added`, 'success');
}

function updateQty(partId, delta) {
  const item = cart.find(i => i.id === partId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(i => i.id !== partId);
  renderCart();
}

function removeFromCart(partId) {
  cart = cart.filter(i => i.id !== partId);
  renderCart();
}

function clearCart() {
  cart = [];
  discountPct = 0;
  document.getElementById('custom-discount').value = '';
  renderCart();
}

function renderCart() {
  const listEl   = document.getElementById('cart-items-list');
  const emptyEl  = document.getElementById('cart-empty');
  const countBadge = document.getElementById('cart-count-badge');

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  if (countBadge) countBadge.textContent = totalQty;

  if (cart.length === 0) {
    listEl.innerHTML = '';
    emptyEl.style.display = 'flex';
    updateTotals(0, 0, 0);
    return;
  }

  emptyEl.style.display = 'none';
  listEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">₱${item.price.toLocaleString()} each</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
        <span class="qty-val">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        <button class="qty-btn remove" onclick="removeFromCart(${item.id})"><i class="bi bi-x"></i></button>
      </div>
      <div class="cart-item-total">₱${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  const subtotal  = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discAmt   = subtotal * (discountPct / 100);
  const afterDisc = subtotal - discAmt;
  const vat       = afterDisc * 0.12 / 1.12; // VAT-inclusive
  const total     = afterDisc;
  updateTotals(subtotal, discAmt, vat, total);
}

function updateTotals(subtotal, discAmt, vat, total) {
  const t = total ?? subtotal - discAmt;
  document.getElementById('cart-subtotal').textContent   = `₱${subtotal.toFixed(2)}`;
  document.getElementById('cart-discount').textContent   = `-₱${discAmt.toFixed(2)}`;
  document.getElementById('cart-vat').textContent        = `₱${(vat || 0).toFixed(2)}`;
  document.getElementById('cart-total').textContent      = `₱${t.toFixed(2)}`;
  document.getElementById('checkout-total').textContent  = `₱${t.toFixed(2)}`;
  document.getElementById('disc-pct').textContent        = discountPct;
  calcChange();
}

function applyDiscount(pct) {
  discountPct = Math.min(100, Math.max(0, parseFloat(pct) || 0));
  renderCart();
}

function selectPayMethod(method, btn) {
  payMethod = method;
  document.querySelectorAll('.pay-method-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('cash-tendered-wrap').style.display = method === 'Cash' ? 'block' : 'none';
}

function setTendered(val) {
  const total = parseFloat(document.getElementById('cart-total').textContent.replace('₱','').replace(',','')) || 0;
  document.getElementById('cash-tendered').value = val === 'exact' ? total.toFixed(2) : val;
  calcChange();
}

function calcChange() {
  const total    = parseFloat(document.getElementById('cart-total').textContent.replace('₱','').replace(',','')) || 0;
  const tendered = parseFloat(document.getElementById('cash-tendered').value) || 0;
  const change   = tendered - total;
  document.getElementById('change-display').textContent = `Change: ₱${Math.max(0, change).toFixed(2)}`;
  document.getElementById('change-display').style.color = change < 0 ? '#e63946' : '';
}

function processPayment() {
  if (cart.length === 0) { showToast('Cart is empty', 'error'); return; }
  const total    = parseFloat(document.getElementById('cart-total').textContent.replace('₱','').replace(',','')) || 0;
  const tendered = parseFloat(document.getElementById('cash-tendered').value) || 0;
  if (payMethod === 'Cash' && tendered < total) { showToast('Insufficient cash tendered', 'error'); return; }
  showReceipt(total, tendered);
}

function showReceipt(total, tendered) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discAmt  = subtotal * (discountPct / 100);
  const vat      = (subtotal - discAmt) * 0.12 / 1.12;
  const change   = payMethod === 'Cash' ? tendered - total : 0;
  const txnId    = `TXN-${String(txnCounter++).padStart(5,'0')}`;

  document.getElementById('r-txn').textContent     = txnId;
  document.getElementById('r-date').textContent    = new Date().toLocaleString('en-PH');
  document.getElementById('r-method').textContent  = payMethod;
  document.getElementById('r-subtotal').textContent= `₱${subtotal.toFixed(2)}`;
  document.getElementById('r-discount').textContent= `-₱${discAmt.toFixed(2)}`;
  document.getElementById('r-vat').textContent     = `₱${vat.toFixed(2)}`;
  document.getElementById('r-total').textContent   = `₱${total.toFixed(2)}`;
  document.getElementById('r-tendered').textContent= payMethod === 'Cash' ? `₱${tendered.toFixed(2)}` : '—';
  document.getElementById('r-change').textContent  = payMethod === 'Cash' ? `₱${change.toFixed(2)}` : '—';
  document.getElementById('cart-txn-id').textContent = String(txnCounter).padStart(5,'0');

  document.getElementById('receipt-items').innerHTML = cart.map(i =>
    `<div class="receipt-item">
      <span>${i.name} x${i.qty}</span>
      <span>₱${(i.price * i.qty).toFixed(2)}</span>
    </div>`
  ).join('');

  new bootstrap.Modal(document.getElementById('receiptModal')).show();
  clearCart();
}

function printReceipt() {
  const content = document.getElementById('receipt-paper').innerHTML;
  const win = window.open('', '_blank');
  win.document.write(`<html><body style="font-family:monospace;font-size:13px;">${content}</body></html>`);
  win.document.close();
  win.print();
}

// ─── MOBILE CART ──────────────────────────────────────────────

function toggleMobileCart() {
  document.getElementById('pos-cart-panel').classList.toggle('mobile-open');
}

// ─── SIDEBAR ──────────────────────────────────────────────────

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open');
}

// ─── THEME ────────────────────────────────────────────────────

function toggleTheme() {
  const html  = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('theme-icon').className = isDark ? 'bi bi-moon-stars' : 'bi bi-sun';
}

// ─── TOAST ────────────────────────────────────────────────────

function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  const icons = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', info: 'bi-info-circle-fill', warn: 'bi-exclamation-triangle-fill' };
  toast.className = `toast-item toast-${type}`;
  toast.innerHTML = `<i class="bi ${icons[type] || icons.info}"></i> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 400); }, 2800);
}