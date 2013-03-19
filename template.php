<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * WD Theme.
 */

/**
 * Implements hook_omega_theme_libraries_info().
 */
function wd_theme_omega_theme_libraries_info($theme) {
  $path = drupal_get_path('theme', 'wd_theme');

  $libraries['selectnav'] = array(
    'name' => t('Selectnav'),
    'description' => t("selectnav.js library"),
    'package' => t('wd_theme'),
    'files' => array(
      'js' => array(
        $path . '/js/selectnav/selectnav.min.js' => array(
          'group' => JS_THEME,
          'weight' => -100,
          'every_page' => TRUE,
        ),
      ),
    ),
  );

  $libraries['responsive'] = array(
    'name' => t('Responsive Libs'),
    'description' => t('Responsive libraries and plugins'),
    'package' => t('wd_theme'),
    'files' => array(
      'js' => array(
        $path . '/js/jquery.resizeend.js' => array(
          'group' => JS_THEME,
          'weight' => -101,
          'every_page' => TRUE,
        ),
        $path . '/js/jquery.matchmedia.js' => array(
          'group' => JS_THEME,
          'weight' => -100,
          'every_page' => TRUE,
        ),
      ),
    ),
  );

  $libraries['wd_theme_frontend'] = array(
    'name' => t('WD Theme Frontend'),
    'description' => t('wd_theme frontend magic'),
    'package' => t('wd_theme'),
    'files' => array(
      'js' => array(
        $path . '/js/wd_theme_frontend.js' => array(
          'group' => JS_THEME,
          'weight' => 100,
          'every_page' => TRUE,
        ),
      ),
    ),
  );

  $libraries['imgsizer'] = array(
    'name' => t('ImgSizer'),
    'description' => t('Image sizer plugin'),
    'package' => t('wd_theme'),
    'files' => array(
      'js' => array(
        $path . '/js/imgsizer.js' => array(
          'group' => JS_THEME,
          'weight' => 80,
          'every_page' => TRUE,
        ),
      ),
    ),
  );

  $libraries['superfish'] = array(
    'name' => t('Superfish'),
    'description' => t('Superfish dropdown menus'),
    'package' => t('wd_theme'),
    'files' => array(
      'js' => array(
        $path . '/js/superfish.js' => array(
          'group' => JS_THEME,
          'weight' => 90,
          'every_page' => TRUE,
        ),
      ),
    ),
  );


  return $libraries;
}

/**
 * Implements template_preprocess_page
 */
function wd_theme_preprocess_page(&$vars) {
  drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "/' . path_to_theme() . '/" });', 'inline');
}
