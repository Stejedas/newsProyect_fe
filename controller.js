angular
  .module("myApp")
  .controller(
    "newsController",
    function ($scope, $location, $http, $rootScope, $interval, NewsService) {
      $scope.data;
      $scope.loading = true;

      $rootScope.allModes.forEach((mode) => {
        if ($location.path() === mode.path) {
          ($scope.type = mode.mode), ($scope.mode = mode);
        }
      });

      // first call data
      NewsService.getNews($scope.type).then((obj) => {
        $scope.data = obj;
        $scope.loading = false;
      });

      // change status and remove from DOM
      $scope.changeStatus = function (id) {
        $http.patch(`http://localhost:8000/news/modificate/${id}`);

        $scope.data.splice(
          $scope.data.findIndex((element) => element._id === id),
          1
        );
      };

      // intermittent pulse => obtain streaming data
      stop = $interval(function () {
        NewsService.getNews($scope.type).then((response) => {
          if ($scope.data && $scope.data.length !== response.length) {
            return ($scope.data = response);
          }
          return;
        });
      }, 3000);

      // destroys intevalo when you exit the controller
      $scope.$on("$destroy", function () {
        $interval.cancel(stop);
        $scope.loading = true;
      });
    }
  );
