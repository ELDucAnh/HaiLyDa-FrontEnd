/* ============================================
   Invenza — POS / Add Sale JavaScript
   Cart Management System
   ============================================ */

'use strict';

/* ============================================
   Product Catalog
   ============================================ */
const POS_PRODUCTS = [
  {
    id: 1,
    name: 'Trà sữa trân châu',
    sku: 'TS01',
    price: 39000,
    stock: 45,
    category: 'milk-tea'
  },
  {
    id: 2,
    name: 'Trà sữa ô long',
    sku: 'TS02',
    price: 39000,
    stock: 35,
    category: 'milk-tea'
  },
  {
    id: 3,
    name: 'Trà sữa matcha',
    sku: 'TS03',
    price: 45000,
    stock: 30,
    category: 'milk-tea'
  },
  {
    id: 4,
    name: 'Trà sữa khoai môn',
    sku: 'TS04',
    price: 42000,
    stock: 28,
    category: 'milk-tea'
  },
  {
    id: 5,
    name: 'Trà sữa chocolate',
    sku: 'TS05',
    price: 42000,
    stock: 32,
    category: 'milk-tea'
  },
  {
    id: 6,
    name: 'Trà sữa đường đen',
    sku: 'TS06',
    price: 45000,
    stock: 25,
    category: 'milk-tea'
  },
  {
    id: 7,
    name: 'Trà đào',
    sku: 'TT01',
    price: 35000,
    stock: 40,
    category: 'fruit-tea'
  },
  {
    id: 8,
    name: 'Trà vải',
    sku: 'TT02',
    price: 35000,
    stock: 36,
    category: 'fruit-tea'
  },
  {
    id: 9,
    name: 'Trà chanh dây',
    sku: 'TT03',
    price: 35000,
    stock: 30,
    category: 'fruit-tea'
  },
  {
    id: 10,
    name: 'Trà xoài',
    sku: 'TT04',
    price: 39000,
    stock: 24,
    category: 'fruit-tea'
  },
  {
    id: 11,
    name: 'Trà dâu hibiscus',
    sku: 'MM01',
    price: 42000,
    stock: 18,
    category: 'seasonal'
  },
  {
    id: 12,
    name: 'Trà sen nhãn',
    sku: 'MM02',
    price: 45000,
    stock: 20,
    category: 'seasonal'
  }
];

/* ============================================
   Cart State
   ============================================ */
let cart = [];
let posDiscount = 0;
let posTax = 10; // %
let posCustomer = null;

/* ============================================
   POS Initialize
   ============================================ */
function initPOS() {
  renderProductGrid(POS_PRODUCTS);
  bindPOSEvents();
  updateCart();
}

/* ============================================
   Render Product Grid
   ============================================ */
