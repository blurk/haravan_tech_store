document.addEventListener('DOMContentLoaded', () => {
  /*render images to HTML*/
  const src = [
    '/assets/images/popular_brand_img_1.png',
    '/assets/images/popular_brand_img_2.png',
    '/assets/images/popular_brand_img_3.png',
    '/assets/images/popular_brand_img_4.png',
    '/assets/images/popular_brand_img_8.png',
    '/assets/images/popular_brand_img_9.png',
    '/assets/images/popular_brand_img_10.png',
  ];

  function render() {
    let fragment = document.createDocumentFragment();

    let n = null;

    if (window.innerWidth > 992) {
      n = 4;
    } else if (window.innerWidth > 768) {
      n = 3;
    } else if (window.innerWidth > 576) {
      n = 2;
    } else {
      n = 1;
    }

    const images = src.slice(0, n).map((src) => {
      let img = document.createElement('img');
      img.src = src;
      img.classList.add('brand__img', 'animate__animated');

      return img;
    });

    images.forEach((img) => {
      fragment.appendChild(img);
    });
    $('.brands__container').innerHTML = '';
    $('.brands__container').append(fragment);
  }

  render();

  /*Handle slider sliding*/
  const left = $('#sliderLeftController');
  const right = $('#sliderRightController');

  left.addEventListener(
    'click',
    () => {
      src.push(src.shift());
      render();
      [...$('.brands__container').children].forEach((child) => {
        child.classList.add('animate__fadeIn');
        child.style.setProperty('--animate-duration', '0.4s');
      });
    },
    true
  );

  right.addEventListener(
    'click',
    () => {
      src.unshift(src.pop());
      render();
      [...$('.brands__container').children].forEach((child) => {
        child.classList.add('animate__fadeIn');
        child.style.setProperty('--animate-duration', '0.4s');
      });
    },
    true
  );

  window.addEventListener('resize', () => {
    render();
  });
});
