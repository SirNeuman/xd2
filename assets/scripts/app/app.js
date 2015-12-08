var ideaCloud = angular.module('ideaCloud', [
  'ngAnimate',
  'ngResource'
  ]);

  // Setup API as resource
  ideaCloud.factory('Ideas', function($resource) {
    var data = $resource('http://xd2.ntobo.com/api/v1/ideas', {
      id: '@id',
      voteDirection: '@voteDirection'
      }, {
      'query':  {
        url: 'http://xd2.ntobo.com/api/v1/ideas/:id/',
        method:'GET',
        isArray:true
      },
      'save':   {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        isArray: false
      },
      'vote': {
        method:'PUT',
        url: 'http://xd2.ntobo.com/api/v1/ideas/:id/:voteDirection'
      }
    });
    return data;
  });

  ideaCloud.controller('IdeaCloudController', function($scope, Ideas, $compile) {
    //set loading variable
    $scope.loading = true;

    // make ideas list available to view
    var getIdeasQuery = Ideas.query(function(data) {
      $scope.ideas = data;
    });
    getIdeasQuery.$promise.then(function(data){
      // Default font sizes
      $scope.loading = false;
      $scope.ideas = data;
      $scope.setFontSize();
      angular.element('#idea-cloud ul').show();
    }).catch(function(){
      // uh oh
    });

    $scope.setFontSize = function() {
      var minFontsize = 100;
      var maxFontsize = 350;
      var countArray = [];
      angular.forEach($scope.ideas, function (idea) {
        countArray.push(idea.count);
      });
      var minimumCount = Math.min.apply(Math,countArray);
      var maximumCount = Math.max.apply(Math,countArray);
      var spread = maximumCount - minimumCount;
      angular.forEach($scope.ideas, function (idea, key) {
        var adjustedSize = (minFontsize + (idea.count - minimumCount) * (maxFontsize - minFontsize) / spread);
        $scope.ideas[key].fontSize = adjustedSize;
      });
    };
    
    $scope.showVoteMenu = function(event, id) {
      //set mouse click coords
      var x = event.pageX - 15, // offset for little tree guy
          y = event.pageY - 29;
      if(event.shiftKey){
         //logic
          x = event.pageX - 49;
      }
      //add menu with params
      angular.element('body').append($compile(
      '<div class="vote-menu" style="top:' + y + 'px; left:' + x + 'px;"><ul>' +
      '<li><a ng-click="vote(' + id + ', \'up\')"  class="vote up hover">Up</a></li>' + 
      '<li><a ng-click="vote(' + id + ', \'down\')" class="vote down">Down</a></li>' + 
      '</ul></div>')($scope));
    };

    //add idea through the form
    $scope.addIdea = function() {
      //if newIdea isn't blank
      if($scope.newIdea) {
        //convert and save idea
        var ideaSaveQuery = Ideas.save(jQuery.param({
          idea: $scope.newIdea
        }));

        // if success response from server
        ideaSaveQuery.$promise.then(function(data){

          //if idea gets flagged by filters
          if (data.flagged) {
             alertify.error(data.message);
             return;
          }
          if(data.alreadyExists){
            // push updated count to client
            angular.forEach($scope.ideas, function (idea, key) {
              if(idea.id === data.idea.id){
                $scope.ideas[key].count = data.idea.count;
                $scope.ideas[key].wasTickled = true;
              }
            });
            $scope.setFontSize();
          } else {
            //add new idea to client
            data.idea.wasTickled = true;
            $scope.ideas.push(data.idea);
            $scope.setFontSize();
          }
          alertify.success(data.message);
        // fail
        }).catch(function(data){
          alertify.error(data.message);
      });
      }
      $scope.newIdea = '';
      angular.element('#newIdea').focus();
    };
    
    //vote through cloud menu click
    $scope.vote = function(id, voteDirection) {
      //send data to api
      var ideaVoteQuery = Ideas.vote({id: id, voteDirection: voteDirection});
      // success
      ideaVoteQuery.$promise.then(function(data){
        //if idea gets flagged by filters
        if (data.flagged) {
           alertify.error(data.message);
           return;
        }
        // push result to client
        angular.forEach($scope.ideas, function (idea, key) {
          if(idea.id === data.idea.id){
            $scope.ideas[key].count = data.idea.count;
            $scope.ideas[key].wasTickled = true;
          }
        });
        $scope.setFontSize();
        alertify.success(data.message);
      //fail
      }).catch(function(data){
        alertify.error(data.message);
      });
      angular.element('.vote-menu').remove();
    };

  });
