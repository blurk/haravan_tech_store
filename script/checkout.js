const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

document.addEventListener('DOMContentLoaded', () => {
	$('#transferFee').innerText = formatCurrency(40000);
	//Add some visual effect for buttons
	$('#btnComplete').addEventListener('mouseenter', function () {
		this.innerHTML =
			'<i class="fa fa-check animate__animated animate__zoomIn"></i>';
		this.style.setProperty('--animate-duration', '0.4s');
	});
	$('#btnComplete').addEventListener('mouseleave', function () {
		this.innerText = 'Hoàn tất đơn hàng';
	});

	$('#btnContinue').addEventListener('mouseleave', function () {
		this.innerText = 'Tiếp tục mua hàng';
	});
	$('#btnContinue').addEventListener('mouseenter', function () {
		this.innerHTML =
			'<i class="fa fa-shopping-cart animate__animated animate__slideInLeft"></i>';
		this.style.setProperty('--animate-duration', '0.4s');
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
			$('.error-box')?.remove();
			errors.phone = 'Số điện thoại không được để trống';
			$('#phone').classList.add('form__input-error');
			$('.checkout__info').insertBefore(errorBox(errors.phone), $('#address'));
		} else {
			if (!/(0[3|5|8|7|9])+([0-9]{8})\b/g.test(data.phone)) {
				$('.error-box')?.remove();
				errors.phone = 'Số điện thoại không hợp lệ';
				$('.checkout__info').insertBefore(
					errorBox(errors.phone),
					$('#address')
				);
			} else {
				$('.error-box')?.remove();
				$('#phone').classList.remove('form__input-error');
			}
		}

		if (!data.provinces) {
			$('#provinces ~ .error-box')?.remove();
			errors.provinces = 'Tên tỉnh thành không được để trống';
			$('#provinces').classList.add('form__input-error');
			$('.checkout__info').insertBefore(
				errorBox(errors.provinces),
				$('#district')
			);
		} else {
			$('#provinces ~ .error-box')?.remove();
			$('#provinces').classList.remove('form__input-error');
		}
		//show bill info
		addBillInfo(data);
	}
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
