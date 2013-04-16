<?php

/**
 * @file
 * Template overrides as well as (pre-)process and alter hooks for the
 * Excellent Schools Detroit theme.
 */

/**
 * Implements hook_omega_theme_libraries_info().
 */
function esd_omega_theme_libraries_info($theme) {
  $path = drupal_get_path('theme', 'esd');

  $libraries['selectnav'] = array(
    'name' => t('Selectnav'),
    'description' => t("selectnav.js library"),
    'package' => t('esd'),
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
    'package' => t('esd'),
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

  $libraries['esd_frontend'] = array(
    'name' => t('Excellent Schools Detroit Frontend'),
    'description' => t('esd frontend magic'),
    'package' => t('esd'),
    'files' => array(
      'js' => array(
        $path . '/js/esd_frontend.js' => array(
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
    'package' => t('esd'),
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
    'package' => t('esd'),
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
function esd_preprocess_page(&$vars) {
  drupal_add_js('jQuery.extend(Drupal.settings, { "pathToTheme": "/' . path_to_theme() . '/" });', 'inline');
  if (is_object($vars['node'])) {
    if ($vars['node']->type == 'blog_entry') {
      // Set Page title to Blog on blog nodes.
      $vars['title'] = 'Blog';
    }
  }
}

/**
 * Implements template_preprocess_node
 */
function esd_preprocess_node(&$vars) {
  // Re-order the links.
  $vars['content']['links'] = array_reverse($vars['content']['links']);
  // Add wrapper & "from" to media outlet field
  if (isset($vars['content']['field_media_outlet'])) {
    $vars['content']['field_media_outlet']['#prefix'] = '<div class="media-hit-outlet-wrapper"><span class="italic">from</span>';
    $vars['content']['field_media_outlet']['#suffix'] = '</div>';
  }
}

/**
 * Implements theme_file_icon().
 */
function esd_file_icon($variables) {
  $file = $variables['file'];
  if ($file->filemime == 'application/pdf') {
    // Override PDF icon
    $icon_directory = drupal_get_path('theme', 'esd') . '/images/file-icons';
  } else {
    $icon_directory = $variables['icon_directory'];
  }

  $mime = check_plain($file->filemime);
  $icon_url = file_icon_url($file, $icon_directory);
  return '<img alt="" class="file-icon" src="' . $icon_url . '" title="' . $mime . '" />';
}
