<?php  
if( is_single() || is_post_type_archive() || is_home() || is_author() || is_category() || is_date()) {
  dynamic_sidebar('sidebar-blog');
} else if (is_page_template( 'template-angular-app.php')) {
  dynamic_sidebar('sidebar-primary');
} else {
  dynamic_sidebar('sidebar-primary');
}
?>