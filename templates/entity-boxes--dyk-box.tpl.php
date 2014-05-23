<?php

/**
 * @file
 * A basic template for entity_boxes entities
 *
 * Available variables:
 * - $content: An array of comment items. Use render($content) to print them all, or
 *   print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $title: The name of the entity_boxes
 * - $url: The standard URL for viewing a entity_boxes entity
 * - $page: TRUE if this is the main view page $url points too.
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. By default the following classes are available, where
 *   the parts enclosed by {} are replaced by the appropriate values:
 *   - entity-profile
 *   - entity_boxes-{TYPE}
 *
 * Other variables:
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 *
 * @see template_preprocess()
 * @see template_preprocess_entity()
 * @see template_process()
 */
 if(isset($field_dyk_image_term[0]['taxonomy_term'])) {
   $image_uri = $field_dyk_image_term[0]['taxonomy_term']->field_dyk_image['und'][0]['uri'];
   $image = theme('image_style', array('style_name' => 'large', 'path' => $image_uri));
 }
?>
<div class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>
  <div class="content"<?php print $content_attributes; ?>>
    <?php if (isset($image)): ?>
      <div class="dyk-image">
        <?php print $image; ?>
      </div>
    <?php endif;?>
    <div class="dyk-body">
      <?php print $field_dyk_body[0]['safe_value']; ?>
    </div>
    <?php if (isset($field_dyk_link[0])): ?>
      <div class="dyk-link-wrap"><a class="dyk-link arrow-link" title="Read more" href="<?php print $field_dyk_link[0]['value']; ?>"></a></div>
    <?php endif; ?>
  </div>
</div>