function renderProductGrid(products) {
  const grid = document.getElementById('pos-product-grid');
  if (!grid) return;

  if (products.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full flex flex-col items-center justify-center py-10 text-center">
        <svg class="mb-3 text-[var(--muted)]" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <div class="text-[15px] font-semibold text-[var(--text)]">Không tìm thấy món</div>
        <div class="text-[13px] text-[var(--muted)] mt-1">Thử từ khóa khác</div>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map((p, i) => {
    const inCart = cart.find(c => c.id === p.id);

    return `
    <button type="button"
            class="pos-product-card min-w-0 text-left ${inCart ? 'in-cart' : ''}"
            onclick="addToCart(${p.id})"
            data-product-id="${p.id}">

      <span class="relative flex items-center justify-center
                   w-full h-[100px] rounded-[10px] mb-2.5
                   overflow-hidden bg-[var(--background)]">

        <img src="${p.img}"
             alt=""
             class="w-full h-full object-cover">

        ${inCart ? `
          <span class="absolute top-1.5 right-1.5
                       flex items-center justify-center
                       w-[22px] h-[22px] rounded-full
                       bg-[var(--primary)] text-white">
            <svg width="12" height="12" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor"
                 stroke-width="3"
                 stroke-linecap="round"
                 stroke-linejoin="round"
                 aria-hidden="true">
              <path d="m5 12 4 4L19 6"/>
            </svg>
          </span>
        ` : ''}

      </span>

      <span class="block text-xs font-semibold
                   text-[var(--text)] leading-tight mb-1">
        ${p.name}
      </span>

      <span class="block text-[11px] text-[var(--muted)] mb-1.5">
        ${p.sku}
      </span>

      <span class="flex items-center justify-between gap-2">
        <span class="text-[13px] font-bold text-[var(--primary)]">
          ${p.price.toLocaleString('vi-VN')} ₫
        </span>

        <span class="text-[10px] ${p.stock < 10 ? 'text-red-600' : 'text-[var(--muted)]'}">
          Còn: ${p.stock}
        </span>
      </span>

    </button>
  `;
  }).join('');
}

/* ============================================
   Add to Cart
   ============================================ */
function addToCart(productId) {
  const product = POS_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (product.stock === 0) {
    Toast.warning('Món này đã hết hàng.', 'Hết hàng');
    return;
  }

  const existing = cart.find(c => c.id === productId);
  if (existing) {
    if (existing.qty >= product.stock) {
      Toast.warning(`Chỉ còn ${product.stock} đơn vị khả dụng.`, 'Giới hạn tồn kho');
      return;
    }
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCart();
  updateProductGrid();
}

/* ============================================
   Update Quantity
   ============================================ */
function updateQty(productId, delta) {
  const item = cart.find(c => c.id === productId);
  if (!item) return;

  const product = POS_PRODUCTS.find(p => p.id === productId);
  const newQty = item.qty + delta;

  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }

  if (product && newQty > product.stock) {
    Toast.warning(`Chỉ còn ${product.stock} đơn vị khả dụng.`, 'Giới hạn tồn kho');
    return;
  }

  item.qty = newQty;
  updateCart();
}

/* ============================================
   Remove from Cart
   ============================================ */
function removeFromCart(productId) {
  cart = cart.filter(c => c.id !== productId);
  updateCart();
  updateProductGrid();
}

/* ============================================
   Update Cart UI
   ============================================ */
function updateCart() {
  renderCartItems();
  calculateTotals();
  updateCartCount();
}

function renderCartItems() {
  const cartEl = document.getElementById('pos-cart-items');
  if (!cartEl) return;

  if (cart.length === 0) {
    cartEl.innerHTML = `
      <div class="flex flex-col items-center justify-center py-10 text-center">
        <div class="w-14 h-14 rounded-full bg-[var(--background)] flex items-center justify-center mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        </div>
        <div class="text-sm font-semibold text-[var(--text)]">Giỏ hàng đang trống</div>
        <div class="text-xs text-[var(--muted)] mt-1">Chọn món để thêm vào giỏ</div>
      </div>
    `;
    return;
  }

  cartEl.innerHTML = cart.map(item => `
    <div class="flex items-center gap-2.5 py-3 border-b border-[var(--border)] cart-item-enter">
      <div class="flex-1 min-w-0">
        <div class="text-[13px] font-semibold text-[var(--text)] truncate">${item.name}</div>
        <div class="text-[11px] text-[var(--muted)]">$${item.price.toFixed(2)} / món</div>
      </div>
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <button onclick="updateQty(${item.id}, -1)" class="w-[26px] h-[26px] rounded-lg border border-[var(--border)] bg-[var(--surface)] flex items-center justify-center text-[var(--muted)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
        <span class="text-[13px] font-semibold text-[var(--text)] min-w-[22px] text-center">${item.qty}</span>
        <button onclick="updateQty(${item.id}, 1)" class="w-[26px] h-[26px] rounded-lg bg-[var(--primary)] flex items-center justify-center text-white hover:bg-[var(--primary-dark)] transition-all">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
        </button>
      </div>
      <div class="text-right flex-shrink-0 min-w-[60px]">
        <div class="text-[13px] font-bold text-[var(--text)]">$${(item.price * item.qty).toFixed(2)}</div>
        <button onclick="removeFromCart(${item.id})" class="border-none bg-transparent cursor-pointer text-red-500 hover:text-red-700 p-0 text-[11px] mt-0.5 font-medium transition-colors">Xóa</button>
      </div>
    </div>
  `).join('');
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = (subtotal * posDiscount) / 100;
  const taxAmount = ((subtotal - discount) * posTax) / 100;
  const total = subtotal - discount + taxAmount;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  set('pos-subtotal', `$${subtotal.toFixed(2)}`);
  set('pos-discount', `-$${discount.toFixed(2)}`);
  set('pos-tax', `$${taxAmount.toFixed(2)}`);
  set('pos-total', `$${total.toFixed(2)}`);
  set('pos-total-label', `$${total.toFixed(2)}`);

  // Update change
  const paid = parseFloat(document.getElementById('pos-paid-amount')?.value || 0);
  const change = paid - total;
  const changeEl = document.getElementById('pos-change');
  if (changeEl) {
    changeEl.textContent = paid > 0 ? `$${Math.max(0, change).toFixed(2)}` : '$0.00';
    changeEl.className = `h-11 rounded-xl flex items-center px-3.5 font-bold text-sm ${change >= 0 ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-red-50 border border-red-200 text-red-600'}`;
  }
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.getElementById('pos-cart-count');
  if (countEl) {
    countEl.textContent = count;
    countEl.style.display = count > 0 ? 'inline-flex' : 'none';
  }
}

function updateProductGrid() {
  const cards = document.querySelectorAll('.pos-product-card');
  cards.forEach(card => {
    const id = parseInt(card.dataset.productId);
    const inCart = cart.find(c => c.id === id);
    if (inCart) {
      card.classList.add('in-cart');
    } else {
      card.classList.remove('in-cart');
    }
  });
}

/* ============================================
   Complete Sale
   ============================================ */
function completeSale() {
  if (cart.length === 0) {
    Toast.warning('Vui lòng thêm ít nhất một món vào giỏ hàng.', 'Giỏ hàng trống');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = (subtotal * posDiscount) / 100;
  const tax = ((subtotal - discount) * posTax) / 100;
  const total = subtotal - discount + tax;

  Modal.show({
    title: 'Hoàn tất bán hàng',
    size: 'sm',
    body: `
      <div class="text-center mb-5">
        <div class="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <div class="text-[17px] font-bold text-[var(--text)]">Xác nhận bán hàng</div>
        <div class="text-[13px] text-[var(--muted)] mt-1">${cart.length} loại món &middot; ${cart.reduce((s,i)=>s+i.qty,0)} đơn vị</div>
      </div>
      <div class="bg-[var(--background)] rounded-xl p-4 mb-4">
        <div class="flex justify-between mb-2 text-[13px]">
          <span class="text-[var(--muted)]">Tạm tính</span>
          <span class="text-[var(--text)] font-medium">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="flex justify-between mb-2 text-[13px]">
          <span class="text-[var(--muted)]">Giảm giá (${posDiscount}%)</span>
          <span class="text-red-600 font-medium">-$${discount.toFixed(2)}</span>
        </div>
        <div class="flex justify-between mb-3 text-[13px]">
          <span class="text-[var(--muted)]">Thuế (${posTax}%)</span>
          <span class="text-[var(--text)] font-medium">$${tax.toFixed(2)}</span>
        </div>
        <div class="flex justify-between text-[16px] font-bold border-t border-[var(--border)] pt-3">
          <span class="text-[var(--text)]">Tổng thanh toán</span>
          <span class="text-[var(--primary)]">$${total.toFixed(2)}</span>
        </div>
      </div>
      <div>
        <label class="form-label">Phương thức thanh toán</label>
        <select class="form-input form-select" id="sale-payment-method">
          <option value="Cash">Tiền mặt</option>
          <option value="Credit Card">Thẻ tín dụng</option>
          <option value="Bank Transfer">Chuyển khoản</option>
          <option value="Mobile Payment">Thanh toán di động</option>
        </select>
      </div>
    `,
    footer: `
      <button class="btn btn-secondary" onclick="this.closest('.modal-backdrop').remove()">Hủy</button>
      <button class="btn btn-primary" onclick="processSale()">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Hoàn tất bán hàng
      </button>
    `
  });
}

function processSale() {
  document.querySelector('.modal-backdrop')?.remove();
  cart = [];
  posDiscount = 0;
  updateCart();
  renderProductGrid(POS_PRODUCTS);

  Toast.success('Đã hoàn tất đơn INV-000126!', 'Đã hoàn tất bán hàng');

  // Optionally reset discount input
  const discountInput = document.getElementById('pos-discount-input');
  if (discountInput) discountInput.value = '';
}

/* ============================================
   Bind POS Events
   ============================================ */
function bindPOSEvents() {
  // Product search
  const searchEl = document.getElementById('pos-search');
  if (searchEl) {
    searchEl.addEventListener('input', function() {
      const q = this.value.toLowerCase();
      const filtered = POS_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
      renderProductGrid(filtered);
    });
  }

  // Category filter
  const catFilter = document.getElementById('pos-category-filter');
  if (catFilter) {
    catFilter.addEventListener('change', function() {
      const cat = this.value;
      const filtered = cat === 'all' ? POS_PRODUCTS : POS_PRODUCTS.filter(p => p.category === cat);
      renderProductGrid(filtered);
    });
  }

  // Discount
  const discountInput = document.getElementById('pos-discount-input');
  if (discountInput) {
    discountInput.addEventListener('input', function() {
      posDiscount = Math.min(100, Math.max(0, parseFloat(this.value) || 0));
      calculateTotals();
    });
  }

  // Tax
  const taxInput = document.getElementById('pos-tax-input');
  if (taxInput) {
    taxInput.addEventListener('input', function() {
      posTax = Math.min(100, Math.max(0, parseFloat(this.value) || 0));
      calculateTotals();
    });
  }

  // Paid amount
  const paidInput = document.getElementById('pos-paid-amount');
  if (paidInput) {
    paidInput.addEventListener('input', calculateTotals);
  }

  // Clear cart
  const clearBtn = document.getElementById('pos-clear-cart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (cart.length === 0) return;
      Modal.confirm({
        title: 'Xóa giỏ hàng',
        message: 'Bạn có chắc muốn xóa tất cả món khỏi giỏ hàng?',
        type: 'warning',
        confirmText: 'Xóa giỏ hàng',
        onConfirm: () => {
          cart = [];
          posDiscount = 0;
          updateCart();
          renderProductGrid(POS_PRODUCTS);
          Toast.info('Đã xóa giỏ hàng.', 'Giỏ hàng');
        }
      });
    });
  }

  // Complete sale button
  const completeBtn = document.getElementById('pos-complete-btn');
  if (completeBtn) {
    completeBtn.addEventListener('click', completeSale);
  }
}

/* ============================================
   Export
   ============================================ */
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.completeSale = completeSale;
window.processSale = processSale;
window.initPOS = initPOS;

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pos-product-grid')) {
    setTimeout(initPOS, 300);
  }
});