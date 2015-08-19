var app = angular.module('ideaCloud', ['ngResource']);

  app.factory("Ideas", function($resource) {
    return $resource("http://104.131.8.61/api/v1/ideas",'', {
      'save':   {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        isArray: false,
        interceptor: {
          response: function(response) {
            //success
            console.log(response.data.message);
          },
          responseError: function(response) {
            //err
          }
        }
      },
      'query':  {
        method:'GET', 
        isArray:true
      },
      'vote': {
        method:'PUT'
      }
    });
  });
 
  app.controller('IdeaCloudController', function($scope, Ideas) {

    // make ideas list available to view
    Ideas.query(function(data) {
      $scope.ideas = data;
    });

    //add idea through the form
    $scope.addIdea = function() {
      //if idea exists
      if($scope.newIdea) {
        //convert and save idea
        Ideas.save(jQuery.param({
          idea: $scope.newIdea
        }));
      }
    };

  });
