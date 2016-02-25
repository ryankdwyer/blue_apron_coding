'use strict';

(function ($, blue_apron, document) {
  blue_apron.modal = blue_apron.modal || (function () {
    return {
      showModal: function showModal(text) {
        $('#modal-content').text(text);
        $('#modal').css('visibility', 'visible');
      },
      closeModal: function closeModal() {
        $('#model-content').text('');
        $('#modal').css('visibility', 'hidden');
        blue_apron.gameLogic.resetGame();
      }
    };
  })();
})(jQuery, window._blue_apron = window._blue_apron || {}, document);

//# sourceMappingURL=modal-compiled.js.map