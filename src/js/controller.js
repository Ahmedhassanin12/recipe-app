import * as model from './model';
import recipeView from './Views/recipeView';
import 'core-js/stable';
import searchView from './Views/searchView';
import Result from './Views/resultView';
import PaginationView from './Views/paginationView';
import bookmarksView from './Views/bookmarksView';
import addRecipeView from './views/addRecipeView.js';

// import 'regenerator-runtime/runtime'

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
/// spinner

/// show recipe
const recipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 0) Update results view to mark selected search result
    Result.update(model.getSearchResult());
    // 1) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    //loading recipe
    await model.loadRecipe(id);

    // rending recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.errorMassage();
    console.log(error);
  }
};

const searchResult = async function () {
  try {
    // get search query
    Result.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    //load search results
    await model.searchRecipe(query);
    Result.render(model.getSearchResult());

    // 4) Render initial pagination buttons
    PaginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
  // recipeView.update(model.state.recipe);
};

const controlPagination = function (goToPage) {
  // 1) Render NEW results
  Result.render(model.getSearchResult(goToPage));

  // 2) Render NEW pagination buttons
  PaginationView.render(model.state.search);
};
const controlAddBookmark = function () {
  // 1) Add/remove bookmark
  if (!model.state.recipe.bookmarked){
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe);

  // 3) Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    // addRecipeView.reMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, 2.5 * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.errorMassage(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.handelEvents(recipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.handlerSearch(searchResult);
  PaginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
