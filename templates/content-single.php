<?php while (have_posts()) : the_post(); ?>
  <!-- if in quote category, display title as excerpt -->
  <?php if(in_category('5')){ ?>
    <article <?php post_class(); ?>>
        <header>
            <h2 class="quote"><?php the_content(''); ?></h2>
            <div class="entry-meta">
              <time class="updated" datetime="<?= get_post_time('c', true); ?>"><?= get_the_date(); ?></time>
              <span class="byline author vcard"><?= __('', 'sage'); ?> <a href="<?= get_author_posts_url(get_the_author_meta('ID')); ?>" rel="author" class="fn"><?= get_the_author(); ?></a></span>
            </div>
        </header>
     </article>
  <!-- all other types of posts  -->
  <?php } else { ?>
    <article <?php post_class(); ?>>
      <header>
        <h1 class="entry-title"><?php the_title(); ?></h1>
        <?php get_template_part('templates/entry-meta'); ?>
      </header>
      <div class="entry-content">
        <?php the_content(); ?>
      </div>
      <footer>
        <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
      </footer>
      <?php comments_template('/templates/comments.php'); ?>
    </article>
    <!-- end if -->
    <?php } ?>
<?php endwhile; ?>
