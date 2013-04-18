(function($) {

// Breakpoints
// via sass/utils/_vars.scss
// Used by $.matchmedia() in various behaviors.
Drupal.settings.breakpoints = {
  tablet: 'all and (min-width: 740px)',
  desktop: 'all and (min-width: 980px)'
};

Drupal.settings.imgstyles = [
  //slideshow
  {
    tablet: '340w211h',
    desktop: '580w360h'
  },
  //contentright
  {
    tablet: '340wNh',
    desktop: '580wNh'
  }
];

/**
 * changes the dom for different layout sizes.
 */
Drupal.theme.prototype.equalColumns = function() {
  // Ensure Content Height equals Sidebar.
  var brandingHeight = $('.branding').outerHeight();
  $('.l-content').css('min-height', brandingHeight);
};

/**
 * Build a selectnav given a Drupal menu ul, and append it after the ul
 *
 * @param $menuUl
 *   jQuery menu ul object
 *
 * @param int menuNum
 *   identifier for navtoselect
 *
 * @return nothing
 */
Drupal.theme.prototype.buildSelectnav = function($menuUl, menuNum) {
  var menuID = 'navtoselect-' + menuNum;
  $menuUl.attr('id', menuID);
  selectnav(menuID, {label:false});
  // Hide the label...
  $('#selectnav' + menuNum + ' option:eq(0)').remove();
};

/**
 * Replace image style settings for new breakpoint
 *
 * @param array imgstyles
 *   Objects of image styles in the format:
 *   [ { breakpoint: 'size', breakpoint: 'size' }, { ... } ]
 *
 * @param string breakpoint
 *   Target breakpoint
 *
 * @param domobject img
 *   Image DOM object
 *
 */
Drupal.theme.prototype.respondImg = function(imgstyles, breakpoint, img) {
  var ii, ll;
  for (ii = 0, ll = imgstyles.length; ii < ll; ii += 1) {
    var new_style = imgstyles[ii][breakpoint];
    $.each(imgstyles[ii], function(idx, val) {
      if (idx != breakpoint) {
        img.src = img.src.replace(val, new_style);
      }
    });
  }
};

/**
 * changes the dom for different layout sizes.
 */
Drupal.theme.prototype.layoutResizeChanges = function() {
  var isFront = $('body').hasClass('front');
  var images = document.getElementsByTagName('img')
  // desktop or larger
  if ($.matchmedia(Drupal.settings.breakpoints.desktop)) {
    // switch images
    var i, l;
    for (i = 0, l = images.length; i < l; i += 1) {
      Drupal.theme('respondImg', Drupal.settings.imgstyles, 'desktop', images[i]);
    }
  }
  // tablet or larger
  else if ($.matchmedia(Drupal.settings.breakpoints.tablet)) {
    // switch images
    var i, l;
    for (i = 0, l = images.length; i < l; i += 1) {
      Drupal.theme('respondImg', Drupal.settings.imgstyles, 'tablet', images[i]);
    }
    if (isFront) {
      // content-right ordering for front page
      $('.l-content-main').prependTo('.l-content-right');
    }
    if ($('.l-footer-right .l-region--footer-fourth').length > 0) {
      $('.l-region--footer-fourth').appendTo($('.l-header'));
    }
    // equal col heights
    Drupal.theme('equalColumns');
  }
  // mobile (i.e. restore source order to original)
  else {
    if (isFront) {
      // content-right ordering for front page
      $('.l-region--pre-content').prependTo('.l-content-right');
    }
    if ($('.l-header .l-region--footer-fourth').length > 0) {
      $('.l-region--footer-fourth').appendTo($('.l-footer-right'));
    }
    // equal col heights
    $('.l-content').css('min-height','');
  }
};

/**
 * COH resize event for switching between layouts.
 */
Drupal.behaviors.resizeEnd = {
  attach: function (context, settings) {
    Drupal.theme('layoutResizeChanges');
    $(window).bind('resizeend', function() {
      Drupal.theme('layoutResizeChanges');
    });
  }
};

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

/**
 * Apply initial design tweaks
 */
Drupal.behaviors.esdInit = {
  attach: function (context, settings) {
    // Add the navigation select.
    $('#block-menu-block-1 .menu-block-wrapper > ul.menu', context).once('selectnav', function () {
      Drupal.theme('buildSelectnav', $(this), 1);
    });
    $('#block-menu-block-2 .menu-block-wrapper > ul.menu', context).once('selectnav', function () {
      Drupal.theme('buildSelectnav', $(this), 2);
    });
  }
};

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
