'use strict';
(function ($, blue_apron, window, document) {
  blue_apron.dragNdrop = blue_apron.dragNdrop || (function () {
      return {
        dragElement: undefined,
        onDragEnd(e) {
          $(this).removeClass('translucent');
        },
        onDragLeave(e) {
          $(this).removeClass('outline');
        },
        onDragOver(e) {
          e.preventDefault();
          $(this).addClass('outline');
        },
        onDragStart(e) {
          $(this).addClass('translucent');
          blue_apron.dragNdrop.dragElement = this;
          e.originalEvent.dataTransfer.setData('text/html', $(this).data().title);
        },
        onDrop(e) {
          e.preventDefault();
          e.stopPropagation();
          let target = $(this);
          let dataFromDrop = blue_apron.dragNdrop.parseDataTransfer(e);
          let dataFromTarget = target.data().title;

          target.removeClass('outline');
          blue_apron.gameLogic.onMatch(e, blue_apron.dragNdrop.match(dataFromDrop, dataFromTarget));
        },
        parseDataTransfer(event) {
          return event.originalEvent.dataTransfer.getData("text/html").split('>')[1];
        },
        match(drop, target) {
          return drop === target;
        }
      }
    })()
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);