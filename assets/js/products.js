/* ============================================
   Invenza — Products JavaScript
   Product management interactions
   ============================================ */

'use strict';

/* ============================================
   Demo Product Data
   ============================================ */
const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', sku: 'WM-001', category: 'Electronics', brand: 'Logitech', stock: 45, minStock: 10, purchasePrice: 15.00, sellingPrice: 29.99, status: 'Active', created: '2026-01-15', image: '../assets/img/products/mouse.jpg' },
  { id: 2, name: 'Mechanical Keyboard', sku: 'MK-002', category: 'Electronics', brand: 'Corsair', stock: 23, minStock: 10, purchasePrice: 55.00, sellingPrice: 89.99, status: 'Active', created: '2026-01-16', image: '../assets/img/products/keyboard.jpg' },
  { id: 3, name: 'USB-C Hub', sku: 'UH-003', category: 'Electronics', brand: 'Anker', stock: 18, minStock: 15, purchasePrice: 25.00, sellingPrice: 49.99, status: 'Active', created: '2026-01-17', image: '../assets/img/products/usb.jpg' },
  { id: 4, name: 'Laptop Stand', sku: 'LS-004', category: 'Accessories', brand: 'Rain Design', stock: 3, minStock: 10, purchasePrice: 22.00, sellingPrice: 39.99, status: 'Active', created: '2026-01-18', image: '../assets/img/products/laptop-stand.jpg' },
  { id: 5, name: 'Bluetooth Speaker', sku: 'BS-005', category: 'Electronics', brand: 'JBL', stock: 0, minStock: 5, purchasePrice: 45.00, sellingPrice: 79.99, status: 'Inactive', created: '2026-01-19', image: '../assets/img/products/speeker.jpg' },
  { id: 6, name: 'Webcam HD', sku: 'WC-006', category: 'Electronics', brand: 'Logitech', stock: 14, minStock: 10, purchasePrice: 40.00, sellingPrice: 69.99, status: 'Active', created: '2026-01-20', image: '../assets/img/products/webcam.jpg' },
  { id: 7, name: 'Power Bank', sku: 'PB-007', category: 'Electronics', brand: 'Anker', stock: 27, minStock: 10, purchasePrice: 25.00, sellingPrice: 44.99, status: 'Active', created: '2026-01-21', image: '../assets/img/products/powerbank.jpg' },
  { id: 8, name: 'HDMI Cable', sku: 'HC-008', category: 'Accessories', brand: 'AmazonBasics', stock: 64, minStock: 20, purchasePrice: 7.00, sellingPrice: 14.99, status: 'Active', created: '2026-01-22', image: '../assets/img/products/hdmi-cable.jpg' },
  { id: 9, name: 'Wireless Headphones', sku: 'WH-009', category: 'Electronics', brand: 'Sony', stock: 5, minStock: 8, purchasePrice: 90.00, sellingPrice: 149.99, status: 'Active', created: '2026-01-23', image: '../assets/img/products/headphone.jpg' },
  { id: 10, name: 'Office Chair', sku: 'OC-010', category: 'Furniture', brand: 'Steelcase', stock: 4, minStock: 3, purchasePrice: 180.00, sellingPrice: 299.99, status: 'Active', created: '2026-01-24', image: '../assets/img/products/chair.jpg' },
  { id: 11, name: 'Monitor Stand', sku: 'MS-011', category: 'Accessories', brand: 'Jarvis', stock: 19, minStock: 10, purchasePrice: 20.00, sellingPrice: 35.99, status: 'Active', created: '2026-02-01', image: '../assets/img/products/laptop-stand.jpg' },
  { id: 12, name: 'Desk Lamp', sku: 'DL-012', category: 'Furniture', brand: 'BenQ', stock: 33, minStock: 10, purchasePrice: 14.00, sellingPrice: 24.99, status: 'Active', created: '2026-02-02', image: '../assets/img/products/webcam.jpg' },
  { id: 13, name: 'Ergonomic Mouse Pad', sku: 'EM-013', category: 'Accessories', brand: 'Kensington', stock: 51, minStock: 15, purchasePrice: 8.00, sellingPrice: 19.99, status: 'Active', created: '2026-02-03', image: '../assets/img/products/mouse.jpg' },
  { id: 14, name: 'USB Flash Drive 64GB', sku: 'UFD-014', category: 'Electronics', brand: 'SanDisk', stock: 82, minStock: 20, purchasePrice: 8.00, sellingPrice: 16.99, status: 'Active', created: '2026-02-04', image: '../assets/img/products/usb.jpg' },
  { id: 15, name: 'Wireless Charger', sku: 'WCH-015', category: 'Electronics', brand: 'Anker', stock: 2, minStock: 8, purchasePrice: 18.00, sellingPrice: 34.99, status: 'Active', created: '2026-02-05', image: '../assets/img/products/powerbank.jpg' },
];

