let x;
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
	let quantity = 0;
	this._cart.forEach((cartItem) => {
		total += cartItem._totalPrice;
		quantity += cartItem._quantity;
	});
	this._totalPrice = total;
	this._quantity = quantity;
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

Cart.prototype.getItems = function () {
	const cart = this._cart;
	return [...cart.values()];
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
	/*For cart view when hover*/

	/**
	 * Render preview container
	 */

	function renderPreview() {
		const div = document.createElement('div');
		div.classList.add('preview');
		return div;
	}

	/**
	 * Render products inside preview container
	 */

	function renderProductPreview(name = '', price = 0, quantity = 0) {
		const div_name = document.createElement('div');
		const div_price = document.createElement('div');
		const div_quantity = document.createElement('div');
		const container = document.createElement('div');

		container.classList.add('product__preview');
		div_name.classList.add('preview__product__name');
		div_price.classList.add('preview__product__price');
		div_quantity.classList.add('preview__product__quantity');

		div_name.innerHTML = name;
		div_price.innerHTML = price;
		div_quantity.innerHTML = quantity;

		container.appendChild(div_price);
		container.appendChild(div_name);
		container.appendChild(div_quantity);

		return container;
	}

	$('.header__mid__cart ').addEventListener('mouseenter', function () {
		console.log('Hello');
		const fragment = document.createDocumentFragment();
		const container = renderPreview();

		x = cart.getItems();

		x.forEach(({ _name, _price, _quantity }) => {
			const product = renderProductPreview(_name, _price, _quantity);
			console.log({ _name, _price, _quantity });
			container.appendChild(product);
		});

		fragment.appendChild(container);
		this.appendChild(fragment);
	});
	$('.header__mid__cart').addEventListener('mouseleave', function () {
		console.log('Bye');
		const prev = this.querySelector('.preview');
		this.removeChild(prev);
	});
});
