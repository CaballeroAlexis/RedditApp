// Ionic Starter App


  var app=angular.module('starter', ['ionic'])
  app.controller('RedditCtrl',function($scope,$http){
    $scope.posts=[];
    $http.get("https://www.reddit.com/r/gaming/new/.json")
    .success(function(posts){
      angular.forEach(posts.data.children,function(post) {
        $scope.posts.push(post.data);
        
      });
      console.log(posts);
    });
    $scope.doInfinite=function(){
      var params={};
      if($scope.posts.length  > 0){
        params['after']=$scope.posts[$scope.posts.length  -1].name;

      }
      $http.get("https://www.reddit.com/r/gaming/new/.json",{params:params})
      .success(function(posts){
        angular.forEach(posts.data.children,function(post) {
          $scope.posts.push(post.data);
        });
        $scope.$broadcast('scroll.infiniteScrollComplete');
    })
  };
  $scope.doRefresh=function(){
    var params={'before':$scope.posts[0].name};
    $http.get("https://www.reddit.com/r/gaming/new/.json",{params:params})
    .success(function(posts){
      var newPost=[];
      angular.forEach(posts.data.children,function(post) {
        newPost.push(post.data);
      });
      $scope.posts=newPost.concat($scope.posts);
      $scope.$broadcast('scroll.refreshComplete');
  })    
  }

  $scope.openLink=function(url){
    window.open(url,"_blank");
  }
}
);

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      if (window.cordova && window.Keyboard) {
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.cordova && window.cordova.InAppBrowser){
        window.open = window.cordova.InAppBrowser.open;
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });