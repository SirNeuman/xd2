      <!-- if in quote category, display title as excerpt -->
      <?php if(in_category('5')){ ?>
        <article <?php post_class(); ?>>
            <header>
                <h2 class="quote"><?php the_content(''); ?></h2>
                <div class="entry-meta">
                  <time class="updated" datetime="<?= get_post_time('c', true); ?>"><?= get_the_date(); ?></time>
                  <span class="byline author vcard"><?= __('', 'sage'); ?> <a href="<?= get_author_posts_url(get_the_author_meta('ID')); ?>" rel="author" class="fn"><?= get_the_author(); ?></a></span>
                  <a href="<?php the_permalink(); ?>" title="permalink"><span class="glyphicon glyphicon-link"></span></a>
                </div>
            </header>
         </article>
      <!-- all other types of posts  -->
      <?php } else { ?>
        <article <?php post_class(); ?>>
          <header>
            <h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <?php get_template_part('templates/entry-meta'); ?>
          </header>
          <div class="entry-summary">
            <?php the_content(); ?>
          </div>
        </article>
    <!-- end if -->
    <?php } ?>