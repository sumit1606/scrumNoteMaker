(function () {
    angular
        .module("HomePage")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when("/index", {
                templateUrl: 'views/recordingpage/recording.view.client.html',
                controller: 'recordingController',
                controllerAs: 'model'
            })
			.otherwise({redirectTo : '/index'});
    }
})();