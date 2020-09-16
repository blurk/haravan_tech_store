/**
 * Class cart item
 */

function CartItem(
  name = '',
  description = '',
  price = 0,
  img = '',
  quantity = 0
) {
  this._name = name;
  this._description = description;
  this._price = price;
  this._img = img;
  this._quantity = quantity;
  this._totalPrice = price * quantity;
}

/**
 * Class cart
 */

function Cart() {
  this._cart = new Map();
  this._quantity = 0;
  this._totalPrice = 0;
}

Cart.prototype.updateView = function () {
  $('#cartTotal').innerHTML = formatCurrency(this._totalPrice);
  $('#cartCount').innerHTML = this._quantity;
};

Cart.prototype.update = function () {
  let total = 0;
  this._cart.forEach((cartItem) => {
    total += cartItem._totalPrice;
  });
  this._totalPrice = total;
  this._quantity = this._cart.size;
  this.updateView();
};

Cart.prototype.add = function (newItem) {
  if (!this._cart.has(newItem._name)) {
    this._cart.set(newItem._name, newItem);
  } else {
    this._cart.get(newItem._name)._quantity += newItem._quantity;
    this._cart.get(newItem._name)._totalPrice = calcTotalPrice(
      this._cart.get(newItem._name)
    );
  }
  this.update();
};

Cart.prototype.store = function () {
  localStorage.cart = JSON.stringify([...this._cart]);
};

Cart.prototype.checkStore = function () {
  if (!localStorage.cart) {
    localStorage.cart = JSON.stringify([...this._cart]);
  } else {
    this._cart = new Map(JSON.parse(localStorage.cart));
    this.update();
  }
};

/*FORMAT CURRENCY*/

function formatCurrency(amount) {
  return (
    new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' })
      .format(amount)
      .slice(1) + '₫'
  );
}

function calcTotalPrice(item) {
  return item._quantity * item._price;
}

document.addEventListener('DOMContentLoaded', () => {
  var cart = new Cart();
  cart.checkStore();

  /*Handle click event*/
  const addToCartBtns = $$('.addToCart');
  [...addToCartBtns].forEach((btn) => {
    btn.addEventListener('click', function () {
      const data = getData(this.closest('.gallery__item'));
      cart.add(data);
      cart.store();
    });
  });

  function getData(item) {
    const name = item.querySelector('.gallery__item__title').innerHTML.trim();
    const description = item
      .querySelector('.gallery__item__subtitle')
      .innerHTML.trim();
    const price = item.querySelector('.price-current').innerHTML;
    const img = item.querySelector('.gallery__item__img > img').src;
    return new CartItem(name, description, +price.replace(/,|₫/g, ''), img, 1);
  }
});
