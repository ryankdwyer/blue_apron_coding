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
        onMatch(event, right) {
          let $img = $(event.target.parentNode);
          let $dragElement = $(blue_apron.dragNdrop.dragElement);
          let $dottedDiv = $dragElement.parent();

          $dottedDiv.height($dragElement.height());
          $dottedDiv.width($dragElement.width());
          $dottedDiv.css('padding', '.86em');

          $dragElement.addClass('correct-answer');
          $dragElement.attr('draggable', false);

          $img.append($dragElement);
          $img.append(blue_apron.data_parser.buildCheckOrX(right));

          blue_apron.gameLogic.recipesLeft = blue_apron.gameLogic.recipesLeft - 1;
          blue_apron.dragNdrop.dragElement = undefined;

          if(right) {
            blue_apron.gameLogic.updatePoints(10);
            //put a green CHECK mark
          } else {
            blue_apron.gameLogic.updatePoints(-5);
            //put a red X
          }
          if(blue_apron.gameLogic.getGameState() <=0) {
            blue_apron.gameLogic.gameOver();
          }
        },
        startGame(element) {
          let $startButton = blue_apron.gameLogic.startButton || $(element);
          let $resetButton = blue_apron.gameLogic.resetButton || $('#resetGame');
          let $timer = blue_apron.gameLogic.timer || $('#timer');
          let $points = blue_apron.gameLogic.points || $('#points');
          let recipeBoxes = $('.recipe-box');
          let recipeCount = blue_apron.gameLogic.recipesLeft || recipeBoxes.length;

          blue_apron.data_parser.makeDraggable(recipeBoxes);
          blue_apron.gameLogic.saveDomElements($points, $timer, $startButton, $resetButton, recipeCount);
          blue_apron.gameLogic.initClock();


          $startButton.addClass('hide');
          $resetButton.removeClass('hide');
        },
        resetGame(element) {
          let $startGame = blue_apron.gameLogic.startButton || $('#startGame');
          let $resetButton = blue_apron.gameLogic.resetButton || $('#resetGame');
          let $timer = blue_apron.gameLogic.timer || $('#timer');
          let $points = blue_apron.gameLogic.points || $('#points');

          clearInterval(blue_apron.gameLogic.interval);
          $points.text('0');
          $timer.text('2:00');
          $resetButton.addClass('hide');
          $startGame.removeClass('hide');

          blue_apron.gameLogic.clearGameBoard();
          blue_apron.gameLogic.buildGameBoard();
        },
        tick (end) {
          let timeToGo = end - Date.now();
          let sec = Math.floor((timeToGo/1000) % 60);
          let min = Math.floor((timeToGo/1000/60) % 60);
          sec = (sec < 10) ? '0' + sec : sec;
          return {
            totalTime: timeToGo,
            sec: sec,
            min: min
          };
        },
        saveDomElements(points, timer, startButton, resetButton, recipeCount){
          blue_apron.gameLogic.points = points;
          blue_apron.gameLogic.timer = timer;
          blue_apron.gameLogic.startButton = startButton;
          blue_apron.gameLogic.resetButton = resetButton;
          blue_apron.gameLogic.recipesLeft = recipeCount;
        },
        initClock() {
          let end = Date.now() + 120000;
          blue_apron.gameLogic.interval = setInterval(function() {
            let time = blue_apron.gameLogic.tick(end);
            blue_apron.gameLogic.timer.text(`${time.min}:${time.sec}`);
            if (time.totalTime <= 0) {
              clearInterval(blue_apron.gameLogic.interval);
              blue_apron.gameLogic.gameOver();
            }
          }, 800)
        },
        updatePoints(num) {
          let $points = blue_apron.gameLogic.points || $('#points');
          $points.text(Number($points.text()) + num);
        },
        gameOver() {
          blue_apron.modal.showModal('You scored: ' + blue_apron.gameLogic.points.text() + ' points.');
        },
        getGameState() {
          return blue_apron.gameLogic.recipesLeft;
        },
        clearGameBoard() {
          let checkAndX = $('.check-or-x');
          let photoDiv = $('div.recipe-box.correct-answer');
          $('#recipe-names').empty();
          for (let i = 0; i < photoDiv.length; i++) {
            $(photoDiv[i]).remove();
          }
          for (let i = 0; i < checkAndX.length; i++) {
            $(checkAndX[i]).remove();
          }
        },
        buildGameBoard() {
          let $recipePhotos = $('#recipe-photos');
          let $recipeNames = $('#recipe-names');
          blue_apron.data.recipes.forEach(function(recipe) {
            $recipeNames.append(blue_apron.data_parser.buildRecipe(recipe.recipe.title, recipe.recipe.sub_title), recipe.product_id);
          })
        }
      }
    })()
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);