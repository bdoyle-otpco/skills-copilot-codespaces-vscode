//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

//read data from comments.json
var commentData = fs.readFileSync('./comments.json');
var comments = JSON.parse(commentData);

//create server
app.use(express.static('public'));
app.use(bodyParser.json());

//add a new comment
app.post('/comments', function (req, res) {
    var newComment = req.body;
    comments.push(newComment);
    fs.writeFileSync('./comments.json', JSON.stringify(comments));
    res.json(comments);
});

//get all comments
app.get('/comments', function (req, res) {
    res.json(comments);
});

//listen to port 3000
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
