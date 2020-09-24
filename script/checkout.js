const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

document.addEventListener('DOMContentLoaded', () => {
	$('#btnComplete').addEventListener('mouseenter', function () {
		this.innerHTML =
			'<i class="fa fa-check animate__animated animate__zoomIn"></i>';
	});
	$('#btnComplete').addEventListener('mouseleave', function () {
		this.innerText = 'Hoàn tất đơn hàng';
	});
});
