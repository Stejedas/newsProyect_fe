var miApp = angular
  .module("myApp", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "NewsPage/newsPage.html",
        controller: "newsController",
      })
      .when("/archivate", {
        templateUrl: "NewsPage/newsPage.html",
        controller: "newsController",
      })
      .otherwise({ redirectTo: "NewsPage/newsPage.html" });
  })
  .run([
    "$rootScope",
    function ($rootScope) {
      $rootScope.allModes = [
        {
          mode: "archivated",
          path: "/archivate",
          isArchivate: true,
          class: "btn btn-outline-danger buttonCard",
          text: "Remove",
          noNews: "Sorry, no new news, please come back later!"
        },
        {
          mode: "exposed",
          path: "/",
          isArchivate: false,
          class: "btn btn-outline-success buttonCard",
          text: "Archivate",
          noNews: "Sorry, no news archivated."
        },
      ];
    },
  ]);