/* ============================================
   Stock Status Helper
   ============================================ */
function getStockBadge(stock, minStock) {
  if (stock === 0) return '<span class="badge badge-danger">Out of Stock</span>';
  if (stock <= minStock) return '<span class="badge badge-warning">Low Stock</span>';
  return '<span class="badge badge-success">In Stock</span>';
}

/* ============================================
   Render Product Row
   ============================================ */
function renderProductRow(p) {
  return `
    <tr>
      <td>
        <input type="checkbox" class="row-checkbox" value="${p.id}" style="width:16px;height:16px;accent-color:var(--primary);cursor:pointer;">
      </td>
      <td>
        <div style="display:flex;align-items:center;gap:10px;">
          <img src="${p.image}" alt="${p.name}" style="width:38px;height:38px;border-radius:10px;object-fit:cover;flex-shrink:0;background:#f1f5f9;">
          <div>
            <a href="../inventory/product-details.html" style="font-size:13px;font-weight:600;color:var(--text);text-decoration:none;">${p.name}</a>
            <div style="font-size:11px;color:var(--muted);">${p.brand}</div>
          </div>
        </div>
      </td>
      <td style="font-size:12px;font-weight:600;color:var(--muted);font-family:monospace;">${p.sku}</td>
      <td style="font-size:13px;color:var(--text);">${p.category}</td>
      <td>${getStockBadge(p.stock, p.minStock)}</td>
      <td style="font-size:13px;color:var(--text);">${p.stock}</td>
      <td style="font-size:13px;color:var(--text);">$${p.purchasePrice.toFixed(2)}</td>
      <td style="font-size:13px;font-weight:600;color:var(--primary);">$${p.sellingPrice.toFixed(2)}</td>
      <td><span class="badge ${p.status === 'Active' ? 'badge-success' : 'badge-gray'}">${p.status}</span></td>
      <td style="font-size:12px;color:var(--muted);">${p.created}</td>
      <td>
        <div class="action-dropdown-wrapper" style="position:relative;">
          <button class="btn btn-ghost btn-icon action-btn" style="padding:6px;" title="Actions">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
          </button>
          <div class="dropdown-menu action-dropdown-menu" style="display:none;right:0;min-width:160px;">
            <a href="../inventory/product-details.html" class="dropdown-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View Details
            </a>
            <a href="../inventory/add-product.html" class="dropdown-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit Product
            </a>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item danger" onclick="deleteProduct(${p.id})">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              Delete
            </button>
          </div>
        </div>
      </td>
    </tr>
  `;
}

/* ============================================
   Delete Product
   ============================================ */
function deleteProduct(id) {
  const product = PRODUCTS.find(p => p.id === id);
  Modal.confirm({
    title: 'Delete Product',
    message: `Are you sure you want to delete "<strong>${product?.name}</strong>"? This action cannot be undone.`,
    type: 'danger',
    confirmText: 'Delete Product',
    onConfirm: () => {
      Toast.success('Product deleted successfully.', 'Product Deleted');
      // In a real app, remove from PRODUCTS and re-render
    }
  });
}

/* ============================================
   Products Table Init
   ============================================ */
