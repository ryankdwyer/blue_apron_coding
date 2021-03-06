'use strict';

(function ($, blue_apron, window, document) {
  blue_apron.data = blue_apron.data || (function () {
    var endpoint = 'https://ba-js-test.herokuapp.com/api/menu_next_week';

    $.ajax({
      method: 'GET',
      url: endpoint
    }).done(function (data) {
      blue_apron.data = data.two_person_plan;

      var $recipePhotos = $('#recipe-photos');

      blue_apron.data.recipes.forEach(function (recipe) {
        $recipePhotos.append(blue_apron.data_parser.buildImage(recipe.recipe.high_menu_thumb_url, recipe.recipe.title));
      });
    }).fail(function (err) {
      console.log('Failed to load resources: ', err);
    });
  })();
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);

//# sourceMappingURL=data-compiled.js.map