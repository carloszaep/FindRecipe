import * as model from './module.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    // LOADING RECIPE
    await model.loadRecipe(id);

    // RENDER RECIPE
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err.message);
  }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, showRecipe));

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
