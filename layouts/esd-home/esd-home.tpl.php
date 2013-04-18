<header class="l-header">
  <!-- intentionally left empty for progressive enhancement elements -->
</header>

<div class="l-content">

<aside class="l-content-left">
  <div class="branding" role="banner">
    <?php if ($logo): ?>
      <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="site-logo"><img src="<?php print $logo; ?>" alt="<?php print t('Home'); ?>" /></a>
    <?php endif; ?>

    <?php if ($site_name || $site_slogan): ?>
      <hgroup>
        <?php if ($site_name): ?>
          <h1 class="site-name">
            <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home"><span><?php print $site_name; ?></span></a>
          </h1>
        <?php endif; ?>

        <?php if ($site_slogan): ?>
          <h2 class="site-slogan"><?php print $site_slogan; ?></h2>
        <?php endif; ?>
      </hgroup>
    <?php endif; ?>
    <?php print render($page['branding']); ?>
  </div>
</aside>

<section class="l-content-right">
  <?php print render($page['pre_content']); ?>
  <div class="l-region l-content-main" role="main">
    <a id="main-content"></a>
    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <h1><?php print $title; ?></h1>
    <?php endif; ?>
    <?php print render($title_suffix); ?>
    <?php print $messages; ?>
    <?php print render($tabs); ?>
    <?php print render($page['help']); ?>
    <?php if ($action_links): ?>
      <ul class="action-links"><?php print render($action_links); ?></ul>
    <?php endif; ?>
    <?php print render($page['content']); ?>
    <?php print $feed_icons; ?>
  </div>
  <?php print render($page['post_content']); ?>
  <?php print render($page['actions']); ?>

</section>

</div>

<div class="l-footer-wrapper">
  <div class="l-footer">
    <footer class="l-footer-left" role="contentinfo">
      <?php print render($page['footer_first']); ?>
    </footer>
    <footer class="l-footer-middle">
      <?php print render($page['footer_second']); ?>
    </footer>
    <footer class="l-footer-right">
      <?php print render($page['footer_third']); ?>
      <?php print render($page['footer_fourth']); ?>
    </footer>
  </div>
</div>
