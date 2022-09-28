import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // LOADING RECIPE
    await model.loadRecipe(id);

    // RENDER RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError(err.message);
    console.error(err.message);
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

controlSearchResult();

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};

init();
