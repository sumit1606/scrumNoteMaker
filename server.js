/**
 * Created by SumitBhanwala on 7/19/2017.
 */
var express = require('express');
var app = express();
// require ("./test/app.js")(app);
var path = require('path');
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname));
// 	app.post('/upload', function(req, res){
//
//   // create an incoming form object
//
//
//   // store all uploads in the /uploads directory
//   form.uploadDir = path.join(__dirname, '/uploads');
//
//   // every time a file has been uploaded successfully,
//   // rename it to it's orignal name
//   form.on('file', function(field, file) {
//     fs.rename(file.path, path.join(form.uploadDir, file.name + ".wav"));
//   });
//
//   // log any errors that occur
//   form.on('error', function(err) {
//     console.log('An error has occured: \n' + err);
//   });
//
//   // once all the files have been uploaded, send a response to the client
//   form.on('end', function() {
//     res.end('success');
//   });
//
//   // parse the incoming request containing the form data
//   form.parse(req);
//
// });
require("./serverside/app.js")(app);

var port = process.env.PORT || 3008;
app.listen(port);