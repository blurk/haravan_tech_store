document.addEventListener('DOMContentLoaded', () => {
  const curGallery = $('#gallery1');

  $('.gallery__header > ul > li').classList.add('tab-active');

  let n = 7;

  /*Quick render products*/

  for (let i = 0; i < n; i++) {
    const cloneNode = curGallery
      .querySelector('.gallery__body > .gallery__item')
      .cloneNode(true);
    if (i % 2 !== 0) {
      cloneNode.querySelector('.gallery__item__prices').innerHTML +=
        '<del class="price-before">15,000,000₫</del>';
      cloneNode.classList.add('sale');
    }
    curGallery.children[1].appendChild(cloneNode);
  }

  /*Quick render products' sections*/

  const categories = [
    { name: 'Tủ Lạnh', color: '#D84040' },
    { name: 'Gia dụng', color: '#6F993E' },
    { name: 'Nhà bếp', color: '#8BC34A' },
    { name: 'Kỹ thuật số', color: '#607D8B' },
    { name: 'Viễn thông', color: '#426F99' },
    { name: 'Điện cơ', color: '#427C63' },
    { name: 'Bách hóa', color: '#FF4081' },
  ];

  const arrs = categories.map(({ name, color }, id) => {
    const clone = curGallery.cloneNode(true);
    /*Increase id*/
    clone.id = `gallery${id + 2}`;
    /*Change backgroundColor of header*/
    clone.querySelector(
      '.gallery__header > ul > li'
    ).style.backgroundColor = color;
    /*Change backgroundColor of header border*/
    clone.querySelector('.gallery__header').style.borderBottomColor = color;
    /*Change backgroundColor of current price*/

    clone
      .querySelectorAll('.price-current')
      .forEach((price) => (price.style.color = color));

    /*Change backgroundColor of buttons*/
    clone
      .querySelectorAll('.gallery__item__buttons > button')
      .forEach((btn) => (btn.style.backgroundColor = color));

    /*Change name of header*/
    clone.querySelector('.gallery__header > ul > li > a').innerHTML = name;
    return clone;
  });

  let fragment = document.createDocumentFragment();

  for (let item of arrs) {
    fragment.append(item);
  }

  $('#products').append(fragment);
});
