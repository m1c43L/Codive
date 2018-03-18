var express = require('express');
var path = require('path');
var app = express();
var pg = require('pg');
var fs = require('fs');
var formidable = require('formidable');

var URL = "postgres://ziolwiuyqpgbzx:92f0ff10fadb303534b7a21d8355d780b9fe181023341c8e65e1c52eacbbde5a@ec2-54-225-182-108.compute-1.amazonaws.com:5432/d7610lovj06asb"

pg.defaults.ssl = true;
var client = new pg.Client(URL);
client.connect();
var query = client.query("SELECT * FROM posts", function(err, result) {
    console.log(result.rows[0]);
});
app.get('/DogType',function(req, res){
    res.render('DogType')
})
/*app.get('/posts', function(req, res){
    var query = client.query("SELECT * FROM posts", function(err, result) {
        console.log(result.rows);
        res.send(result.rows);
    })
})*/
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function (req, res){
 res.send('public/index.html')
 });

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.post('/cip', function(req, res, next){
    console.log(req);
    client.query('Insert into posts (post, date) values ($1, $2)', [message, time], function(err, result) {
        if(err) console.log(err);
        else console.log(result);
    })
    var timeText = time.getFullYear() + "-" + (time.getMonth() + 1) + '-' + time.getDate();

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/uploads');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function(field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));

});

    // once all the files have been uploaded, send a response to the client
    form.on('end', function() {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

app.listen(3000, function(){
    console.log('Hey World!!!');
});

module.exports = app;