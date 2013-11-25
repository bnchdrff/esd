<?php
if ($view_mode == 'sitevisitask') {
  $teaser = true;
}
?>
<?php if (!$teaser && (!empty($school_aside) || !empty($school_score_link))): ?>
  <div class="school-aside">
    <?php if (!empty($school_score_link)): ?>
      <div class="school-score">
        <?php print $school_score_link; ?>
      </div>
    <?php endif; ?>
    <?php if (!empty($school_aside)): ?>
    <div class="school-downloads">
      <h2>Downloads</h2>
      <?php print $school_aside; ?>
    </div>
    <?php endif; ?>
  </div>
<?php endif; ?>

<?php if (!$teaser && !empty($school_info)): ?>
  <div class="school-info">
    <?php print $school_info; ?>
  </div>
<?php endif; ?>

<article<?php print $attributes; ?>>
  <?php if (!empty($title_prefix) || !empty($title_suffix) || !$page): ?>
    <header>
      <?php print render($title_prefix); ?>
      <?php if (!$page): ?>
        <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>" rel="bookmark"><?php print $title; ?></a></h2>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
    </header>
  <?php endif; ?>

  <?php if ($display_submitted): ?>
    <footer class="node__submitted">
      <?php print $user_picture; ?>
      <p class="submitted"><?php print $submitted; ?></p>
    </footer>
  <?php endif; ?>

  <div<?php print $content_attributes; ?>>
    <?php
      // We hide the comments and links now so that we can render them later.
      hide($content['comments']);
      hide($content['links']);
      print render($content);
    ?>
  </div>

  <?php print render($content['links']); ?>
  <?php print render($content['comments']); ?>
</article>
