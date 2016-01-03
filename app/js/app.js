var app = angular.module('movies', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider.when('/',
            {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            });
        $routeProvider.when('/latest',
            {
                templateUrl: 'templates/latest.html',
                controller: 'MovieController'
            });
        $routeProvider.when('/search',
            {
                templateUrl: 'templates/search.html',
                controller: 'SearchController'
            });
        $routeProvider.otherwise({
            redirectTo: function (routeParams, path, search) {
                return "/?from=" + path;
            }
        });
    })
    .run(function (tmdb) {
        tmdb.getConfig();
    });

(function () {

    app.directive('movie', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/movie.html'
        };
    });

})();
