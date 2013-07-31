<?php

function esd_tablesort_indicator($variables) {
  $attrs = array('class' => 'sort-arrow');
  if ($variables['style'] == "asc") {
    return theme('image', array('path' => drupal_get_path('theme', 'esd') . '/images/sort_arrow_down.png', 'width' => 13, 'height' => 13, 'alt' => t('sort ascending'), 'title' => t('sort ascending'), 'attributes' => $attrs));
  }
  else {
    return theme('image', array('path' => drupal_get_path('theme', 'esd') . '/images/sort_arrow_up.png', 'width' => 13, 'height' => 13, 'alt' => t('sort descending'), 'title' => t('sort descending'), 'attributes' => $attrs));
  }
}
