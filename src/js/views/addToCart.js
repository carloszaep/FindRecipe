import View from './view.js';
import icons from 'url:../../img/icons.svg';

class cartView extends View {
  _parentElement = document.querySelector('.cart__list');
  _message = 'No ingredients yet';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(data) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
        <use href="src/img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${data.ingQuantity}</div>
    <div class="recipe__description">            
        ${data.ingDescription}
    </div>
</li>
    `;
  }
}

export default new cartView();
