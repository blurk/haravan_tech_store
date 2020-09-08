document.addEventListener('DOMContentLoaded', () => {
  /*Categories*/
  const categories = [
    {
      label: 'Hướng dẫn sử dụng công nghệ máy lạnh',
      link: '#',
    },
    {
      label: 'Công nghệ máy lạnh',
      link: '#',
    },
    { label: 'Tư vấn mua máy lạnh', link: '#' },
    { label: 'Tư vấn sản phẩm', link: '#' },
    { label: 'Hướng dẫn sử dụng', link: '#' },
    { label: 'Công nghệ Tivi', link: '#' },
    { label: 'Hướng dẫn mua Tivi', link: '#' },
    { label: 'Hướng dẫn sử dụng Tivi', link: '#' },
  ];

  let fragment = document.createDocumentFragment();
  const ul = document.createElement('ul');

  /*Create list form array */
  categories.forEach(({ label, link }) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    let icon = document.createElement('i');
    icon.classList.add('fa', 'fa-angle-right');
    /*Add props*/
    a.href = link;
    a.innerText = label;
    a.prepend(icon);
    li.appendChild(a);
    /*Append to ul*/
    ul.appendChild(li);
  });

  /*Append to fragment then render to dom*/
  fragment.appendChild(ul);
  $('.content__sidebar__item__main').appendChild(fragment);
});
