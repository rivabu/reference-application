
var express = require('express');
var request = require('request');
var querystring = require('querystring');
var http = require('http');
var app = express();
var apiServer = 'http://127.0.0.1:8081';


// simple logger
app.use(function(req, res, next){
    next();
    console.log('%s | %s | %s', req.method, res.statusCode, req.url);
});

app.use(express.json());
//app.use(express.urlencoded());

app.use(express.static(__dirname + '/..'));
console.log('Serving static content from' + __dirname + '/..');

// get all users
app.get('/person/list', function(req, res) {
    var newurl = apiServer + '/person/list';
  	request(newurl).pipe(res)
});

//get user by id
app.get('/person/user/:id', function(req, res) {
    var newurl = apiServer + '/person/user/'+req.params.id;
  	request(newurl).pipe(res)
});

// add user
app.post('/person/user', function(req, res) {
    forwardPostPutDelete(req, res, 'POST', '/person/user');

});
// update user
app.put('/person/user', function(req, res) {
    forwardPostPutDelete(req, res, 'PUT', '/person/user');

});

// delete user
app.delete('/person/user/:id', function(req, res) {
    forwardPostPutDelete(req, res, 'DELETE', '/person/user/'+req.params.id);

});


function forwardPostPutDelete(req, res, method, path) {
	var data = JSON.stringify(req.body);
    var options = {
        host: '127.0.0.1',
        port: 8081,
        path: path,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    var request = http.request(options, function(response) {
		console.log(response.statusCode);
        response.setEncoding('utf8');
        var responseString = '';

        response.on('data', function (chunk) {
			
            responseString += chunk;
        });
        response.on('end', function(){
            res.writeHead(response.statusCode, {'Content-Type':'application/json'});
            res.end(responseString);
			console.log(responseString);
        });
		

    });

    request.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    request.write(data);
    request.end();
}


app.listen(3000);
console.log('Listening on port 3000');