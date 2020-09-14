document.addEventListener('DOMContentLoaded', () => {
  /**
   * quickRenderProducts
   * * User for quick rendering product to products section
   * @param {number} n - number of products to render
   */

  function quickRenderProducts(n = 0) {
    const container = $('.products__main__body');
    for (let i = 0; i < n; i++) {
      const cloneNode = container.firstElementChild.cloneNode(true);
      if (i % 2 !== 0) {
        cloneNode.querySelector('.gallery__item__prices').innerHTML +=
          '<del class="price-before">15,000,000₫</del>';
        cloneNode.classList.add('sale');
      }
      container.appendChild(cloneNode);
    }
  }

  quickRenderProducts(19);

  /**
   * updateProductCounter
   * * Update product counter
   * @param {null}
   */

  function updateProductCounter() {
    const quantity = $('.products__main__body').childElementCount;
    $('#productsCount').innerHTML = quantity;
  }

  updateProductCounter();

  /*Fake title*/
  const filterTypes = [
    'thương hiệu',
    'loại sản phẩm',
    'màu sắc',
    'giá',
    'xuất xứ',
    'màn hình',
    'dung tích',
  ];

  /**
   * renderList
   * * Quick render filter list function
   * @param {array} list - array of list title
   */

  function renderList(list = []) {
    const ul = document.createElement('ul');
    filterTypes.forEach((type) => {
      const li = document.createElement('li');
      li.innerText = type;
      ul.appendChild(li);
    });
    return ul;
  }

  /*//*Fake data*/

  /*Fake brands data*/

  const fakeData = {
    brands: [
      { label: 'panasonic', value: 'panasonic' },
      { label: 'samsung', value: 'samsung' },
      { label: 'sony', value: 'sony' },
      { label: 'philips', value: 'philips' },
      { label: 'canon', value: 'canon' },
      { label: 'eletrolux', value: 'eletrolux' },
      { label: 'nikawa', value: 'nikawa' },
      { label: 'aqua', value: 'aqua' },
      { label: 'sanyo', value: 'sanyo' },
      { label: 'oppo', value: 'oppo' },
      { label: 'apple', value: 'apple' },
      { label: 'sanaky', value: 'sanaky' },
      { label: 'tcl', value: 'tcl' },
      { label: 'solid', value: 'solid' },
      { label: 'mitsubishi', value: 'mitsubishi' },
      { label: 'asus', value: 'asus' },
      { label: 'dell', value: 'dell' },
      { label: 'goldsun', value: 'goldsun' },
      { label: 'bosch', value: 'bosch' },
      { label: 'hitachi', value: 'hitachi' },
      { label: 'braun', value: 'braun' },
      { label: 'tefal', value: 'tefal' },
      { label: 'toshiba', value: 'toshiba' },
      { label: 'steba', value: 'steba' },
    ],

    /*Fake types data*/
    types: [
      { label: 'tivi', value: 'tivi' },
      { label: 'Tủ Lạnh', value: 'fridge' },
      { label: 'Gia dụng', value: 'appliances' },
      { label: 'Nhà bếp', value: 'kitchen' },
      { label: 'Kỹ thuật số', value: 'digital' },
      { label: 'Viễn thông', value: 'telecomunication' },
      { label: 'Điện cơ', value: 'electromechanical' },
      { label: 'Bách hóa', value: 'department' },
    ],

    /*Fake colors*/
    colors: [
      { label: '#f00', value: 'red' },
      { label: '#FFA500', value: 'orange' },
      { label: '#ff0', value: 'yellow' },
      { label: '#0f0', value: 'green' },
      { label: '#800080', value: 'purple' },
      { label: '#FFC0CB', value: 'pink' },
      { label: '#808080', value: 'grey' },
      { label: '#A52A2A', value: 'brown' },
      { label: '#000', value: 'black' },
      { label: '#fff', value: 'white' },
    ],
    /*Fake prices*/
    prices: [
      {
        label: 'dưới 100',
        value: [0, 100],
      },
      {
        label: '100,000₫ - 300,000₫ ',
        value: [100, 300],
      },
      {
        label: '300,000₫ - 500,000₫ ',
        value: [300, 500],
      },
      {
        label: '500,000₫ - 1,000,000₫ ',
        value: [500, 1000],
      },
      {
        label: 'trên 1,000,000₫ ',
        value: 1001,
      },
    ],

    /*Fake origins*/
    origins: [
      { label: 'Hàn Quốc', value: 'korean' },
      {
        label: 'Thái Lan',
        value: 'thai',
      },
    ],
    /*Fake sizes*/
    sizes: [
      {
        label: '12 inch',
        value: 12,
      },
      {
        label: '14 inch',
        value: 14,
      },
      {
        label: '32 inch',
        value: 32,
      },
      {
        label: '40 inch',
        value: 40,
      },
      {
        label: '42 inch',
        value: 42,
      },
      {
        label: '48 inch',
        value: 48,
      },
      {
        label: '49 inch',
        value: 49,
      },
    ],
    /*Fake capacity*/
    capacities: [
      {
        label: '100 ml',
        value: 100,
      },
      {
        label: '300 ml',
        value: 300,
      },
      {
        label: '500 ml',
        value: 500,
      },
      {
        label: '1 l',
        value: 1000,
      },
      {
        label: '1.4 ml',
        value: 1400,
      },
      {
        label: '1.8 l',
        value: 1800,
      },
    ],
  };

  /**
   * renderCheckboxes
   * * Render checkboxes
   * @param {array} data - Array of data for name, id , value for checkboxex
   */

  function renderCheckboxes(data = []) {
    let fragment = document.createDocumentFragment();
    data.forEach(({ label, value }) => {
      const input = document.createElement('input');
      const labelTag = document.createElement('label');
      const div = document.createElement('div');
      div.classList.add('check');
      labelTag.innerText = label;
      labelTag.htmlFor = '' + value;
      input.type = 'checkbox';
      input.value = '' + value;
      input.id = '' + value;
      div.appendChild(input);
      div.appendChild(labelTag);
      fragment.appendChild(div);
    });
    return fragment;
  }

  //*Render list to Dom

  function renderListToDOM() {
    const fragment = document.createDocumentFragment();
    const list = renderList(filterTypes);
    const keys = Object.keys(fakeData);
    /*Append the panel of accordion*/
    fragment.appendChild(list);
    $('.accordion').nextElementSibling.appendChild(fragment);
    [...list.children].forEach((child, index) => {
      /*create container and add accordion class to li item*/
      const div = document.createElement('div');
      div.classList.add('checkbox__container');
      child.classList.add('accordion');
      child.innerHTML += `<i class="fa fa-angle-up"></i>`;
      /*Append checkboxes to list*/
      const data = fakeData[keys[index]];
      div.appendChild(renderCheckboxes(data));
      child.parentNode.insertBefore(div, child.nextSibling);
      if (keys[index] === 'prices') {
        child.nextElementSibling.classList.add('checkbox__container-prices');
      } else if (keys[index] === 'colors') {
        child.nextElementSibling.classList.add('checkbox__container-colors');
      }
    });
  }

  renderListToDOM();

  $$('.accordion').forEach((item) => {
    item.addEventListener('click', (e) => {
      /*Get the next element of accordion*/
      const panel = e.target.closest('.accordion').nextElementSibling;
      /*Prevent return null when user clicks on the arrow */
      const angle = e.target.querySelector('i') || e.target;
      /*Rotate arrow when user clicks*/
      angle.classList.toggle('rotate180');
      if (panel.style.maxHeight) {
        /*Collapse body*/
        panel.style.maxHeight = null;
      } else {
        /*Change max height of body when its children span down*/
        const body = $('.products__aside__body');
        body.style.maxHeight = body.clientHeight + panel.scrollHeight + 'px';
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
  /*Remove border form last li of accordion class*/
  $$('.accordion')[7].classList.add('border-0');

  /*Handle colors input of class checkbox__container-colors*/
  [...$('.checkbox__container-colors').children].forEach((child) => {
    const label = child.querySelector('label');
    const code = label.innerHTML;
    label.innerHTML = null;
    label.style.backgroundColor = code;
  });

  /*//*FIX BUG OF TO TOP BUTTON */
  $('#toTopBtn').style.zIndex = 9999;
});
