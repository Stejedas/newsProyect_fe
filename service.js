angular.module('myApp')
.factory("NewsService", function ($http) {
    var dataService = {};

    dataService.getNews = function (search) {
      return $http.get(`http://localhost:8000/news/${search}`).then(function (response) {
        return response.data;
      });
    };
    return dataService;
  })