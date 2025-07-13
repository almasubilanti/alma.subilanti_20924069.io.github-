document.addEventListener('DOMContentLoaded', () => {
  const productList = document.getElementById('product-list');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.querySelector('.cart-count');

  const products = [
    {
      name: 'Glow Serum Vitamin C',
      price: 250000,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d8b97dd0-f6ff-4aec-a797-e53617c6a2f8.png',
      desc: 'Serum pencerah dengan 15% vitamin C'
    },
    {
      name: 'Night Repair Cream',
      price: 320000,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/94887afb-bcff-4406-a623-2982f80a8c79.png',
      desc: 'Krim malam regeneratif dengan niacinamide dan ceramide'
    },
    {
      name: 'Sun Shield SPF 50+',
      price: 180000,
      image: 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/60ec9ada-9cf8-46d0-a6d7-5a45906eba41.png',
      desc: 'Sunscreen ringan dan tahan air'
    }
  ];

  function renderProducts() {
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
          <p class="product-desc">${product.desc}</p>
          <button class="add-to-cart">Tambah ke Keranjang</button>
          <button class="buy-now">Beli Sekarang</button>
        </div>
      `;
      productList.appendChild(card);
    });

    addCartListeners();
    addBuyNowListeners();
  }

  function addCartListeners() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', e => {
        const product = e.target.closest('.product-card');
        const name = product.querySelector('.product-title').textContent;
        const price = parseInt(product.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        alert(`${name} ditambahkan ke keranjang!`);
      });
    });
  }

  function addBuyNowListeners() {
    document.querySelectorAll('.buy-now').forEach(button => {
      button.addEventListener('click', e => {
        const product = e.target.closest('.product-card');
        const name = product.querySelector('.product-title').textContent;
        const price = parseInt(product.querySelector('.product-price').textContent.replace(/[^\d]/g, ''));

        localStorage.setItem('checkoutItem', JSON.stringify({ name, price }));
        window.location.href = 'checkout.html';
      });
    });
  }

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
  }

  function showCartModal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let html = `<div class="cart-modal"><h3>Keranjang Belanja</h3><div class="cart-items">`;

    if (cart.length === 0) {
      html += `<p>Keranjang kosong.</p>`;
    } else {
      let total = 0;
      cart.forEach(item => {
        total += item.price;
        html += `<div class="cart-item">
          <span>${item.name}</span>
          <span>Rp ${item.price.toLocaleString('id-ID')}</span>
        </div>`;
      });

      html += `<div class="cart-total">
        <strong>Total:</strong>
        <span>Rp ${total.toLocaleString('id-ID')}</span>
      </div>
      <button class="checkout-btn">Checkout</button>`;
    }

    html += `</div></div>`;
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = html;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', e => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });
  }

  cartBtn.addEventListener('click', showCartModal);

  renderProducts();
  updateCartCount();
});