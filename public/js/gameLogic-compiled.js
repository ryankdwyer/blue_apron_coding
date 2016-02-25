'use strict';

(function ($, blue_apron, window, document) {
  blue_apron.gameLogic = blue_apron.gameLogic || (function () {
    return {
      interval: undefined,
      points: undefined,
      timer: undefined,
      startButton: undefined,
      resetButton: undefined,
      recipesLeft: undefined,
      onMatch: function onMatch(event, correct) {
        var $imgParentDiv = $(event.target.parentNode);
        var $dragElement = $(blue_apron.dragNdrop.dragElement);
        var $dottedDiv = $dragElement.parent();

        $dottedDiv.height($dragElement.height());
        $dottedDiv.width($dragElement.width());
        $dottedDiv.css('padding', '.86em');

        $dragElement.addClass('answer');
        $dragElement.attr('draggable', false);

        $imgParentDiv.append($dragElement);
        $imgParentDiv.append(blue_apron.data_parser.buildCheckOrX(correct));

        blue_apron.gameLogic.recipesLeft = blue_apron.gameLogic.recipesLeft - 1;
        blue_apron.dragNdrop.dragElement = undefined;

        if (correct) {
          blue_apron.gameLogic.updatePoints(10);
        } else {
          blue_apron.gameLogic.updatePoints(-5);
        }

        if (blue_apron.gameLogic.getGameState() <= 0) {
          blue_apron.gameLogic.gameOver();
        }
      },
      startGame: function startGame(element) {
        var $startButton = blue_apron.gameLogic.startButton || $(element);
        var $resetButton = blue_apron.gameLogic.resetButton || $('#resetGame');
        var $timer = blue_apron.gameLogic.timer || $('#timer');
        var $points = blue_apron.gameLogic.points || $('#points');
        var $recipeNames = $('#recipe-names');

        blue_apron.data.recipes.forEach(function (recipe) {
          $recipeNames.append(blue_apron.data_parser.buildRecipe(recipe.recipe.title, recipe.recipe.sub_title), recipe.product_id);
        });

        var recipeBoxes = $('.recipe-box');
        var recipeCount = recipeBoxes.length;

        blue_apron.data_parser.makeDraggable(recipeBoxes);
        blue_apron.gameLogic.saveDomElements($points, $timer, $startButton, $resetButton, recipeCount);
        blue_apron.gameLogic.initClock();

        $startButton.addClass('hide');
        $resetButton.removeClass('hide');
      },
      resetGame: function resetGame(element) {
        var $startGame = blue_apron.gameLogic.startButton || $('#startGame');
        var $resetButton = blue_apron.gameLogic.resetButton || $('#resetGame');
        var $timer = blue_apron.gameLogic.timer || $('#timer');
        var $points = blue_apron.gameLogic.points || $('#points');

        clearInterval(blue_apron.gameLogic.interval);
        $points.text('0');
        $timer.text('2:00');
        $resetButton.addClass('hide');
        $startGame.removeClass('hide');

        blue_apron.gameLogic.clearGameBoard();
      },
      tick: function tick(end) {
        var timeToGo = end - Date.now();
        var sec = Math.floor(timeToGo / 1000 % 60);
        var min = Math.floor(timeToGo / 1000 / 60 % 60);
        sec = sec < 10 ? '0' + sec : sec;
        return {
          totalTime: timeToGo,
          sec: sec,
          min: min
        };
      },
      saveDomElements: function saveDomElements(points, timer, startButton, resetButton, recipeCount) {
        blue_apron.gameLogic.points = points;
        blue_apron.gameLogic.timer = timer;
        blue_apron.gameLogic.startButton = startButton;
        blue_apron.gameLogic.resetButton = resetButton;
        blue_apron.gameLogic.recipesLeft = recipeCount;
      },
      initClock: function initClock() {
        var end = Date.now() + 120000;
        blue_apron.gameLogic.interval = setInterval(function () {
          var time = blue_apron.gameLogic.tick(end);
          blue_apron.gameLogic.timer.text(time.min + ':' + time.sec);
          if (time.totalTime <= 0) {
            clearInterval(blue_apron.gameLogic.interval);
            blue_apron.gameLogic.gameOver();
          }
        }, 800);
      },
      updatePoints: function updatePoints(num) {
        var $points = blue_apron.gameLogic.points || $('#points');
        $points.text(Number($points.text()) + num);
      },
      gameOver: function gameOver() {
        clearInterval(blue_apron.gameLogic.interval);
        blue_apron.modal.showModal('You scored: ' + blue_apron.gameLogic.points.text() + ' points.');
      },
      getGameState: function getGameState() {
        return blue_apron.gameLogic.recipesLeft;
      },
      clearGameBoard: function clearGameBoard() {
        var checkAndX = $('.check-or-x');
        var photoDiv = $('div.recipe-box.answer');
        $('#recipe-names').empty();
        for (var i = 0; i < photoDiv.length; i++) {
          $(photoDiv[i]).remove();
        }
        for (var i = 0; i < checkAndX.length; i++) {
          $(checkAndX[i]).remove();
        }
      },
      buildGameBoard: function buildGameBoard() {
        var $recipeNames = $('#recipe-names');
        blue_apron.data.recipes.forEach(function (recipe) {
          $recipeNames.append(blue_apron.data_parser.buildRecipe(recipe.recipe.title, recipe.recipe.sub_title), recipe.product_id);
        });
      }
    };
  })();
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);

//# sourceMappingURL=gameLogic-compiled.js.map