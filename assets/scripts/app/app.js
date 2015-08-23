var ideaCloud = angular.module('ideaCloud', ['ngResource']);

  // Setup API as resource
  ideaCloud.factory('Ideas', function($resource) {
    var data = $resource('http://104.131.8.61/api/v1/ideas', {
      id: '@id', 
      voteDirection: '@voteDirection'
      }, {
      'query':  {
        url: 'http://104.131.8.61/api/v1/ideas/:id/',
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
        url: 'http://104.131.8.61/api/v1/ideas/:id/:voteDirection'      
      }
    });
    return data;
  });


  ideaCloud.controller('IdeaCloudController', function($scope, Ideas, $compile) {

    // make ideas list available to view
    var getIdeasQuery = Ideas.query(function(data) {
      $scope.ideas = data;
    });
    getIdeasQuery.$promise.then(function(data){
      // Default font sizes
      $scope.ideas = data;
      $scope.setFontSize();
      angular.element('#idea-cloud ul').show();
    }).catch(function(){
      // uh oh
    });

    $scope.setFontSize = function() {
      var minFontsize = 14; 
      var maxFontsize = 72;
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
      //add menu with params
      angular.element('body').append($compile(
      '<div class="vote-menu" style="top:' + y + 'px; left:' + x + 'px;"><ul>' +
      '<li><a ng-click="vote(' + id + ', \'up\')" data-vote="up" class="vote up">Up</a></li>' + 
      '<li><a ng-click="vote(' + id + ', \'down\')" data-vote="down" class="vote down">Down</a></li>' + 
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
          if(data.alreadyExists){
            // push updated count to client
            angular.forEach($scope.ideas, function (idea, key) {
              if(idea.id === data.idea.id){
                $scope.ideas[key].count = data.idea.count;
              }
            });
            $scope.setFontSize();
          } else {
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
        // push result to client
        angular.forEach($scope.ideas, function (idea, key) {
          if(idea.id === data.idea.id){
            $scope.ideas[key].count = data.idea.count;
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
