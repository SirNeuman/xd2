<?php
/**
 * Template Name: Idea Cloud App
 */
?>

<?php while (have_posts()) : the_post(); ?>
  <?php get_template_part('templates/page', 'header'); ?>
  <div class="idea-cloud" ng-controller="IdeaCloudController">
    <form class="form-inline" ng-submit="addIdea()" novalidate>
      <div class="row">
        <div class="col-sm-12">
          <label class="sr-only" for="newIdea">Idea</label>
          <div class="form-group">
            <input type="text" class="form-control" ng-model="newIdea" name="newIdea"  id="newIdea" placeholder="your idea" />
          </div>
          <button class="btn btn-default">List It</button>
        </div>
      </div>
    </form>
    <ul>
      <li ng-repeat="idea in ideas">
        <a href="#" class="idea" data-create-date="{{idea.createDate}}" data-count="{{idea.count}}" data-id="{{idea.id}}">
          {{idea.idea}}
        </a>
      </li>
    </ul>
  </div>
<?php endwhile; ?>
