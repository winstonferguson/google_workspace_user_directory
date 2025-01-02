
  <? for (const user of users) { ?>
  
    <div class='card' data-search-string='<?= userSearchString(user) ?>' onclick='showProfile(event)'>

      <?!= userPhoto(user) ?>

      <div class='info'>
        <h3><?= user.name.fullName ?></h3>

        <?!= userOrganization(user) ?>     

      </div>

      <?!= render('user_profile', { user: user }) ?>
      
    </div>

  <? } ?>