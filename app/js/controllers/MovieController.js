(function () {
    app.controller('MovieController', function ($scope, $http, tmdb) {
        tmdb.getConfig().then(function () {

            $scope.pop = [];
            $scope.image_base = "";

            $scope.image_base = tmdb.config.image_url + "/" + tmdb.config.image_size + "/";

            $http.get(tmdb.nowPlaying, { params: tmdb.key })
                .success(function (json) {
                    console.log("nowPlaying returned " + json.results.length + " results.");
                    console.log("Here is an example:", json.results[0]);
                    // console.log(json.results[0]);
                    $scope.pop = json;
                });
        });
    });
})();