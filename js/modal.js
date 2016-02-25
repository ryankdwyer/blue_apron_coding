'use strict';
(function($, blue_apron, document){
  blue_apron.modal = blue_apron.modal || (function () {
    return {
      showModal(text) {
        $('#modal-content').text(text);
        $('#modal').css('visibility', 'visible');
      },
      closeModal() {
        $('#model-content').text('');
        $('#modal').css('visibility', 'hidden');
        blue_apron.gameLogic.resetGame();
      }
    }
  })()
})(jQuery, window._blue_apron = window._blue_apron || {}, document);
