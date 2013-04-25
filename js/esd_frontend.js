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
 * School Score forms
 */
Drupal.theme.prototype.schoolScoreForms = function() {
  $('#school-zip-code-form').submit(function(ev) {
    ev.preventDefault();
    var action = $(this).attr('action');
    var zip = $('#school-zip-code').val();
    var url = action + '?loc=' + zip;
    window.open(url, '_blank');
  });
  $('#school-name-form').submit(function(ev) {
    ev.preventDefault();
    var action = $(this).attr('action');
    var name = $('#school-name').val();
    var url = action + '?name=' + name;
    window.open(url, '_blank');
  });
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

function fixFlexsliderHeight() {
  // Set fixed height based on the tallest slide
  $('.flexslider').each(function(){
    var sliderHeight = 0;
    $(this).find('.slides > li').each(function(){
      slideHeight = $(this).height();
      if (sliderHeight < slideHeight) {
        sliderHeight = slideHeight;
      }
    });
    $(this).find('ul.slides').css({'height' : sliderHeight});
  });
}

/**
 * changes the dom for different layout sizes.
 */
Drupal.theme.prototype.layoutResizeChanges = function() {
  var isFront = $('body').hasClass('front');
  var images = document.getElementsByTagName('img')
  if (isFront) {
      //Flexislider
      fixFlexsliderHeight();
      Drupal.theme('schoolScoreForms');
  }
  // tablet or larger
  if ($.matchmedia(Drupal.settings.breakpoints.tablet)) {
    // switch images
    var i, l;
    for (i = 0, l = images.length; i < l; i += 1) {
      Drupal.theme('respondImg', Drupal.settings.imgstyles, 'tablet', images[i]);
    }
    if (isFront) {
      // content-right ordering for front page
      $('.l-content-main').prependTo('.l-content-right');
      if ($('#block-boxes-gcal-embed .boxes-box-content').length > 0) {
        if ($('#block-boxes-gcal-embed .boxes-box-content iframe').length == 0) {
          // Load the gCal embed for the first time.
          var embed = '<iframe src="https://www.google.com/calendar/embed?showTitle=0&amp;showNav=0&amp;showDate=0&amp;showPrint=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;mode=AGENDA&amp;height=400&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=excellentschoolsdetroit.org_1l30m4dgnk8eml5pv8df9r8eh0%40group.calendar.google.com&amp;color=%235F6B02&amp;ctz=America%2FNew_York" style=" border-width:0 " width="100%" height="400" frameborder="0" scrolling="no"></iframe>';
          $('#block-boxes-gcal-embed .boxes-box-content').append(embed);
        }
        $('#block-boxes-gcal-embed').show();
      }
      $('#block-views-blog-block-1').show();
    }
    if ($('.l-footer-right .l-region--footer-fourth').length > 0) {
      $('.l-region--footer-fourth').appendTo($('.l-header'));
    }
    $('#block-boxes-social-share').appendTo($('.l-footer-left'));
    $('#block-menu-block-3').appendTo($('.l-footer-middle'));
    $('#block-menu-block-4').appendTo($('.l-footer-middle'));
    $('#block-menu-block-5').appendTo($('.l-footer-right'));
    $('.l-region--actions').appendTo($('.l-content-left'));
    // equal col heights
    Drupal.theme('equalColumns');
  }
  // desktop or larger
  else if ($.matchmedia(Drupal.settings.breakpoints.desktop)) {
    // switch images
    var i, l;
    for (i = 0, l = images.length; i < l; i += 1) {
      Drupal.theme('respondImg', Drupal.settings.imgstyles, 'desktop', images[i]);
    }
  }
  // mobile (i.e. restore source order to original)
  else {
    if (isFront) {
      // content-right ordering for front page
      $('.l-region--pre-content').prependTo('.l-content-right');
      $('#block-boxes-gcal-embed').hide();
      $('#block-views-blog-block-1').hide();
    }
    if ($('.l-header .l-region--footer-fourth').length > 0) {
      $('.l-region--footer-fourth').appendTo($('.l-footer-right'));
    }
    $('#block-boxes-social-share').appendTo($('.l-region--footer-third'));
    $('#block-menu-block-3').appendTo($('.l-region--footer-first'));
    $('#block-menu-block-4').appendTo($('.l-region--footer-first'));
    $('#block-menu-block-5').appendTo($('.l-region--footer-second'));
    $('.l-region--actions').appendTo($('.l-content-right'));
    // equal col heights
    $('.l-content').css('min-height','');
  }
};

/**
 * Resize event for switching between layouts.
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
Drupal.behaviors.imgBits = {
  attach: function (context, settings) {
    // imgresize
    if (document.getElementById && document.getElementsByTagName) {
      imgSizer.collate($('img', context));
    }
    $(".l-content-right img", context).each(function() {
      $(this).removeAttr('height'); // make resizing work
    });
  }
};

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
