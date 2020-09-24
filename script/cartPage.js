let cart = new Cart();
cart.checkStore();

/**
 * Function to use when cart is empty
 */

function renderEmptyTable() {
	const div = document.createElement('div');
	const a = document.createElement('a');
	const span = document.createElement('span');
	a.href = '/products.html';
	a.innerText = 'Quay lại mua hàng';

	span.innerHTML = 'Giỏ hàng hiện đang trống.';

	div.classList.add('table-empty');
	div.appendChild(span);
	div.appendChild(a);

	return div;
}
function renderTotalPrice() {
	let totalPrice = 0;
	if (cart._totalPrice > 0) {
		totalPrice = cart.getItems()[0]._totalPrice;
	}
	$('.total__show').innerHTML = formatCurrency(totalPrice);
}

//Table titles
const titles = ['', 'Sản phẩm', 'Đơn giá', 'Số lượng', 'Thành tiền', ''];
/**
 * Function for creating cart table
 */

function createCartTable(theadItem = [], tbodyItem = []) {
	const table = document.createElement('table');
	const thead = document.createElement('thead');
	const tbody = document.createElement('tbody');

	const trTitle = document.createElement('tr');
	trTitle.classList.add('trTitle');

	/*titles*/
	theadItem.forEach((item) => {
		const th = document.createElement('th');
		th.innerText = item;
		trTitle.appendChild(th);
	});
	thead.appendChild(trTitle);

	/*content*/
	tbodyItem.forEach((item) => {
		const trContent = document.createElement('tr');
		trContent.classList.add('trContent');
		let data = Object.entries(item);
		//Remove description prop
		data.splice(1, 1);
		//Move img prop to head of array
		[data[0], data[2]] = [data[2], data[0]];
		[data[1], data[2]] = [data[2], data[1]];

		data.forEach((item) => {
			const td = document.createElement('td');

			if (item[0] === '_img') {
				const img = document.createElement('img');
				img.src = item[1];
				img.alt = data[0];
				td.appendChild(img);
			} else if (item[0] === '_quantity') {
				td.appendChild(changeQuantity(+item[1]));
			} else {
				td.innerText = item[1];
			}

			trContent.appendChild(td);
		});

		trContent.appendChild(btnRemove());

		tbody.appendChild(trContent);
	});

	table.appendChild(thead);
	table.appendChild(tbody);

	return table;
}

function btnRemove() {
	//Add delete icon
	const btnRemove = document.createElement('td');
	const icon = document.createElement('i');
	icon.classList.add('fas', 'fa-trash');
	btnRemove.id = 'btnRemove';
	btnRemove.classList.add('btnRemove');
	btnRemove.appendChild(icon);

	btnRemove.addEventListener('click', function () {
		const name = this.closest('tr').cells[1].innerHTML;
		cart.removeItem(name);
		$('.cartTable-container').innerHTML = null;
		renderCartTable();
		renderTotalPrice();
	});

	return btnRemove;
}

/**
 * Function for rendering cart table
 */

function renderCartTable() {
	const fragment = document.createDocumentFragment();
	if (cart._quantity > 0) {
		const table = createCartTable(titles, cart.getItems());
		fragment.appendChild(table);
		setTimeout(() => addQuantityFuntional());
	} else {
		fragment.appendChild(renderEmptyTable());
	}
	$('.cartTable-container').appendChild(fragment);
}

function changeQuantity(qty = 0) {
	const plus = document.createElement('span');
	const minus = document.createElement('span');
	const quantity = document.createElement('span');
	const fragment = document.createDocumentFragment();

	quantity.innerHTML = qty;
	plus.innerHTML = `<i class="fa fa-plus"></i>`;
	minus.innerHTML = `<i class="fa fa-minus"></i>`;

	quantity.classList.add('changeQuantity__qty');
	plus.classList.add('changeQuantity__plus');
	minus.classList.add('changeQuantity__minus');

	fragment.appendChild(minus);
	fragment.appendChild(quantity);
	fragment.appendChild(plus);

	return fragment;
}

function addQuantityFuntional() {
	$('.changeQuantity__plus').addEventListener('click', function () {
		let curVal = +$('.changeQuantity__qty').innerText;
		curVal++;
		$('.changeQuantity__qty').innerText = curVal;
		updateItem(this.closest('tr'));
	});

	$('.changeQuantity__minus').addEventListener('click', function () {
		let curVal = +$('.changeQuantity__qty').innerText;
		curVal--;
		$('.changeQuantity__qty').innerText = curVal < 0 ? 0 : curVal;
		updateItem(this.closest('tr'), false);
	});
}

function updateItem(item = null, isPlus = true) {
	const name = item.cells[1].innerHTML;
	const newItem = new CartItem(name, '', 0, '', isPlus ? 1 : -1);
	cart.add(newItem);
	cart.store();
	$('.cartTable-container').innerHTML = null;
	renderCartTable();
	renderTotalPrice();
}

renderCartTable();
renderTotalPrice();
