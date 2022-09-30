import View from './view.js';
import icons from 'url:../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerLClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _buttonMarkup(direction, page) {
    const right = direction === 'right';
    const pagNumber = right ? page + 1 : page - 1;

    const button = `
    <button data-goto="${pagNumber}" class="btn--inline pagination__btn--${
      right ? 'next' : 'prev'
    }">
        <span>Page ${pagNumber}</span>
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-${direction}"></use>
        </svg>
    </button>`;
    return button;
  }
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );
    const curPage = this._data.page;

    // page1, and there are other
    if (curPage === 1 && numPages > 1)
      return `${this._buttonMarkup('right', curPage)}`;

    // last page
    if (curPage === numPages && numPages > 1)
      return `${this._buttonMarkup('left', curPage)}`;

    // other page
    if (curPage < numPages)
      return `${this._buttonMarkup('right', curPage)}${this._buttonMarkup(
        'left',
        curPage
      )}`;
    // page1, no other
    return '';
  }
}

export default new paginationView();
