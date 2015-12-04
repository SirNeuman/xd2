<?php
/**
 * Template Name: Idea Cloud App
 */
?>

<?php while (have_posts()) : the_post(); ?>
  <div class="idea-cloud xdfade" id="idea-cloud" ng-class="{'fullscreen': isFullScreen}" ng-controller="IdeaCloudController">
    <?php get_template_part('templates/page', 'header'); ?>
    <p class="intro">How do you recommend celebrating existence?</p>
    <a ng-click="isFullScreen = !isFullScreen" class="full-screen-toggle">
      <span class="glyphicon glyphicon-fullscreen"></span>
    </a>
    <form class="form-inline" ng-submit="addIdea()" novalidate>
      <div class="row new-idea">
        <div class="col-sm-12">
          <label class="sr-only" for="newIdea">Idea</label>
            <input type="text" ng-model="newIdea" name="newIdea" id="newIdea" placeholder="your idea" autofocus />
            <button class="btn btn-xd btn-xl">List It</button>
        </div>
      </div>
    </form>
    <ul>
      <li ng-if="idea.count > 0" ng-repeat="idea in ideas | orderBy: 'createDate':true" ng-class="{'tickled': idea.wasTickled }">
        <a ng-click="showVoteMenu($event,idea.id)" title="{{idea.count}}" style="font-size:{{idea.fontSize}}px;" class="idea">
          {{idea.idea}}
        </a>
      </li>
    </ul>
    <div class="xd-spinner" ng-hide="true" ng-if="loading"></div>
  </div>
<?php endwhile; ?>
