import * as model from './module.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    resultsView.render(model.getSearchResultPage());
    // LOADING RECIPE
    await model.loadRecipe(id);

    // RENDER RECIPE
    recipeView.render(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError(err.message);
    console.error(err.message);
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();
    await model.loadSearchResults(query);

    resultsView.render(model.getSearchResultPage(1));

    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));

  paginationView.render(model.state.search);
};

const controlServing = function (newServing) {
  // update recipe serving (in state)
  model.updateServing(newServing);
  // update the view
  recipeView.render(model.state.recipe);
};

const controlAddOrDelBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);

  recipeView.render(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // show spinning
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    // render recipe
    recipeView.render(model.state.recipe);

    // close form
    addRecipeView.toggleWindow();
  } catch (err) {
    console.error(err);
    addRecipeView.renderMessage(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServing);
  recipeView.addHandlerAddBookmark(controlAddOrDelBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerLClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

init();
