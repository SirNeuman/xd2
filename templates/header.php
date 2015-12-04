<header class="banner" role="banner">
  <div class="container">
    <a class="brand" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?></a>
    <nav role="navigation">
      <?php
      if (has_nav_menu('primary_navigation')) :
        wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'nav']);
      endif;
      ?>
    </nav>
    <div class="happyTree">April 21st!</div>  
    <div id="menu-toggle" class="veggieburger visible-xs">
      <span></span>
      <span></span>
      <span></span>
    </div>

  </div>
</header>
