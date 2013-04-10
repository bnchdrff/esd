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
        var vimeo = $f($(this).attr('id'));
        vimeo.addEvent('ready', function() {
          vimeo.addEvent('play', vm_play);
          vimeo.addEvent('pause', vm_pause);
          vimeo.addEvent('finish', vm_finish);
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

/**
 * Control video overlay
 *
 * @param (object) state
 *   string action: played | paused | finished
 *   string id: player id
 */
player_ctl = function(state) {
  var $player = jQuery('#' + state.id);
  if (document.getElementById('fade') === null) {
    jQuery('body').append('<div id="fade" />');
  }
  if (state.action == 'played') {
    jQuery('#fade').height(jQuery('body').height()+'px').fadeIn();
    $player.addClass('overlay');
  } else if (state.action == 'paused' || state.action == 'finished') {
    jQuery('#fade').fadeOut();
    $player.removeClass('overlay');
  }
}

/**
 * Event handler for YouTube video interactions
 *
 * @param ev
 * @return object
 *   string action: played | paused | finished
 *   string id: player id
 */
yt_onStateChange = function(ev) {
  var action;
  var id = ev.target.a.id;
  if (ev.data === 1) {
    // play
    action = 'played';
  } else if (ev.data === 2) {
    action = 'paused';
  } else if (ev.data === 0) {
    action = 'finished';
  }
  player_ctl({
    action: action,
    id: id
  });
}

/**
 * Event handler for Vimeo play action
 *
 * @param ev
 * @return object
 *   string action: played | paused | finished
 *   string id: player id
 */
vm_play = function(id) {
  player_ctl({
    action: 'played',
    id: id
  });
}

/**
 * Event handler for Vimeo pause action
 *
 * @param ev
 * @return object
 *   string action: played | paused | finished
 *   string id: player id
 */
vm_pause = function(id) {
  player_ctl({
    action: 'paused',
    id: id
  });
}

/**
 * Event handler for Vimeo finish action
 *
 * @param ev
 * @return object
 *   string action: played | paused | finished
 *   string id: player id
 */
vm_finish = function(id) {
  player_ctl({
    action: 'finished',
    id: id
  });
}
