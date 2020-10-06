const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const transferFee = 40_000; //40,000VND
let isCompleted = false;

document.addEventListener('DOMContentLoaded', () => {
	$('#transferFee').innerText = formatCurrency(transferFee);
	//Add some visual effect for buttons
	$('#btnComplete').addEventListener('mouseenter', function () {
		this.innerHTML =
			'<i class="fa fa-check animate__animated animate__zoomIn"></i>';
		this.style.setProperty('--animate-duration', '0.4s');
	});
	$('#btnComplete').addEventListener('mouseleave', function () {
		this.innerText = 'Hoàn tất đơn hàng';
	});

	$('.billDetail__coupon > button').addEventListener('mouseleave', function () {
		this.innerText = 'Sử dụng';
	});
	$('.billDetail__coupon > button').addEventListener('mouseenter', function () {
		this.innerHTML =
			'<i class="fas fa-coins animate__animated animate__zoomIn"></i>';
		this.style.setProperty('--animate-duration', '0.4s');
	});

	$('#btnContinue').addEventListener('mouseleave', function () {
		this.innerText = 'Tiếp tục mua hàng';
	});
	$('#btnContinue').addEventListener('mouseenter', function () {
		this.innerHTML =
			'<i class="fa fa-shopping-cart animate__animated animate__slideInLeft"></i>';
		this.style.setProperty('--animate-duration', '0.4s');
	});

	/*Only remove cart when user complete*/
	$('#btnContinue').addEventListener('click', () => {
		let cart = new Cart();
		cart.checkStore();
		cart.empty();
	});

	//Handle form on click
	$('#btnComplete').addEventListener('click', handleFormSubmit);

	/**
	 * Function for handle form
	 */

	function handleFormSubmit(e) {
		let errors = {};
		e.preventDefault();
		const formElem = $('form');
		const form = new FormData(formElem);
		const data = Object.fromEntries(form.entries());

		if (!data.phone) {
			const phone = $('#phone');
			const cord = phone.getBoundingClientRect();
			window.scroll(cord.x, cord.y);
			$('.error-box')?.remove();
			errors.phone = 'Số điện thoại không được để trống';
			phone.classList.add('form__input-error');
			$('.checkout__info').insertBefore(errorBox(errors.phone), $('#address'));
		} else {
			if (!/(0[3|5|8|7|9])+([0-9]{8})\b/g.test(data.phone)) {
				window.scroll(cord.x, cord.y);
				$('.error-box')?.remove();
				errors.phone = 'Số điện thoại không hợp lệ';
				$('.checkout__info').insertBefore(
					errorBox(errors.phone),
					$('#address')
				);
			} else {
				$('.error-box')?.remove();
				phone.classList.remove('form__input-error');
			}
		}

		if (!data.provinces) {
			const provinces = $('#provinces');
			const cord = phone.getBoundingClientRect();
			window.scroll(cord.x, cord.y);

			$('#provinces ~ .error-box')?.remove();
			window.scroll(cord.x, cord.y);
			errors.provinces = 'Tên tỉnh thành không được để trống';
			provinces.classList.add('form__input-error');
			$('.checkout__info').insertBefore(
				errorBox(errors.provinces),
				$('#district')
			);
		} else {
			$('#provinces ~ .error-box')?.remove();
			provinces.classList.remove('form__input-error');
		}

		if (data.phone && data.provinces) {
			//show bill info
			addBillInfo(data);
			isCompleted = true;
		}
	}

	/*Handle modal*/

	const modal = $('#billDetail');

	$('#btnBillDetail').addEventListener('click', function () {
		modal.classList.remove('d-none');
		this.classList.add('d-none');
		if (isCompleted) {
			$('.billDetail__coupon').classList.add('d-none');
		} else {
			$('.billDetail__coupon').classList.remove('d-none');
		}

		let cart = new Cart();
		cart.checkStore();

		$('.billDetail__products').innerHTML = '';
		cart.getItems().forEach((item) => {
			const node = billItem(item);
			renderToDom($('.billDetail__products'), node);
		});

		$('#tempPrice').innerText = formatCurrency(cart._totalPrice);
		$('#transferPrice').innerText = isCompleted
			? formatCurrency(transferFee)
			: '---';

		$('.billDetail__total > span').innerText = isCompleted
			? formatCurrency(cart._totalPrice + transferFee)
			: formatCurrency(cart._totalPrice);
	});

	window.addEventListener('click', (e) => {
		if (e.target === modal) {
			e.target.classList.add('d-none');
			$('#btnBillDetail').classList.remove('d-none');
		}
	});

	/*END OF DOM EVENT LISTENER*/
});

/**
 * errorBox component
 *  * errorBox
 */

function errorBox(err = 'Error') {
	const fragment = document.createDocumentFragment();
	const p = document.createElement('p');
	p.innerText = err;
	p.classList.add('error-box');
	fragment.appendChild(p);
	return fragment;
}

/**
 * render bill information
 * addBillInfo
 */

function addBillInfo(data = {}) {
	$('#billId').innerText = '#129736';
	[...$$('p[name="bill-phone"]')].forEach((elem) => {
		elem.innerHTML = data.phone;
	});
	$('#billProvince').innerText = $(
		`option[value="${data.provinces}"]`
	).innerText;
	$('#billPaymentMethod').innerText = $(
		`input[value="${data.paymentMethod}"] ~ label`
	).innerText;

	$('.bill-info').classList.remove('d-none');
	$('form').classList.add('d-none');
}

/**
 * Bill detail product item component
 */

function billItem(item) {
	const container = document.createElement('div');
	const imgContainer = document.createElement('div');
	const img = document.createElement('img');
	const name = document.createElement('p');
	const totalPrice = document.createElement('p');

	img.src = item._img;
	imgContainer.setAttribute('data-quantity', item._quantity);
	name.innerText = item._name;
	totalPrice.innerText = formatCurrency(item._totalPrice);
	imgContainer.appendChild(img);
	imgContainer.className = 'product__img-container';

	appendMultiChildren(container, imgContainer, name, totalPrice);

	container.classList.add('billDetail__product');

	return container;
}

/**
 * render element to dom
 */

function renderToDom(target, elem) {
	const fragment = document.createDocumentFragment();
	fragment.appendChild(elem);
	target.appendChild(fragment);
}

/**
 * Function for append multiple children to parent element
 * appendMultiChildren
 * @params
 */

function appendMultiChildren(target, ...children) {
	children.forEach((child) => {
		target.appendChild(child);
	});
}
