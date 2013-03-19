(function($) {

// Used by $.matchmedia() in various behaviors.
var query = 'all and (max-width: 770px)';

/**
 * Build a selectnav given a Drupal menu ul, and append it after the ul
 *
 * @param $menuUl
 *   jQuery menu ul object
 *
 * @return nothing
 */
/* Drupal.theme.prototype.buildSelectnav = function($menuUl) {
  $menuUl.attr('id', 'navtoselect');
  selectnav('navtoselect');
}; */

/**
 * Changes the DOM for different layout sizes.
 */
/* Drupal.theme.prototype.layoutResizeChanges = function($quicklinks) {
  if ($.matchmedia(query)) {
  } else {
  }
};*/

/**
 * COH resize event for switching between layouts.
 */
/*Drupal.behaviors.resizeEnd = {
  attach: function (context, settings) {
    $(window).bind('resizeend', function() {
    });
  }
};*/

/**
 * Do imgsizer and captions on some images
 */
/*Drupal.behaviors.imgBits = {
  attach: function (context, settings) {
    // imgresize
    if (document.getElementById && document.getElementsByTagName) {
      imgSizer.collate($('img', context));
    }
    // captions
    $(".l-content img", context).each(function() {
      var title = this.alt;
      $(this).removeAttr('height'); // make resizing work
      if (title.length > 0) {
        $(this).after('<div class="caption">'+ title +'</div>');
      }
    });
  }
};*/

})(jQuery);
