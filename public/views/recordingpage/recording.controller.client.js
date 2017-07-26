(function () {
    angular
        .module("HomePage")
        .controller("recordingController", recordingController);

    function recordingController(recordingService, $sce ,$location ,Upload,$timeout) {
        var vm = this;
		// vm.speechtotext = speechtotext;
        vm.multiStatus = [];
        vm.speechdata = "";
        vm.recordAudio = recordAudio;
        vm.stopRecording = stopRecording;
        vm.getTrustedHtml = getTrustedHtml;
        vm.recordAndSearch = recordAndSearch;
        function init() {
        }

        init();

        function recordAudio() {
            console.log(vm.recordedInput);
        }
        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function stopRecording() {
            console.log(vm.recordedInput);
            recordAndSearch();
        }
        function recordAndSearch() {
            vm.addedToFav = null;
            vm.lyricsData= null;
            vm.error = null;
            var status = {} ;
            $timeout(function () {
                console.log(vm.recordedInput);
                Upload.upload({
                    url: '/api/translate', //webAPI exposed to upload the file
                    data:{file:vm.recordedInput} //pass file as data, should be user ng-model
                }).then(function (res) { //upload function returns a promise
                    vm.recordingFlag = false;
                    console.log(data);
                    var data = res.data ;
                    if (data) {
                        vm.speechdata = data.text;
                        for (var  i = 0 ; i < data.entities.length ; i++ ) {
                            if (data.entities[i].type == "NAME")
                                status.NAME = data.entities[i].text;
                            else if (data.entities[i].type == "TASK") {
                                if (status.TASK == undefined)
                                    status.TASK = data.entities[i].text;
                                else {
                                    status.TASK = status.TASK + "," + data.entities[i].text;
                                }
                            }
                            else if (data.entities[i].type == "INFORMATION")
                                status.INFO = data.entities[i].text;
                            else if (data.entities[i].type == "STATUS")
                                status.STAT = data.entities[i].text;
                            else if (data.entities[i].type == "DIFFICULTIES")
                                status.DIFF = data.entities[i].text;
                        }
                        vm.multiStatus.push(status) ;
                    } else {
                        vm.error = 'Some error occured';
                    }
                }, function (err) {
                    vm.recordingFlag = false;
                    if (err && err.data && err.data.description) {
                        vm.error =  err.data.description;
                    }
                    else {
                        vm.error =  "Some Error Occurred";
                    }
                    vm.success= false;

                }, function (evt) {
                    console.log("In progress" + evt);
                });
            }, 100);

        }
		// function speechtotext() {
         //    var promise = recordingService.speechToText();
         //    var status = {} ;
         //    promise.success(function (data) {
         //        if (data) {
         //            for (var  i = 0 ; i < data.entities.length ; i++ )
		// 			{
		// 				if(data.entities[i].type == "NAME")
		// 					status.NAME =  data.entities[i].text ;
		// 				else if (data.entities[i].type == "TASK")
		// 				{
		// 					if(status.TASK == undefined)
         //                        status.TASK =  data.entities[i].text ;
		// 					else
		// 					{
         //                        status.TASK = status.TASK + "," + data.entities[i].text ;
		// 					}
         //                }
         //                else if (data.entities[i].type == "INFORMATION")
         //                    status.INFO =  data.entities[i].text ;
         //                else if (data.entities[i].type == "STATUS")
         //                    status.STAT =  data.entities[i].text ;
         //                else if (data.entities[i].type == "DIFFICULTIES")
         //                    status.DIFF =  data.entities[i].text ;
		// 			}
		// 			vm.multiStatus.push(status) ;
         //        } else {
         //            vm.error = 'Some error occured';
         //        }
         //    });
		// 	}
			
	}
})();