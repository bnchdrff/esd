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

Drupal.behaviors.vimeoReady = {
  attach: function (context, settings) {
    $('.media-vimeo-player', context).each(function() {
      $(this).load(function() {
        console.log('vimeo');
        var vimeo = $f($(this).attr('id'));
        vimeo.addEvent('ready', function() {
          vimeo.addEvent('pause', vm_onPause);
          vimeo.addEvent('finish', vm_onFinish);
          vimeo.addEvent('playProgress', vm_onPlayProgress);
        });
      });
    });
  }
};

})(jQuery);

// via http://drupal.org/node/1667660
var youtube_tag = document.createElement('script');
youtube_tag.src = "//www.youtube.com/iframe_api";
var vimeo_tag = document.createElement('script');
vimeo_tag.src = "//a.vimeocdn.com/js/froogaloop2.min.js";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(youtube_tag, firstScriptTag);
firstScriptTag.parentNode.insertBefore(vimeo_tag, firstScriptTag);
function onYouTubeIframeAPIReady() {
  var iframes = document.getElementsByTagName('iframe');
  var i, players;
  for (i = 0; i < iframes.length; i += 1) {
    if (iframes[i].className == 'media-youtube-player') {
      var playerId = iframes[i].id;
      players[i] = new YT.Player(playerId, {
        events: {
          'onStateChange': yt_onStateChange
        }
      });
    }
  }
}

// global event handlers
yt_onStateChange = vm_onPause = vm_onFinish = vm_onPlayProgress = function(ev) {
  console.log('ev');
  console.log(ev);
}
