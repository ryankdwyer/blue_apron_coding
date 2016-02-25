'use strict';

(function ($, blue_apron, window, document) {
  blue_apron.dragNdrop = blue_apron.dragNdrop || (function () {
    return {
      dragElement: undefined,
      onDragEnd: function onDragEnd(e) {
        $(this).removeClass('translucent');
      },
      onDragLeave: function onDragLeave(e) {
        $(this).removeClass('outline');
      },
      onDragOver: function onDragOver(e) {
        e.preventDefault();
        $(this).addClass('outline');
      },
      onDragStart: function onDragStart(e) {
        $(this).addClass('translucent');
        blue_apron.dragNdrop.dragElement = this;
        e.originalEvent.dataTransfer.setData('text', $(this).data().title);
      },
      onDrop: function onDrop(e) {
        e.preventDefault();
        e.stopPropagation();

        var target = $(this);
        var dataFromDrop = blue_apron.dragNdrop.parseDataTransfer(e);
        var dataFromTarget = target.data().title;

        target.removeClass('outline');

        blue_apron.gameLogic.onMatch(e, blue_apron.dragNdrop.match(dataFromDrop, dataFromTarget));
      },
      parseDataTransfer: function parseDataTransfer(event) {
        return event.originalEvent.dataTransfer.getData("text");
      },
      match: function match(drop, target) {
        return drop === target;
      }
    };
  })();
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);

//# sourceMappingURL=dragNdrop-compiled.js.map