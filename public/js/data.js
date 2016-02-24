'use strict';
(function ($, blue_apron, window, document) {
  blue_apron.data = blue_apron.data || (function () {
      let endpoint = 'https://ba-js-test.herokuapp.com/api/menu_next_week';
      $.ajax({
          method: 'GET',
          url: endpoint
        })
        .done(function (data) {
          blue_apron.data = data.two_person_plan;
          let $recipePhotos = $('#recipe-photos');
          let $recipeNames = $('#recipe-names');
          blue_apron.data.recipes.forEach(function (recipe) {
            $recipePhotos.append(blue_apron.data_parser.buildImage(recipe.recipe.high_menu_thumb_url, recipe.recipe.title));
            $recipeNames.append(blue_apron.data_parser.buildRecipe(recipe.recipe.title, recipe.recipe.sub_title), recipe.product_id);
          })
        })
        .fail(function (err) {
          console.log('Failed to load resources: ', err);
        })
    })()
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);

