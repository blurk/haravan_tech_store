document.addEventListener('DOMContentLoaded', () => {
  let limit = 20;
  let page = 1;
  let index = 1;
  const prevBtn = $('.products__pagination__prev');
  const nextBtn = $('.products__pagination__next');
  let products = [];
  /*Call API*/

  async function fetchData(page, limit) {
    let link = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
    const response = await fetch(link);
    const data = await response.json();
    console.log('✔');
    return data.map((item) => ({
      name: item.author,
      img: item.download_url,
    }));
  }

  /**
   * Function for fetching data when paginate
   * * loadData
   * @param  {number | string} curPage - current active page
   */
  async function loadData(curPage = 1) {
    page = curPage;
    products = await fetchData(page, limit);
    quickRenderProducts(20, true, products);
  }

  /*Add active class after user click*/
  const paginateButtons = $$('.paginate__button');
  //Loop through every button and add page-active class to current button
  paginateButtons.forEach((button) => {
    button.addEventListener('click', function () {
      //Assign current index to global index
      index = this.innerText;
      toggleActive(index);
      toggleDisabled(index);
      loadData(index);
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
