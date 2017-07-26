(function () {
    angular
        .module("HomePage")
        .factory("recordingService", recordingService);

    function recordingService($http) {
        var api = {
            "speechToText": speechToText ,
            "translate" : translate
        };
        return api;

        function speechToText() {
            return $http.get("/api/test");
        }

        function translate(blobObject) {
            return $http.post("/api/translate",blobObject);
        }
    }
})();