function initProductsTable() {
  const dt = new DataTable({
    tableId: 'products-table',
    data: PRODUCTS,
    pageSize: 10,
    renderRow: renderProductRow,
  });

  makeSortable('products-table', dt);

  // Search
  const searchEl = document.getElementById('products-search');
  if (searchEl) {
    searchEl.addEventListener('input', function() { dt.search(this.value); });
  }

  // Category filter
  const catFilter = document.getElementById('products-category-filter');
  if (catFilter) {
    catFilter.addEventListener('change', function() { dt.filter('category', this.value); });
  }

  // Stock status filter
  const stockFilter = document.getElementById('products-stock-filter');
  if (stockFilter) {
    stockFilter.addEventListener('change', function() {
      const val = this.value;
      if (val === 'all') {
        delete dt.filters['_stock'];
        dt.filtered = [...dt.data];
        if (dt.searchQuery) dt.applyFilters();
        else dt.applyFilters();
        return;
      }
      // Custom filter
      const original = dt.applyFilters.bind(dt);
      dt.data = PRODUCTS.filter(p => {
        if (val === 'in-stock') return p.stock > p.minStock;
        if (val === 'low-stock') return p.stock > 0 && p.stock <= p.minStock;
        if (val === 'out-of-stock') return p.stock === 0;
        return true;
      });
      dt.applyFilters();
      dt.data = PRODUCTS;
    });
  }

  // Select all
  initSelectAll('products-table');

  window.deleteProduct = deleteProduct;
  return dt;
}

/* ============================================
   Add Product Form
   ============================================ */
function initAddProductForm() {
  const form = document.getElementById('add-product-form');
  if (!form) return;

  // Image upload preview
  const imageInput = document.getElementById('product-image');
  const preview = document.getElementById('image-preview');
  const uploadZone = document.getElementById('upload-zone');

  if (imageInput && preview && uploadZone) {
    uploadZone.addEventListener('click', () => imageInput.click());
    uploadZone.addEventListener('dragover', (e) => { e.preventDefault(); uploadZone.classList.add('dragover'); });
    uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) showPreview(file);
    });
    imageInput.addEventListener('change', function() {
      if (this.files[0]) showPreview(this.files[0]);
    });

    function showPreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.innerHTML = `<img src="${e.target.result}" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">`;
        preview.style.display = 'block';
        uploadZone.style.display = 'none';
      };
      reader.readAsDataURL(file);
    }
  }

  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('product-name')?.value;
    if (!name) {
      Toast.error('Product name is required.', 'Validation Error');
      return;
    }
    Toast.success(`Product "${name}" added successfully!`, 'Product Added');
    setTimeout(() => { window.location.href = 'products.html'; }, 1500);
  });

  // Save & New button
  const saveNewBtn = document.getElementById('save-new-btn');
  saveNewBtn && saveNewBtn.addEventListener('click', () => {
    const name = document.getElementById('product-name')?.value;
    if (!name) { Toast.error('Product name is required.'); return; }
    Toast.success(`Product "${name}" added! Form reset for new entry.`, 'Product Added');
    form.reset();
  });
}

/* ============================================
   Stock Adjustment
   ============================================ */
function initStockAdjustment() {
  const productSelect = document.getElementById('adj-product');
  const typeSelect = document.getElementById('adj-type');
  const qtyInput = document.getElementById('adj-quantity');
  const currentEl = document.getElementById('adj-current-stock');
  const newStockEl = document.getElementById('adj-new-stock');

  const stocks = { 1: 45, 2: 23, 3: 18, 4: 3, 5: 0, 6: 14 };

  function updateCalculation() {
    const productId = parseInt(productSelect?.value);
    const type = typeSelect?.value;
    const qty = parseInt(qtyInput?.value) || 0;
    const current = stocks[productId] || 0;

    if (currentEl) currentEl.textContent = current;

    let newStock = current;
    if (['add-stock'].includes(type)) newStock = current + qty;
    else if (['remove-stock','damage','lost','expired'].includes(type)) newStock = Math.max(0, current - qty);
    else if (type === 'correction') newStock = qty;

    if (newStockEl) {
      newStockEl.textContent = newStock;
      newStockEl.style.color = newStock <= 0 ? '#EF4444' : newStock < 10 ? '#F59E0B' : 'var(--primary)';
    }
  }

  productSelect && productSelect.addEventListener('change', updateCalculation);
  typeSelect && typeSelect.addEventListener('change', updateCalculation);
  qtyInput && qtyInput.addEventListener('input', updateCalculation);

  const form = document.getElementById('adj-form');
  form && form.addEventListener('submit', function(e) {
    e.preventDefault();
    Toast.success('Stock adjustment saved successfully!', 'Adjustment Saved');
    this.reset();
    updateCalculation();
  });
}

/* ============================================
   Init on DOM Ready
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (document.getElementById('products-table'))     initProductsTable();
    if (document.getElementById('add-product-form'))   initAddProductForm();
    if (document.getElementById('adj-form'))           initStockAdjustment();
  }, 300);
});

window.deleteProduct = deleteProduct;
