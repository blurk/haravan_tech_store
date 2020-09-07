document.addEventListener('DOMContentLoaded', () => {
  const modal = $('.modal');
  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });
  /*Handle quick view product button*/
  $$('.quickView').forEach((item) =>
    item.addEventListener('click', (e) => {
      const container = e.target.closest('.gallery__item');
      const price = container.querySelector('.gallery__item__prices');
      const controller = $('.modal__content__left > .view__controller');
      const view = $('.modal__content__left > .view > img ');
      const src = container.querySelector('.gallery__item__img > img').src;

      /*Fake image sources*/
      const imgs = [
        '/assets/images/view_01.jpg',
        '/assets/images/view_02.jpg',
        '/assets/images/view_03.jpg',
        '/assets/images/view_04.jpg',
        '/assets/images/view_05.jpg',
      ];

      /*Show modal on click*/
      modal.style.display = 'block';
      /*Add content of current item to modal*/
      $('.modal__content__right__prices').innerHTML = price.innerHTML;
      view.src = src;

      /*Random image for more real*/
      const random = Math.floor(Math.random() * 5);
      imgs[random] = src;

      /*Using fragement for better performance*/
      let fragment = document.createDocumentFragment();

      imgs.forEach((src) => {
        const img = document.createElement('img');
        img.src = src;
        /*Change view when item of controller is hover*/
        img.addEventListener('mouseover', (e) => {
          const curSrc = e.currentTarget.src;
          const curView = $('.view > img');
          const newChild = document.createElement('img');

          newChild.src = curSrc;
          newChild.classList.add('modal__content__img');
          newChild.classList.add('animate__animated', 'animate__fadeIn');
          newChild.style.setProperty('--animate-duration', '0.4s');

          $('.view').replaceChild(newChild, curView);
        });

        fragment.append(img);
      });

      /*Empty each time render*/
      controller.innerHTML = '';
      controller.append(fragment);

      if (container.classList.contains('sale')) {
        $('.modal__content__left').classList.add('sale');
      }
    })
  );

  /*Handle modal interact*/
  const plus = $('span.plus');
  const minus = $('span.minus');
  const value = $('span.value');

  //increase by 1

  plus.addEventListener('click', () => {
    const curVal = +value.innerText;
    value.innerText = curVal + 1;

    if (+value.innerText > 0) {
      $('.changeQuantity__addToCart').classList.remove('disabled');
    }
  });

  //minus by 1, disable addToCard button when value === 0

  minus.addEventListener(
    'click',
    () => {
      const curVal = +value.innerText;

      value.innerText = curVal - 1 < 1 ? 0 : curVal - 1;

      if (+value.innerText === 0) {
        $('.changeQuantity__addToCart').classList.add('disabled');
      }
    },
    true
  );
});
