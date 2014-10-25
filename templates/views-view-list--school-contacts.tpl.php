<?php if (!empty($title)) : ?>
  <h3><?php print $title; ?></h3>
<?php endif; ?>

<?php
// This is our position in the full results set.
global $res_id;
if (!$res_id) {
  // total results place, for future reference maybe:
  //$res_id = $view->query->pager->get_items_per_page() * $view->query->pager->get_current_page();
  $res_id = 0;
}
?>
phone: <?php
$phone = unserialize($variables['view']->result[$res_id]->taxonomy_term_data_node__field_data_field_address_field_addr);
print($phone['phone_number']);
?>
<?php

$names = array();

// do primary contact first
$first_row = $variables['view']->result[$res_id];
$names[] = array(
  'primary',
  $first_row->field_field_fname_1[0]['rendered']['#markup'],
  $first_row->field_field_lname_1[0]['rendered']['#markup'],
  $first_row->users_node_mail,
);

foreach ($rows as $row_number => $columns) {
  $this_row = $variables['view']->result[$res_id];
  // secondary (acl) contact
  if ($this_row->acl_acl_node__acl_node_grant_update == 1
      && isset($this_row->field_field_fname[0])) {
    $names[] = array(
      'secondary',
      $this_row->field_field_fname[0]['rendered']['#markup'],
      $this_row->field_field_lname[0]['rendered']['#markup'],
      $this_row->_field_data['users_acl_user_uid']['entity']->mail,
    );
  }
  // superintendent
  if (isset($this_row->field_field_fname_2[0])) {
    $names[] = array(
      'superintendent',
      $this_row->field_field_fname_2[0]['rendered']['#markup'],
      $this_row->field_field_lname_2[0]['rendered']['#markup'],
      $this_row->_field_data['users_field_data_field_superintendents_uid']['entity']->mail,
    );
  }
  $res_id++;
}

print theme_table(array(
  'header' => array('Capacity', 'First', 'Last', 'Email'),
  'rows' => array_map("unserialize", array_unique(array_map("serialize", $names))),
));
?>
