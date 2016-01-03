'use strict';

app.controller('SearchController', function SearchController($scope, $http, tmdb) {

    $scope.placeholder = "Search for an actor...";

    $scope.actorResults = [];

    $scope.searchActors = function () {

        $http.get(tmdb.searchPerson, { params: angular.extend({ query: $scope.query }, tmdb.key) })
            .then(function (response) {
                var json = response.data;
                console.log(json);

                $scope.profileBase = tmdb.config.image_url + "/" + tmdb.config.profile_size + "/";
                $scope.actorResults = json.results;
            });
    }

    $scope.searchMovies = function () {

        var cast = [];
        angular.forEach($scope.wantedActors, function (value, key, obj) {
            cast.push(value.id);
        });

        $http.get(tmdb.discoverMovie, { params: angular.extend({ with_cast: cast.join(',') }, { sort_by: "popularity.desc" }, tmdb.key) })
            .then(function (response) {
                var json = response.data;
                console.log(json);

                $scope.movieResults = json.results;
            });
    }

    $scope.wantedActors = [];
    $scope.addActor = function (actor) {
        $scope.wantedActors.push(actor);
        $scope.actorResults = [];
        $scope.query = "";
    }

});