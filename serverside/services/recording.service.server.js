var SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var fs = require('fs');
// var formidable = require('formidable');
var multer = require('multer');
//var storage = multer.memoryStorage();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/../../serverside/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, 'blob.wav')}
});
var upload = multer({
    storage: storage
}).single('file');


module.exports = function(app) {
    app.post("/api/translate",upload,sumit_function);
    function sumit_function(req , res) {
        var file = req.file.buffer;
        var speech_to_text = new SpeechToTextV1({
            username : 'a674710a-2526-417c-a071-e385836cf566',
            password : 'hLaOwS6yz1yG'
        });
        var params = {
            audio : fs.createReadStream('serverside/uploads/blob.wav'),
            content_type : 'audio/wav',
            model :  'en-US_BroadbandModel'
        };
        speech_to_text.recognize(params, function(err, response) {
            var body  ;
            if (err)
                res.send(err);
            else
                {
                    var textConverted = '';
                    console.log(response);
                    textConverted = textConverted + response.results[0].alternatives[0].transcript;
                    var nlu = new NaturalLanguageUnderstandingV1({
                        username : 'cb82a3df-dad7-4943-bc95-43dc87b067d7',
                        password : 'IqrSrz6nCfYu',
                        version_date : NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
                    });
                    nlu.analyze({
                        'text' : textConverted,
                        'features' : {
                            'concepts' : {},
                            'categories' : {},
                            //'metadata': {},
                            'sentiment' : {
                                'targets' : ['task']
                            },
                            'entities' : {
                                'model' : '10:657e77da-a96b-49b2-9807-e2252d66b94e',
                                'sentiment' : true,
                                'limit' : 5
                            },
                            'emotion' : {
                                'targets' : ['started', 'completed', 'end of day']
                            },
                            'keywords' : {
                                'sentiment' : true,
                                'emotion' : true,
                                'limit' : 3
                            }
                        }
                    }, function(err, response) {
                        if (err)
                            console.log('error:', err);
                        else
                        {   response.text = textConverted;
                            res.send(JSON.stringify(response, null, 2));
                        }
                    });
            }

        });
    }
}; 