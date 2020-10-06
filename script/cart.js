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
	if (!window.location.href.split('/')[3].includes('checkout')) {
		$('#cartCount').innerHTML = this._quantity;
		$('#cartTotal').innerHTML = formatCurrency(this._totalPrice);
	}
};

Cart.prototype.store = function () {
	localStorage.cart = JSON.stringify([...this._cart]);
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
	this.store();
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

Cart.prototype.removeItem = function (key) {
	this._cart.delete(key);
	this.update();
	this.updateView();
	this.store();
};

Cart.prototype.empty = function () {
	this._cart.clear();
	this.update();
	this.store();
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

	/**
	 * Render preview container
	 */

	function renderPreview(items = []) {
		const div = document.createElement('div');
		div.classList.add('preview');

		if (items.length > 0) {
			items.forEach(({ _name, _price, _quantity, _img }) => {
				const product = renderProductPreview(_name, _price, _quantity, _img);
				div.appendChild(product);

				const btnToCart = document.createElement('a');
				btnToCart.classList.add('preview__btnToCart');
				btnToCart.innerHTML = 'Đi tới giỏ hàng';
				btnToCart.href = '/cart.html';
				div.appendChild(btnToCart);
			});
		} else {
			div.appendChild(renderEmty());
		}
		return div;
	}

	/**
	 * Render products inside preview container
	 */

	function renderProductPreview(
		name = '',
		price = 0,
		quantity = 0,
		image = ''
	) {
		const div_name = document.createElement('div');
		const div_price = document.createElement('div');
		const div_quantity = document.createElement('div');
		const div_image = document.createElement('img');
		const container = document.createElement('div');
		const div = document.createElement('div');
		const btnDelete = document.createElement('button');

		container.classList.add('preview__product');
		div_name.classList.add('preview__product__name');
		div_price.classList.add('preview__product__price');
		div_quantity.classList.add('preview__product__quantity');
		div_image.classList.add('preview__product__image');
		btnDelete.classList.add('preview__product__btnDelete');

		div_name.innerHTML = name;
		div_price.innerHTML = price;
		div_quantity.innerHTML = quantity;
		div_image.src = image;
		div_image.alt = name + '';
		btnDelete.innerHTML = '<i class="fa fa-times"></i>';

		/*Add delete action when btnDelete is clicked*/
		btnDelete.addEventListener('click', function () {
			const name = this.closest('div').querySelector('.preview__product__name')
				.innerText;
			cart.removeItem(name);
			this.parentElement.parentElement.removeChild(this.parentElement);

			const location = window.location.href.split('/')[3];

			if (location.includes('cart')) {
				[...$('table > tbody').children].forEach((child) => {
					if (child.cells[1].innerText === name) {
						$('table > tbody').removeChild(child);
					}
				});

				$('.total__show').innerText = formatCurrency(cart._totalPrice);

				if (cart._quantity === 0) {
					$('.cartTable-container').innerHTML = null;
					$('.cartTable-container').appendChild(renderEmptyTable());
				}
			}
		});

		div.appendChild(div_name);
		div.appendChild(div_price);

		container.appendChild(div_image);
		container.appendChild(div);
		container.appendChild(div_quantity);
		container.appendChild(btnDelete);

		return container;
	}

	function renderEmty() {
		const div = document.createElement('div');
		div.classList.add('preview-empty');
		div.innerText = `Giỏ hàng hiện đang trống`;
		return div;
	}

	$('.header__mid__cart ')?.addEventListener('mouseenter', function () {
		cart.checkStore();
		const fragment = document.createDocumentFragment();
		const container = renderPreview(cart.getItems());
		fragment.appendChild(container);
		this.appendChild(fragment);
	});
	$('.header__mid__cart')?.addEventListener('mouseleave', function () {
		cart.checkStore();
		const prev = this.querySelector('.preview');
		this.removeChild(prev);
	});
});
