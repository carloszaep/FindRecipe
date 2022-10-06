import View from './view.js';
import icons from 'url:../../img/icons.svg';

class cartView extends View {
  _parentElement = document.querySelector('.cart__list');
  _message = 'No ingredients yet';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  addHandlerRemove(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn__removeIng');

      if (!btn) return;
      const removeIng = String(btn.dataset.remove);

      handler(removeIng);
    });
  }

  _generateMarkupPreview(data) {
    return `
    <li class="recipe__ingredient">
    <div class="ingredinets__quantityAndDes">
      <svg class="recipe__icon">
        <use href="${icons}#bag"></use>
      </svg>
      <h2 class="recipe__quantity">${data.ingQuantity}</h2>
      <h3 class="recipe__description">${data.ingDescription}</h3>
    </div>
    <button data-remove="${data.id}" class="btn--tiny btn__removeIng">
      <svg>
        <use href="${icons}#trash"></use>
      </svg>
    </button>
  </li>   
    `;
  }
}

export default new cartView();
