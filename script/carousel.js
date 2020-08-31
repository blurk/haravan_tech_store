document.addEventListener('DOMContentLoaded', () => {
  const bgs = [
    '/assets/images/slideshow_1.jpg',
    '/assets/images/slideshow_2.jpg',
    '/assets/images/slideshow_3.jpg',
    '/assets/images/slideshow_4.jpg',
  ];

  function run() {
    let id = 0;
    const time = 10000; //ms
    setInterval(() => {
      id === 3 ? (id = 0) : id++;
      changeImage(id);
    }, time);
  }

  function changeImage(id) {
    $('#carousel').classList.add('animate__fadeOut');
    $('#carousel').classList.remove('animate__fadeIn');
    $('#carousel').style.setProperty('--animate-duration', '0.1s');

    $('#carousel').addEventListener('animationend', () => {
      $('#carousel').style.backgroundImage = `url(${bgs[id]})`;
      $('#carousel').classList.remove('animate__fadeOut');
      $('#carousel').classList.add('animate__fadeIn');
    });

    $$('.dot').forEach((dot) => {
      if (dot.dataset.index === id + '') dot.classList.add('dot-active');
      else dot.classList.remove('dot-active');
    });
  }

  run();

  $$('.dot').forEach((dot) => {
    dot.addEventListener('click', (e) => {
      const id = +e.currentTarget.dataset.index;
      changeImage(id);
    });
  });
});
