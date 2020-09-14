document.addEventListener('DOMContentLoaded', () => {
  let limit = 20;
  let page = 1;
  let index = 1;
  const prevBtn = $('.products__pagination__prev');
  const nextBtn = $('.products__pagination__next');
  let products = [];
  const link = `https://picsum.photos/v2/list?page=${page}}&limit=${limit}`;
  /*Call API*/

  function fetchData(link = '') {
    if (!link) {
      console.warn('Must have link as param');
    } else {
      fetch(link)
        .then((response) => response.json())
        .then((data) =>
          data.map((item) => ({
            name: item.author,
            img: item.download_url,
          }))
        )
        .then((data) => {
          products = data;
          console.log(products);
        });
    }
  }

  /*Call API*/
  fetchData(link);

  /*Add active class after user click*/
  const paginateButtons = $$('.paginate__button');
  //Loop through every button and add page-active class to current button
  paginateButtons.forEach((button) => {
    button.addEventListener('click', function () {
      //Assign current index to global index
      index = this.innerText;
      console.log(index);
      toggleActive(index);
      toggleDisabled(index);
    });
  });

  /**
   * Function for toggle page-active class
   * * toggleActive
   * @param {string | number} index - cureent index of active page
   */

  function toggleActive(index = 1) {
    paginateButtons.forEach((button, idx) => {
      if (++idx == index) button.classList.add('page-active');
      else button.classList.remove('page-active');
    });
  }

  /**
   * toggleDisabled
   * *Check the current page's index in oder to disable prev and next buttons
   * @param {number | string} index - current page active's index
   */
  function toggleDisabled(index = 1) {
    if (index == 1) {
      prevBtn.classList.add('control-muted');
      nextBtn.classList.remove('control-muted');
    } else if (index == 5) {
      nextBtn.classList.add('control-muted');
      prevBtn.classList.remove('control-muted');
    } else {
      prevBtn.classList.remove('control-muted');
      nextBtn.classList.remove('control-muted');
    }
  }

  //Run toggleDisabled first time when page loaded and
  toggleDisabled();

  /*Change index when prev or next is click*/
  // -1
  prevBtn.addEventListener('click', () => {
    //change index to number
    index = +index;
    //if index < 1 then not decrease
    index - 1 < 1 ? (index = 0) : index--;
    toggleActive(index);
    toggleDisabled(index);
  });
  //+1
  nextBtn.addEventListener('click', () => {
    //change index to number
    index = +index;
    //if index > 5 then not increase
    index + 1 > 5 ? (index = 5) : index++;
    toggleActive(index);
    toggleDisabled(index);
  });
});
