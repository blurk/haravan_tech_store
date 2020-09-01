document.addEventListener('DOMContentLoaded', () => {
  const src = [
    '/assets/images/popular_brand_img_1.png',
    '/assets/images/popular_brand_img_2.png',
    '/assets/images/popular_brand_img_3.png',
    '/assets/images/popular_brand_img_4.png',
    '/assets/images/popular_brand_img_8.png',
    '/assets/images/popular_brand_img_9.png',
    '/assets/images/popular_brand_img_10.png',
  ];

  let fragment = document.createDocumentFragment();

  const images = src.map((src) => {
    let div = document.createElement('div');
    let img = document.createElement('img');
    img.src = src;
    img.classList.add('brand__img');

    div.classList.add('brand__img__container');

    div.appendChild(img);
    return div;
  });

  images.forEach((img) => {
    fragment.appendChild(img);
  });

  $('.brands__container').append(fragment);

  const slider = tns({
    container: '.brands__container',
    slideBy: 1,
    speed: 600,
    swipeAngle: true,
    controlsContainer: '.controller__container',
    center: true,
    responsive: {
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
});

// xs: 576px,
// sm: 768px,
// md: 992px,
// lg: 1200px,
