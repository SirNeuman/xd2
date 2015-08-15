<?php  
if( is_single() || is_post_type_archive() || is_home() || is_author() || is_category() || is_date())
{
    dynamic_sidebar('sidebar-blog');
} 
else
{
    dynamic_sidebar('sidebar-primary');
}
?>