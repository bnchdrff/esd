<article<?php print $attributes; ?>>
  <ul>
    <?php if (isset($user_profile['field_fname'][0]['#markup'])): ?>
    <li><strong>First name:</strong> <?php print $user_profile['field_fname'][0]['#markup']; ?></li>
    <?php endif; ?>
    <?php if (isset($user_profile['field_lname'][0]['#markup'])): ?>
    <li><strong>Last name:</strong> <?php print $user_profile['field_lname'][0]['#markup']; ?></li>
    <?php endif; ?>
    <?php if (isset($user_profile['mail'])): ?>
    <li><strong>Email Address:</strong> <?php print $user_profile['mail']; ?></li>
    <?php endif; ?>
  </ul>
</article>
