<article<?php print $attributes; ?>>
  <ul>
    <li><strong>First name:</strong> <?php print $user_profile['field_fname'][0]['#markup']; ?></li>
    <li><strong>Last name:</strong> <?php print $user_profile['field_lname'][0]['#markup']; ?></li>
    <li><strong>Email Address:</strong> <?php print $user_profile['mail']; ?></li>
  </ul>
</article>
