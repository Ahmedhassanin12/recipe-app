import View from './View';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _markupView() {
    const curPage = this.data.page;
    const numOfPages = Math.ceil(
      this.data.response.length / this.data.resPerPage
    );
     
    // Page 1, and there are other pages
    if (curPage === 1 && numOfPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
     </button>
        `;
        
    }
     // Last page
    if (curPage === numOfPages && numOfPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${curPage - 1}</span>
      </button>
                
         `;
    }
        // Other page

    if (curPage < numOfPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>

        `;
    }
     // Page 1, and there are NO other pages
    return ''
  }
}
export default new PaginationView();
