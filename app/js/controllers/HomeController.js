(function () {
    app.controller('HomeController', function ($scope, $route, $location) {
        $scope.url = $route.current.params.from;
        console.log($route);
    });
})();