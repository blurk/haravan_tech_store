const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.addEventListener('DOMContentLoaded', () => {
	/*
    re render header__bottom when its children height change
    @params {number}curHeight - total Height inside header__bottom
    */

	function triggerRender(curHeight) {
		const baseHeight = curHeight !== 0 ? $('.header__bottom').clientHeight : 0;
		$('.header__bottom').style.height = baseHeight + curHeight + 'px';
	}

	/*Toggle sidebar on mobile*/
	$('.header__bottom__toggler').addEventListener('click', (e) => {
		const { span } = e.target.dataset;
		if (span === 'not-span') {
			e.target.dataset.span = 'span';
			$('.header__bottom').style.visibility = 'visible';
			const curHeight = $('.header__bottom').children[0].clientHeight;
			triggerRender(curHeight);
		} else {
			e.target.dataset.span = 'not-span';
			$('.header__bottom').style.visibility = 'hidden';
			triggerRender(0);
		}

		$('.header__bottom__toggler').classList.toggle('fa-times');
		$('.header__bottom__toggler').classList.toggle('fa-bars');
	});

	/* CLEAN UP REDUNDANT CLASSES ON LARGE SCREEN */

	window.addEventListener('resize', () => {
		if (window.innerWidth > 992) {
			$('.header__top').classList.remove('class', 'flexForTop');
			$('.header__toggler > span').classList.remove('rotate180');
			$('.header__mid__toggle__search').classList.remove('d-block');
		}
	});

	/* ANIMATION FOR HEADER WHEN RESPONSIVE */

	$('.header__toggler').addEventListener('click', (e) => {
		if (window.innerWidth <= 992) {
			const data = e.currentTarget.dataset.click;

			$('.header__toggler > span').classList.toggle('rotate180');
			$('.header__top').classList.toggle('flexForTop');

			if (data === 'span') {
				$('.header__top__nav').classList.add('animate__fadeOut');
				$('.header__top__contact').classList.add('animate__fadeOut');
				$('.header__top__nav').style.setProperty('--animate-duration', '0.2s');
				$('.header__top__contact').style.setProperty(
					'--animate-duration',
					'0.2s'
				);
			} else {
				$('.header__top__nav').classList.remove('animate__fadeOut');
				$('.header__top__contact').classList.remove('animate__fadeOut');
			}

			e.currentTarget.dataset.click = data === 'span' ? 'not-span' : 'span';
		}
	});

	$('#headerSearchBar').addEventListener('focus', () => {
		$('.header__mid__search > form').classList.add('form-active');
	});

	$('#headerSearchBar').addEventListener('focusout', () => {
		$('.header__mid__search > form').classList.remove('form-active');
	});

	/* RENDER FOR BOTTOM NAV OF HEADER */

	const navLinks1 = [
		{ name: 'tủ lạnh', link: '/products.html', isDrop: true },
		{ name: 'máy lạnh', link: '/products.html', isDrop: true },
		{ name: 'gia dụng', link: '/products.html', isDrop: true },
		{ name: 'máy giặt', link: '/products.html', isDrop: true },
		{ name: 'máy nước nóng', link: '/products.html', isDrop: false },
		{ name: 'điện thoại', link: '/products.html', isDrop: false },
		{ name: 'máy tính bảng', link: '/products.html', isDrop: false },
		{ name: 'laptop', link: '/products.html', isDrop: false },
	];

	/*
  Quickly render navbar to html
   * @param {string} navClassName - Class name of nav tag
   * @param {array} data - array of names for link in nav
*/

	function renderNav(navClassName = null, data = []) {
		if (!navClassName || !data) {
			return;
		} else {
			return data.forEach(({ name, link, isDrop }) => {
				const node = $('.navbar > li').cloneNode(true);
				node.querySelector('a').innerText = name;
				/*Add submenu if the node has child elems*/
				const spanIcon = '<span class="fa fa-angle-down"></span>';
				if (isDrop) {
					node.classList.add('dropdown');

					let div = document.createElement('div');
					div.classList.add('navbar__nav__item');
					const a = node.removeChild(node.querySelector('a'));
					div.appendChild(a);
					div.innerHTML += spanIcon;

					node.appendChild(div);
					node.appendChild($('.dropdown__menu').cloneNode(true));
				}

				node.querySelector('a').href = link;
				$(`.${navClassName} > ul`).appendChild(node);
			});
		}
	}
	renderNav('header__bottom__nav', navLinks1);

	/*For submenu*/
	$$('.dropdown').forEach((dropdown) => {
		if (window.innerWidth > 992) {
			dropdown.addEventListener('mouseenter', () => {
				dropdown
					.querySelector('.dropdown__menu')
					.classList.toggle('dropdown__menu-slideIn');
			});

			dropdown.addEventListener('mouseleave', () => {
				dropdown
					.querySelector('.dropdown__menu')
					.classList.toggle('dropdown__menu-slideIn');
			});
		}
	});

	/*Add dropdown onclick for each span*/
	$$('.dropdown > .navbar__nav__item > span').forEach((span) =>
		span.addEventListener('click', (e) => {
			if (window.innerWidth <= 992) {
				e.target
					.closest('.dropdown')
					.querySelector('.dropdown__menu')
					.classList.toggle('dropdown__menu-active');

				/*Get current height of all children*/

				let curHeight = 0;
				e.target
					.closest('.dropdown')
					.querySelectorAll('.dropdown__menu > *')
					.forEach((a) => (curHeight += a.offsetHeight));

				const dropdownMenu = e.target
					.closest('.dropdown')
					.querySelector('.dropdown__menu');

				/*re render height*/
				if (dropdownMenu.classList.contains('dropdown__menu-active')) {
					dropdownMenu.style.height = curHeight + 'px';
					triggerRender(curHeight);
				} else {
					triggerRender(-curHeight);
					dropdownMenu.style.height = 0;
				}
			}
		})
	);

	/*Show seacrh bar when Toggle is clicked*/
	$('.header__mid__toggle__search').addEventListener('click', function () {
		$$('.header__mid > *').forEach((child) => {
			if (
				child.classList.contains('search__close') ||
				child.classList.contains('header__mid__search')
			) {
				child.classList.add('animate__animated', 'animate__fadeIn');
				child.style.setProperty('--animate-duration', '0.5s');
				child.classList.remove('d-none');
				child.classList.add('d-block');
			} else {
				child.classList.add('animate__animated', 'animate__fadeOut');
				child.style.setProperty('--animate-duration', '0.1s');
				child.classList.add('d-none');
				child.classList.remove('d-block');
			}
		});
	});

	$('.search__close').addEventListener('click', () => {
		$$('.header__mid > *').forEach((child) => {
			if (
				child.classList.contains('search__close') ||
				child.classList.contains('header__mid__search')
			) {
				child.classList.remove('animate__animated', 'animate__fadeIn');
				child.style.setProperty('--animate-duration', '0.5s');
				child.classList.add('d-none');
				child.classList.remove('d-block');
			} else {
				child.classList.remove('animate__animated', 'animate__fadeOut');
				child.style.setProperty('--animate-duration', '0.1s');
				child.classList.add('d-block');
				child.classList.remove('d-none');
			}
		});
	});
	window.addEventListener('scroll', () => {
		if (window.pageYOffset > 55) {
			$('.main').style.marginTop = '200px';
			$('.header__top').classList.add('d-none');
			$('.header').classList.add('fixedHeader');
		} else {
			$('.main').style.marginTop = '0';
			$('.header__top').classList.remove('d-none');
			$('.header').classList.remove('fixedHeader');
		}
	});

	/*To Top button*/
	window.addEventListener('scroll', () => {
		if (window.scrollY > 110) {
			$('#quickContact').classList.remove('quickContact-unactive');
			$('#quickContact').classList.add('quickContact-active');

			$('#toTopBtn').classList.remove('toTopBtn-unactive');
			$('#toTopBtn').classList.add('toTopBtn-active');
		} else {
			$('#quickContact').classList.remove('quickContact-active');
			$('#quickContact').classList.add('quickContact-unactive');

			$('#toTopBtn').classList.remove('toTopBtn-active');
			$('#toTopBtn').classList.add('toTopBtn-unactive');
		}
	});

	$('#toTopBtn').addEventListener('click', () => {
		window.scrollTo(0, 0);
	});
});
