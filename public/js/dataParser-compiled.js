'use strict';

(function ($, blue_apron, window, document) {
  blue_apron.data_parser = blue_apron.data_parser || (function () {
    return {
      buildImage: function buildImage(src, title) {
        var $div = $(document.createElement('div'));
        var $img = $(document.createElement('img'));

        $img.data('title', title);
        $img.attr('src', 'http:' + src);
        $img = blue_apron.data_parser.makeDroppable($img);

        $div.append($img);

        return $div;
      },
      buildRecipe: function buildRecipe(title, subtitle, product_id) {
        var $dottedLineDiv = $(document.createElement('div'));
        $dottedLineDiv.addClass('dotted');

        var $div = $(document.createElement('div'));
        $div.addClass('recipe-box');
        $div.attr('id', product_id);
        $div.data('title', title);
        $div.data('sub_title', subtitle);

        var $titleDiv = $(document.createElement('div'));
        $titleDiv.text(title);
        $titleDiv.addClass('recipe-title');

        var $sub_titleDiv = $(document.createElement('div'));
        $sub_titleDiv.text(subtitle);
        $sub_titleDiv.addClass('recipe-sub_title');

        $div.append($titleDiv);
        $div.append($sub_titleDiv);
        $dottedLineDiv.append($div);

        return $dottedLineDiv;
      },
      buildCheckOrX: function buildCheckOrX(right) {
        var $img = $(document.createElement('img'));

        $img.addClass('check-or-x');
        if (right) {
          $img.attr('src', 'img/check.png');
        } else {
          $img.attr('src', 'img/x.png');
        }
        return $img;
      },
      makeDraggable: function makeDraggable(elements) {
        for (var i = 0; i < elements.length; i++) {
          var currElement = $(elements[i]);
          currElement.attr('draggable', true);
          currElement.on('dragstart', blue_apron.dragNdrop.onDragStart);
          currElement.on('dragend', blue_apron.dragNdrop.onDragEnd);
        }
      },
      makeDroppable: function makeDroppable($element) {
        $element.attr('droppable', true);
        $element.on('dragover', blue_apron.dragNdrop.onDragOver);
        $element.on('dragleave', blue_apron.dragNdrop.onDragLeave);
        $element.on('drop', blue_apron.dragNdrop.onDrop);
        return $element;
      }
    };
  })();
})(jQuery, window._blue_apron = window._blue_apron || {}, window, document);

//# sourceMappingURL=dataParser-compiled.js.map