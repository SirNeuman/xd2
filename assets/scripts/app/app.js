var ideaCloud = angular.module('ideaCloud', ['ngResource']);

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
    getIdeasQuery.$promise.then(function(){
      // loaded!
    }).catch(function(){
      // uh oh
    });

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

        // success
        ideaSaveQuery.$promise.then(function(data){
          console.dir(data);
          if(data.alreadyExists){
            // push updated count to client
            angular.forEach($scope.ideas, function (idea, key) {
              if(idea.id === data.idea.id){
                $scope.ideas[key].count = data.idea.count;
              }
            });
          } else {
            $scope.ideas.push(data.idea);
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
    
    //vote
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
        alertify.success(data.message);
      //fail
      }).catch(function(data){
        alertify.error(data.message);
      });
      angular.element('.vote-menu').remove();
    };

  });
