<?php

use Roots\Sage\Config;
use Roots\Sage\Wrapper;

?>

<!doctype html>
<html class="no-js" <?php language_attributes(); ?>>
  <?php get_template_part('templates/head'); ?>
  <body <?php body_class();  if(is_page_template( 'template-angular-app.php'))echo(" ng-app='ideaCloud'"); ?> >
    <!--[if lt IE 9]>
      <div class="alert alert-warning">
        <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'sage'); ?>
      </div>
    <![endif]-->
    <?php
      do_action('get_header');
      get_template_part('templates/header');
    ?>
    <div class="wrap container" role="document">
      <div class="content row">
        <main class="main curvy-border" role="main">
          <div class="inner-fix">
            <?php include Wrapper\template_path(); ?>
          </div>
        </main><!-- /.main -->
        <?php if (Config\display_sidebar()) : ?>
          <aside class="sidebar curvy-border" role="complementary">
            <div class="inner-fix">
              <?php include Wrapper\sidebar_path(); ?>
            </div>
          </aside><!-- /.sidebar -->
        <?php endif; ?>
      </div><!-- /.content -->
      <?php
        do_action('get_footer');
        get_template_part('templates/footer');
        wp_footer();
      ?>
    </div><!-- /.wrap -->
  </body>
</html>
