app.factory('tmdb', function ($http) {
    var api = {

        baseUrl: "https://api.themoviedb.org/3/",
        key: { api_key: "272d690f749890fab4af26826ac2e91f" }
    };

    api.configuration = api.baseUrl + "configuration";
    api.nowPlaying = api.baseUrl + "movie/now_playing";
    api.searchPerson = api.baseUrl + "search/person";
    api.discoverMovie = api.baseUrl + "discover/movie";

    var promise;
    api.getConfig = function () {
        if (promise) {
            return promise;
        } else {
            promise = $http.get(api.configuration, { params: api.key })
                .then(function (response) {
                    var json = response.data;
                    console.log("Configuration:", json);

                    api.config = {
                        image_url: json.images.base_url,
                        image_size: json.images.poster_sizes[0],
                        profile_size: json.images.profile_sizes[2]
                    };
                });
            return promise;
        }
    };

    return api;
});